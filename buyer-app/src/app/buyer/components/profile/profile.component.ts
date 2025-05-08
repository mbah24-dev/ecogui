import { FileUploadModule } from '@iplab/ngx-file-upload';
import { UserService } from './../../services/user/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, RouterLinkActive, RouterLink, Router } from '@angular/router';
import { FeathericonsModule } from '../../../shared/icons/feathericons/feathericons.module';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user/user.model';
import { Enviroment } from '../../utils/eviroment';


@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, FileUploadModule, MatCardModule, RouterLinkActive, RouterLink, FeathericonsModule, MatButtonModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    userData!: User | null;
    profileImage!: string;

    constructor(
        public router: Router,
        private userService: UserService,
        private enviroment: Enviroment) {}

    ngOnInit(): void {
        this.userService.user$.subscribe((user) => {
            this.userData = user;
            if (user?.profilePic) {
                const imageUrl = `${this.enviroment.apiUrl}/static/upload/images/user_profiles/${user.profilePic}`;

                this.userService.checkImageExists(imageUrl, (exists) => {
                    this.profileImage = exists ? imageUrl : 'images/user_avatar.png';
                });

            } else {
                this.profileImage = 'images/user_avatar.png';
            }
        });

        // charger le user au démarrage
        this.userService.loadUser();
    }

    isSidebarHidden(): boolean {
      return this.router.url === '/profile/orders/details'
          || this.router.url === '/profile/invoices/details'
          || this.router.url === '/profile/faq'
          || this.router.url === '/profile/contact';
    }

    triggerFileInput(): void {
      this.fileInput.nativeElement.click();
    }

    onImageSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (file) {
          const formData = new FormData();
          formData.append('image', file);
          this.userService.updateProfilePic(formData).subscribe({
                next: (res: any) => {
                    this.profileImage = `${this.enviroment.apiUrl}/static/upload/images/user_profiles/${res.user.profilePic}`;
                    this.userService.loadUser();
                },
                error: (err) => console.error(err.error.message)
          });
        }
    }

}
