import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../service/home.service';
import {render} from 'creditcardpayments/creditCardPayments'

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

  constructor(private toaster:ToastrService , private spinner:NgxSpinnerService, public home:HomeService) {
   
   }
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
