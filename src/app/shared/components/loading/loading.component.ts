// Angular imports
import { Component, Input, OnInit, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

// Project imports
import { LoadingService } from '../../../core/services';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit {
  @Input() overlay: boolean = false;
  isLoading: boolean = false;

  private loadingService: LoadingService = inject(LoadingService);

  ngOnInit(): void {
    this.loadingService.isLoadingWatch().subscribe((value: boolean) => {
      this.isLoading = value;
    });
  }
}
