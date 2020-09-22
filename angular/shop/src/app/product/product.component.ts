import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from './product';
import { AlertifyService } from '../services/alertify.service'
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { CartService } from '../services/cart.service';
import { DetailsComponent } from './details/details.component';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService, CartService]

})
export class ProductComponent implements OnInit {

  constructor(private alertifyService: AlertifyService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private route:Router
    
  ) { }
 
 


  title = "Ürün Listesi"
  filterText = ""
  products: Product[];
  sepet: Product[];
  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
      this.productService.getProducts(params["categoryId"]).subscribe(data => { this.products = data })
    })
   
  }

  getNavigation(link,id){
    if(id===''){
      this.route.navigate([link])
    }
    else{
      this.route.navigate([link+'/'+id])
    }

  }
  
  
  addToCard(product) {
    
    this.alertifyService.success(product.name + " Added");
    this.cartService.addCart(product).subscribe()
  }


 
 

}
