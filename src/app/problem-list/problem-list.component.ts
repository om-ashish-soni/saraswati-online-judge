import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
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
@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  @Input() problemList:Problem[]=[];

  
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }

}
