import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router,  ) {
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
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

 
    if (email === 'sk@gmail.com' && password === '123456') {
      alert('Login Successful!');
      this.router.navigate(['/dashboard']);  
    } else {
      alert('Invalid email or password!');
    }
  }
}
