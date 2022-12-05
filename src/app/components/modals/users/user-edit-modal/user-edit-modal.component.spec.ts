import { UserModels } from 'src/app/models/user-models'
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { UserEditModalComponent } from './user-edit-modal.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js')

describe('UserEditModalComponent', () => {
  let component: UserEditModalComponent
  let fixture: ComponentFixture<UserEditModalComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditModalComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [UserModels]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
