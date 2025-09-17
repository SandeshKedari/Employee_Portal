import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface DashboardStats {
  totalEmployees: number;
  newHiresThisMonth: number;
  departments: number;
  averageSalary: number;
  activeProjects: number;
  upcomingBirthdays: number;
  pendingReviews: number;
  employeeSatisfaction: number;
}

interface RecentActivity {
  id: string;
  type: 'hire' | 'update' | 'birthday' | 'anniversary';
  message: string;
  timestamp: Date;
  employeeName: string;
}

interface DepartmentStats {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalEmployees: 0,
    newHiresThisMonth: 0,
    departments: 0,
    averageSalary: 0,
    activeProjects: 0,
    upcomingBirthdays: 0,
    pendingReviews: 0,
    employeeSatisfaction: 0
  };

  recentActivities: RecentActivity[] = [];
  departmentStats: DepartmentStats[] = [];
  topPerformers: any[] = [];
  upcomingEvents: any[] = [];
  
  // Add these properties to fix template errors
  currentDate = new Date();
  lastUpdated = new Date();

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Simulate loading data - in real app, this would come from services
    this.stats = {
      totalEmployees: 127,
      newHiresThisMonth: 8,
      departments: 6,
      averageSalary: 87500,
      activeProjects: 12,
      upcomingBirthdays: 5,
      pendingReviews: 23,
      employeeSatisfaction: 4.2
    };

    this.departmentStats = [
      { name: 'Engineering', count: 45, percentage: 35.4, color: '#007bff' },
      { name: 'Marketing', count: 28, percentage: 22.0, color: '#28a745' },
      { name: 'Sales', count: 22, percentage: 17.3, color: '#ffc107' },
      { name: 'HR', count: 15, percentage: 11.8, color: '#dc3545' },
      { name: 'Finance', count: 12, percentage: 9.4, color: '#6f42c1' },
      { name: 'Operations', count: 5, percentage: 3.9, color: '#17a2b8' }
    ];

    this.recentActivities = [
      {
        id: '1',
        type: 'hire',
        message: 'New employee joined',
        timestamp: new Date('2024-01-15T10:30:00'),
        employeeName: 'Sarah Johnson'
      },
      {
        id: '2',
        type: 'anniversary',
        message: 'Work anniversary',
        timestamp: new Date('2024-01-14T09:00:00'),
        employeeName: 'Mike Chen'
      },
      {
        id: '3',
        type: 'birthday',
        message: 'Birthday today',
        timestamp: new Date('2024-01-13T08:00:00'),
        employeeName: 'Emily Davis'
      },
      {
        id: '4',
        type: 'update',
        message: 'Profile updated',
        timestamp: new Date('2024-01-12T14:20:00'),
        employeeName: 'David Wilson'
      }
    ];

    this.topPerformers = [
      { name: 'Alice Smith', department: 'Engineering', rating: 4.9, projects: 5 },
      { name: 'Bob Johnson', department: 'Marketing', rating: 4.8, projects: 3 },
      { name: 'Carol Davis', department: 'Sales', rating: 4.7, projects: 4 }
    ];

    this.upcomingEvents = [
      { title: 'Team Building Event', date: new Date('2024-01-20'), type: 'event' },
      { title: 'Performance Review Deadline', date: new Date('2024-01-25'), type: 'deadline' },
      { title: 'Company Meeting', date: new Date('2024-01-30'), type: 'meeting' }
    ];
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'hire': return 'fas fa-user-plus text-success';
      case 'anniversary': return 'fas fa-calendar-check text-warning';
      case 'birthday': return 'fas fa-birthday-cake text-info';
      case 'update': return 'fas fa-edit text-primary';
      default: return 'fas fa-circle text-secondary';
    }
  }

  navigateToEmployeeList() {
    this.router.navigate(['/employee-list']);
  }

  navigateToEmployeeForm() {
    this.router.navigate(['/employee-form']);
  }

  getSatisfactionColor(rating: number): string {
    if (rating >= 4) return 'text-success';
    if (rating >= 3) return 'text-warning';
    return 'text-danger';
  }

  getSatisfactionStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';
    return stars;
  }
}



 