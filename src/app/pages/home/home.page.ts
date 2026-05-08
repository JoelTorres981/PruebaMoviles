import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';

import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonLabel,
    IonFab,
    IonFabButton,
    IonIcon
  ]
})
export class HomePage {
  email = '';
  password = '';
  mensaje = '';
  profilePic = './assets/Perfil.png';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    addIcons({ camera });
  }

  async logout() {
    const { error } = await this.supabaseService.logout();
    if (error) {
      this.mensaje = error.message;
      return;
    }
    this.router.navigateByUrl('/login');
  }

  async changeProfilePic() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });

      if (image.webPath) {
        this.profilePic = image.webPath;
      }
    } catch (e) {
      console.log('User cancelled photos app');
    }
  }
}
