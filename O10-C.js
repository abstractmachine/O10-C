/** 
 * #O10-C.js
 * 
 * 
 */

const discord = require('discord.js')
const fs = require('fs')
const util = require('util')
const request = require('request');
const bot = new discord.Client()

let story = {} // The main story object

// 
// Discord.js related functions
// ----------------------------
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

	// Send a reply mentioning the player if we are in a new place, from that new place.
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

/**
 * Reply to a discord message
 * @param {Message} message The player message from discord text channel or DM channel
 * @param {string} reply The reply string 
 */
function replyToDiscordMessage(message, reply) {
	logGameToFile(message.content)
	logGameToFile("-> "+reply)

	if (settings.cleanUpMessages && message.channel.type === "text") dicordMessageCleaner.feed(message)
	message.reply(reply)
			.then((rep) => {if (settings.cleanUpMessages && message.channel.type === "text") dicordMessageCleaner.feed(rep)})
			.catch(console.error)
	
}

// A ring buffer message cleaner object 
var dicordMessageCleaner = {
	messageList: [],
	feed: function(message) {
		this.messageList.push(message)
		if (this.messageList.length > 10) {
			let lastMessage = this.messageList.shift()
			lastMessage.delete()
						.then(msg => console.log(`Deleted message from ${msg.author.username}`))
						.catch(console.error)
		}
	}
}

// 
// Core O10-C engine
// -----------------

/**
 * Parse a player message and return an answer
 * @param {string} message player message string.
 * @param {string} place place from where the message is issued.
 * @return {string} the message response from the story engine.
 */
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
/**
 * return a random response from a set of possible positive responses
 * @param {Object} response a response object containing an array of possible responses
 */
function getPassedResponse(response) {
	return response.pass[Math.floor(Math.random() * response.pass.length)]
}

/**
 * return a random response from a set of possible negative responses
 * @param {Object} response a response object containing an array of possible responses
 */
function getFailedResponse(response) {
	return response.fail[Math.floor(Math.random() * response.fail.length)]
}

/**
 * Analyse a response string and update the story states if needed.
 * @param {string} reply A reply string from story engine.
 * @return {string} Return the cleaned response string 
 */
function computeReply(reply) {
	if (reply == null) return null
	let regexSetter = /{\s*(@|\+|-|=)\s*([^}\n\r]*)}/gm
	let resultSetter = [...reply.matchAll(regexSetter)]

	for (result of resultSetter) {
		let operator = result[1]
		let variable = result[2]
		
		if (operator == "@") { // 'change place' command
			story.currentPlace = variable
			console.log("We are now in "+story.currentPlace)
			story.placeChanged = true
		} else if (operator == "=") { // 'death' command
			if (variable == "DEATH") {
				fetchStory(settings.storyUrl) // restart the game
				story.placeChanged = true
			}	
		} else { // property setter (+ or -)
			story.states[variable] = operator == "+" ? true : false
			console.log(variable + " is now : " +story.states[variable])
		}		
	}
	return reply.replace(regexSetter, "")
}

/**
 * Parse story source and build the game structure from it
 * @param {string} source The O10-C markDown source of the story
 */
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

	var lastTag = null
	for (lineIndex in scenarioLines) {
		let line = scenarioLines[lineIndex]
		
		switch(line[0]) { 
			case "#": // nouveau salon
				lastTag = "#"
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
				lastTag = "!"
				let regexActions = /!\s*(.*)/ // trouver toutes les actions et synonymes : !fait ci / fait ça / fait quoi
				let allCommands = line.match(regexActions)[1]
				let commands = allCommands.split(/\//g).map(s => s.trim()).filter( e => e.length > 0)// séparer les actions par /
				
				action = actionTemplate(commands)
				responses = null
				
				place.actions.push(action) // ajouter l'objet action au salon
				break;
			case "?": // condition de réaction
				lastTag = "?"
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
				lastTag = "+"
				if (responses===null) {
					responses = responsesTemplate()
					action.responses.push(responses)
				}
				let positiveResponse = line.substr(1).trim()
				responses.pass.push(positiveResponse)
				positiveResponse
				break;
			case "-": // fail condition
				lastTag = "-"
				if (responses===null) {
					responses = responsesTemplate()
					action.responses.push(responses)
				}
				let negativeResponse = line.substr(1).trim()
				responses.fail.push(negativeResponse)
				break;
			case ">": // ignore commented lines
				break
			default:
				console.log("Warning, syntaxe error at line "+lineIndex)
				console.log(line)
		}
	}	
	story.currentPlace = story.places[0].name
	//console.log(util.inspect(story, {showHidden: false, depth: null, colors: true}))
}

/**
 * Find a place in story by it's name
 * @param {string} placeName The name of the plce to find in story
 * @return {Object} Return a place object or null if no place with that name exists
 */
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

/**
 * Find a matching action from a sentence in a set of action objects.
 * @param {string} sentence The user input string.
 * @param {object} actions A set of action objects containing a set of commands and associated answsers.
 * @return {object} Return an object with the matching answers or null if none was found. 
 */
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

// 
// some utilities
// --------------

/**
 * Load the story source from a local file.	
 * @param {string} path The file relative path.
 * @return {string} return the story source as an utf-8 string.
 */
function loadStoryFromFile(path) {
    try {
        const data = fs.readFileSync(path, 'utf8')
        return data
	} catch (err) {
        console.error(err)
	}
}
/**
 * Load the story source from an url and parse it.
 * @param {URL} url The url of the story source with an http: or file: protocol.
 */
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

/**
 * Load the game settings from the settings.json file.
 * @return {object} Return the settings as an object.
 */
function loadSettings() {
    try {
		const data = fs.readFileSync('./settings.json', 'utf8')
		let settings = JSON.parse(data)
        return settings
	} catch (err) {
        console.error(err)
	}
}

/**
 * Log the game activity to the log.txt file.
 * @param {string} log The string to be logged.
 */
function logGameToFile(log) {
	if (settings.logGame != true) return
	let date = new Date()

	var logStream = fs.createWriteStream('./log.txt', {flags: 'a'});
	// use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
	logStream.write(date.toLocaleString()+'\t'+log+'\n');
	logStream.end();
}

/**
 * Return the emptiness of an object
 * @param {object} obj The object to test for emptiness
 * @return {Boolean} return true if the object is empty
 */
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