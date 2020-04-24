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
		let action = findMatchingAction(message.content, salon.actions)
		
		// la réponse par defaut en cas où on trouve pas de solution
		var reply = "I'm sorry @"+message.author.username+", I'm afraid you can't do that."
		
		if (action != null) {
			if (action.reaction.condition != null) {
				
				// check for key 'condition' in salon states
				let exist = (action.reaction.condition in salon.states)
				
				// if key exist and key is true, reply with 'true' reaction
				if (exist && salon.states[action.reaction.condition] == true) {
					reply = action.reaction.true
					reply = computeReply(reply, salon)
				// else reply the with 'false' reaction	
				} else {
					reply = action.reaction.false
					reply = computeReply(reply, salon)
				}
			} else {
				// no condition, reply with 'default' reaction
				reply = action.reaction.default
			}
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
	let regexSalons = /^#(.*)[\n\r]*([^#]*)/gm
	let resultatSalons = [...scenario.matchAll(regexSalons)]
	// groupe 1 : capturer toutes les occurences de #salon en cherchant des signes # suivie d'un titre
	// groupe 2 : capturer tout le contenu qui suit jusqu'au prochain #nom de salon

	// lister tous les resultats de salons
	for (indexSalon in resultatSalons) {
		let nomSalon = resultatSalons[indexSalon][1].trim()
		let contenuSalon = resultatSalons[indexSalon][2].trim()
		
		actionsSalon = parseActions(contenuSalon) // extraire les actions du salon
		
		var salon = {
			nom: nomSalon,
			actions: actionsSalon,
			states: {}
		}
		
		histoire["salons"][indexSalon] = salon // ajouter le salon a l'histoire
	}
}

function parseActions(contenuSalon) {
		// rechercher les actions (eg: !look mirror) et le contenu de l'action qui suit
		let regexActions = /^!(.*)[\n\r]*([^!]*)/gm
		let resultatActions = [...contenuSalon.matchAll(regexActions)]
		
		// lister toutes les actions
		let actions = []
		for (indexActions in resultatActions) {
			let nomAction = resultatActions[indexActions][1].trim()
			let contenuAction = resultatActions[indexActions][2].trim()
			let reaction = parseReaction(contenuAction)
			
			let action = {
				action: nomAction,
				reaction: reaction
			}
			actions[indexActions] = action
		}
		return actions
}

function parseReaction(contenuAction) {
	var lines = contenuAction.match(/[^\r\n]+/g) 
	let condition = lines[0][0] == "?" // si la ligne commence par un ? , il y'a une condition
	
	let conditionName = condition ? lines[0].substr(1).trim() : null
	reaction = {
		condition: conditionName
	}
	if (condition) {
		reaction["true"] = lines[1].substr(1).trim()
		reaction["false"] = lines[2].substr(1).trim()
	} else {
		reaction["default"] = lines[0].substr(1).trim()
	}
	return reaction
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
			salon.states[variable] = operator == "+" ? true : false
		}
		return reply.replace(regexSetter, "")
	}
	return reply	
}

// find a salon by name in 'histoire' 
function getSalonByName(salonName) {
	for (indexSalon in histoire.salons) {
		if (histoire.salons[indexSalon].nom == salonName) {
			return histoire.salons[indexSalon]
		}
	}
	// no salon with that name, return null
	return null
}

// find a matching action from a sentence in an action list
function findMatchingAction(sentence, actions) {
	let sentenceWords = sentence.split(/(\s+)/).filter( e => e.trim().length > 0)
	
	for (indexAction in actions) {
		let sentenceAction = actions[indexAction].action.split(/(\s+)/).filter( e => e.trim().length > 0)
		
		// https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
		let intersection = sentenceWords.filter(x => sentenceAction.includes(x))
		if (intersection.length == sentenceAction.length) return actions[indexAction]
	}
	return null
}

// démarrer le "parseur"
parseText()
console.log(util.inspect(histoire, {showHidden: false, depth: null, colors: true}))

bot.login('token-here')