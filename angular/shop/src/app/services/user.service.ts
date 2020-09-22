import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../login/User2';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    path = "http://localhost:3000/users"
    getAll() {
      const htttpOptions ={
        headers:new HttpHeaders({
          'Content-Type' :'application/json',
          'Autorization':'Token'
        })}

        return this.http.get<User>(this.path,htttpOptions).pipe(
          tap(data=>console.log(JSON.stringify(data))),catchError(this.handleError)
        );
    }

    register(user: User) {
      const htttpOptions ={
        headers:new HttpHeaders({
          'Content-Type' :'application/json',
          'Autorization':'Token'
        })
      }
        
        return this.http.post<User>(this.path,user,htttpOptions).pipe(
          tap(data=>console.log(JSON.stringify(data))),catchError(this.handleError)
        );
    }

    delete(id: number) {
      let newPath=this.path + "/" + id
      return this.http.delete<void>(newPath).pipe(
        catchError(this.handleError)
      ); 
    }

    handleError(err : HttpErrorResponse)  {
      let errorMessage= ''
      if(err.error instanceof ErrorEvent){
        errorMessage = 'bir hata olustu' + err.error.message
      }
      else{
        errorMessage='sistemsel bir hata'
      }
      return throwError(errorMessage) 
  
    }
}