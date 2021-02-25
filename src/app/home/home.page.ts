import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username = '';
  currentUser: User;
  messages: Message[] = [];
  channel: ChannelData;
  channelList: ChannelData[] = [];
  newMessage = '';

  async joinChat() {
    const { username } = this;

      this.currentUser = {
          id: username,
          name: username,
        };
      
      let channel = {
        id: 1,
        name: 'Hackathon 2021',
        messages: []
      };
      this.channel = channel;
      this.messages = channel.messages;
      this.channelList.push(this.channel);
}

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    let message = {
      text: this.newMessage,
      user: this.currentUser,
      timestamp: new Date()
    }
    this.messages.push(message);
    this.newMessage = null;
  }

}


interface ChannelData {
  id: number;
  name: string;
  messages: Message[];
}

interface Message {
  text: string;
  user: User;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
}