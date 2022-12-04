import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AccessStorageService {

  storage = sessionStorage

  private tokenSubject = new BehaviorSubject('')
  token = this.tokenSubject.asObservable()

constructor() {
  this.getKey()
}

getKey(): void{
  const key = this.storage.getItem('key')
  if (key) this.setKey(key)
}

setKey(key: string): void{
  this.tokenSubject.next(key)
  this.storage.setItem('key', key)
}

}
