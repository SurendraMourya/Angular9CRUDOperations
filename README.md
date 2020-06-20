Build an Angular 9/8 CRUD Example

Prerequisites
As always, we'll need to have a few prerequisites for this tutorial:

The basic concepts of TypeScript.
A local development machine with Node 10+, together with NPM installed.
Angular CLI 9 installed on your machine, An Angular project. In our case, it's named Angular9CRUDOperations.

If your project is ready, let's get started with our first step. Also in case you are download the git project run npm install commnand to install all dependencies

Step 1 — Mocking the Backend Using json-server:
start json-server by executing following command on project root folder
$ json-server --watch db.json

To run JSON-Server on local machine run command:
$ npx json-server --watch db.json

Step 2 — Creating an Angular 9 Module

$ cd ~/angular-crud-example
$ ng generate module crud --routing

Step 3 — Importing Angular 9 HttpClientModule and FormsModule
Open the src/app/crud/crud.module.ts file and add HttpClientModuleand FormsModuleto the imports array of the module as follows:

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CrudRoutingModule } from './crud-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CrudRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class CrudModule { 

Step 4 — Creating Angular 9 Component(s)
In this step, we'll create the Angular components. that compose the UI of our CRUD application:

A home component that renders a table of products and contains the CRUD operations,
A details component that displays the details of a specific product,
A create component for creating products,
A update component for updating products.
Open a new command-line interface and run the following commands:

$ ng generate component crud/home
$ ng generate component crud/details
$ ng generate component crud/create
$ ng generate component crud/update
The CLI will create the necessary files for the components and add them to the declarations array in the src/app/crud/crud.module.ts file:

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CrudRoutingModule } from './crud-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [HomeComponent, DetailsComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    HttpClientModule
  ]
})
export class CrudModule { }

Step 5 — Adding Angular 9 Routing
Head back to the src/app/crud/crud-routing.module.ts file, that was automatically created by Angular CLI for routing configuration, and import the components then add the routes as follows:

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'crud', redirectTo: 'crud/home', pathMatch: 'full'},
  { path: 'crud/home', component: HomeComponent },
  { path: 'crud/details/:productId', component: DetailsComponent },
  { path: 'crud/create', component: CreateComponent },
  { path: 'crud/update/:productId', component: UpdateComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

Step 6 — Creating an Angular 9 Service
$ ng generate service crud/crud

Next, open the src/app/crud/crud.service.ts file, and import and inject HttpClient as follows:

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }
}

Step 7 — Creating an Angular 9 Model
Head back to your command-line interface and run the following command from the root of your project:
$ ng generate interface  crud/product
Next, open the src/app/crud/product.ts file and update it as follows:

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

Next, open the src/app/crud/product.ts file and update it as follows:

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

Step 9 — Calling the Angular 9 CRUD Methods
Next, let's see how to make CRUD operations in our components. Open the src/app/crud/home/home.component.ts file, import and inject the Angular service as follows:

import { Component, OnInit } from '@angular/core';
import { CrudService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Products[] = [];

  constructor(public crudService: CrudService) { }

  ngOnInit() {

    this.crudService.getAll().subscribe((data: Products[])=>{
      console.log(data);
      this.products = data;
    })  
  }

}
We imported and injected CrudService as a private crudService instance via the component constructor.

Next, we defined a products array and invoked the getAll() method for making a read operation against the API server.

Next, open the src/app/crud/home/home.component.html file and update it as follows:

            <div>
                <h1>My Products</h1>
                <button type="button" [routerLink]="/crud/create/">Create new product</button>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let product of products">
                            <td>{{product.id}}</td>
                            <td>{{product.name}}</td>
                            <td>{{product.description}}</td>
                            <td>{{product.quantity}}</td>
                            <td>
                                <button type="button" [routerLink]="['/crud/update/', product.id]">Update</button>
                                <button type="button" (click)="crudService.delete(product.id)">Remove</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
We iterated over the products array using the ngFor directive and displayed the name, price, quantity, and description of each product. And we added two buttons for running the delete operations and navigating to the update component where we can run the update operation.

We also added a button for navigation the user to the product creation component.

Next, open the src/app/crud/create/create.component.ts file and update it as follows to create an angular form:

import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  productForm: FormGroup;

  ngOnInit() {
      this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],    
    })
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService
  ){ }
  submitForm() {
    this.crudService.create(this.productForm.value).subscribe(res => {
      console.log('Product created!')
      this.router.navigateByUrl('/crud/home/'))

  }

}
Next, open the src/app/crud/create/create.component.html and add the following HTML form for creating a product:

 <div>
            <h1>Create Product</h1>
            <form [formGroup]="productForm" (ngSubmit)="submitForm()" novalidate>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" formControlName="name" class="form-control" maxlength="20">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" formControlName="description" rows="3" maxlength="50"></textarea>
                </div>
                <div class="form-group">
                    <label>Price</label>
                    <input type="text" formControlName="price" class="form-control">
                </div>
                <div class="form-group">
                    <label>Quantity</label>
                    <input type="text" formControlName="quantity" class="form-control">
                </div>
                <button type="submit">Submit</button>
            </form>
</div>

he implementation of the update operation is left as an exercise for the reader. It's quite similar to the create operation except that we need to retrieve the ID of the product to update from the route parameter
