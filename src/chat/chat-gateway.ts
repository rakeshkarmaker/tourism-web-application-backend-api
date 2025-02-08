import { UseGuards } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { AuthGuard } from '../guards/auth.guard';
  import { Server, Socket } from 'socket.io';
  
  interface PrivateMessage {
    sender: string;
    recipient: string;
    content: string;
  }
  
  @WebSocketGateway(3001, { cors: true })
  @UseGuards(AuthGuard)
    export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    // Store a map of user IDs to their sockets
    private userSockets: Map<string, Socket> = new Map();
  
    handleConnection(client: Socket) {
      const user = client.data.user; // Set by WsAuthGuard
      console.log(`User connected: ${user.username}`);
      this.userSockets.set(user.username, client); // Map username to the socket
      this.server.emit('userConnected', user.username); // Notify about the new user
    }
  
    handleDisconnect(client: Socket) {
      const user = client.data.user;
      console.log(`User disconnected: ${user.username}`);
      this.userSockets.delete(user.username); // Remove the user's socket
      this.server.emit('userDisconnected', user.username); // Notify about the disconnection
    }
  
    @SubscribeMessage('privateMessage')
    handlePrivateMessage(
      @MessageBody() message: PrivateMessage,
      @ConnectedSocket() client: Socket,
    ) {
      const sender = client.data.user.username; // Sender's username
      const recipientSocket = this.userSockets.get(message.recipient); // Get recipient's socket
  
      if (!recipientSocket) {
        client.emit('error', `User ${message.recipient} is not online.`);
        return;
      }
  
      // Send the message to the recipient
      recipientSocket.emit('privateMessage', {
        sender,
        content: message.content,
      });
  
      // Optionally, confirm delivery to the sender
      client.emit('messageSent', { recipient: message.recipient, content: message.content });
    }
  }
  