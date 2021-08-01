import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(x=>console.log(x));
  }
  logout() {
    this.afAuth.signOut();
  }
}
