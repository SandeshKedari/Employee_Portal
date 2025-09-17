import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees = [
    { id: 1, name: 'Pradnya', role: 'Manager', email: 'pradnya@example.com' },
    { id: 2, name: 'Nirmala', role: 'Developer', email: 'nirmala@example.com' },
    { id: 3, name: 'Regina', role: 'HR', email: 'regina@example.com' }
  ];
}
