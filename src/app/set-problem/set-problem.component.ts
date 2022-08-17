import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
type SetProblemRequest = {
  problemcode: string,
  description: string,
  solution: string,
  constraints: string,
  sampleinput: string,
  sampleoutput: string,
  input: string,
  output: string,
  difficulty: string,
  timelimit: number,
  memorylimit: number,
  setter: string,
  tester: string,
  correctSubmissions: number,
  totalSubmissions: number,
  tags: string[]
}
type SetProblemResponse = {
  accepted: string,
  msg: string
}
@Component({
  selector: 'app-set-problem',
  templateUrl: './set-problem.component.html',
  styleUrls: ['./set-problem.component.css']
})
export class SetProblemComponent implements OnInit {

  API_PATH: string = environment.API_PATH;
  url: string = `${this.API_PATH}/problemManagement/setProblem`;
  headers = { "Content-Type": "application/json" }

  username: string = '';
  isInvalidProblemCode: boolean = false;
  isInValidForm: boolean = false;
  difficulty: string = 'easy';
  problemtags: string[] = environment.problemtags;
  msg: string = 'please fill all fields properly.';

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.username = this.cookieService.get('username');
  }
  onSubmitProblem(f: NgForm): void {
    
    this.isInValidForm = false;
    if (f.valid) {
      f.value.tags = f.value.tags?f.value.tags.toString().split(' ').join('').split(','):['general'];
      
      const setProblemReqeustBody: SetProblemRequest = f.value;

      this.http.post<SetProblemResponse>(this.url,setProblemReqeustBody,{'headers':this.headers}).subscribe((responseProblem:SetProblemResponse)=>{
        console.log("response of setting Problem : ",responseProblem);
        if(responseProblem.accepted=='yes'){
          const pathToNewProblem:string='problem/'+setProblemReqeustBody.problemcode;
          console.log("path to problem : ",pathToNewProblem);
          this.router.navigate([pathToNewProblem]);
        }else{
          this.msg=responseProblem.msg;
          this.isInValidForm=true;
        }
      })
    } else {
      this.isInValidForm = true;
    }
    console.log(f.value);
  }

}
