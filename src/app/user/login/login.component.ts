import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../_services/auth/auth.service';
import {
  faGoogle,
  faFacebookF
} from '@fortawesome/free-brands-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {
    this.authService.login(loginForm.form.value.email, loginForm.form.value.password);
  }
}
