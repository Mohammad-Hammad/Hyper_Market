import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( public auth:AuthService) { }

  ngOnInit(): void {
  }
  RegisterUser :FormGroup = new FormGroup({
    FirstName:new FormControl('', Validators.required),
    LastName:new FormControl('', Validators.required),
    Email:new FormControl('', Validators.required),
    UserName:new FormControl('', Validators.required),
    Password:new FormControl('', Validators.required),
    ImageName:new FormControl('', Validators.required),

  })




  uploadImage(file:any){
    if(file.length===0)
    {
    return ;
    }
    debugger;
    let fileUpload=<File>file[0];
    const formData = new FormData();
    formData.append('file',fileUpload,fileUpload.name);
    this.auth.uploadAttachment(formData);
      }

      sendData(){
        this.auth.registerUser(this.RegisterUser.value);
      }

}
