import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../_services/auth/auth.service';
import {
  faGoogle,
  faFacebookF,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;
  faLinkedinIn = faLinkedinIn;
  registerForm: FormGroup;

  constructor(public authService: AuthService, public fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.confirmPasswordValidation }
    );
  }

  register() {
    this.authService.register(this.registerForm.value);
  }

  get password() {
    return this.registerForm.get('password');
  }
  get email() {
    return this.registerForm.get('email');
  }

  confirmPasswordValidation(
    control: AbstractControl
  ): { invalidPassword: boolean } {
    if (
      control.get('password').value !== control.get('confirmPassword').value
    ) {
      return { invalidPassword: true };
    }
  }
}
