import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransformationService {
  constructor(private http: HttpClient) {}

  text2speech(text: string) {
    return this.http.post(
      'https://asia-south1-hack-vision.cloudfunctions.net/text-to-speech',
      {
        message: text,
      },
      { responseType: 'blob' }
    );
  }

  speech2text(speech: Blob) {
    let blob: any = speech;
    blob.lastModifiedDate = new Date();
    blob.name = 'output.wav';
    let file = <File>blob;

    let formData: FormData = new FormData();
    formData.append('uploadWav', file, file.name);
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    let options = { headers: headers };
    return this.http.post(
      'https://asia-south1-hack-vision.cloudfunctions.net/speech-to-text',
      formData,
      options
    );
  }

  saveConversation(objectName: string, conversation: Blob) {
    let blob: any = conversation;
    blob.lastModifiedDate = new Date();
    blob.name = 'conversation.txt';
    let file = <File>blob;

    let formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    formData.append('name', objectName);
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    let options = { headers: headers };
    return this.http.post(
      'https://asia-south1-hack-vision.cloudfunctions.net/save-conversation',
      formData,
      options
    );
  }

  getConversations(name: string) {
    if (name) {
      return this.http.post(
        'https://asia-south1-hack-vision.cloudfunctions.net/export-conversations',
        {
          name: name,
        }
      );
    } else {
      return this.http.post(
        'https://asia-south1-hack-vision.cloudfunctions.net/export-conversations',
        {}
      );
    }
  }
}
