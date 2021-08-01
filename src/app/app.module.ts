import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { ArticlesComponent } from './articles/articles.component';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from './user/user-auth.service';





@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    CoreModule,
    UserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    UserAuthService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
