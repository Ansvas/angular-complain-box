import { Component, OnInit } from '@angular/core';
import { Complain } from '../complain';
import { RegisterService } from '../-register.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {

  complainModel = new Complain('','','','','');
  data: any;
  sendmodel: any;
  user = false;
  admin = false;

  constructor(private _registerService: RegisterService) {}

  ngOnInit() {

    if(localStorage.getItem('user_type')=='user')
    {
      this.user = true;
      this.sendmodel = {user_id:localStorage.getItem('user_id')}; 
    }

    if(localStorage.getItem('user_type')=='admin')
    {
      this.admin = true;
    }
  	this._registerService.getcomplain(this.sendmodel)
    .subscribe(
      data => this.success(data),
      error => this.fails(error)
      ) 
  }
  
  success(data)
  {
    this.data=data;
    console.log(this.data);   
    /*window.location.href = 'complain';*/
  }

  fails(error)
  {
    console.log('fails:'+error);
  }

  onSubmit()
  {
    this.complainModel.user_id=localStorage.getItem('user_id');
    this._registerService.complain(this.complainModel)
    .subscribe(
      data => alert('success!'+data),
      error => alert('error:'+error)
      )
  }
}

