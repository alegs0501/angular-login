import { UserOBJ } from './../../interfaces/userOBJ'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USERS_URI = '/api/users'

  private responseCreateSubject = new BehaviorSubject(null)
  responseCreate = this.responseCreateSubject.asObservable()
  private responseGetUserSubject = new BehaviorSubject(null)
  responseGetUser = this.responseGetUserSubject.asObservable()
  private responsePageSubject = new BehaviorSubject(null)
  responsePage = this.responsePageSubject.asObservable()
  private responseUpdateSubject = new BehaviorSubject(null)
  responseUpdate = this.responseUpdateSubject.asObservable()

constructor() { }

async createUser(user: UserOBJ): Promise<any>{
  const path = `${environment.expressHost}${this.USERS_URI}/`
  const header = new Headers()
  header.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(user)
  }

  try {
    const response = await fetch(path, requestOptions)
    const result = await response.json()
    this.responseCreateSubject.next(result)
  } catch (error){
    this.responseCreateSubject.next({status: 400} as any)
  }
}

async getUser(id: number): Promise<any>{
  const path = `${environment.expressHost}${this.USERS_URI}/=${id}`
  const header = new Headers()
  header.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'GET',
    headers: header
  }

  try {
    const response = await fetch(path, requestOptions)
    const result = await response.json()
    this.responseGetUserSubject.next(result)
  } catch (error){
    this.responseGetUserSubject.next({status: 400} as any)
  }
}

async getUserPage(page: number): Promise<any>{
  const path = `${environment.expressHost}${this.USERS_URI}?page=${page}`
  const header = new Headers()
  header.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'GET',
    headers: header
  }

  try {
    const response = await fetch(path, requestOptions)
    const result = await response.json()
    this.responsePageSubject.next(result)
  } catch (error){
    this.responsePageSubject.next({status: 400} as any)
  }
}

async updateUser(user: UserOBJ): Promise<any>{
  const path = `${environment.expressHost}${this.USERS_URI}/${user.id}`
  const header = new Headers()
  header.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'PATCH',
    headers: header,
    body: JSON.stringify(user)
  }

  try {
    const response = await fetch(path, requestOptions)
    const result = await response.json()
    this.responseUpdateSubject.next(result)
  } catch (error){
    this.responseUpdateSubject.next({status: 400} as any)
  }
}


}
