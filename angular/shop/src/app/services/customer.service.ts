import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {tap,catchError} from 'rxjs/operators'
import { Customer } from '../customer/customer';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }
  path = "http://localhost:3000/customers/"

  addCustomer(customer:Customer):Observable<Customer>{
    const htttpOptions ={
      headers:new HttpHeaders({
        'Content-Type' :'application/json',
        'Autorization':'Token'
      })
    }
    console.log(customer)
    return this.http.post<Customer>(this.path,customer,htttpOptions).pipe(
      tap(data=>console.log(JSON.stringify(data))),catchError(this.handleError)
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
