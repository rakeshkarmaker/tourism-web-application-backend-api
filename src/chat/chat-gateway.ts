import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from "dgram";
import { Server } from "http";


@WebSocketGateway(3001,{})
export class ChatGateway  implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect{

    afterInit(server: Server) {
        console.log('WebSocket server initialized',server);
    }
    
    @WebSocketServer() server:Server;
    handleConnection(client: any,) {
        console.log('Client connected',client.id);
        client.broadcast.emit('newMessage',`User connected: ${client.id}`);
    }

    handleDisconnect(client: any) {
        console.log('Client disconnected',client.id);
        client.broadcast.emit('newMessage',`User Disconnected: ${client.id}`);
        
    }

    @SubscribeMessage('newMessage') //used socket.on() to listen to events using subscribeMessage
    handleMessage(client:Socket,@MessageBody() msg: any) {

        client.emit('newMessage',msg);
        return 'Hello world!'+msg;
    }


}

//socket.emit()


//io,.emit() //Used to tbroadcast to all clients