import { ProfileOBJ } from '../../interfaces/profileOBJ'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private readonly SIGNUP_URI = '/api/access/signup/'
  private readonly SIGNUP_GOOGLE_URI = '/api/access/signupgoogle/'

  private responseSubject = new BehaviorSubject(null)
  response = this.responseSubject.asObservable()
  private responseGoogleSubject = new BehaviorSubject(null)
  responseGoogle = this.responseGoogleSubject.asObservable()

constructor() { }

async signup(profile: ProfileOBJ): Promise<any>{
  const path = `${environment.expressHost}${this.SIGNUP_URI}`
  const header = new Headers()
  header.append('Content-Type', 'application/json')



  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(profile)
  }

  try {
    const response = await fetch(path, requestOptions)
    const result = await response.json()
    this.responseSubject.next(result)
  } catch (error){
    this.responseSubject.next({status: 'error'} as any)
  }
}

async signupFromGoogle(profile: ProfileOBJ): Promise<any>{
  const path = `${environment.expressHost}${this.SIGNUP_GOOGLE_URI}`
  const header = new Headers()
  header.append('Content-Type', 'application/json')



  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(profile)
  }

  try {
    const response = await fetch(path, requestOptions)
    const result = await response.json()
    this.responseGoogleSubject.next(result)
  } catch (error){
    this.responseGoogleSubject.next({status: 'error'} as any)
  }
}


}
