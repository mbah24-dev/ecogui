import { UserService } from './../../buyer/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';
import { User } from '../../buyer/models/user/user.model';
import { Enviroment } from '../../buyer/utils/eviroment';

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet, MatCardModule, RouterLinkActive, RouterLink, FeathericonsModule, MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{

    userData!: User | null;
    profileImage!: string;

    constructor(private userService: UserService, private enviroment: Enviroment) {}

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
}
