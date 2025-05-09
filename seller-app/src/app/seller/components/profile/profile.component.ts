import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, RouterLinkActive, RouterLink, Router } from '@angular/router';
import { FeathericonsModule } from '../../../shared/icons/feathericons/feathericons.module';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';
import { Environment } from '../../utils/environment';
import { ImageService } from '../../services/image/image.service';


@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, MatCardModule, RouterLinkActive, RouterLink, FeathericonsModule, MatButtonModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
/**
 * Composant Angular affichant et gérant le profil utilisateur.
 * Permet le chargement des informations de l'utilisateur, l'affichage de sa photo de profil
 * et la mise à jour de celle-ci via un input fichier.
 */
export class ProfileComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    userData!: User | null;
    profileImage!: string;

    constructor(
        public router: Router,
        private userService: UserService,
        private environment: Environment,
        private imageService: ImageService
    ) {}

    /**
   * Initialise le composant, charge les données utilisateur, et définit l'image de profil.
   */
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

    /**
   * Détermine si la sidebar doit être masquée en fonction de la route actuelle.
   * @returns `true` si la sidebar doit être masquée, sinon `false`.
   */
    isSidebarHidden(): boolean {
      return this.router.url === '/profile/orders/details'
          || this.router.url === '/profile/invoices/details'
          || this.router.url === '/faq'
          || this.router.url === '/contact';
    }

    /**
   * Déclenche manuellement l'ouverture de l'input de sélection de fichier.
   */
    triggerFileInput(): void {
      this.fileInput.nativeElement.click();
    }

    /**
   * Gère la sélection d'une nouvelle image de profil,
   * envoie le fichier au backend et met à jour l'image affichée.
   * @param event L'événement de changement de fichier (input file).
   */
    onImageSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (file) {
          const formData = new FormData();
          formData.append('image', file);
          this.userService.updateProfilePic(formData).subscribe({
                next: (res: any) => {
                    this.profileImage = this.imageService.getUserProfileImageUrl(res.user.profilePic);
                    this.userService.loadUser();
                },
                error: (err) => console.error(err.error.message)
          });
        }
    }

}
