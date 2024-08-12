import { Component, OnInit, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { LoadingService } from '../../shared/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit {
  isLoading: boolean = false;

  private loadingService = inject(LoadingService);

  ngOnInit() {
    this.loadingService.isLoadingWatch().subscribe((value: boolean) => {
      this.isLoading = value;
    });
  }
}
