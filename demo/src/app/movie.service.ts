import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TitleStrategy } from '@angular/router';

interface  Movie{
  id : any;
  title : string;
  director : string;
  year : number   
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url =  'https://effective-disco-v6rp59qprpjwhwp44-3000.app.github.dev/movies'; 
  constructor(private http:HttpClient){}
  getMovies( ) : Observable<Movie[]>{
    return this.http.get<Movie[]>(this.url);
  }
  getMovie(id:any): Observable<Movie>{
    return this.http.get<Movie>(`${this.url}/${id}`);
  }
  createMovie(movie : Movie) :Observable<Movie>{
    return this.http.post<Movie>(this.url,movie);
  }
  updateMovie(movie : Movie) : Observable<Movie>{
    return this.http.put<Movie>(`${this.url}/${movie.id}`,movie);
  }
  deleteMovie(id:any):Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
