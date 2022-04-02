import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public home :HomeService) { }
  proName:string ="";
  catName:number=0;
  ngOnInit(): void {
    this.home.getAllProduct();
  }
  InputValue(event:any){
    console.log(event.target.value);
    this.proName=event.target.value;
    }
 
    search(){
      const objCourse={
        proName:this.proName.toString(),
        }
        console.log(objCourse);
        this.home.searchProductName(objCourse);

    }
    customerObj=JSON.parse(localStorage.getItem('user')||'');
    customer_Id=parseInt(this.customerObj.nameid);
    AddProduct(Id:number){
      const body={
        customerId:this.customer_Id,
        ProId:Id
      }
     this.home.AddProductCart(body);
     location.reload();
    }

}
