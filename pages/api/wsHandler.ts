const playList = require('./playList.js')

var clientsSockets = []
var machineSockets = []

const eventTypes = [
  "CONNECTION",
  "SONG_REQUEST",
  "SONG_ACCEPTED",
  "CHANGE_VOLUME",
  "HEARTHBEAT",
  "SUCCESSFULL_OPERATION",
  "ERROR",
  "SPEECH"
]

class Event {

  constructor(type, data) {
    if (!eventTypes.includes(type)) {
      throw new Error("Unkown event type:" + type);
    }
    this.type = type;
    this.data = data;
  }
}

const broadCastMessage = (event, client = false, machine = false) => {
  if (!client && !machine) {
    throw new Error('Either client or machine must be true for sending socket')
  }
  console.log(`Sending message:
  ${JSON.stringify(event)} 
  to ${client && machine ? 'clients(' + clientsSockets.length + ') and machines(' + machineSockets.length + ')' :
      (client ? 'clients(' + clientsSockets.length + ')' : 'machines(' + machineSockets.length + ')')}`)
  if (client) {
    clientsSockets.forEach(socket => socket.emit("message", event));
  }
  if (machine) {
    machineSockets.forEach(socket => socket.emit("message", event));
  }
}

const directMessage = (targetSocket, event) => {
  console.log(`Sending direct message:${JSON.stringify(event)}`);
  targetSocket.emit("message", event)
}


const onConnect = (socket, type) => {
  console.log(`type: ${type} socket connected`)
  if(type === 'machine'){
    machineSockets.push(socket);  
  } else {
    clientsSockets.push(socket);
  }
}

const onDisconnect = (socket, type) => {
  if(type === 'machine'){
    machineSockets = machineSockets.filter(x => x.id !== socket.id)
  } else {
    clientSockets = clientsSockets.filter(x => x.id !== socket.id)
  }
}

const hearthBeat = () => {
  broadCastMessage(new Event("HEARTHBEAT", {
    clients: clientsSockets.length,
    machines: machineSockets.length
  }), true, true)
}

const onMessage = async (socket, event) => {
  try {
    console.log(`received event: ${JSON.stringify(event)}`)
    switch (event.type) {
      case 'SONG_REQUEST':
        const youtubeUrl = event.data.youtubeUrl
        if (!youtubeUrl) {
          const errorMessage = "YoutubeUrl parameter is missing"
          console.warn(errorMessage)
          directMessage(socket, new Event('ERROR', { message: errorMessage }))
          return;
        }
        try {
          await playList.addSong(youtubeUrl)
          broadCastMessage(new Event('SONG_ACCEPTED', event.data), false, true)
          directMessage(socket, new Event('SONG_ACCEPTED', { message: "Song accepted" }))
        } catch (err) {
          const errorMessage = err.message;
          console.error(errorMessage);
          directMessage(socket, new Event('ERROR', { message: errorMessage }))  
        }
        break;
      case 'CHANGE_VOLUME':
        const amount = event.data.amount
        if (!amount) {
          console.warn("amount parameter is missing")
        }
        broadCastMessage(new Event('CHANGE_VOLUME', event.data), false, true);
        directMessage(socket, new Event('SUCCESSFULL_OPERATION', event.data))
        break;
      case 'SPEECH':
          const text = event.data.text
          if (!text) {
            console.warn("text parameter is missing")
          }
          broadCastMessage(new Event('SPEECH', text), false, true);
          directMessage(socket, new Event('SUCCESSFULL_OPERATION', text))
          break;
      default:
        const errorMessage = "Unkown event type:" + event.type;
        directMessage(socket, new Event('ERROR', { message: errorMessage }))  
      }
  } catch (err) {
    console.error(err);
  }
}

const config = {
  api: {
    bodyParser: false
  }
}

module.exports = { Event, onConnect, onMessage, onDisconnect, config, hearthBeat}
