/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js')


import { ModalErrorComponent } from './modal-error.component'
import { Modal } from 'bootstrap'

describe('ModalErrorComponent', () => {
  let component: ModalErrorComponent
  let fixture: ComponentFixture<ModalErrorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalErrorComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalErrorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
