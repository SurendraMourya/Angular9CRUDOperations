import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CrudModule} from '../app/crud/crud.module'

import { HomeComponent } from '../app/crud/home/home.component';
import { DetailsComponent } from '../app/crud/details/details.component';
import { CreateComponent } from '../app/crud/create/create.component';
import { UpdateComponent } from '../app/crud/update/update.component';

@NgModule({
  declarations: [
    AppComponent,HomeComponent,DetailsComponent,CreateComponent,UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CrudModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
