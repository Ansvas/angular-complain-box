import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Comment } from './comment';
import { Complain } from './complain';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  _url = '';
  constructor(private _http: HttpClient) { }

  register(user: User)
  {
  	this._url = 'http://localhost:8080/api/register';
  	return this._http.post<any>(this._url, user);
  }

  login(user: User)
  {
  	this._url = 'http://localhost:8080/api/auth';
  	return this._http.post<any>(this._url,user);
  }

  getcomplain(sendmodel)
  {
  	this._url = 'http://localhost:8080/api/getcomplain';
  	return this._http.post<any>(this._url,sendmodel);
  }

  getcomment(comp)
  {
    this._url = 'http://localhost:8080/api/getcomment';
    return this._http.post<any>(this._url,comp);
  }

  comment(comp: Comment)
  {
    this._url = 'http://localhost:8080/api/comment';
    return this._http.post<any>(this._url,comp);
  }

  complain(compl: Complain)
  {
    this._url = 'http://localhost:8080/api/complain';
    return this._http.post<any>(this._url,compl);
  }
}
