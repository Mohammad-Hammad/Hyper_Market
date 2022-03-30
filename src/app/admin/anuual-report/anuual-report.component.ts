import { Component, OnInit } from '@angular/core';
import { UserregisService } from 'src/app/service/userregis.service';

@Component({
  selector: 'app-anuual-report',
  templateUrl: './anuual-report.component.html',
  styleUrls: ['./anuual-report.component.css']
})
export class AnuualReportComponent implements OnInit {

  constructor(public userRegisService:UserregisService) { }

  ngOnInit(): void {
    this.userRegisService.getAllAnuualReport();
    this.userRegisService.getAnuualSum();
    this.userRegisService.getAnuualCount();
  }

}
