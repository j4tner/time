import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { LoadingController } from '@ionic/angular';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  user$: Observable<any>;

  private loading;
  constructor(
    private data: DataService,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alert: AlertService,
    private router: Router,
    private menu: MenuController
  ) {

  }

  ngOnInit() { }

  async signUp(userInput) {
    this.loadingCtrl.create({
      message: 'Please Wait...',
      translucent: true,
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });



    await this.afAuth.auth.createUserWithEmailAndPassword(userInput.email.toLowerCase(), userInput.password).then(
      (data) => {
        this.loading.dismiss();
        // Do Stuff
      },
      (err) => {
        this.loading.dismiss().then(() => {
          this.alert.customMessage('Error', err.message);
        });
      }
    );
  }

  async authNav() {
    await this.data.getCurrentUser().then((user) => {
      if (user.active === true) {
        this.menu.enable(true);

        // Do Stuff
      }
      if (user.uid && !user.active) {
        this.alert.customMessage('Account deactivated', '');
      }
    });
  }

  async signIn(email: string, password: string) {
    this.loadingCtrl.create({
      message: 'Please Wait...',
      translucent: true,
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });


    return this.afAuth.auth.signInWithEmailAndPassword(email.toLowerCase(), password).then(
      (success) => {
        this.authNav().then(() => {
          this.loading.dismiss();
        });
        return success;
      },
      (err) => {
        this.loading.dismiss().then(() => {
          this.alert.customMessage('Error', err.message);
        });
        return err.message;
      }
    );
  }

  async signOut() {
    await this.afAuth.auth.signOut().then(() => {
      this.user$ = of(null);
      this.router.navigateByUrl('/');
      this.menu.enable(false);
    });
  }

  async passwordReset(email) {
    await this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then((_) => {
        this.alert.customMessage('Success', 'Please check your email!');
      })
      .catch((err) => {
        this.alert.customMessage('Error', err.message);
      });
  }
}
