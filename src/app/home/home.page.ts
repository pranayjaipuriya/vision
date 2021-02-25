import { Component } from '@angular/core';
import { TransformationService } from '../services/transformation.service';

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

  constructor(private transformationService: TransformationService) {}

  async joinChat() {
    const { username } = this;

    this.currentUser = {
      id: username,
      name: username,
    };

    let channel = {
      id: 1,
      name: 'Hackathon 2021',
      messages: [],
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
      timestamp: new Date(),
    };
    this.messages.push(message);
    this.newMessage = null;
  }

  say() {
    this.transformationService
      .text2speech(this.newMessage)
      .subscribe((result) => {
        let audio = new Audio();
        audio.src = URL.createObjectURL(result);
        audio.load();
        audio.play();
      });
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
