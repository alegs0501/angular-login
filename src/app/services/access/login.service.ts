import { AccessStorageService } from './../storage/access-storage.service'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: any

  private readonly LOGIN_URI = '/api/access/login/'
  private readonly PROFILE_URI = '/api/access/profile/'

  private responseUserSubject = new BehaviorSubject(null)
  responseUser = this.responseUserSubject.asObservable()
  private responseSubject = new BehaviorSubject(null)
  response = this.responseSubject.asObservable()

  constructor(private accessStorage: AccessStorageService) {
    accessStorage.token.subscribe(token => {
      this.token = token
    })
  }

  async login(email: string, password: string): Promise<any>{
    const path = `${environment.expressHost}${this.LOGIN_URI}`
    const header = new Headers()
    header.append('Content-Type', 'application/json')

    const bodyRequest = {
      email,
      password: btoa(password)
    }

    const requestOptions = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(bodyRequest)
    }

    try {
      const response = await fetch(path, requestOptions)
      const result = await response.json()
      this.responseSubject.next(result)
    } catch (error){
      this.responseSubject.next({status: 'error'} as any)
    }
  }

  logout(): void{
    this.accessStorage.setKey('')
  }

  async getUserInfo(): Promise<any>{
    const path = `${environment.expressHost}${this.PROFILE_URI}`
    const header = new Headers()
    header.append('Content-Type', 'application/json')

    const bodyRequest = {
      token: this.token
    }

    const requestOptions = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(bodyRequest)
    }

    try {
      const response = await fetch(path, requestOptions)
      const result = await response.json()
      this.responseUserSubject.next(result)
    } catch (error){
      this.responseUserSubject.next({status: 'error'} as any)
    }
  }

}
