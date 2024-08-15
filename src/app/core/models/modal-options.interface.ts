export interface IModalOptions {
  title: string;
  confirmButtonText: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  params?: any;
  accept: () => void;
  close: (value?: any) => void;
}
