import { Component, ElementRef, Input, OnInit } from '@angular/core'
declare var window: any

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.scss']
})
export class ModalSuccessComponent implements OnInit {

  @Input() message: string = ''
  modal: any

  constructor(private elRef:ElementRef) { }

  ngOnInit() {
    this.modal = new window.bootstrap.Modal(
      this.elRef.nativeElement.querySelector('#modalSuccess')
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
