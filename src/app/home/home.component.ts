import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../service/contact.service';
import { HomeService } from '../service/home.service';
import { HomepageService } from '../service/homepage.service';
import { SliderService } from '../service/slider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public homepageService:HomepageService,public sliderService:SliderService,private contactService:ContactService,private toaster:ToastrService , private spinner:NgxSpinnerService, public home:HomeService) { }
  CreateForm:FormGroup= new FormGroup({
    name :new FormControl(),
    email :new FormControl(),
    subject :new FormControl(),
    message :new FormControl(),
  })
  customerObj=JSON.parse(localStorage.getItem('user')||'');
  customer_Id=parseInt(this.customerObj.nameid);

  ngOnInit(): void {
     this.home.getCategoryAndProduct();
     setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    this.sliderService.getAll();
    this.homepageService.getAll();
  }
  AddProduct(Id:number){
    const body={
      customerId:this.customer_Id,
      ProId:Id
    }
   this.home.AddProductCart(body);
   location.reload();
  }
  save(){
    this.contactService.createContact(this.CreateForm.value);
  }
}
