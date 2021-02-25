import { Component, OnInit } from '@angular/core';
import { TransformationService } from '../services/transformation.service';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username = '';
  currentUser: User;
  messages: Message[] = [];
  channel: ChannelData;
  channelList: ChannelData[] = [];
  newMessage = '';

  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        console.log('Success');
        return true;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'conversation',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    // tosUrl: '<your-tos-url>',
    // Privacy policy url.
    // privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  constructor(private transformationService: TransformationService) {}

  ngOnInit() {
    var config = {
      apiKey: 'AIzaSyCbKaQRyzs4Qm6es7NTNLewko0aCsl0LYE',
      authDomain: 'hack-vision.firebaseapp.com',
    };
    firebase.initializeApp(config);

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      // Other config options...
    });

    ui.start('#firebaseui-auth-container', this.uiConfig);

    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword('rhadbe@gmail.com', 'admin123')
    //   .then((userCredential) => {
    //     // Signed in
    //     var user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //   });

    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword('rhadbe@gmail.com', 'admin123')
    //   .then((userCredential) => {
    //     // Signed in
    //     var user = userCredential.user;
    //     console.log(user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(error);
    //   });
    // var email = window.prompt('Please provide your email');

    // firebase
    //   .auth()
    //   .fetchSignInMethodsForEmail(email)
    //   .then((signInMethods) => {
    //     // This returns the same array as fetchProvidersForEmail but for email
    //     // provider identified by 'password' string, signInMethods would contain 2
    //     // different strings:
    //     // 'emailLink' if the user previously signed in with an email/link
    //     // 'password' if the user has a password.
    //     // A user could have both.
    //     if (
    //       signInMethods.indexOf(
    //         firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
    //       ) != -1
    //     ) {
    //       // User can sign in with email/password.
    //     }
    //     if (
    //       signInMethods.indexOf(
    //         firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    //       ) != -1
    //     ) {
    //       // User can sign in with email/link.
    //     }
    //   })
    //   .catch((error) => {
    //     // Some error occurred, you can inspect the code: error.code
    //   });

    // var provider = new firebase.auth.GoogleAuthProvider();
    // firebase
    //   .auth()
    //   .signInWithPopup(provider)
    //   .then((result) => {
    //     /** @type {firebase.auth.OAuthCredential} */
    //     // var credential = result.credential;

    //     console.log('hi');
    //     console.log(result);

    //     // // This gives you a Google Access Token. You can use it to access the Google API.
    //     // var token = credential.accessToken;
    //     // // The signed-in user info.
    //     // var user = result.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     console.log('bye');
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     console.log(error);
    //     // ...
    //   });
  }

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
