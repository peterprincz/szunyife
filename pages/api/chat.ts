import { NextApiRequest } from "next";
import { SocketChannels, SocketEvent } from "../../types/dataTypes";
import { NextApiResponseServerIO } from "../../types/next";
import { Server as SocketIOServer } from "socket.io";


export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "POST") {
    //const io: SocketIOServer = res?.socket?.server?.io;
    const io: SocketIOServer = global.socketServer
    if(io){
      console.log("sending hearthbeat")
      hearthBeat(io);
    }
  }
  res.send("ok")
  res.end();
}

const broadCastMessage = (server: SocketIOServer, event: SocketEvent, channels: SocketChannels[]) => {
  channels.forEach(channel => server.emit(channel, event));
}


const hearthBeat = (server: SocketIOServer) => {
  broadCastMessage(server, SocketEvent.HEARTHBEAT, [SocketChannels.CLIENTS, SocketChannels.MACHINES]);
}