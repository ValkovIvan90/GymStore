import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';




@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('btn', { static: true })
  btn!: ElementRef;
  password!: string;
  loginErrorMessage!: string;
  errorSubscription!: Subscription;


  constructor(private auth: UserAuthService) { };

  ngOnInit() {
    this.errorSubscription = this.auth.errMessageChange.subscribe((err) => {
      this.loginErrorMessage = err
    });
    this.btn.nativeElement.disabled = true;
  };

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  };

  onLogin(f: NgForm) {
    let email = f.value.email;
    let password = f.value.password;
    this.auth.login(email, password);
  }
}
