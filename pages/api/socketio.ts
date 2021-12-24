import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
      cors:{
        origin:"*",
        methods:["GET", "POST"],
        credentials:true
      }
    });
    // append SocketIO server to Next.js socket server response
    // I don't know if we need it
    res.socket.server.io = io;
    global.socketServer = io;
    io.on('connect', socket => {
      console.log("socket connected");
    })

    io.on('disconnect', socket => {
      console.log("socket disconnected");
    })
  }
  res.end();
};
