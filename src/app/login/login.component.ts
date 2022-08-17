import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
type LoginResponse={
  accepted:string,
  userdirpath:string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  API_PATH: string = environment.API_PATH;
  url: string = `${this.API_PATH}/auth/login`;
  headers={ "Content-Type": "application/json" }
  body={}

  isInvalidCred=false;
  constructor(private http : HttpClient,private router:Router,private cookieService : CookieService) {

  }

  ngOnInit(): void {
  }

  onLogin(f: NgForm) {
    let { username, password }: { username: string, password: string } = f.value;
    this.body=f.value;
    this.http.post<LoginResponse>(this.url,this.body,{'headers':this.headers}).subscribe((response)=>{
      let status:string=response.accepted;
      let userdirpath:string=response.userdirpath;
      if(status=='yes'){
        this.isInvalidCred=false;
        this.cookieService.set('username',username);
        this.cookieService.set('password',password);
        this.router.navigate(['home'])
      }else{
        this.isInvalidCred=true;
        alert('please enter valid data')
      }
    })
  }
}
