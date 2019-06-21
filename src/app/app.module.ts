import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';

import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { MyfilesComponent } from './myfiles/myfiles.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UploadComponent,
    ProfileComponent,
    PasswordresetComponent,
    MyfilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
