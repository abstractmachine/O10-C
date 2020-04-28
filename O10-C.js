// déclaration des variables Discord
const discord = require('discord.js')
const fs = require('fs')
const util = require('util')
const request = require('request');
const bot = new discord.Client()

let story = {}
let messagesList = []

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
});

// activer la réception des messages 
bot.on('message', message => {
	// no bots allowed
	if (message.author.bot) return
	// nettoyer le message
	message.content = message.cleanContent
	message.content = message.content.toLowerCase().trim()
	let place = getPlaceByName(story.currentPlace)
	// interprete les messages dans les channels publics type "text"
	if (message.channel.type === "text" && message.content.startsWith('!')) {
		message.content = message.content.substring(1).trim()
		// verifier que le message est envoyé dans le place actuel 
		if (message.channel.name != story.currentPlace) {
			let channel = message.guild.channels.cache.find(ch => ch.name === story.currentPlace)
			replyToDiscordMessage(message, "I'm in <#"+ channel.id + ">. Come and join me!")
			return
		}
		let reply = parseMessage(message.content, place)
		replyToDiscordMessage(message, reply)
	} else if (settings.directMessageMode && message.channel.type === "dm") {
		// répondre au direct messages
		if (message.content == "!update") {
			fetchStory(settings.storyUrl)
			replyToDiscordMessage(message, "Update done!")
			return
		}
		//message.channel.name = story.currentPlace
		let reply = parseMessage(message.content, place)
		replyToDiscordMessage(message, reply)
	}

	// Send a message to the player from the new place
	if (story.placeChanged) {
		story.placeChanged = false
		let place = getPlaceByName(story.currentPlace)
		let look = findMatchingAction("look",place.actions)
		if (look != null && message.channel.type === "text") {
			// s'il s'agit d'un message emit d'un salon, trouver l'id du salon discord
			let channel = message.guild.channels.cache.find(ch => ch.name === story.currentPlace)
			let reply = "<@" + message.author.id + "> "+ computeReply(getPassedResponse(look.responses[0]) )
			if (channel != null) channel.send(reply)
		} else {
			let reply = "<@" + message.author.id + "> "+ computeReply(getPassedResponse(look.responses[0]) )
			replyToDiscordMessage(message, reply)
		}
	}
})

function replyToDiscordMessage(message, reply) {
	logGameToFile(message.content)
	logGameToFile("-> "+reply)
	if (message.channel.type === "text") messagesList.push(message)
	message.reply(reply).then((rep) => messagesList.push(rep))
	.catch(console.error);
	if (settings.cleanUpMessages) cleanDiscordMessages()
}

function cleanDiscordMessages(){
	if (messagesList.length > 5) {
		let lastMessage = messagesList.shift()
		lastMessage.delete().then(msg => console.log(`Deleted message from ${msg.author.username}`))
		.catch(console.error);
	}
}

function parseMessage(message, place) {
	var reply = ""
	// juste au cas où le salon n'a pas d'actions définies
	if (place == null || !place.hasOwnProperty("actions")) {
		return "There is nothing to do here..."
	}
	// rechercher une action correspondant au message dans le salon actuel
	let action = findMatchingAction(message, place.actions)
	// si aucune action trouvée, faire une recherche dans les reponses par default
	if (action == null) {
		action = findMatchingAction(message, story.defaults.actions)
	}
	// si aucune action par defaut trouvée, repondre par la reponse catch all
	if (action == null) {
		action = findMatchingAction("*", story.defaults.actions)
	}

	for (response of action.responses) {
		if (!isEmpty(response.conditions)) { // la réponse est soumise à condition(s)
			var ok = true
			for (condition in response.conditions) {
				if (story.states[condition] != response.conditions[condition]) {
					// the condition is not reached
					ok = false
					break;
				}
			}
			var tmpReply = ok ? getPassedResponse(response) : getFailedResponse(response)
			tmpReply = computeReply(tmpReply)
			reply += tmpReply != null ? tmpReply+" " : ""
			if (!ok && response.fail.length) {
				break // stop going down to next condition when a condition failed to pass
			}
		} else reply += computeReply(getPassedResponse(response))+" "
	}
	return reply
}
// random getters and setters of reactions and objections
function getPassedResponse(response) {
	return response.pass[Math.floor(Math.random() * response.pass.length)]
}

function getFailedResponse(response) {
	return response.fail[Math.floor(Math.random() * response.fail.length)]
}

