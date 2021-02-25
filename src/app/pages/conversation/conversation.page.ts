import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  constructor() {}

  ngOnInit() {
    var config = {
      apiKey: 'AIzaSyCbKaQRyzs4Qm6es7NTNLewko0aCsl0LYE',
      authDomain: 'hack-vision.firebaseapp.com',
    };
    firebase.initializeApp(config);
    firebase
      .auth()
      .signInWithEmailAndPassword('', '')
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
      });
  }
}
