import { Injectable } from '@angular/core';
import auth from 'firebase/app';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()

export class UserAuthService {
  errMessageChange = new Subject<string>();
  errMsg = '';
  authChange = new Subject<boolean>();

  private userId = '';
  private token = '';
  private userEmail = '';

  constructor(private router: Router) { };

  register(email: string, password: string) {
    auth.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data: any) => {
      console.log(data);

      auth.auth().currentUser!.getIdToken().then((t) => {
        this.token = t;        
        this.authChange.next(this.isAuth());
        this.router.navigate(['/']);
      });
      this.setUserId();
    })
      .catch((err: any) => {
        this.errMsg = err.message;
        this.errMessageChange.next(this.errMsg);
        this.authChange.next(this.isAuth());
      });

  }
  login(email: string, password: string) {
    auth.auth()
      .signInWithEmailAndPassword(email, password)
      .then((data: any) => {

        auth.auth().currentUser!.getIdToken().then((t) => {
          this.token = t;
          this.authChange.next(this.isAuth());
          this.router.navigate(['/']);
        });
        this.setUserId();
      })
      .catch((err: any) => {

        this.errMsg = err.message;
        this.errMessageChange.next(this.errMsg);
        this.authChange.next(this.isAuth());
      });

  }

  isAuth() {
    if (this.token != '') {
      return true;
    }
    return false
  }

  logout() {
    this.token = '';
    this.authChange.next(this.isAuth());
  };

  getToken() {
    return this.token;
  };

  setUserId() {
    auth.auth().onAuthStateChanged((user: any) => {
      if (user) {
        this.userEmail = user.email;

        this.userId = user.uid;
      }
    });
  }
}
