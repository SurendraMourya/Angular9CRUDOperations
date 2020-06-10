import { Component, OnInit } from '@angular/core';
import { CrudService} from '../crud.service'
import { Product } from "../product";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  products: Product;
  public product=[];
  prdID:any='';
  constructor(private crudService: CrudService,private route: ActivatedRoute) { }

  ngOnInit(): void {    
    //Below are two ways to get route parameter, one using Snapshot and other using ParamsAsMap 
      if (this.route.snapshot.params.productId) {
        console.log(this.route.snapshot.params.productId);        
      }    

      this.route.paramMap.subscribe(params => {        
          if (params) {
            console.log(params);
          this.prdID=params
          }        
      });
    this.getProductById(this.prdID);
    
  }

  getProductById(id){
    this.crudService.getById(id.params.productId).subscribe((product: Product) =>{
      this.products = product;
    })
  }
}
