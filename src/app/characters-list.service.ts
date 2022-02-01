import { environment } from './../environments/environment';
import { Character } from './models/character';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersListService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Character[]> {
    return this.http.get<Character[]>(`${environment.URL}/characters`);
  }

  delete(id: number): Observable<Character> {
    return this.http.delete<Character>(`${environment.URL}/characters/${id}`);
  }

  create(character: Character): Observable<Character> {
    return this.http.post<Character>(
      `${environment.URL}/characters`,
      character
    );
  }

  put(character: Character): Observable<Character> {
    return this.http.put<Character>(
      `${environment.URL}/characters/${character.id}`,
      character
    );
  }
}
