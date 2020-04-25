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
	if (message.channel.type === "dm") {
		if (message.content == "!update") {
			
			fetchHistory()	
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
				if (salon.etats[condition] != action.conditions[condition]) {
					// the condition is not reached
					ok = false
					break;
				}
			}
			reply = ok ? action.reaction : action.objection
			reply = computeReply(reply, salon)
						
		} else {
			// no condition, reply with default reaction
			reply = computeReply(action.reaction, salon)
		}
		
		message.reply(reply)
		
	} else {
		message.reply("I'm in #"+ histoire.salonActuel + ". Come and join me!")
	}
}

// interpreter le script O10-C.txt
function loadText() {
    try {
        const data = fs.readFileSync('./O10-C.txt', 'utf8')
        return data
	} catch (err) {
        console.error(err)
	}
}


// aller chercher le fichier .txt et le transformer en commandes
function parseText(body = null) {
	console.log("updating")

	histoire = {
		titre: "O10-C",
		salons:[],
		salonActuel: "🌈général",
	}

	let scenario = body == null ? loadText() : body
	let scenarioLines = scenario.split(/[\r\n]+/g).map(s => s.trim()).filter( e => e.length > 0) // split scenario by lines, trim and remove empty lines
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
					actions: [],
					etats: {}
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
				for (i in conditionList) {
					
					if (conditionList[i][0]=="!") {
						conditions[conditionList[i].substr(1).trim()] = false // negative condition
						salon.etats[conditionList[i].substr(1).trim()] = false // ajouter la variable au salon
					} else {
						conditions[conditionList[i]] = true // positive condition
						salon.etats[conditionList[i]] = false // ajouter la variable au salon
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
}

// check for state setter in reply 
function computeReply(reply, salon) {
	let regexSetter = /{\s*(@|\+|-)\s*([^}\n\r]*)}/gm
	let resultSetter = [...reply.matchAll(regexSetter)]
	//console.log(resultSetter)
	if (resultSetter.length > 0) {
		for (i in resultSetter) {
			let operator = resultSetter[i][1]
			let variable = resultSetter[i][2]
		
			// 'change salon' command
			if (operator == "@") {
				histoire.salonActuel = variable
				salon = getSalonByName(variable)
				console.log("We are now in "+histoire.salonActuel)
				//console.log(util.inspect(salon, {showHidden: false, depth: null, colors: true}))

			} else {
				// salon state setter
				salon.etats[variable] = operator == "+" ? true : false
			}		
		}
		
		console.log(salon.etats)
		return reply.replace(regexSetter, "")
	}
	return reply	
}

// find a salon by name in 'histoire' 
function getSalonByName(salonName) {
	for (indexSalon in histoire.salons) {
		if (histoire.salons[indexSalon].titre == salonName) {
			return histoire.salons[indexSalon]
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
	//console.log(result)
	return result
}

function fetchHistory() {
	// https://hackmd.io/YXmNK5k5TdKTKhbpelbbWw/download
	request('https://hackmd.io/YXmNK5k5TdKTKhbpelbbWw/download', function (error, response, body) {
		console.error('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		console.log(body)
		parseText(body)
		   
   });
}
// démarrer le "parseur"
fetchHistory()
console.log(util.inspect(histoire, {showHidden: false, depth: null, colors: true}))

bot.login('token-here')