import { SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login'
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

import { LoginComponent } from './login.component'
import { Observable } from 'rxjs'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  let socialAuthServiceMock: SpyObj<SocialAuthService>

  socialAuthServiceMock = createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut'])

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: SocialAuthService, useValue: {...socialAuthServiceMock, authState: new Observable()} }
      ],
      imports: [FormsModule, ReactiveFormsModule],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should return valid login form', () => {
    const email = component.email
    const password = component.password
    email.setValue('jonhdoe@email.es')
    password.setValue('Qwerty999')
    expect(component.formLogin.valid).toBeTrue()
  })

  it('should return valid signup form', () => {
    const email = component.emailSU
    const password = component.passwordSU
    const rePassword = component.passwordRepeatSU
    email.setValue('jonhdoe@email.es')
    password.setValue('Qwerty999')
    rePassword.setValue('Qwerty999')
    expect(component.formSignup.valid).toBeTrue()
  })
})
