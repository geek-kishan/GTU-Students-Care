import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard } from './auth.guard';	
import { ProfileComponent } from './profile/profile.component';
import { PasswordresetComponent }  from './passwordreset/passwordreset.component';
import { MyfilesComponent } from './myfiles/myfiles.component';

const routes: Routes = [
{ path: '', redirectTo:'/home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'myfiles', component: MyfilesComponent },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'myprofile', component: ProfileComponent, canActivate: [AuthGuard]},
{path: 'forgotpass', component: PasswordresetComponent},
{ path: 'upload', component: UploadComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
