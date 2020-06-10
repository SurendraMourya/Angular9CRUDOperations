import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Product } from '../product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  products:Product;
  productForm: FormGroup;
  prdID: any='';
  
  constructor(public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService,private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],    
    })
    this.route.paramMap.subscribe(params => {        
      if (params) {
        console.log(params);
      this.prdID=params
      }        
  });
    this.getProductById(this.prdID);    
  }

  getProductById(id){
    this.prdID=id.params.productId;
    this.crudService.getById(id.params.productId).subscribe(data=>{
      console.log(data);
      this.products = data;
    })
  }

  updateForm() {
    this.crudService.update(this.prdID,this.productForm.value).subscribe(res => {     
        //alert('Product updated!');        
        (swal as any).fire({ icon: 'success',  text: 'Product updated successfully'});                  
        this.router.navigate(['crud/home/']);            
    });
  }
}
