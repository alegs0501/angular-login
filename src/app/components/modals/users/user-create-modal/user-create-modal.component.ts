import { Component, ElementRef, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { UserModels } from 'src/app/models/user-models'
declare var window: any

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.scss'],
  providers: [UserModels]
})
export class UserCreateModalComponent implements OnInit {

  modal: any
  creatingUser = false

  formCreateUSer = this.fb.group({
    email: ['', {validators: [Validators.required, Validators.email]}],
    name: ['', {validators: [Validators.required]}],
    job: ['', {validators: [Validators.required]}]
  })

  constructor(
    private elRef:ElementRef,
    private fb: FormBuilder,
    private userModel: UserModels
    ) { }

  ngOnInit() {
    this.modal = new window.bootstrap.Modal(
      this.elRef.nativeElement.querySelector('#modalUserCreate')
    )
  }

  //form getters ->
  get email() {
    return this.formCreateUSer.controls['email']
  }

  get job() {
    return this.formCreateUSer.controls['job']
  }

  get name() {
    return this.formCreateUSer.controls['name']
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
    this.formCreateUSer.reset()
  }

  onSubmit(): void{
    this.creatingUser = true
    if (this.formCreateUSer.valid){
      this.userModel.createUser(this.name.value!.toString(), this.email.value!.toString(), this.job.value!.toString())
    }else{
      this.email.markAsTouched()
      this.name.markAsTouched()
      this.job.markAsTouched()
      this.creatingUser = false
    }
  }

  showModal(): void{
    this.creatingUser = false
    this.formCreateUSer.reset()
    this.modal.show()
  }

}
