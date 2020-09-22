import { Injectable } from '@angular/core';
import { Product } from '../product/product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {tap,catchError} from 'rxjs/operators'
@Injectable()
export class ProductService {
  
  constructor( private http: HttpClient) { }
  path = "http://localhost:3000/products"

  getProducts(categoryId):Observable<Product[]>{
 
    let newPath=this.path
    if(categoryId){
      newPath += "?categoryid="+categoryId
    }

    return this.http.get<Product[]>(newPath).pipe(
      tap(data=>console.log(JSON.stringify(data))),catchError(this.handleError)
    );
    
  }

  getProductsDetails(productId):Observable<Product[]>{
 
    let newPath=this.path
    if(productId){
      newPath += "?id="+productId
      //  newPath=this.path + "/" + productId
    }

    return this.http.get<Product[]>(newPath).pipe(
      tap(data=>console.log(JSON.stringify(data))),catchError(this.handleError)
    );
    
  }

  addProduct(product:Product):Observable<Product>{
    const htttpOptions ={
      headers:new HttpHeaders({
        'Content-Type' :'application/json',
        'Autorization':'Token'
      })
    }
    return this.http.post<Product>(this.path,product,htttpOptions).pipe(
      tap(data=>console.log(JSON.stringify(data))),catchError(this.handleError)
    );
    
  }
  
    deleteProduct(product):Observable<void>{
      let newPath=this.path + "/" + product.id
      return this.http.delete<void>(newPath).pipe(
        catchError(this.handleError)
      ); }
  





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
