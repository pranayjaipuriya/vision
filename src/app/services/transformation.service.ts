import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransformationService {
  constructor(private http: HttpClient) {}

  text2speech(text: string) {
    return this.http.post(
      'https://asia-south1-deft-bliss-305906.cloudfunctions.net/function-3',
      {
        message: text,
      },
      { responseType: 'blob' }
    );
  }
}
