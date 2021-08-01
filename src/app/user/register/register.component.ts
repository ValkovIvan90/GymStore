import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  regErrorMessage!: string;
  errorSubs!: Subscription;
  checkPassword = false;

  constructor(private auth: UserAuthService) { }

  ngOnInit() {
    this.errorSubs = this.auth.errMessageChange.subscribe((err) => {
      this.regErrorMessage = err;
    })
  }
  ngOnDestroy() {
    this.errorSubs.unsubscribe();
  };
  onReg(f: NgForm) {
    this.check(f.value.password, f.value.passwordConfirmed);
    if (!this.checkPassword) {
      return;
    } else {
      let email = f.value.email;
      let password = f.value.password;
      this.auth.register(email, password)
    }
  }

  check(password: string, passwordConfirmed: string) {

    if (password === passwordConfirmed) {
      this.checkPassword = true;
    } else {
      this.checkPassword = false
    }
  }
}
