import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { GlobalConstants } from 'src/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userObject: any;

  // firebase ui login configuration
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
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
    signInSuccessUrl: 'home',
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

  constructor(private router: Router) {}

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

    // firebase.auth().onAuthStateChanged((user) => {
    //   GlobalConstants.user = user;
    //   this.router.navigate(['home']);
    // });

    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword('rhadbe@gmail.com', 'admin123')
    //   .then((userCredential) => {
    //     // Signed in
    //     var user = userCredential.user;
    //     console.log(user);
    //     this.userObject = user;
    //     GlobalConstants.user = this.userObject;
    //     // ...
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
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

  // successLoginCallback(event) {
  //   console.log('Hello there');
  // }
}
