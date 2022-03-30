import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  selectedProduct:any={};
  data:any=[]
  display_Image:any;
  constructor(private spinner:NgxSpinnerService,private http:HttpClient,private toastr:ToastrService) { }


  getAll(){
    //show spinner
    this.spinner.show();
    //hit api
    this.http.get('https://localhost:44338/api/Admin').subscribe((res)=>{
      this.data=res;
      this.spinner.hide();  
      this.toastr.success('Retrived');
    }, err=>{
      this.spinner.hide()
      this.toastr.error("Something went wrong")
    })
  }


  createCategory(data:any){
    this.spinner.show();
    //hit api
    data.imageName=this.display_Image;
    this.http.post('https://localhost:44338/api/Admin',data).subscribe((res:any)=>{
      this.data=res;
      this.spinner.hide();
      this.toastr.success('Retrived');
    }, err=>{
      this.spinner.hide()
      this.toastr.error("Something went wrong")
    })
  }


  uploadAttachment(file:FormData){
    this.http.post('https://localhost:44338/api/Admin/UploadImg/',file).subscribe((res:any)=>{
      if(res)
      console.log(res);
      this.display_Image=res.imageName;
    }, err=>{
      this.toastr.error(err.message)
    })
  }

  updateCategory(body:any)
  {
    body.imageName=this.display_Image;
    this.http.put('https://localhost:44338/api/Admin',body).subscribe((res:any)=>{
      this.toastr.success('Updated');
    }, err=>{
      this.toastr.error("Something went wrong")
    })
  }
  delete(id:number){
    this.http.delete('https://localhost:44338/api/Admin/DeleteCategory/'+id).subscribe((res)=>
    {
      this.toastr.success('Deleted')
    },err=>{
      this.toastr.error('cant delete')
    })
  }
  product:any=[];
  getCategoryAndProduct()
  {
//show spinner
this.spinner.show();
//hits api
this.http.get('https://localhost:44338/api/User/GetAll').subscribe((res)=>{
this.product=res;
//hide spinner
this.spinner.hide();
//toaster
this.toastr.success('Data Retrieved !!')
}, err=>{ // في حال كان في error
  this.spinner.hide();
  this.toastr.error('Something want worning !!');
})

  }
 
  searchProductName(product:any){
    this.http.post('https://localhost:44338/api/User/SearchOfProduct',product).subscribe((res=>{
    this.product=res;
    this.toastr.success(' searchProductName Successfuly !!')
    }),err=>{
      this.toastr.error("Something want worning !!");
    
    });
    
    }

    getAllProduct()
    {
  //show spinner
  this.spinner.show();
  //hits api
  this.http.get('https://localhost:44338/api/User/getAllProduct').subscribe((res)=>{
  this.product=res;
  //hide spinner
  this.spinner.hide();
  //toaster
  this.toastr.success('Data Retrieved !!')
  }, err=>{ // في حال كان في error
    this.spinner.hide();
    this.toastr.error('Something want worning !!');
  })
  
    }

}
