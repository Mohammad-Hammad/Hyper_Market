import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateTestimonialComponent } from '../admin/create-testimonial/create-testimonial.component';
import { CreateTestimonialUserComponent } from '../create-testimonial-user/create-testimonial-user.component';
import { HomeService } from '../service/home.service';
import { TestimonialService } from '../service/testimonial.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

 
  constructor(private dialog: MatDialog,public testimonial: TestimonialService,public home:HomeService) { }
  comment:string ="";
  ngOnInit(): void {
    this.testimonial.getAll();
  }
  InputValue(event:any){
    console.log(event.target.value);
    this.comment=event.target.value;
    }
 
  openDialog(){
    this.dialog.open(CreateTestimonialUserComponent)
  }
  search(){
    const objCourse={
      comment:this.comment.toString(),
      }
      console.log(objCourse);
      this.home.searchComment(objCourse);
  }
}
