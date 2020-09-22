import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from '../services/category.service';
import { AlertifyService } from '../services/alertify.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {

  constructor(
    private categoryService:CategoryService,
    private accountService:AccountService
  ) {}
  title = "Kategori Listesi"
  categories: Category[];
  
  ngOnInit()  {
    this.categoryService.getCategories().subscribe(data=>{this.categories = data})
  }
  isLoggedin(){
    // console.log(this.accountService.currentUserValue)
   return this.accountService.currentUserValue
  }
  logOut(){
    this.accountService.logout()
  }

}
