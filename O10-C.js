// déclaration des variables Discord
const discord = require('discord.js')
const fs = require('fs')
const util = require('util')
const request = require('request');
const bot = new discord.Client()

let histoire = {}

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
		message.channel.name = histoire.salonActuel
		parseMessage(message)
	}
})

function parseMessage(message) {
	// la réponse par defaut en cas où on trouve pas de solution
	var reply = "I'm sorry @"+message.author.username+", I'm afraid you can't do that."
	
	// verifier que le message est envoyé dans le salon actuel 
	if (message.channel.name == histoire.salonActuel) {
		// on récupère le salon actuel
		let salon = getSalonByName(histoire.salonActuel)
		
		// juste au cas où le salon n'a pas d'actions définies
		if (salon == null || !salon.hasOwnProperty("actions")) {
			message.reply("There is nothing to do here...")
			return
		}
		// rechercher une action correspondant au message
		let action = findMatchingAction(message.content, salon.actions)
		
		if (action == null) {
			// répondre sorry si aucune action trouvée
			message.reply(reply)
			return
		}
			
		if (action.conditions != null) {
			// la réponse est soumise a condition
			var ok = true
			for (condition in action.conditions) {
				//console.log(salon.etats[condition] +" -> " +action.conditions[condition] )
				if (histoire.etats[condition] != action.conditions[condition]) {
					// the condition is not reached
					ok = false
					break;
				}
			}
			reply = ok ? action.reaction : action.objection
			reply = computeReply(reply)		
		} else {
			// no condition, reply with default reaction
			reply = computeReply(action.reaction)
		}
		

		if (message.channel.type === "text") {
			let channel = message.guild.channels.cache.find(ch => ch.name === histoire.salonActuel)
			message.channel.name
		}
		//console.log(message)
		message.reply(reply)

		// sin on a changé de salon, envoyer un 'look' depuis ce nouveau salon en mentionant l'utilisateur
		if (salon != getSalonByName(histoire.salonActuel)) {
			salon = getSalonByName(histoire.salonActuel)
			let look = findMatchingAction("look",salon.actions)
			if (look != null && message.channel.type === "text") {
				// s'il s'agit d'un message emit d'un salon, trouver l'id du salon discord
				let channel = message.guild.channels.cache.find(ch => ch.name === histoire.salonActuel)
				if (channel != null) channel.send("<@" + message.author.id + "> "+ computeReply(look.reaction))
			} else message.reply("<@" + message.author.id + "> "+ computeReply(look.reaction))
		}
	} else {
		console.log("outside call")
		if (message.channel.type === "text") {
			let channel = message.guild.channels.cache.find(ch => ch.name === histoire.salonActuel)
			message.reply("I'm in <#"+ channel.id + ">. Come and join me!")
		} 
		
	}
}

// check for state setter in reply 
function computeReply(reply) {
	let regexSetter = /{\s*(@|\+|-)\s*([^}\n\r]*)}/gm
	let resultSetter = [...reply.matchAll(regexSetter)]

	for (result of resultSetter) {
		let operator = result[1]
		let variable = result[2]
		// 'change salon' command
		if (operator == "@") {
			histoire.salonActuel = variable
			console.log("We are now in "+histoire.salonActuel)
		} else {
			// salon state setter
			histoire.etats[variable] = operator == "+" ? true : false
			console.log(histoire.etats)
		}		
	}
	return reply.replace(regexSetter, "")
}

// aller chercher le fichier .txt et le transformer en commandes
function parseStory(source) {
	histoire = {
		titre: "O10-C",
		salons:[],
		salonActuel: null,
		etats: {}
	}

	let scenarioLines = source.split(/[\r\n]+/g).map(s => s.trim()).filter( e => e.length > 0) // split scenario by lines, trim and remove empty lines
	var salon = {} // start with an empty salon object
	var action = {}
		
	for (lineIndex in scenarioLines) {
		let line = scenarioLines[lineIndex]
		
		switch(line[0]) { // suivant le premier caractère de la ligne
			case "#": // nouveau salon
				let nomSalon = line.substr(1).trim()
				
				// créer un nouvel objet salon avec son nom
				salon = {
					titre: nomSalon,
					actions: []
					}
				histoire.salons.push(salon) // add the new salon to the story
				break;
				
			case "!": // action(s) du salon
				let regexActions = /!\s*(.*)/ // trouver toutes les actions et synonymes : !fait ci / fait ça / fait quoi
				let allCommands = line.match(regexActions)[1]
				let commands = allCommands.split(/\//g).map(s => s.trim()).filter( e => e.length > 0)// séparer les actions par /
				
				action = {commandes:commands,
						  conditions: null}
				
				salon.actions.push(action) // ajouter la liste d'actions synonymes au salon
				break;
				
			case "?": // condition de réaction
				let allconditions = line.substr(1).trim()
				let conditionList = allconditions.split(/\&/g).map(s => s.trim()).filter( e => e.length > 0)// séparer les conditions par &
				let conditions = {}
				for (condition of conditionList) {
					if (condition[0]=="!") {
						conditions[condition.substr(1).trim()] = false // negative condition
						histoire.etats[condition.substr(1).trim()] = false // ajouter la variable au salon
					} else {
						conditions[condition] = true // positive condition
						histoire.etats[condition] = false // ajouter la variable au salon
					}
				}
				action.conditions = conditions
				break;
				
			case "+": // pro condition 
				let positiveResponse = line.substr(1).trim()
				action.reaction = positiveResponse
				break;
				
			case "-": // non condition
				let negativeResponse = line.substr(1).trim()
				action.objection = negativeResponse
				break;
		}
	}	
	histoire.salonActuel = histoire.salons[0].titre
	console.log(util.inspect(histoire, {showHidden: false, depth: null, colors: true}))

}

// find a salon by name in 'histoire' 
function getSalonByName(salonName) {
	for (salon of histoire.salons) {
		if (salon.titre == salonName) {
			return salon
		}
	}
	console.log("no salon named " + salonName)
	// no salon with that name, return null
	return null
}

// find a matching action from a sentence in an action list
function findMatchingAction(sentence, actions) {
	// séparer la phrase en mots
	let sentenceWords = sentence.split(/(\s+)/).filter( e => e.trim().length > 0)
	
	var result = null
	var score = 0
	for (i in actions) {
		let commandes = actions[i].commandes
 		for (j in commandes) {
 			// séparer la commande par mots
 			let commandParts = commandes[j].split(/(\s+)/).map(s => s.trim()).filter( e => e.length > 0)
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
function loadStory() {
    try {
        const data = fs.readFileSync('./O10-C.txt', 'utf8')
        return data
	} catch (err) {
        console.error(err)
	}
}
//  update history from an url
function fetchStory(url) {
	request(url, function (error, response, body) {
		console.error('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		parseStory(body)   
   });
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