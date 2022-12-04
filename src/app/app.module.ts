import { ProfileComponent } from './components/profile/profile.component';
import { UserCreateModalComponent } from './components/modals/users/user-create-modal/user-create-modal.component'
import { UserEditModalComponent } from './components/modals/users/user-edit-modal/user-edit-modal.component'
import { DenoNumberPipe } from './pipes/deno-number.pipe'
import { UserListComponent } from './components/user-list/user-list.component'
import { ModalErrorComponent } from './components/modals/modal-error/modal-error.component'
import { ModalSuccessComponent } from './components/modals/modal-success/modal-success.component'
import { LoginComponent } from './components/login/login.component'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login'
import { environment } from 'src/environments/environment'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    DenoNumberPipe,
    LoginComponent,
    ModalErrorComponent,
    ModalSuccessComponent,
    ProfileComponent,
    UserCreateModalComponent,
    UserEditModalComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleAuthId
            )
          }
        ],
        onError: (err: any) => {
          console.error(err)
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
