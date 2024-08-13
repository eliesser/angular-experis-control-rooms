// Angular imports
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Project imports
import { HeaderComponent, LoadingComponent } from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
