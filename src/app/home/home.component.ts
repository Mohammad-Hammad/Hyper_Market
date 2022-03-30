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

  ngOnInit(): void {
    this.spinner.show();
     this.home.getCategoryAndProduct();
     this.toaster.success('Data Retrieved !!')
     setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

}
