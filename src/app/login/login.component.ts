import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
//import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   login: [''],
    //   password: ['']
    // });
  }

  // tslint:disable-next-line:typedef
  login() {
    // this.authService.login(
    //   {
    //     login: this.f.login.value,
    //     password: this.f.password.value
    //   }
    // )
    //   .subscribe(success => {
    //     if (success) {
    //       this.router.navigate(['/dashboard']);
    //     }
    //   });
  }
}
