import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  constructor(private fb: FormBuilder) {}

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      alert('Employee Added!');
      this.employeeForm.reset();
    }
  }
}
