import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as ace from "ace-builds";
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
type Problem = {
  problemcode: string,
  description: string,
  constraints: string,
  sampleinput: string,
  sampleoutput: string,
  difficulty: string,
  timelimit: number,
  memorylimit: number,
  setter: string,
  tester: string,
  correctSubmissions: number,
  totalSubmissions: number,
  tags: string[]
}
type RunCodeRequest={
  username:string,
  inp:string,
  lang:string,
  code:string
}
type SubmitCodeRequest={
  problemcode:string,
  username:string,
  inp:string,
  lang:string,
  code:string
}
type RunCodeResponse={
  result:{
    output:string,
    error:string,
    executionTime:number
  }
}
type SubmitCodeResponse={
  result:{
    status:string,
    output: string,
    error: string,
    executionTime: number
  },
  problem:Problem
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit {

  @Input() isProblem:boolean=false;
  @Input() problemcode:string='';
  @Input() sampleinput:string='';
  @Input() setProblem:any=null;
  status:string='';

  @ViewChild("editor") private editor!: ElementRef<HTMLElement>;
  @ViewChild("inputBox") private inputBox!:ElementRef<HTMLTextAreaElement>;

  API_PATH: string = environment.API_PATH;
  runurl: string = `${this.API_PATH}/executor/run`;
  submiturl: string = `${this.API_PATH}/submit/judge`;
  headers = { "Content-Type": "application/json" }

  isSubmitting:boolean=false;
  isSubmitted:boolean=false;
  isRunning:boolean=false;
  isRan:boolean=false;
  username:string='';
  lang: string = 'python';
  code: string = '';
  theme: string = 'monokai';
  inp: string = '';
  op: string = '';
  executionTime:number=0;
  langs: string[] = [
    "python",
    "javascript"
  ];
  themes: string[] = [
    "monokai",
    "textmate"
  ]
  constructor(private http : HttpClient,private cookieService: CookieService) {
    
  }
  getUserName():string{
    return this.cookieService.get('username');
  }
  changeLang(newLang: string): void {
    
    console.log("newLang : ", newLang);
    this.lang = newLang;
    this.cookieService.set('lang', newLang);
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setMode(`ace/mode/${this.lang}`);
    aceEditor.setValue('');
  }
  changeTheme(newTheme: string): void {
    this.theme = newTheme;
    this.cookieService.set('theme', newTheme);
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.setTheme(`ace/theme/${this.theme}`);
  }
  setInput(newInput:string):void{
    this.inp=newInput;
  }
  getCode(): string {
    return ace.edit(this.editor.nativeElement).getValue();
  }
  runCode(): void {
    console.log("run code called : ",Date().toString())
    console.log("input is : ",this.inp);
    this.isRunning=true;
    this.isRan=false;
    this.op=''
    const runRequestBody:RunCodeRequest={
      username:this.getUserName(),
      lang:this.lang,
      inp:this.inp,
      code:this.getCode()
    }
    this.http.post<RunCodeResponse>(this.runurl,runRequestBody,{'headers':this.headers}).subscribe((response:RunCodeResponse)=>{
      if(response.result.error) this.op=response.result.error;
      else{
        this.op=response.result.output;
        this.executionTime=response.result.executionTime;
      }
      this.isRunning=false;
      this.isRan=true;
    })
  }
  submitCode(): void {
    console.log("submit code called : ",Date().toString())
    this.isSubmitting=true;
    this.isSubmitted=false;
    this.isRan=false;
    this.op=''
    const submitRequestBody:SubmitCodeRequest={
      problemcode:this.problemcode,
      username:this.getUserName(),
      lang:this.lang,
      inp:'',
      code:this.getCode()
    }
    this.http.post<SubmitCodeResponse>(this.submiturl,submitRequestBody,{'headers':this.headers}).subscribe((response:SubmitCodeResponse)=>{
      if(response.result.error) this.op=response.result.error;
      this.executionTime=response.result.executionTime;
      this.status=response.result.status;
      this.isSubmitting=false;
      this.isSubmitted=true;
      this.isRan=true;
      const problem=response.problem;
      console.log('response',response)
      if(response.problem && this.setProblem){
        this.setProblem(problem)
      }
    })
  }
  
  ngAfterViewInit(): void {
    
    if (!this.cookieService.get('lang')) {
      this.cookieService.set('lang', this.lang);
    } else {
      this.lang = this.cookieService.get('lang');
    }
    if (!this.cookieService.get('theme')) {
      this.cookieService.set('theme', this.theme);
    } else {
      this.theme = this.cookieService.get('theme');
    }


    ace.config.set("fontSize", "14px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );

    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue("");

    aceEditor.setTheme(`ace/theme/${this.theme}`);
    aceEditor.session.setMode(`ace/mode/${this.lang}`);

    this.setInput(this.sampleinput);
  }


}
