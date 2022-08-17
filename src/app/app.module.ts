import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { IdeComponent } from './ide/ide.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProblemsComponent } from './problems/problems.component';
import { LogoutComponent } from './logout/logout.component';
import { EditorComponent } from './editor/editor.component';
import { ProblemComponent } from './problem/problem.component';
import { SetProblemComponent } from './set-problem/set-problem.component';
import { TagProblemsComponent } from './tag-problems/tag-problems.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { DifficultyProblemsComponent } from './difficulty-problems/difficulty-problems.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    SigninComponent,
    IdeComponent,
    ProfileComponent,
    NavbarComponent,
    ProblemsComponent,
    LogoutComponent,
    EditorComponent,
    ProblemComponent,
    SetProblemComponent,
    TagProblemsComponent,
    ProblemListComponent,
    DifficultyProblemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
