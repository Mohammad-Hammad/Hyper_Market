import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toaster:ToastrService , private spinner:NgxSpinnerService, public home:HomeService) { }
  
  customerObj=JSON.parse(localStorage.getItem('user')||'');
  customer_Id=parseInt(this.customerObj.nameid);

  ngOnInit(): void {
     this.home.getCategoryAndProduct();
     setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
  AddProduct(Id:number){
    const body={
      customerId:this.customer_Id,
      ProId:Id
    }
   this.home.AddProductCart(body);
   location.reload();
  }

}
