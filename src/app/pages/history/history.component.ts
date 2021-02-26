import { Component, OnInit } from '@angular/core';
import { User, Message, ChannelData } from '../meeting/meeting.component';
import { TransformationService } from 'src/app/services/transformation.service';
import { GlobalConstants } from 'src/global';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  currentUser: User;
  messages: Message[] = [];
  channel: ChannelData;
  channelList: ChannelData[] = [];
  newMessage = '';

  userEmail: string = '';
  isRecordingActive = false;

  constructor(private transformationService: TransformationService) {}

  ngOnInit() {
    this.userEmail = GlobalConstants.userEmail;
    this.fetchConversations();
  }

  fetchConversations() {
    this.transformationService.getConversations(undefined).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );

    this.currentUser = {
      id: this.userEmail,
      name: this.userEmail,
    };

    let channel = {
      id: 1,
      name: 'Hackathon 2019',
      messages: [
        {
          text: 'Hi Everyone !',
          user: this.currentUser,
          timestamp: new Date(),
        },
        {
          text: 'How is it going ?',
          user: this.currentUser,
          timestamp: new Date(),
        },
        {
          text: 'having fun, yeah ?',
          user: this.currentUser,
          timestamp: new Date(),
        },
      ],
    };

    this.channelList.push(channel);

    channel = {
      id: 1,
      name: 'Hackathon 2020',
      messages: [
        {
          text: 'Hi Everyone !',
          user: this.currentUser,
          timestamp: new Date(),
        },
        {
          text: 'How is it going ?',
          user: this.currentUser,
          timestamp: new Date(),
        },
        {
          text: 'having fun, yeah ?',
          user: this.currentUser,
          timestamp: new Date(),
        },
      ],
    };
    this.channel = channel;
    this.messages = channel.messages;
    this.channelList.push(this.channel);
  }
}
