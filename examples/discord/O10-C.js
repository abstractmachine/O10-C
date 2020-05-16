/**
	O10-C.js
	========

	- authors:
		- abstractmachine
		- a line
		- Bergamote
		- flatland666
		- Flore G
		- Juste Leblanc
		- Velvet
	
	- version:
		0.1

	A Node.js example of the Zorkdown textual game engine on a Discord server using discord.js module.
*/

const discord = require('discord.js')
const fs = require('fs')
const fetch = require('node-fetch')
const zorkdown = require('../../src/zorkdown.js')

const bot = new discord.Client()
let zork = null

/**
	Discord.js related functions.
	=============================
*/

/**
	The Discord bot readiness handler.
*/
bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
});

/**
	The Discord bot message reception handler.
*/
bot.on('message', message => {
	// no bots allowed
	if (message.author.bot) return
	// nettoyer le message
	message.content = message.cleanContent
	message.content = message.content.toLowerCase().trim()
	const place = zork.getPlaceByName(zork.story.currentPlace)
	// interprete les messages dans les channels publics type "text"
	if (message.channel.type === "text" && message.content.startsWith('!')) {
		// Respond to messages sent from a Discod channel 
		message.content = message.content.substring(1).trim()
		// verifier que le message est envoyé dans le place actuel 
		if (message.channel.name != zork.story.currentPlace) {
			const channel = message.guild.channels.cache.find(ch => ch.name === zork.story.currentPlace)
			if (channel != null) replyToDiscordMessage(message, "I'm in <#"+ channel.id + ">. Come and join me!")
			else console.log(`Warning: Unmatched Discord Channel name in the story scenario, ${zork.story.currentPlace}`)
			return
		}

		if (message.content == "map") {
			replyToDiscordMessage(message, getMap())
			return
		}

		const reply = zork.parseMessage(message.content, place)
		replyToDiscordMessage(message, reply)
	} else if (settings.directMessageMode && message.channel.type === "dm") {
		// Respond to DM Discord messages
		if (message.content == "!update") { // handle special update command
			fetchStory(settings.storyUrl).then((source) =>{
				zork = new zorkdown(source)
				replyToDiscordMessage(message, "Update done!")
			}).catch((e)=> {
				console.log("Zork error")
				console.log(e)
			})

			
			return
		}
		
		if (message.content == "map") {
			replyToDiscordMessage(message, getMap())
			return
		}

		const reply = zork.parseMessage(message.content, place)
		replyToDiscordMessage(message, reply)
	}

	// Send a reply mentioning the player if we are in a new place, from that new place.
	if (zork.story.placeChanged) {
		zork.story.placeChanged = false
		const place = zork.getPlaceByName(zork.story.currentPlace)
		message.content = "look"
		reply = zork.parseMessage(message.content, place)
		//let look = findMatchingAction("look",place.actions)
		if (reply != null && message.channel.type === "text") {
			// s'il s'agit d'un message emit d'un salon, trouver l'id du salon discord
			const channel = message.guild.channels.cache.find(ch => ch.name === zork.story.currentPlace)
			reply = `<@${message.author.id}> ${reply}`
			if (channel != null) channel.send(reply).then((rep) => {if (settings.cleanUpMessages) dicordMessageCleaner.feed(rep)})
			.catch(console.error)
			else {
				let warning = `Warning: Unmatched Discord Channel name in the story scenario, ${zork.story.currentPlace}`
				console.log(warning)
				if (settings.debug == true) replyToDiscordMessage(warning, reply)
			}
		} else {
			reply = `<@${message.author.id}> ${reply}`
			replyToDiscordMessage(message, reply)
		}
	}
})

/**
	Get the 'map' represnetation of the game.

	- returns:
		A string concontaining a list of the game places and their connections to other places. 
*/
function getMap(){
	// get the 'map' of the game.
	let map = zork.getMap()
	let mapString = 'The map:\n'
	for (const place of map['places']) {
		mapString += `#${place['name']}\n`
		for (const connetion of place['connections']) {
			mapString += `\t- ${connetion}\n`
		}
	}
	return mapString
}

/**
	Reply to a discord message.

	- parameters:
		- message: The player message from a discord text channel or DM channel.
		- reply: The reply string.
*/
function replyToDiscordMessage(message, reply) {
	logGameToFile(message.content)
	logGameToFile(`-> ${reply}`)

	if (settings.cleanUpMessages && message.channel.type === "text") dicordMessageCleaner.feed(message)
	message.reply(reply)
			.then((rep) => {if (settings.cleanUpMessages && message.channel.type === "text") dicordMessageCleaner.feed(rep)})
			.catch(console.error)
}

// A ring buffer message cleaner object 
const dicordMessageCleaner = {
	messageList: [],
	feed: function(message) {
		this.messageList.push(message)
		if (this.messageList.length > 20) {
			const lastMessage = this.messageList.shift()
			lastMessage.delete()
						.then(msg => console.log(`Deleted message from ${msg.author.username}`))
						.catch(console.error)
		}
	}
}

/**
	Some utilities
	==============
*/

/**
	Load the story source code from a local file.	

	- parameters:
		path: A string reprensenting the relative path to the file.

	- returns:
		The story source as an utf-8 string.
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
	Load the story source from an url and parse it.

	- parammeters: 
		url: The story source URL with an http: or file: protocol.
	
	- returns:
		A promise with the story source code.
	*/
function fetchStory(url) {
	return new Promise(function(resolve, reject) {
		try { 	
			const storyUrl = new URL(url)
			if (storyUrl.protocol == "file:") { // fetch story from local file
				const source = loadStoryFromFile(storyUrl.hostname)
				console.log(`Story loaded from ${url}`)
				resolve(source)
			} else { // fetch story from remote server
				fetch(url)
    			.then(res => res.text())
					.then(body => resolve(body))
					.catch(err => console.error(err))
			}
			
		} catch (e) {
			console.log(e.message)
			reject("File not found.")
		}
	})
}

/**
	Load the game settings from the settings.json file.

	- returns:
		The settings as an object.
	*/
function loadSettings() {
    try {
		const data = fs.readFileSync(__dirname+'/settings.json', 'utf8')
		const settings = JSON.parse(data)
        return settings
	} catch (err) {
        console.error(err)
	}
}

/**
	Log the game activity to the log.txt file.

	- parameters:
		log: The string to be logged.
	*/
function logGameToFile(log) {
	if (settings.logGame != true) return
	const date = new Date()

	const logStream = fs.createWriteStream(__dirname+'/log.txt', {flags: 'a'});
	logStream.write(date.toLocaleString()+'\t'+log+'\n');
	logStream.end();
}

// démarrer le "parseur"
const settings = loadSettings()
fetchStory(settings.storyUrl).then((source) =>{
	console.log(`Story loaded from ${settings.storyUrl}.`)
	zork = new zorkdown(source)
}).catch((e)=> {
	console.log("Error loading Zorkdown source file.")
	console.log(e)
})

bot.login(settings.discordToken)
