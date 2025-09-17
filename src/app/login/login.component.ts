import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  // onSubmit() {
  //   const { username, password } = this.loginForm.value;
  //   if (this.authService.login(username!, password!)) {
  //     alert('Login Successful!');
  //     this.router.navigate(['/dashboard']);
  //   } else {
  //     alert('Invalid Credentials');
  //   }
  // }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    // Simulate API call delay
    setTimeout(() => {
      if (this.authService.login(email, password)) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid email or password!';
      }
      this.isLoading = false;
    }, 1000);
  }
}
