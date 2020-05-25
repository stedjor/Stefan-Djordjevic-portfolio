import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../_services/auth/auth.service';
import {
  faGoogle,
  faFacebookF
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;
  user = {
    email: '',
    password: ''
  };

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.user.email, this.user.password);
  }
}
