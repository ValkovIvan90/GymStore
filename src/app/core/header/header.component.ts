import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserAuthService } from 'src/app/user/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userEmail = '';
  isAuth = false;
  authSubscription!: Subscription;
  emailSubscription!: Subscription;

  constructor(private authS: UserAuthService) { }

  ngOnInit() {
    this.authSubscription = this.authS.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
    this.emailSubscription = this.authS.emailChange.subscribe((email) => {      
      this.userEmail = email;
    })

  };
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  };

  logout() {
    this.authS.logout();
    this.isAuth = false;
  }
}
