import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment';
import { RegisterService } from '../-register.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {


	commentModel = new Comment('');
	data: any;

  	constructor(private _registerService: RegisterService) { }

  ngOnInit() {
  	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var c = url.searchParams.get("comp_id");
	console.log(c);
	this.commentModel.comp_id=c;

	this._registerService.getcomment(this.commentModel)
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
  	
}


