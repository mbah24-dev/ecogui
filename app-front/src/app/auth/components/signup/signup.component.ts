import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { RoleService } from '../../../role.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, NgIf, ReactiveFormsModule, NgStyle],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
    signupForm!: FormGroup;
    submitted: boolean = false;
    componentTilte: string = "Bconnect Shop";
    role: 'buyer' | 'seller' | 'admin' = 'buyer';
    errorMessage: string = '';

    constructor(private authService: AuthService,
      private router: Router, private formBuilder: FormBuilder,
      private route: ActivatedRoute, private roleService: RoleService) {}

    ngOnInit(): void {
      this.role = this.roleService.getRole();
      console.log({role: this.role});
      this.signupForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        name: ['', [Validators.required, Validators.minLength(2)]]
      });
    }

    onSubmit() {
      this.submitted = true;
      if (this.signupForm.valid) {
        this.signup(this.role, this.signupForm.value);
      }
    }

    signup(role:'buyer' | 'seller' | 'admin', userData: {email: string, password: string, name: string}) {
      this.authService.signup(role, userData).subscribe(
        {
          next: response => {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.roleService.setRole(this.role);
            this.router.navigate(['/dashboard']);
          },
          error: error => {
            this.errorMessage = 'Inscription échouée. Vérifiez vos infos..';
          }
        }
      );
    }

    nav_signin() {
      if (this.role)
        this.router.navigate(['/signin']);
    }
}
