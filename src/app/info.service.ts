import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { Info } from './info';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  baseUrl = 'http://pip.chrisbodewell.com/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  information: Info[];
  info: Info;

  constructor(private http: HttpClient) { }

  //Create
  addInfo(title: string, template: string = "List"): Observable<Info[]> {
    let postData = new FormData();
    postData.append('title' , title);
    postData.append('template' , template);
    return this.http.post<Info>(`${this.baseUrl}/create.php`, postData).pipe(
      map((res) => {
        this.information.push(res);
        return this.information;
      }),
      catchError(this.handleError));
  }

  //Read
  getAll(): Observable<Info[]> {
    return this.http.get<Info[]>(`${this.baseUrl}/read.php`).pipe(
      map((res) => {
        this.information = res;     
        return this.information;
    }),
    catchError(this.handleError));
  }
  getId(id: number): Observable<Info> {
    let postData = new FormData();
    postData.append('id' , id.toString());
    return this.http.post<Info>(`${this.baseUrl}/read.php`,postData).pipe(
      map((res) => {
        this.info = res;
        return this.info;
    }),
    catchError(this.handleError));
  } 
  getTitle(title: string, template: string): Observable<Info> {
    let postData = new FormData();
    postData.append('title' , title);
    postData.append('template' , template);
    return this.http.post<Info>(`${this.baseUrl}/read.php`,postData).pipe(
      map((res) => {
        this.info = res;
        return this.info;
      }),
      catchError(this.handleError)
    );
  }

  /*Update
  *  Takes info object update title and/or content   
  */
  updateInfo(info: Info): Observable<Info>{
    return this.http.put(`${this.baseUrl}/update.php`, info).pipe(  
      map( _ => { return info; } ),
      catchError(this.handleError));
  }

  //Delete
  deleteInfo(id: number): Observable<Info[]>{
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.baseUrl}/delete.php`, { params: params })
      .pipe(map(res => {
        const filteredInfo = this.information.filter((info) => {
          return +info['id'] !== +id;
        });
        return this.information = filteredInfo;
    }),
    catchError(this.handleError));
  }

  //Helpers
  cloneInfo<Info>(info: Info){ return JSON.parse(JSON.stringify(info)); }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

}
