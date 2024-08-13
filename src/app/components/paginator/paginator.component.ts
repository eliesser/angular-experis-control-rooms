// Angular imports
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() page!: number;
  @Input() totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();

  buttonsToView: number = 2;
  leftButtons: number[] = [];
  rightButtons: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) this.getLeftAndRightButtons();
  }

  ngOnInit(): void {
    this.getLeftAndRightButtons();
  }

  onGoToPage(page: number): void {
    this.page = page;

    this.getLeftAndRightButtons();

    this.pageChange.emit(this.page);
  }

  onNextPage(): void {
    if (this.page < this.totalPages) this.page++;

    this.getLeftAndRightButtons();

    this.pageChange.emit(this.page);
  }

  onPreviousPage(): void {
    if (this.page > 1) this.page--;

    this.getLeftAndRightButtons();

    this.pageChange.emit(this.page);
  }

  private getLeftAndRightButtons(): void {
    let leftButtons = this.page - this.buttonsToView;

    if (leftButtons <= 0) leftButtons = 1;

    this.leftButtons = [];

    for (let i = leftButtons; i < this.page; i++) {
      this.leftButtons.push(i);
    }

    let rightButtons = this.page + this.buttonsToView;

    if (rightButtons >= this.totalPages) rightButtons = this.totalPages;

    this.rightButtons = [];

    for (let i = this.page + 1; i <= rightButtons; i++) {
      this.rightButtons.push(i);
    }
  }
}
