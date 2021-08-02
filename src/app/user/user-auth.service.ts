import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase/app';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/switchMap';


@Injectable()
export class UserAuthService {
  errMessageChange = new Subject<string>();
  errMsg = '';
  authChange = new Subject<boolean>();
  emailChange = new Subject<string>();

  private userId = '';
  private token = '';
  private userEmail = '';

  constructor(
    private router: Router,
    private auth: AngularFireAuth
  ) { };

  register(email: string, password: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        value.user?.getIdToken().then((tk) => {
          this.token = tk;
          this.authChange.next(this.isAuth());
          this.router.navigateByUrl('/');
        });
        this.setUserEmail();
      })
      .catch((err) => {
        this.errMsg = err.message;
        this.errMessageChange.next(this.errMsg);
        this.authChange.next(this.isAuth());
      });
  }

  login(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        value.user?.getIdToken().then((tk) => {
          this.token = tk;
          this.authChange.next(this.isAuth());
          this.router.navigate(['/']);
        });
        this.setUserEmail();
      })
      .catch(err => {
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

  setUserEmail() {
    this.auth.onAuthStateChanged((user: any) => {
      if (user) {
        this.userEmail = user.email;
        this.userId = user.uid;
        this.emailChange.next(this.getUserEmail())
      }
    });
  }
  getUserEmail() {
    return this.userEmail;
  }
};
