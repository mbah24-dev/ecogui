import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoleService } from '../../../role.service';

@Component({
  selector: 'app-home',
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isSignin!: boolean;
  isSignup!: boolean;

  constructor(private router: Router, private roleService: RoleService) {}

  ngOnInit(): void {
    this.isSignin = false;
    this.isSignup = false;
  }

  signinBlock(): void {
    this.isSignin = !this.isSignin;
    this.isSignup = false;
  }

  signupBlock(): void {
    this.isSignup = !this.isSignup;
    this.isSignin = false;
  }

  nav_signin(role: 'buyer' | 'seller' | 'admin' = 'buyer'): void {
    this.roleService.setRole(role);
    this.router.navigate(['/signin']);
  }

  nav_signup(role: 'buyer' | 'seller' = 'buyer'): void {
    this.roleService.setRole(role);
    this.router.navigate(['/signup']);
  }
}
