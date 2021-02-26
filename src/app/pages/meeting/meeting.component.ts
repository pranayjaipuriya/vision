import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/global';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import { ToastController } from '@ionic/angular';
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

  //Lets declare Record OBJ
  record: RecordRTC.StereoAudioRecorder;
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url: string;

  userEmail: string = '';
  isRecordingActive = false;

  constructor(
    private transformationService: TransformationService,
    private domSanitizer: DomSanitizer,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.userEmail = GlobalConstants.userEmail;
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  async joinChat() {
    const { meetingName } = this;

    this.currentUser = {
      id: this.userEmail,
      name: this.userEmail,
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

  initiateRecording() {
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream) {
    var options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1,
      sampleRate: 48000,
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    console.log('blob', blob);
    console.log('url', this.url);
    this.transformationService.speech2text(blob).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  errorCallback(error) {
    console.log(error);
  }

  saveConversation() {
    // save the text

    const date = new Date();
    const dformat =
      [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('-') +
      '_' +
      [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

    this.transformationService
      .saveConversation(
        this.userEmail + '_' + this.meetingName + '_' + dformat,
        new Blob(
          this.messages.map((m) => m.text),
          {
            type: 'text/plain',
          }
        )
      )
      .subscribe(
        (result) => {
          console.log(result);
          this.presentToast('Conversation saved successfully');
        },
        (error) => {
          console.log(error);
          this.presentToast('Error occurred while saving conversation');
        }
      );
  }

  say() {
    // say the text
    this.transformationService
      .text2speech(this.newMessage)
      .subscribe((result) => {
        let audio = new Audio();
        audio.src = URL.createObjectURL(result);
        audio.load();
        audio.play();
      });
  }

  startRecording() {
    this.isRecordingActive = true;
    this.initiateRecording();
  }

  pauseRecording() {
    this.isRecordingActive = false;
    this.stopRecording();
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
    });
    toast.present();
  }
}

export interface ChannelData {
  id: number;
  name: string;
  messages: Message[];
}

export interface Message {
  text: string;
  user: User;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
}
