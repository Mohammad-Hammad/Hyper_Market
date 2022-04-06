import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from 'src/app/service/search.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';
  constructor(public searchService:SearchService) { }
  SearchForm:FormGroup= new FormGroup({
    dateFrom :new FormControl(),
    dateTo :new FormControl(),
  })
  ngOnInit(): void {
    
  }
  getSearch()
  {
    this.searchService.search(this.SearchForm.value);
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
