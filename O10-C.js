// déclaration des variables Discord
const discord = require('discord.js')
const fs = require('fs')
const util = require('util')
const bot = new discord.Client()

let histoire = {
	titre: "mon histoire",
	salons:[],
	salonActuel: "💩toilettes",
}

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
		message.channel.name = histoire.salonActuel
		parseMessage(message)
	}

  })

function parseMessage(message) {
	// verifier que le message est envoyé dans le salon actuel 
	if (message.channel.name == histoire.salonActuel) {
		
		// on récupère le salon actuel
		let salon = getSalonByName(histoire.salonActuel)
		
		// rechercher une action correspondant au message
		let action = findMatchingAction(message.content, salon.actions)
		//console.log(action)
		// la réponse par defaut en cas où on trouve pas de solution
		var reply = "I'm sorry @"+message.author.username+", I'm afraid you can't do that."
		
		if (action == null) {
			// répondre sorry si aucune action trouvée
			message.reply(reply)
			return
		}
		
		
		if (action.conditions != null) {
			// la réponse est soumise a condition
			var ok = true
			
			for (condition in action.conditions) {
				console.log(salon.etats[condition] +" -> " +action.conditions[condition] )
				if (salon.etats[condition] != action.conditions[condition]) {
					// condition is not reached
					ok = false
					break;
				}
			}
			reply = ok ? action.reaction : action.objection
			reply = computeReply(reply, salon)
						
		} else {
			// no condition, reply with default reaction
			reply = action.reaction
		}
		
		message.reply(reply)
		
	} else {
		message.reply("I'm in #"+ histoire.salonActuel)
	}
}

function messageText(message) {

    //console.log(message.channel.name);
    //console.log(message.guil)
    // bot.channels.find("name","parc a chien").send("Welcome!")
	// message.channel.name == "🙀parc-à-chiens")
	// message.reply("Hello")

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
function parseText() {

	let scenario = loadText()
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
	console.log(resultSetter)
	if (resultSetter.length > 0) {
		let operator = resultSetter[0][1]
		let variable = resultSetter[0][2]
		console.log(operator)
		console.log(variable)
		
		// 'change salon' command
		if (operator == "@") {
			histoire.salonActuel = variable
			console.log()
		} else {
			// salon state setter
			salon.etats[variable] = operator == "+" ? true : false
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
	// no salon with that name, return null
	return null
}

// find a matching action from a sentence in an action list
function findMatchingAction(sentence, actions) {
	let sentenceWords = sentence.split(/(\s+)/).filter( e => e.trim().length > 0)
	
	for (i in actions) {
		let commandes = actions[i].commandes
		
 		for (j in commandes) {
 			// séparer la commande par mots
 			let commandParts = commandes[j].split(/(\s+)/).map(s => s.trim()).filter( e => e.length > 0)
 		
 			// https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
 			let intersection = sentenceWords.filter(x => commandParts.includes(x))
 			if (intersection.length == commandParts.length) return actions[i]
 		}
	}
	return null
}

// démarrer le "parseur"
parseText()
console.log(util.inspect(histoire, {showHidden: false, depth: null, colors: true}))

bot.login('token-here')