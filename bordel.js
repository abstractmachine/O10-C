const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('message', message => {
  // no bots allowed
  if (message.author.bot) return // ignorer les autres bots
  // nettoyer le message
  message.content = message.cleanContent
  message.content = message.content.toLowerCase().trim()
  // est-ce un DM?
  if (message.channel.type == "dm") {
    
    if (message.content.startsWith('!')) {
      message.content = message.content.substring(1)
    }
    messageDM(message)
    
  } else if (message.channel.type === "text" && message.content.startsWith('!')) {

    message.content = message.content.substring(1).trim()
    messageText(message)
    
  } else if (message.channel.type === "text" && message.content.startsWith('|')) {

    message.content = message.content.substring(1).trim()
    messageEvaluate(message)
  }
})

function messageText(message) {
    //console.log(message.channel.name);
    //console.log(message.guil)
    // bot.channels.find("name","parc a chien").send("Welcome!")

  if (message.channel.name == "🙀parc-à-chiens") {
    messageChiens(message)
  }

  if (message.content.includes("hello")) {
    message.reply("Hello")
    return
  }

}

function messageChiens(message) {
  
  // on démarre un regex sur le contenu du message entrant
  
  // Juste en dessous, c'est du Regex lol ↓
  let regex = /woaf/g
  let result = message.content.replace(regex, "wouf") // replacer tous les woaf par des wouf

  message.reply(result) // repondre au message
}

function messageDM(message) {
  // Cette fonction était vide
  message.reply("Well well, sending me some direct messages ? ;)")
}

function messageEvaluate(message) {
    try {
        eval(message.content)
    } catch (err) {
        
    }
}

bot.login('NjkwMTI5NjkxMzkwMzc3OTk4.XnM8iw.llKbd6iUsWrCaS2ylZgY4tZxCb4')
