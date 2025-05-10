import { UserService } from './../../seller/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, RouterLinkActive, RouterLink, Router } from '@angular/router';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';
import { User } from '../../seller/models/user/user.model';
import { Environment } from '../../seller/utils/environment';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../seller/services/image/image.service';

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet, MatCardModule, RouterLinkActive, RouterLink, CommonModule, FeathericonsModule, MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{

    userData!: User | null;
    profileImage!: string;

    constructor(
        private userService: UserService,
        private environment: Environment,
        private router: Router,
        private imageService: ImageService
    ) {}

    ngOnInit(): void {
        this.userService.user$.subscribe((user) => {
            this.userData = user;
            if (user?.profilePic) {
                const imageUrl = this.imageService.getUserProfileImageUrl(user.profilePic);

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
        return this.router.url === '/privacy-policy'
            || this.router.url === '/terms-conditions'
    }
}