// check for state setter in reply 
function computeReply(reply) {
	if (reply == null) return null
	let regexSetter = /{\s*(@|\+|-)\s*([^}\n\r]*)}/gm
	let resultSetter = [...reply.matchAll(regexSetter)]

	for (result of resultSetter) {
		let operator = result[1]
		let variable = result[2]
		// 'change place' command
		if (operator == "@") {
			story.currentPlace = variable
			console.log("We are now in "+story.currentPlace)
			story.placeChanged = true
		} else {
			// place state setter
			story.states[variable] = operator == "+" ? true : false
			console.log(variable + " is now : " +story.states[variable])
		}		
	}
	return reply.replace(regexSetter, "")
}
// aller chercher le fichier .txt et le transformer en commandes
function parseStory(source) {
	let scenarioLines = source.split(/[\r\n]+/g).map(s => s.trim()).filter( e => e.length > 0) // split scenario by lines, trim and remove empty lines
	
	story = {
		title: "O10-C",
		places:[],
		defaults: null,
		currentPlace: null,
		placeChanged: false,
		states: {}
	}
	story.toJson = function(path) {
		var json = JSON.stringify(this, null, 4);
		fs.writeFile('./'+path, json, err => {
			if (err) {
			  console.error(err)
			}
		})
	}
	
	var place, action, responses  
	
	var placeTemplate = function (name) {
		return { "name": name, "actions": [] }
	}
	
	var actionTemplate = function (commands) {
		return { "commands":commands, "responses": [] }
	}

	var responsesTemplate = function () {
		return {"conditions":[], "pass":[], "fail":[]}
	}

	for (lineIndex in scenarioLines) {
		let line = scenarioLines[lineIndex]
		
		switch(line[0]) { 
			case "#": // nouveau salon
				action = null
				responses = null
				// créer un nouvel objet place avec son nom
				let placeName = line.substr(1).trim()
				place = placeTemplate(placeName)
				// check for defaults 
				if (placeName == "everywhere") {
					story.defaults = place
				} else story.places.push(place) // add the new place to the story
				break;	
			case "!": // action(s) du salon
				let regexActions = /!\s*(.*)/ // trouver toutes les actions et synonymes : !fait ci / fait ça / fait quoi
				let allCommands = line.match(regexActions)[1]
				let commands = allCommands.split(/\//g).map(s => s.trim()).filter( e => e.length > 0)// séparer les actions par /
				
				action = actionTemplate(commands)
				responses = null
				
				place.actions.push(action) // ajouter l'objet action au salon
				break;
			case "?": // condition de réaction
				responses = responsesTemplate()
				let allconditions = line.substr(1).trim()
				let conditionList = allconditions.split(/\&/g).map(s => s.trim()).filter( e => e.length > 0)// séparer les conditions par &
				let conditions = {}
				for (condition of conditionList) {
					if (condition[0]=="!") {
						conditions[condition.substr(1).trim()] = false // negative condition
						story.states[condition.substr(1).trim()] = false // ajouter la variable au place
					} else {
						conditions[condition] = true // positive condition
						story.states[condition] = false // ajouter la variable au place
					}
				}
				responses.conditions = conditions
				action.responses.push(responses)
				break;	
			case "+": // pass condition 
				if (responses===null) {
					responses = responsesTemplate()
					action.responses.push(responses)
				}
				let positiveResponse = line.substr(1).trim()
				responses.pass.push(positiveResponse)
				break;
			case "-": // fail condition
				if (responses===null) {
					responses = responsesTemplate()
					action.responses.push(responses)
				}
				let negativeResponse = line.substr(1).trim()
				responses.fail.push(negativeResponse)
				break;
			case ">": // ignore commented lines
				break
		}
	}	
	story.currentPlace = story.places[0].name
	//console.log(util.inspect(story, {showHidden: false, depth: null, colors: true}))
}
// find a place by name in 'story' 
function getPlaceByName(placeName) {
	for (place of story.places) {
		if (place.name == placeName) {
			return place
		}
	}
	console.log("no place named " + placeName)
	// no place with that name, return null
	return null
}
// find a matching action from a sentence in an action list
function findMatchingAction(sentence, actions) {
	// séparer la phrase en mots
	let sentenceWords = sentence.split(/(\s+)/).filter( e => e.trim().length > 0)
	
	var result = null
	var score = 0
	for (i in actions) {
		let commands = actions[i].commands
 		for (j in commands) {
 			// séparer la commande par mots
 			let commandParts = commands[j].split(/(\s+)/).map(s => s.trim()).filter( e => e.length > 0)
 			// https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
 			let intersection = sentenceWords.filter(x => commandParts.includes(x))
 			// command match action 
 			if (intersection.length == commandParts.length) {
 				// set only if matching score is higher than previous match
 				if (score <= intersection.length) {
					result = actions[i]
					score = intersection.length
 				}
 			}
 		}
	}
	return result
}
// interpreter le script O10-C.txt
function loadStoryFromFile(path) {
    try {
        const data = fs.readFileSync(path, 'utf8')
        return data
	} catch (err) {
        console.error(err)
	}
}
//  update history from source
function fetchStory(url) {
	try { 	
		let storyUrl = new URL(url)
		if (storyUrl.protocol == "file:") { // fetch story from local file
			let body = loadStoryFromFile(storyUrl.hostname)
			parseStory(body)
		} else { // fetch story from remote server
			request(url, function (error, response, body) {
				//console.error('error:', error); // Print the error if one occurred
				//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
				parseStory(body)
				story.toJson("story.json")  // dump story to json file for debugging
			})
		}
	} catch (e) {
		console.log(e.message)
	}
}
// lire le fichier settings.json
function loadSettings() {
    try {
		const data = fs.readFileSync('./settings.json', 'utf8')
		let settings = JSON.parse(data)
        return settings
	} catch (err) {
        console.error(err)
	}
}
// enregitrer l'activité du jeu dans un fichier
function logGameToFile(log) {
	if (settings.logGame != true) return
	var logStream = fs.createWriteStream('./log.txt', {flags: 'a'});
	// use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
	logStream.write(log+'\n');
	logStream.end();
}
// return the emptiness of an object
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) return false;
    }
    return true;
}

// démarrer le "parseur"
let settings = loadSettings()
fetchStory(settings.storyUrl)
bot.login(settings.discordToken)