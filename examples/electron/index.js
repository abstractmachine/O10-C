/**
	index.js
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

	An html/javascript example of the Zorkdown textual game engine implemented in a simple web page.
*/

const {app} = require('electron')
const {BrowserWindow, Menu, MenuItem} = require('electron')
const fs = require('fs')
const fetch = require('node-fetch')
const ipcMain = require('electron').ipcMain
const showdown = require('showdown')
const zorkdown = require('../../src/zorkdown.js')

let zorkdown_instance = null
let win = null
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 900,
    height: 600,
    'minHeight': 500,
    'minWidth': 500,
    icon: __dirname +  '/Icon/Icon.icns',
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('./index.html')
  const settings = loadSettings()

  fetchStory(settings.storyUrl).then((source) =>{
    zorkdown_instance = new zorkdown(source)
    //console.log(zorkdown_instance)
    startGame()
  }).catch((e)=> {
    console.log("Zorkdown error")
    console.log(e)
  })
  
  win.webContents.once('dom-ready', () => {
    
  })

  ipcMain.on('user-message', function(event, arg) {
    let message = {}
    message.content = arg.toLowerCase().trim()
    let place = zorkdown_instance.getPlaceByName(zorkdown_instance.story.currentPlace)

    var converter = new showdown.Converter()
    converter.setOption('simpleLineBreaks', true)

    var html = converter.makeHtml(zorkdown_instance.parseMessage(message.content, place))
    var reply = {"content":html}
    
    win.webContents.send('main-message', JSON.stringify(reply))

    if (zorkdown_instance.story.placeChanged) {
      place = zorkdown_instance.getPlaceByName(zorkdown_instance.story.currentPlace)
      zorkdown_instance.story.placeChanged = false
      message.content = "look"
      html = converter.makeHtml(zorkdown_instance.parseMessage(message.content, place))
      reply = {"content":html}
      win.webContents.send('main-message', JSON.stringify(reply))
    }
  })
}

function startGame(){
  const place = zorkdown_instance.getPlaceByName(zorkdown_instance.story.currentPlace)
  let message = {}
  message.content = "look"

  var converter = new showdown.Converter();
  converter.setOption('simpleLineBreaks', true)
  
  var html = converter.makeHtml(zorkdown_instance.parseMessage(message.content, place))
  var reply = {"content":html}
  win.webContents.send('reset')
  win.webContents.send('main-message', JSON.stringify(reply))
}

function showOpen() { 

  const {dialog} = require('electron')
  var showOpenDialogOptions = {
    properties: [ 'openFile' ],
    filters: [ { extensions: [ 'txt' , 'md', 'zd'] } ]
  }

  dialog.showOpenDialog(showOpenDialogOptions)
    .then((data) => {
      console.log(data.filePaths)
      if(data.filePaths === undefined) { 
        console.log("No file selected")
      } else {     
        readFile(data.filePaths[0])
      } 
  })
}

function readFile(filepath) { 
  const fs = require('fs')
  fs.readFile(filepath, 'utf-8', (err, data) => { 
     if(err){ 
        alert("An error ocurred reading the file :" + err.message) 
        return 
     } 
     console.log(data)
     // handle the file content 
     zorkdown_instance = new zorkdown(data)
     //win.reload()
    startGame()
     
  }) 
} 

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      {label: 'Open',
        click: function() { showOpen() },
        accelerator: 'CmdOrCtrl+O'
      },
    
      isMac ? { role: 'close' } : { role: 'quit' }
      
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
app.whenReady().then(createWindow)

  
  /**
    Some utilities
    ==============
  */
  
  /**
    Load the story source code from a local file.	
  
    - parameters:
      path: The file relative path.
  
    - returns:
      The story source as an utf-8 string.
    */
  function loadStoryFromFile(path) {
      try {
          const data = fs.readFileSync(__dirname+"/"+path, 'utf8')
          return data
    } catch (err) {
        console.log(__dirname+"/"+path)
        console.error(err)
    }
  }
  /**
    Load the story source from an url and parse it.
  
    - parammeters: 
      url: The url of the story source with an http: or file: protocol.
    
    */
   function fetchStory(url) {
    return new Promise(function(resolve, reject) {
      console.log(`Loading story from ${url}`)
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
  
    const logStream = fs.createWriteStream('./log.txt', {flags: 'a'});
    logStream.write(date.toLocaleString()+'\t'+log+'\n');
    logStream.end();
  }
