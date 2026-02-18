import colors from "colors";
import { Server, Socket } from "socket.io";
import { logger } from "../shared/logger";

const socket = (io: Server)=>{
    io.on('connection', socket=>{
        logger.info(colors.blue('A User connected'));

        socket.on("track", (data:any)=>{
            const {id, location} = data;
            socket.emit(`track::${id}`, location);
        })


    const userId = socket.handshake.query.userId as string;
    if (userId) {
      socket.join(userId); 
      console.log(`User ${userId} joined room`);
    }

        // disconnect
        socket.on("disconnect", ()=>{
            logger.info(colors.red('A user disconnect'));
        })
    })
}

export const socketHelper = { socket }