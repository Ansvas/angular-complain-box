import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { RegisterService } from '../-register.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userModel = new User('','','','');
  constructor( private _registerService: RegisterService) { }

  ngOnInit() {
  }

 onSubmit()
  {
  	this._registerService.register(this.userModel)
  	.subscribe(
  		data => console.log('success!',data),
  		error => console.log('error:',error)
  		)
  }
}
