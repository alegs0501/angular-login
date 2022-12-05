import { UserEditModalComponent } from './../modals/users/user-edit-modal/user-edit-modal.component'
import { UserCreateModalComponent } from './../modals/users/user-create-modal/user-create-modal.component'
import { PageOBJ } from './../../interfaces/pageOBJ'
import { UserModels } from './../../models/user-models'
import { UserService } from './../../services/users/user.service'
import { Subscription } from 'rxjs'
import { UserOBJ } from '../../interfaces/userOBJ'
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ModalErrorComponent } from '../modals/modal-error/modal-error.component'
import { ModalSuccessComponent } from '../modals/modal-success/modal-success.component'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserModels]
})
export class UserListComponent implements OnInit, OnDestroy {

  currentPage = 0
  loadingUsers = true
  maxPages = 0
  usersList: UserOBJ[] = []
  usersPerPage = 5

  //observers and subscriptions
  observerPage: any
  observerUser: any
  observerUserCreate: any
  observerUserUpdate: any


  subscriptionPage: Subscription | undefined
  subscriptionUser: Subscription | undefined
  subscriptionUserCreate: Subscription | undefined
  subscriptionUserUpdate: Subscription | undefined

  //ViewChilds
  @ViewChild(ModalErrorComponent) modalError: ModalErrorComponent | undefined
  @ViewChild(ModalSuccessComponent) modalSuccess: ModalSuccessComponent | undefined
  @ViewChild(UserCreateModalComponent) modalUserCreate: UserCreateModalComponent | undefined
  @ViewChild(UserEditModalComponent) modalUserEdit: UserEditModalComponent | undefined

  constructor(
    private userModel: UserModels,
    private userService: UserService
    ) { }

  ngOnDestroy(): void {
    this.unsubscribe()
  }

  ngOnInit() {
    this.subscribe()
    this.userModel.getPage(1)
  }

  getPage(page: number): void{
    this.loadingUsers = true
    this.userModel.getPage(page)
  }

  openCreateModal(): void{
    if (this.modalUserCreate) this.modalUserCreate.showModal()
  }

  openEditModal(id: number): void{
    this.modalUserEdit?.showModal(id)
    this.userModel.getUser(id)
  }

  responseUserCreate(): void{
    this.modalUserCreate?.hideModal()
    if (this.observerUserCreate.status == 201){
      if (this.usersList.length == this.usersPerPage) this.currentPage = this.currentPage + 1
      this.getPage(this.currentPage)
      this.showSuccess(this.observerUserCreate.message)
    }else{
      this.showError(this.observerUserCreate.message)
    }
  }

  responsePage(): void{
    this.loadingUsers = false
    if (this.observerPage.status == 200){
      const response = this.observerPage.data as PageOBJ
      this.currentPage = response.page
      this.maxPages = response.book
      this.usersList = response.users
    }else{
      this.showError(this.observerPage.message)
    }
  }

  responseUser() {
    if (this.observerUser.status != 200){
      setTimeout(() => {
        this.modalUserEdit?.hideModal()
        this.showError(this.observerUser.message)
      }, 1000)
    }else{
      this.modalUserEdit!.loadingUser = false
      this.modalUserEdit!.user = this.observerUser.data as UserOBJ
    }
  }

  showError(message: string): void{
    if(this.modalError) this.modalError?.showModal(message)
  }

  showSuccess(message: string): void{
    if(this.modalSuccess) this.modalSuccess?.showModal(message)
  }

  subscribe(): void{
    this.subscriptionUserCreate = this.userService.responseCreate.subscribe( response => {
      this.observerUserCreate = response
      if (this.observerUserCreate){
        this.responseUserCreate()
      }
    })

    this.subscriptionPage = this.userService.responsePage.subscribe( response => {
      this.observerPage = response
      if (this.observerPage){
        this.responsePage()
      }
    })

    this.subscriptionUser = this.userService.responseGetUser.subscribe( response => {
      this.observerUser = response
      if (this.observerUser){
        this.responseUser()
      }
    })

    this.subscriptionUserUpdate = this.userService.responseUpdate.subscribe( response => {
      this.observerUserUpdate = response
      if (this.observerUserUpdate){
        this.responseUpdate()
      }
    })
  }

  responseUpdate() {
    this.modalUserEdit?.hideModal()
    if (this.observerUserUpdate.status == 200){
      this.showSuccess(this.observerUserUpdate.message)
      this.getPage(this.currentPage)
    }else{
      this.showError(this.observerUserUpdate.message)
    }
  }

  unsubscribe(): void{
    if (this.subscriptionUserCreate) this.subscriptionUserCreate.unsubscribe()
    if (this.subscriptionPage) this.subscriptionPage.unsubscribe()
    if (this.subscriptionUser) this.subscriptionUser.unsubscribe()
    if (this.subscriptionUserUpdate) this.subscriptionUserUpdate.unsubscribe()
  }

}
