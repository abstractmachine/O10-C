// déclaration des variables Discord
const discord = require('discord.js')
const fs = require('fs')
const util = require('util')
const request = require('request');
const bot = new discord.Client()

let story = {}

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

// activer la réception des messages 
bot.on('message', message => {
	// no bots allowed
	if (message.author.bot) return // ignorer les autres bots
	// nettoyer le message
	message.content = message.cleanContent
	message.content = message.content.toLowerCase().trim()
	// interprete les messages dans les channels publics type "text"
	if (message.channel.type === "text" && message.content.startsWith('!')) {
	  message.content = message.content.substring(1).trim()
	  parseMessage(message)
	}
	// répondre au direct messages
	if (settings.directMessageMode && message.channel.type === "dm") {
		if (message.content == "!update") {
			fetchStory(settings.storyUrl)	
			message.reply("Update done!")
			return
		}
		message.channel.name = story.currentPlace
		parseMessage(message)
	}
})

function parseMessage(message) {
	
	// verifier que le message est envoyé dans le place actuel 
	if (message.channel.name == story.currentPlace) {
		var reply = null
		// on récupère le place actuel
		let place = getPlaceByName(story.currentPlace)
		
		// juste au cas où le salon n'a pas d'actions définies
		if (place == null || !place.hasOwnProperty("actions")) {
			message.reply("There is nothing to do here...")
			return
		}
		// rechercher une action correspondant au message dans le salon actuel
		let action = findMatchingAction(message.content, place.actions)
		
		// si aucune action trouvée, faire une recherche dans les reponses par default
		if (action == null) {
			action = findMatchingAction(message.content, story.defaults.actions)
		}
		// si aucune action par defaut trouvée, repondre par la reponse catch all
		if (action == null) {
			action = findMatchingAction("*", story.defaults.actions)
		}
			
		if (action.conditions != null) {
			// la réponse est soumise a condition
			var ok = true
			for (condition in action.conditions) {
				//console.log(place.states[condition] +" -> " +action.conditions[condition] )
				if (story.states[condition] != action.conditions[condition]) {
					// the condition is not reached
					ok = false
					break;
				}
			}
			reply = ok ? action.reaction() : action.objection()
			reply = computeReply(reply)		
		} else {
			// no condition, reply with default reaction
			reply = computeReply(action.reaction())
		}
		
		if (message.channel.type === "text") {
			let channel = message.guild.channels.cache.find(ch => ch.name === story.currentPlace)
			message.channel.name
		}
		//console.log(message)
		message.reply(reply)

		// sin on a changé de salon, envoyer un 'look' depuis ce nouveau salon en mentionant l'utilisateur
		if (place != getPlaceByName(story.currentPlace)) {
			place = getPlaceByName(story.currentPlace)
			let look = findMatchingAction("look",place.actions)
			if (look != null && message.channel.type === "text") {
				// s'il s'agit d'un message emit d'un salon, trouver l'id du salon discord
				let channel = message.guild.channels.cache.find(ch => ch.name === story.currentPlace)
				if (channel != null) channel.send("<@" + message.author.id + "> "+ computeReply(look.reaction()))
			} else message.reply("<@" + message.author.id + "> "+ computeReply(look.reaction()))
		}
	} else {
		console.log("outside call")
		if (message.channel.type === "text") {
			let channel = message.guild.channels.cache.find(ch => ch.name === story.currentPlace)
			message.reply("I'm in <#"+ channel.id + ">. Come and join me!")
		} 
	}
}

// check for state setter in reply 
function computeReply(reply) {
	console.log(reply)
	let regexSetter = /{\s*(@|\+|-)\s*([^}\n\r]*)}/gm
	let resultSetter = [...reply.matchAll(regexSetter)]

	for (result of resultSetter) {
		let operator = result[1]
		let variable = result[2]
		// 'change place' command
		if (operator == "@") {
			story.currentPlace = variable
			console.log("We are now in "+story.currentPlace)
		} else {
			// place state setter
			story.states[variable] = operator == "+" ? true : false
			console.log(story.states)
		}		
	}
	return reply.replace(regexSetter, "")
}

// aller chercher le fichier .txt et le transformer en commandes
function parseStory(source) {
	story = {
		title: "O10-C",
		places:[],
		defaults: null,
		currentPlace: null,
		states: {}
	}

	let scenarioLines = source.split(/[\r\n]+/g).map(s => s.trim()).filter( e => e.length > 0) // split scenario by lines, trim and remove empty lines
	var place = {} // start with an empty place object
	var action = {}
		
	for (lineIndex in scenarioLines) {
		let line = scenarioLines[lineIndex]
		
		switch(line[0]) { // suivant le premier caractère de la ligne
			case "#": // nouveau salon
				let placeName = line.substr(1).trim()
				
				// créer un nouvel objet place avec son nom
				place = {
					name: placeName,
					actions: []
					}
				// check for defaults 
				if (placeName == "defaults") {
					story.defaults = place
				} else story.places.push(place) // add the new place to the story
				break;	
			case "!": // action(s) du place
				let regexActions = /!\s*(.*)/ // trouver toutes les actions et synonymes : !fait ci / fait ça / fait quoi
				let allCommands = line.match(regexActions)[1]
				let commands = allCommands.split(/\//g).map(s => s.trim()).filter( e => e.length > 0)// séparer les actions par /
				
				action = {commands:commands,
						  conditions: null,
						  reactions: [],
						  objections: []
						}
				// random getters and setters of reactions and objections
				action.reaction = function() {
					return this.reactions[Math.floor(Math.random() * this.reactions.length)]
				}
				action.objection = function() {
					return this.objections[Math.floor(Math.random() * this.objections.length)]
				}

				place.actions.push(action) // ajouter la liste d'actions synonymes au place
				break;
			case "?": // condition de réaction
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
				action.conditions = conditions
				break;	
			case "+": // pro condition 
				let positiveResponse = line.substr(1).trim()
				action.reactions.push(positiveResponse)
				break;
			case "-": // non condition
				let negativeResponse = line.substr(1).trim()
				action.objections.push(negativeResponse)
				break;
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
        const data = fs.readFileSync('./'+path, 'utf8')
        return data
	} catch (err) {
        console.error(err)
	}
}
//  update history from source
function fetchStory(url) {
	try {
		let storyUrl = new URL(url)
		if (url.protocol == "file:") { // fetch story from local file
			let body = loadStoryFromFile(url.hostname)
			parseStory(body)
		} else { // fetch story from remote server
			request(url, function (error, response, body) {
				console.error('error:', error); // Print the error if one occurred
				console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
				parseStory(body)   
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

// démarrer le "parseur"
let settings = loadSettings()
fetchStory(settings.storyUrl)
bot.login(settings.discordToken)