import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public searchService:SearchService) { }
  SearchForm:FormGroup= new FormGroup({
    dateFrom :new FormControl(),
    dateto :new FormControl(),
  })
  ngOnInit(): void {
    
  }
  getSearch()
  {
    this.searchService.search(this.SearchForm.value);
  }
}
