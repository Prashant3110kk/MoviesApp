import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { retry } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  public API_URL = 'https://backend-ygzsyibiue.now.sh/api/v1/movies/';
  public headers = new HttpHeaders();
  public httpOptions = { headers: this.headers };
  public http: HttpClient;
  public error: Error;
  public status: number;

  constructor(http: HttpClient) {
    this.http = <HttpClient>http;
    this.httpOptions.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   }

  getMovies(): Observable<{} | HttpResponse<any>> {
    return this.http.get(this.API_URL, { headers: this.getHeaders().headers, observe: 'body' })
      .pipe(retry(1), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  getMovieDetails(movieId: string): Observable<{} | HttpResponse<any>> {
    return this.http.get(this.API_URL + movieId, { headers: this.getHeaders().headers, observe: 'body' })
      .pipe(retry(1), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  getHeaders() { // getting common headers for the REST call
    this.addHeader('Content-Type', 'application/json');
    return this.httpOptions;
  }
  addHeader(key: string, value: string) { // Add a particular Header for the REST call
    this.httpOptions.headers = this.httpOptions.headers.set(key, value);
    // this.httpOptions.headers = this.httpOptions.headers.delete('Content-Type');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 500 || error.status === 503) {
      return throwError(error);
    } else {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
        return throwError(error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        // console.error(`Backend returned code ${error.status}`);
        return throwError(error);
      }
    }
  };
}
