import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HomepageService } from 'src/app/service/homepage.service';

@Component({
  selector: 'app-create-home',
  templateUrl: './create-home.component.html',
  styleUrls: ['./create-home.component.css']
})
export class CreateHomeComponent implements OnInit {

  constructor(private homepageService:HomepageService) { }
  CreateForm:FormGroup= new FormGroup({
    FirstText :new FormControl(),
    SecondText :new FormControl(),
    CatName :new FormControl(),
    ProdName :new FormControl(),
  })
  ngOnInit(): void {
  }
  save(){
    this.homepageService.createHome(this.CreateForm.value);
  }



}
