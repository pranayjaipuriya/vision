import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/global';
import { TransformationService } from '../../services/transformation.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements OnInit {
  meetingName = '';
  currentUser: User;
  messages: Message[] = [];
  channel: ChannelData;
  channelList: ChannelData[] = [];
  newMessage = '';

  userEmail: string = '';

  constructor(private transformationService: TransformationService) {}

  ngOnInit() {
    this.userEmail = GlobalConstants.userEmail;
  }

  async joinChat() {
    const { meetingName } = this;

    this.currentUser = {
      id: meetingName,
      name: meetingName,
    };

    let channel = {
      id: 1,
      name: meetingName,
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
