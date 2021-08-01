import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from '../core/core.module';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from './user-auth.service';



@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        UserRoutingModule,

    ],
    providers: [
        UserAuthService
    ]
    ,
    exports: [
        LoginComponent,
        RegisterComponent
    ]
})
export class UserModule { }
