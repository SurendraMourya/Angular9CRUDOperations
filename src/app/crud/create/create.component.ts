import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  productForm: FormGroup;
  constructor(public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],    
    })
  }

  submitForm() {
    this.crudService.create(this.productForm.value).subscribe(res => {     
      (swal as any).fire({ icon: 'success',  text: 'Product created successfully'});                  
        this.router.navigate(['crud/home/']);            
    });
  }
  
}
