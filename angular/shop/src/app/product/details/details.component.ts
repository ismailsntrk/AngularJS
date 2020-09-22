import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';

import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [ProductService,AlertifyService,CartService]

})
export class DetailsComponent implements OnInit {
  productId:any
  productData:Product[]

  
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService:ProductService,
    private alertifyService:AlertifyService,
    private cartService:CartService,
    private router:Router) { }
  
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id']
    this.loadProductDetails(this.productId)
  }

  loadProductDetails(productId){
    this.productService.getProductsDetails(productId).subscribe(data => {this.productData = data;});
    
  }
  addToCard(product) {
    
    this.alertifyService.success(product.name + " Added");
    this.cartService.addCart(product).subscribe()
  }



}


 


