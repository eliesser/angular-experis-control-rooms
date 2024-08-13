import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { IModalOptions } from '../../shared/interfaces/modal-options.interface';
import { ModalService } from '../../shared/services/modal/modal.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule, LoadingComponent],
  standalone: true,
})
export class ModalComponent implements OnInit {
  modalOptions!: IModalOptions | undefined;

  private modalService = inject(ModalService);
  private element = inject(ElementRef);

  @HostListener('document:keydown.escape')
  onEscape() {
    this.modalService.close();
  }

  ngOnInit() {
    this.modalOptions = this.modalService.modalOptions;
  }

  close() {
    this.modalService.modalOptions = undefined;
    this.element.nativeElement.remove();
  }

  onClose() {
    this.modalService.close();
    this.modalOptions?.close();
  }

  onAccept() {
    this.modalOptions?.accept();
  }
}
