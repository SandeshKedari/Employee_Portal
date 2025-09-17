import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  submitted = false;
  
  constructor(private fb: FormBuilder) {}

  employeeForm = this.fb.group({
    // Personal Information
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    
    // Professional Information
    employeeId: ['', [Validators.required, Validators.pattern(/^EMP\d{4}$/)]],
    role: ['', Validators.required],
    department: ['', Validators.required],
    manager: [''],
    joiningDate: ['', Validators.required],
    employmentType: ['Full-time', Validators.required],
    salary: ['', [Validators.required, Validators.min(0)]],
    
    // Contact Information
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    address: ['', Validators.required],
    
    // Security
    password: ['', [Validators.required, Validators.minLength(8)]],
    
    // Emergency Contact
    emergencyContactName: ['', Validators.required],
    emergencyContactRelation: ['', Validators.required],
    emergencyContactPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
  });

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.employeeForm.valid) {
      console.log('Employee Data:', this.employeeForm.value);
      alert('Employee Added Successfully!');
      this.employeeForm.reset();
      this.submitted = false;
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}
