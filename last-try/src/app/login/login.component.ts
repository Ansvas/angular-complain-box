import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { RegisterService } from '../-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel = new User('','','','');
  constructor( private _registerService: RegisterService) { }

  ngOnInit() {
  }

 onSubmit()
  {
    this._registerService.login(this.userModel)
    .subscribe(
      data => this.success(data),
      error => this.fails(error)
      )

  }

  success(data)
  {
    console.log(data);
    console.log(data[0].email);
    this.userModel.user_id=data[0].user_id;

    console.log('hii i am in success');
    localStorage.setItem('user_type',this.userModel.user_type);
    localStorage.setItem('user_email',data[0].email);
    localStorage.setItem('user_password',data[0].password);
    localStorage.setItem('user_id',data[0].user_id);
    window.location.href = 'complain';
  }

  fails(error)
  {
    console.log('fails:'+error);
  }

}



