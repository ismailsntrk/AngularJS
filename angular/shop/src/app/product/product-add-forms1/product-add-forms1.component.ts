import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/category/category';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-add-forms1',
  templateUrl: './product-add-forms1.component.html',
  styleUrls: ['./product-add-forms1.component.css'],
  providers:[CategoryService,ProductService]
})
export class ProductAddForms1Component implements OnInit {

  constructor(private categoryService: CategoryService,private productService:ProductService,private activatedRoute: ActivatedRoute,
    private alertifyService:AlertifyService) { }
  model : Product = new Product();
  urunler:Product[];


  categories: Category[];
  
  ngOnInit()  {
    this.categoryService.getCategories().subscribe(data=>{this.categories = data})
    this.activatedRoute.params.subscribe(params => {
      this.productService.getProducts(params["categoryId"]).subscribe(data => { this.urunler = data })
    })
  }

  add(form:NgForm){
    
    this.productService.addProduct(this.model).subscribe(data=>{this.alertifyService.success(data.name + "Basariyla Eklendi")})

  }

  deleteProduct(product){
   this.productService.deleteProduct(product).subscribe(() =>    this.activatedRoute.params.subscribe(params => {
    this.productService.getProducts(params["categoryId"]).subscribe(data => { this.urunler = data })
  }))
   
   
  }

}
