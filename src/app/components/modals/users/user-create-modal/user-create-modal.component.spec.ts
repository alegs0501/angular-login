import { FormsModule, ReactiveFormsModule } from '@angular/forms'
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { UserCreateModalComponent } from './user-create-modal.component'
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js')

describe('UserCreateModalComponent', () => {
  let component: UserCreateModalComponent
  let fixture: ComponentFixture<UserCreateModalComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateModalComponent ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
