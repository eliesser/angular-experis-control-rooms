import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { ModalComponent } from '../../../components/modal/modal.component';
import { IModalOptions } from '../../interfaces/modal-options.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  newComponent!: ComponentRef<any>;
  newModalComponent!: ComponentRef<ModalComponent>;
  modalOptions!: IModalOptions | undefined;

  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  open(
    vcrOrComponent: ViewContainerRef,
    content: TemplateRef<Element>,
    modalOptions?: IModalOptions
  ): void;

  open<C>(vcrOrComponent: Type<C>, modalOptions?: IModalOptions): void;

  open<C>(
    vcrOrComponent: ViewContainerRef | Type<C>,
    param2?: TemplateRef<Element> | IModalOptions,
    modalOptions?: IModalOptions
  ) {
    if (vcrOrComponent instanceof ViewContainerRef) {
      this.openWithTemplate(vcrOrComponent, param2 as TemplateRef<Element>);
      this.modalOptions = {
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        ...modalOptions,
      } as IModalOptions;
    } else {
      this.openWithComponent(vcrOrComponent);
      this.modalOptions = param2 as IModalOptions | undefined;
    }
  }

  private openWithTemplate(
    vcr: ViewContainerRef,
    content: TemplateRef<Element>
  ) {
    vcr.clear();

    const innerContent = vcr.createEmbeddedView(content);

    this.newModalComponent = vcr.createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [innerContent.rootNodes],
    });
  }

  private openWithComponent(component: Type<unknown>) {
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });

    this.newModalComponent = createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });

    document.body.appendChild(this.newModalComponent.location.nativeElement);

    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModalComponent.hostView);

    this.newComponent = newComponent;
  }

  close() {
    this.newModalComponent.instance.close();
  }
}
