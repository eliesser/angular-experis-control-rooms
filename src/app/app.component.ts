// Angular imports
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Project imports
import { LoadingComponent } from './shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
