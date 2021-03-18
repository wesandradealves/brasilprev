import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { api } from '../../environments/api';

export interface CardModel {
  data?: {
    id?: number,
    images?: {
      large?: string,
      small?: string
    }
  },
  totalCount?: number,
  pageSize?: number
}

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  constructor(private http: HttpClient) { }

  getCards(page): Observable<CardModel>{
    return this.http.get(`${api.url}/cards/?orderBy=name&page=${page}`);
  }

  getCardsByQuery(s): Observable<CardModel>{
    return this.http.get(`${api.url}/cards/?orderBy=name&q=name:${s}*`);
  } 
  
  getCardsById(id): Observable<CardModel>{
    return this.http.get(`${api.url}/cards/${id}`);
  }   
}
