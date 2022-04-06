import { Component, OnInit } from '@angular/core';
import { UserregisService } from 'src/app/service/userregis.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {
  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';
  constructor(public userRegisService:UserregisService) { }

  ngOnInit(): void {
    this.userRegisService.getAllMonthlyReport();
    this.userRegisService.getMonthlySum();
    this.userRegisService.getMonthlyCount();
  }
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
}
