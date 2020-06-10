import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Product } from '../product';
import swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(public crudService: CrudService) { }


  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.crudService.getAll().subscribe((data: Product[])=>{
      console.log(data);
      this.products = data;
    }) 
  }

  deleteProduct(id){
    this.crudService.delete(id).then((result: any) => {
      console.log(result);
      //alert('Product deleted successfully!')
      this.getAllProducts();
      (swal as any).fire({ icon: 'success',  text: 'Product deleted successfully'});                  
    }) 
  }
}
