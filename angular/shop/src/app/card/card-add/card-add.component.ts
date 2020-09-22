import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/product/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Customer } from 'src/app/customer/customer';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.css'],
  providers:[ProductService,CartService,CustomerService]
})
export class CardAddComponent implements OnInit {

  constructor(private productService: ProductService, private alertifyService:AlertifyService,
    private activatedRoute:ActivatedRoute,private cartElements:CartService,private customerService:CustomerService) { }

  sepet : Product[];
  model : Customer = new Customer();
  selam : String = new String;
  ngOnInit(): void {
  this.activatedRoute.params.subscribe(params=>{
    this.cartElements.getCart().subscribe(data=>{this.sepet= data})
})
  }

  disCount(discount){
    console.log(discount.selam)

  }
  
  fiyat(){
    let toplam_fiyat = 0 ;

    for (let product of this.sepet){
    toplam_fiyat = (Number(product.price)*product.amount) + toplam_fiyat
    
    }
    return toplam_fiyat
  }
  sil(product){
  
    if(product.amount==1){
      this.cartElements.deleteElement(product).subscribe(
        () =>     this.cartElements.getCart().subscribe(data=>{this.sepet= data})
      )
    }
    else{
      this.cartElements.patchElement(product).subscribe()

    }
    
    
    
  }
  ekle(form:NgForm){
    
    this.customerService.addCustomer(this.model).subscribe(data=>{this.alertifyService.success("Basariyla Eklendi")})
    
  }

}
