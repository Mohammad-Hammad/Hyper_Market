import { Component, OnInit } from '@angular/core';
import { UserregisService } from 'src/app/service/userregis.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-anuual-report',
  templateUrl: './anuual-report.component.html',
  styleUrls: ['./anuual-report.component.css']
})
export class AnuualReportComponent implements OnInit {

  constructor(public userRegisService:UserregisService) { }
  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';
  ngOnInit(): void {
    this.userRegisService.getAllAnuualReport();
    this.userRegisService.getAnuualSum();
    this.userRegisService.getAnuualCount();
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
