import { LoginService } from './../../services/access/login.service'
import { AccessStorageService } from './../../services/storage/access-storage.service'
import { ProfileOBJ } from './../../interfaces/profileOBJ'
import { ModalSuccessComponent } from './../modals/modal-success/modal-success.component'
import { ProfileModel } from './../../models/profile-model'
import { SignupService } from './../../services/access/signup.service'
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login'
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { passwordMatchValidator, passwordStrengthValidator } from 'src/app/validators/password.validator'
import { Subscription } from 'rxjs'
import { ModalErrorComponent } from '../modals/modal-error/modal-error.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ProfileModel]
})
export class LoginComponent implements OnInit, OnDestroy {

  //observers $ subscriptions
  observerGoogleSession: any
  observerLogin: any
  observerSignup: any
  observerSignupGoogle: any

  subscriptionGoogleSession: Subscription | undefined
  subscriptionLogin: Subscription | undefined
  subscriptionSignup: Subscription | undefined
  subscriptionSignupGoogle: Subscription | undefined

  loginVisible = true
  loginInProgress = false
  registerInProgress = false

  formLogin = this.fb.group({
    email: ['', {validators: [Validators.required, Validators.email]}],
    password: ['', {validators: [Validators.required]}]
  })

  formSignup = this.fb.group({
    emailSU: ['', {validators: [Validators.required, Validators.email]}],
    passwordSU: ['', {validators: [Validators.required, Validators.minLength(6), passwordStrengthValidator()]}],
    passwordRepeatSU: ['', {validators: [Validators.required]}]
  }, {validators: [passwordMatchValidator()]})

  //ViewChilds
  @ViewChild(ModalErrorComponent) modalError: ModalErrorComponent | undefined
  @ViewChild(ModalSuccessComponent) modalSuccess: ModalSuccessComponent | undefined

  constructor(
    private accessStorage: AccessStorageService,
    private authService: SocialAuthService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private profileModel: ProfileModel,
    private router: Router,
    private signupService: SignupService
    ) { }

  ngOnDestroy(): void {
    this.unsubscriptions()
  }

  ngOnInit() {
    this.subscriptions()
  }

  //forms getters ->
    //form login
    get email() {
      return this.formLogin.controls['email']
    }

    get password() {
      return this.formLogin.controls['password']
    }

    //form login errors
    get emailTextError() {
      let text = ''
      if (this.email.invalid){
        if (this.email.errors?.['required']) text = 'Please type your email'
        else if (this.email.errors?.['email']) text = 'Please type a valid email'

      }
      return text
    }

    //form signup
    get emailSU() {
      return this.formSignup.controls['emailSU']
    }

    get passwordSU() {
      return this.formSignup.controls['passwordSU']
    }

    get passwordRepeatSU() {
      return this.formSignup.controls['passwordRepeatSU']
    }

    //form signup errors
    get emailSUTextError() {
      let text = ''
      if (this.emailSU.invalid){
        if (this.emailSU.errors?.['required']) text = 'Please type your email'
        else if (this.emailSU.errors?.['email']) text = 'Please type a valid email'

      }
      return text
    }

    get passwordSUTextError() {
      let text = ''
      if (this.passwordSU.invalid){
        if (this.passwordSU.errors?.['required']) text = 'Please type your password'
        else if (this.passwordSU.errors?.['minlength']) text = 'Minimum 6 characters'
        else if (this.passwordSU.errors?.['passwordStrength']) text = 'At least upper and lower letters and digit'

      }
      return text
    }

    get passwordMatchError(){
      return this.formSignup.hasError('passwordMatch')
    }

  //forms getters <-

  onSubmitLogin(): void{
    this.email.markAsTouched()
    this.password.markAsTouched()
    this.loginInProgress = true
    if (this.formLogin.valid){
      this.profileModel.login(this.email.value!.toString(), this.password.value!.toString())
    }else{
      this.loginInProgress = false
    }
  }

  onSubmitSignup(): void{
    this.emailSU.markAllAsTouched()
    this.passwordSU.markAllAsTouched()
    this.passwordRepeatSU.markAllAsTouched()
    this.registerInProgress = true
    if (this.formSignup.valid){
      this.profileModel.createProfile(this.emailSU.value!.toString(), this.passwordSU.value!.toString())
    }else{
      this.registerInProgress = false
    }
  }

  responseFromSignup(): void{
    this.registerInProgress = false
    if (this.observerSignup.status === 201){
      this.formSignup.reset()
      this.loginVisible = true
      if (this.modalSuccess) this.modalSuccess.showModal(this.observerSignup.message)
    }else{
      if (this.modalError) this.modalError.showModal(this.observerSignup.message)
    }
  }

  responseFromGoogle(user: any): void {
    this.profileModel.createProfileGoogle(user)
  }

  responseFromSignupGoogle() {
    if (this.observerSignupGoogle.status != 201) this.modalError?.showModal(this.observerSignupGoogle.message)
    else{
      const user = this.observerGoogleSession as ProfileOBJ
      this.accessStorage.setKey(user.idToken)
      this.router.navigate(['users'])
    }
  }

  responseLogin() {
    this.loginInProgress = false
    if (this.observerLogin.status == 200){
      const response = this.observerLogin.data as ProfileOBJ
      this.accessStorage.setKey(response.idToken)
      this.router.navigate(['users'])
    }else{
      if (this.modalError) this.modalError.showModal(this.observerLogin.message)
    }
  }

  setLoginVisibility(visible: boolean): void{
    this.formLogin.reset()
    this.formSignup.reset()
    this.loginVisible = visible
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  signOut(): void {
    this.authService.signOut()
  }

  subscriptions(): void{
    this.subscriptionGoogleSession = this.authService.authState.subscribe(user => {
      this.observerGoogleSession = user
      this.responseFromGoogle(user)
    })

    this.subscriptionLogin = this.loginService.response.subscribe( response => {
      this.observerLogin = response
      if (this.observerLogin){
        this.responseLogin()
      }
    })

    this.subscriptionSignup = this.signupService.response.subscribe(response => {
      this.observerSignup = response
      if (this.observerSignup){
        this.responseFromSignup()
      }
    })

    this.subscriptionSignupGoogle = this.signupService.responseGoogle.subscribe( response => {
      this.observerSignupGoogle = response
      if (this.observerSignupGoogle){
        this.responseFromSignupGoogle()
      }
    })
  }

  unsubscriptions(): void{
    if (this.subscriptionGoogleSession) this.subscriptionGoogleSession.unsubscribe()
    if (this.subscriptionLogin) this.subscriptionLogin.unsubscribe()
    if (this.subscriptionSignup) this.subscriptionSignup.unsubscribe()
    if (this.subscriptionSignupGoogle) this.subscriptionSignupGoogle.unsubscribe()
  }

}


