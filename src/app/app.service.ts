import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  private apiBase = `${document.location.protocol}//${window.location.hostname}:3000`;

  /*
    apiKey: String,
    limit: Number,
    offset: Number,
    query: String,
    license: String
   */

  addSongs(body) {
    return this.http.post<any>(`${this.apiBase}/songs`, body);
  }

  getSongs(genre) {
    return this.http.get<any>(`${this.apiBase}/songs/${genre}`);
  }

  getQueries() {
    return this.http.get<any>(`${this.apiBase}/queries`);
  }

  updateSong(song, genre) {
    return this.http.put<any>(`${this.apiBase}/song/${genre}`, song);
  }

  generateToken(body) {
    return this.http.put<any>(`${this.apiBase}/token`, body);
  }

  getUsers() {
    return this.http.get<any>(`${this.apiBase}/users`);
  }

}
