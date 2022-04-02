import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 
  quantity = new FormControl(); 

  constructor(private toaster:ToastrService , private spinner:NgxSpinnerService, public home:HomeService) { }
  customerObj=JSON.parse(localStorage.getItem('user')||'');
  customer_Id=parseInt(this.customerObj.nameid);
  ngOnInit(): void {
 this.home.getCart(this.customer_Id);
 this.home.getTotalCart(this.customer_Id);
  }

  totalPrice= this.home.getTotalCart(this.customer_Id);
 
  DeleteProduct(Id:number){
    debugger
    const body={
      customerId:this.customer_Id,
      ProId:Id
    }
   this.home.DeleteProductCart(body);
   location.reload();
  }

  updateQuantity(id:number){
  debugger
  const body={
  proId:id,
   quantity:this.quantity.value,
  customerId:this.customer_Id
   }
this.home.updateCart(body);
location.reload

  }

  

}
