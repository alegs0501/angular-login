import { AccessStorageService } from './../services/storage/access-storage.service'
import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router"
import { Observable, of } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class LoginAccessGuard implements CanActivate {

  token: any

  constructor(
    private router: Router,
    private ephemeralStorage: AccessStorageService
    ){
    this.ephemeralStorage.token.subscribe( x => {this.token = x })
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.token !== undefined && this.token !== null && this.token !== ''){
        this.router.navigate(['users'])
        return false
      }else{
        return true
      }

      return of(false)
  }

}
