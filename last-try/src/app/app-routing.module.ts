import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {ComplainComponent} from './complain/complain.component';
import {CommentComponent} from './comment/comment.component';



const routes: Routes = [
	/*{ path: '', component: HomeComponent, canActivate: [AuthGuard] },*/
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'complain', component: ComplainComponent},
    { path: 'comment', component: CommentComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
