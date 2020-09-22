import { Injectable } from "@angular/core";
import { Product } from "../product/product";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
@Injectable()
export class CartService {
  constructor(private http: HttpClient) {}
  path = "http://localhost:3000/cart";
  

  getCart(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addCart(product: Product): Observable<Product> {
    
    const htttpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Autorization: "Token",
      }),
    };
    
    let newPath = this.path + "/" + product.id;

    if (product.amount == 0) {
      product.amount =product.amount+ 1;
      return this.http
        .post<Product>(this.path, product, htttpOptions)
        .pipe(tap(), catchError(this.handleError));
    } else {
      
      product.amount += 1;
      console.log(product);
      return this.http
        .patch<Product>(newPath, product, htttpOptions)
        .pipe(tap(), catchError(this.handleError));
    }
  }

  deleteElement(product): Observable<void> {
    let newPath = this.path + "/" + product.id;
    product.amount =product.amount-1;
    return this.http.delete<void>(newPath).pipe(catchError(this.handleError));
  }

  patchElement(product:Product):Observable<Product>{
    const htttpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Autorization: "Token",
      }),
    };

    let newPath = this.path + "/" + product.id;
    product.amount -= 1;
    console.log(product)
    return this.http
      .patch<Product>(newPath, product, htttpOptions)
      .pipe(tap(), catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = "bir hata olustu" + err.error.message;
    } else {
      errorMessage = "sistemsel bir hata";
    }
    return throwError(errorMessage);
  }
}
