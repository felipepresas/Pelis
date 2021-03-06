import { Movie, Moviedeteil, CarteleraResponse, creditResponse, Cast } from './../interfaces/cartelera-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { off } from 'process';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: '040c1373e2bba06bc85f231050b140f0',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }

  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {

    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }


  buscarPeliculas(texto: string): Observable<Movie[]> {

    const params = { ...this.params, page: '1', query: texto, include_adult: 'true' };
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map(resp => resp.results)
    );
  }
  getpeliculasdetalles(id: Number) {
    return this.http.get<Moviedeteil>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError(err => of(null))
    );
  }

  getCredit(id: string): Observable<Cast[]> {

    return this.http.get<creditResponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map(resp => resp.cast),
      catchError(err => of([]))
    );
  }
}
