import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  employeeId: string;
  role: string;
  department: string;
  manager: string;
  joiningDate: string;
  employmentType: string;
  salary: number;
  email: string;
  phone: string;
  address: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm = '';
  selectedDepartment = '';
  selectedRole = '';
  currentPage = 1;
  itemsPerPage = 10;
  sortField = '';
  sortDirection = 'asc';

  departments = ['All', 'Engineering', 'Human Resources', 'Finance', 'Marketing', 'Sales', 'Operations'];
  roles = ['All', 'Software Developer', 'Senior Developer', 'Team Lead', 'Project Manager', 'HR Manager', 'Accountant', 'Designer', 'Marketing Executive'];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    // Sample data - in real app, this would come from a service
    this.employees = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        dateOfBirth: '1990-05-15',
        employeeId: 'EMP0001',
        role: 'Software Developer',
        department: 'Engineering',
        manager: 'Jane Smith',
        joiningDate: '2023-01-15',
        employmentType: 'Full-time',
        salary: 75000,
        email: 'john.doe@company.com',
        phone: '9876543210',
        address: '123 Main St, City, State',
        emergencyContactName: 'Jane Doe',
        emergencyContactRelation: 'Spouse',
        emergencyContactPhone: '9876543211'
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        gender: 'Female',
        dateOfBirth: '1988-08-22',
        employeeId: 'EMP0002',
        role: 'Team Lead',
        department: 'Engineering',
        manager: 'Mike Johnson',
        joiningDate: '2022-06-01',
        employmentType: 'Full-time',
        salary: 95000,
        email: 'jane.smith@company.com',
        phone: '9876543212',
        address: '456 Oak Ave, City, State',
        emergencyContactName: 'Bob Smith',
        emergencyContactRelation: 'Spouse',
        emergencyContactPhone: '9876543213'
      },
      {
        id: '3',
        firstName: 'Mike',
        lastName: 'Johnson',
        gender: 'Male',
        dateOfBirth: '1985-12-10',
        employeeId: 'EMP0003',
        role: 'Project Manager',
        department: 'Engineering',
        manager: 'Sarah Wilson',
        joiningDate: '2021-03-15',
        employmentType: 'Full-time',
        salary: 110000,
        email: 'mike.johnson@company.com',
        phone: '9876543214',
        address: '789 Pine St, City, State',
        emergencyContactName: 'Lisa Johnson',
        emergencyContactRelation: 'Spouse',
        emergencyContactPhone: '9876543215'
      }
    ];
    
    this.filteredEmployees = [...this.employees];
  }

  onSearch() {
    this.filterEmployees();
  }

  onDepartmentChange() {
    this.filterEmployees();
  }

  onRoleChange() {
    this.filterEmployees();
  }

  filterEmployees() {
    this.filteredEmployees = this.employees.filter(emp => {
      const matchesSearch = !this.searchTerm || 
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesDepartment = !this.selectedDepartment || this.selectedDepartment === 'All' || 
        emp.department === this.selectedDepartment;
      
      const matchesRole = !this.selectedRole || this.selectedRole === 'All' || 
        emp.role === this.selectedRole;
      
      return matchesSearch && matchesDepartment && matchesRole;
    });
    
    this.currentPage = 1; // Reset to first page when filtering
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    
    this.filteredEmployees.sort((a, b) => {
      const aVal = a[field as keyof Employee];
      const bVal = b[field as keyof Employee];
      
      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  get paginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployees.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  get pageNumbers() {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  viewEmployee(employee: Employee) {
    // Navigate to employee details page
    console.log('View employee:', employee);
    alert(`Viewing details for ${employee.firstName} ${employee.lastName}`);
  }

  editEmployee(employee: Employee) {
    // Navigate to edit form
    console.log('Edit employee:', employee);
    alert(`Editing ${employee.firstName} ${employee.lastName}`);
  }

  deleteEmployee(employee: Employee) {
    if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      const index = this.employees.findIndex(emp => emp.id === employee.id);
      if (index > -1) {
        this.employees.splice(index, 1);
        this.filterEmployees();
        alert('Employee deleted successfully!');
      }
    }
  }

  addNewEmployee() {
    this.router.navigate(['/employee-form']);
  }

  getFullName(employee: Employee): string {
    return `${employee.firstName} ${employee.lastName}`;
  }

  formatSalary(salary: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(salary);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
