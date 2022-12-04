import { ProfileModel } from './../../models/profile-model'
import { ProfileOBJ } from './../../interfaces/profileOBJ'
import { Subscription } from 'rxjs'
import { LoginService } from './../../services/access/login.service'
import { Component, OnDestroy, OnInit } from '@angular/core'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileModel]
})
export class ProfileComponent implements OnInit, OnDestroy {

  name = ''
  email = ''
  image = ''

  //observers and subscriptions
  observerProfile: any

  subscriptionProfile: Subscription | undefined

  constructor(
    private loginService: LoginService,
    private profileModel: ProfileModel
    ) { }

  ngOnDestroy(): void {
    this.unsubscribe()
  }

  ngOnInit() {
    this.subscribe()
    this.profileModel.getProfile()
  }

  receiveUser(): void{
    if (this.observerProfile.status == 200){
      const user = this.observerProfile.data as ProfileOBJ
      this.name = user.name
      this.email = user.email
      this.image = user.photoUrl
    }
  }

  subscribe(): void{
    this.subscriptionProfile = this.loginService.responseUser.subscribe(response => {
      this.observerProfile = response
      if (this.observerProfile){
        this.receiveUser()
      }
    })
  }

  unsubscribe(): void{
    if (this.subscriptionProfile) this.subscriptionProfile.unsubscribe()
  }

}
