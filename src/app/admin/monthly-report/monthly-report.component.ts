import { Component, OnInit } from '@angular/core';
import { UserregisService } from 'src/app/service/userregis.service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {

  constructor(public userRegisService:UserregisService) { }

  ngOnInit(): void {
    this.userRegisService.getAllMonthlyReport();
    this.userRegisService.getMonthlySum();
    this.userRegisService.getMonthlyCount();
  }

}
