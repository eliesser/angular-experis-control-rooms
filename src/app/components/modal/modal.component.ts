// Angular imports
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Project imports
import { IModalOptions } from '../../shared/interfaces';
import { ModalService } from '../../shared/services';
import { LoadingComponent } from '..';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule, LoadingComponent],
  standalone: true,
})
export class ModalComponent implements OnInit {
  modalOptions!: IModalOptions | undefined;

  private modalService: ModalService = inject(ModalService);
  private element: ElementRef = inject(ElementRef);

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.modalService.close();
  }

  ngOnInit(): void {
    this.modalOptions = this.modalService.modalOptions;
  }

  close(): void {
    this.modalService.modalOptions = undefined;
    this.element.nativeElement.remove();
  }

  onClose(): void {
    this.modalService.close();
    this.modalOptions?.close();
  }

  onAccept(): void {
    this.modalOptions?.accept();
  }
}
