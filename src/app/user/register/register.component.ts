import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../_services/auth/auth.service';
import {
  faGoogle,
  faFacebookF,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;
  faLinkedinIn = faLinkedinIn;
  registerForm: FormGroup;

  constructor(public authService: AuthService,
              public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.confirmPasswordValidation });
  }

  register() {
    this.authService.register(this.registerForm.value);
  }

  confirmPasswordValidation(control: AbstractControl): { invalidPassword: boolean } {
    if (control.get('password').value !== control.get('confirmPassword').value) {
      return { invalidPassword: true };
    }
  }
}


