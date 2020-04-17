// déclaration des variables Discord
const discord = require('discord.js')
const fs = require('fs')
const bot = new discord.Client()

let histoire = []

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
	  messageText(message)
	}

  })


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
	let regexNomsSalons = /^# ([^\n].+)\n/gm
	let resultatSalons = [...scenario.matchAll(regexNomsSalons)]
	// commencer par toutes les occurences de #salon en cherchant des signes #
	// [ '# Toilettes\n', '# Numérique\n' ]
	// [ 'Toilettes', 'Numérique' ]
	// lister tous les noms de salon
	for (i in resultatSalons) {
		let nomSalon = resultatSalons[i][1]
		console.log(nomSalon)
	}

}

// démarrer le "parseur"
parseText()

bot.login('token-here')