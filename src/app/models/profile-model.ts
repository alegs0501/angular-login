import { LoginService } from './../services/access/login.service'
import { Injectable } from '@angular/core'
import { ProfileOBJ } from '../interfaces/profileOBJ'
import { SignupService } from '../services/access/signup.service'

@Injectable()
export class ProfileModel {

  constructor(
    private loginService: LoginService,
    private signupService: SignupService
    ){}

  createProfile(email: string, password: string): void{

    const profile: ProfileOBJ = {
      id: 0,
      idToken: '',
      name: 'user',
      email: email,
      photoUrl: '',
      firstName: '',
      lastName: '',
      provider: 'SITE',
      password: btoa(password)
    }

    this.signupService.signup(profile)

  }

  createProfileGoogle(profile: ProfileOBJ): void{
    this.signupService.signupFromGoogle(profile)
  }

  login(email: string, password: string): void{
    this.loginService.login(email, password)
  }

  getProfile(): void{
    this.loginService.getUserInfo()
  }

}
