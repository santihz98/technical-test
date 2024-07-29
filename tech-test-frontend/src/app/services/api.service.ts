import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl =
    'https://q9vz1ywkg8.execute-api.us-east-1.amazonaws.com/tech-test-sanagude/questions';
  private refreshSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$(): Observable<void> {
    return this.refreshSubject.asObservable();
  }

  askQuestion(question: string, context: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const body = { question, context };
    return new Observable((observer) => {
      this.http.post(this.apiUrl, body).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
          this.refreshSubject.next();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
