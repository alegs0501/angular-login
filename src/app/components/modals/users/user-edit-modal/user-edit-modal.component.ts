import { UserOBJ } from './../../../../interfaces/userOBJ'
import { Subscription } from 'rxjs'
import { UserService } from './../../../../services/users/user.service'
import { Component, ElementRef, Input, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { UserModels } from 'src/app/models/user-models'
declare var window: any

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit {

  modal: any
  updatingUser = false
  loadingUser = true
  userdID = 0



  formEditUser = this.fb.group({
    email: ['', {validators: [Validators.required, Validators.email]}],
    name: ['', {validators: [Validators.required]}],
    job: ['', {validators: [Validators.required]}]
  })

  //observers and subscriptions
  observerUser: any
  subscriptionUser: Subscription | undefined

  //Inputs
  private _user: UserOBJ | undefined

  get user(): any{
    return this._user
  }

  @Input() set user(value: UserOBJ){
    this._user = value
    if (this._user) {
      this.email.setValue(this._user.email)
      this.name.setValue(this._user.name)
      this.job.setValue(this._user.job)
    }
  }

  constructor(
    private elRef:ElementRef,
    private fb: FormBuilder,
    private userModel: UserModels,
    private userService: UserService
    ) { }


  ngOnInit() {
    this.modal = new window.bootstrap.Modal(
      this.elRef.nativeElement.querySelector('#modalUserEdit')
    )
  }

  //form getters ->
  get email() {
    return this.formEditUser.controls['email']
  }

  get job() {
    return this.formEditUser.controls['job']
  }

  get name() {
    return this.formEditUser.controls['name']
  }

  //form errors
  get emailTextError() {
    let text = ''
    if (this.email.invalid){
      if (this.email.errors?.['required']) text = 'Please type the email'
      else if (this.email.errors?.['email']) text = 'Please type a valid email'

    }
    return text
  }
  //form getters <-


  hideModal(): void{
    this.modal.hide()
  }

  onClose(): void{
    this.formEditUser.reset()
  }

  onSubmit(): void{
    this.updatingUser = true
    if (this.formEditUser.valid){
      this.userModel.updateUser(this.userdID, this.name.value!.toString(), this.email.value!.toString(), this.job.value!.toString())
    }else{
      this.email.markAsTouched()
      this.name.markAsTouched()
      this.job.markAsTouched()
      this.updatingUser = false
    }
  }

  showModal(id: number): void{
    this.loadingUser = true
    this.userdID = id
    this.updatingUser = false
    this.formEditUser.reset()
    this.modal.show()
  }



}
