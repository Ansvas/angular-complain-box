import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Complain } from '../complain';
import { RegisterService } from '../-register.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {
	userModel = new User(localStorage.getItem('user_id'),'','','');

  complainModel = new Complain('','','','','');



  user_id = localStorage.getItem('user_id');
	email=localStorage.getItem('user_email');
	password=localStorage.getItem('user_password');
	user_type=localStorage.getItem('user_type');
	user_cred={user_id: this.user_id,email:this.email,password:this.password,user_type:this.user_type};

	/*displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  	dataSource = ELEMENT_DATA;*/

  data: any;

  constructor(private _registerService: RegisterService) {}


  ngOnInit() {

  	this._registerService.getcomplain(this.userModel)
    .subscribe(
      data => this.success(data),
      error => this.fails(error)
      ) }
  
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

