import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductAddForms1Component } from './product/product-add-forms1/product-add-forms1.component';
import { CardAddComponent } from './card/card-add/card-add.component';
import { ProductAddForms2Component } from './product/product-add-forms2/product-add-forms2.component';
import { DetailsComponent } from './product/details/details.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:'products',component : ProductComponent},
  {path:'product-add-1',component : ProductAddForms1Component,canActivate:[LoginGuard]},
  {path:'product-add-2',component : ProductAddForms2Component},
  {path:'app-details',component : DetailsComponent},
  {path:'',redirectTo : 'products',pathMatch:'full'},
  {path:'products/category/:categoryId',component:ProductComponent},
  {path:'add-sepet',component : CardAddComponent},
  {path:'login',component : LoginComponent},
  {path:'register',component : RegisterComponent},
  {path:'app-details/:id',component:DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
