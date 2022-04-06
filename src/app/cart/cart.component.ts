import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../service/home.service';
import {render} from 'creditcardpayments/creditCardPayments'
import { MatDialog } from '@angular/material/dialog';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 paymentRequest:google.payments.api.PaymentDataRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId'
        }
      }
    }
  ],  merchantInfo: {
    merchantId: '12345678901234567890',
    merchantName: 'Demo Merchant'
  },
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPriceLabel: 'Total',
    totalPrice: '1000.00',
    currencyCode: 'USD',
    countryCode: 'US'
  }
 };
 onLoadPaymentData= (
   event:Event
 ):void => {
   const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
   console.log('load payment data ',eventDetail.detail);
 }
 onPaymentDataAuthorized:google.payments.api.PaymentAuthorizedHandler=(
   paymentData
 ) => {console.log('payment authroized',paymentData);
 return{
   transactionState:'SUCCESS'
 };
}
onErorr = (event:ErrorEvent):void => {
  console.error('erorr',event.error);
}
  quantity = new FormControl(); 
  @ViewChild('Create') Create! :TemplateRef<any>
  @ViewChild('Invoice') Invoice! :TemplateRef<any>

    constructor(private toaster:ToastrService , private spinner:NgxSpinnerService, 
    private dialog:MatDialog,public home:HomeService) {
   
   }
  customerObj=JSON.parse(localStorage.getItem('user')||'');
  customer_Id=parseInt(this.customerObj.nameid);
  result:any=[];
   element:any;

  CreateForm:FormGroup= new FormGroup({
    cardName :new FormControl('',Validators.required),
    cardNumber :new FormControl('',Validators.required),
    CustomerID :new FormControl()
  })
  ngOnInit(): void {
 this.home.getCart(this.customer_Id);
 this.home.getTotalCart(this.customer_Id); 
 this.home.GetAmount(this.customer_Id);

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


  save()
  {
    this.CreateForm.controls['CustomerID'].setValue(this.customer_Id); 
    this.home.createCredits(this.CreateForm.value);
    // console.log(this.CreateForm.value);
     this.CompletetoPay();
    
  }
 
  CompletetoPay()
  {
    this.result=this.home.amount[0].amount - (this.home.total[0].totalPrice);   
    this.toaster.success('operation compleate and your balance is: '+this.result);
    const updateObj={
      Amount:this.result,
      CustomerID:this.customer_Id
  
    }
    this.home.updateAmount(updateObj);
    this.addOrder();
   
    // (this.home.total[0].totalPrice)=0;
   
  }
  
  addOrder()
  {
   
      const order={
        totalPrice:this.home.total[0].totalPrice,
        CustomerID:this.customer_Id
  
    }

   
    this.home.addOrders(order);
    console.log('data: '+this.home.ordids );
    
    
    // for (let index = 0; index < this.home.product.length; index++)
    //  {
    //   const orderPro={
    //     orderID:JSON.stringify(this.home.order2.length-1) ,
    //     productID:this.home.product[index].proId
  
    // }
    // console.log("ord obj"+orderPro.orderID);
    // console.log("ord id ////: ///"+this.home.ordids);
    
   
     
      
    

  }


  pay()
  {
    if(this.home.amount[0]===null)
    {
      this.dialog.open(this.Create)
      console.log('null value');
      
    
      
    }
    else if(this.home.amount!=null)
    {
      if(this.home.amount[0].amount>(this.home.total[0].totalPrice))
      {
      this.result=this.home.amount[0].amount - (this.home.total[0].totalPrice);   
      this.toaster.success('Your Payment Done');
      const updateObj={
        Amount:this.result,
        CustomerID:this.customer_Id
    
      }
      this.home.updateAmount(updateObj);
      this.addOrder();
      // (this.home.total[0].totalPrice)=0;
    
    }  
    else
    this.toaster.warning('Your Card Balance Not Engouh')

  }


  }

  Display()
  {
    this.home.DisplayInvoice(this.customer_Id);
    this.dialog.open(this.Invoice)


  }
 

  
}