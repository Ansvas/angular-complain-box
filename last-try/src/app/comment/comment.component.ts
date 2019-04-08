import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment';
import { RegisterService } from '../-register.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

	user_id=localStorage.getItem('user_id');
	commentModel = new Comment('',this.user_id,'');
	comdata={comp_id:''};
	data: any;

  	constructor(private _registerService: RegisterService) { }

  ngOnInit() {
  	/*get param from url*/
  	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var c = url.searchParams.get("comp_id");
	console.log(c);
	this.comdata.comp_id=c;
	this.commentModel.comp_id=c;

	this._registerService.getcomment(this.comdata)
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
	  	this._registerService.comment(this.commentModel)
	  	.subscribe(
	  		data => alert('success!'+data),
	  		error => alert('error:'+error)
	  		)
	  }  	
}


