import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
type SigninResponse = {
  accepted: string,
  userdirpath: string
}
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  API_PATH: string = environment.API_PATH;
  url: string = `${this.API_PATH}/auth/signin`;
  headers = { "Content-Type": "application/json" }
  body = {}
  isInvalidCred = false;

  constructor(private http: HttpClient, private router: Router,private cookieService:CookieService) { }

  ngOnInit(): void {
  }

  onSignin(f: NgForm) {
    let { username, password, fullname, country, state, city, profession, institute }: { username: string, password: string , fullname:string, country:string, state:string, city:string, profession:string, institute:string} = f.value;
    this.body = f.value;
    this.http.post<SigninResponse>(this.url, this.body, { 'headers': this.headers }).subscribe((response) => {
      let status: string = response.accepted;
      let userdirpath: string = response.userdirpath;
      if (status == 'yes') {
        this.isInvalidCred = false;
        this.cookieService.set('username',username);
        this.cookieService.set('password',password);
        this.router.navigate(['home'])
      } else {
        this.isInvalidCred = true;
        // alert('please enter valid data')
      }
    })
  }

}
