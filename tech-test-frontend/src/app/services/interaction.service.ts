import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interaction } from '../interface/interaction';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  private apiUrl =
    'https://q9vz1ywkg8.execute-api.us-east-1.amazonaws.com/tech-test-sanagude/interactions';

  constructor(private http: HttpClient) {}

  getInteractions(): Observable<Interaction[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const body = {};

    return this.http.post<Interaction[]>(this.apiUrl, body);
  }
}
