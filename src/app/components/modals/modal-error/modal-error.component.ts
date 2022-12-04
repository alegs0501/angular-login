import { Component, ElementRef, Input, OnInit } from '@angular/core'
declare var window: any

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

  @Input() message: string = ''
  modal: any

  constructor(private elRef:ElementRef) { }

  ngOnInit() {
    this.modal = new window.bootstrap.Modal(
      this.elRef.nativeElement.querySelector('#modalError')
    )
  }

  hideModal(text: string | undefined): void{
    if (text) this.message = text
    this.modal.hide()
  }

  showModal(text: string | undefined): void{
    if (text) this.message = text
    this.modal.show()
  }

}
