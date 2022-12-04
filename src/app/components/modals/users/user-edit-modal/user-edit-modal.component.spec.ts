/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { UserEditModalComponent } from './user-edit-modal.component'

describe('UserEditModalComponent', () => {
  let component: UserEditModalComponent
  let fixture: ComponentFixture<UserEditModalComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditModalComponent ]
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
