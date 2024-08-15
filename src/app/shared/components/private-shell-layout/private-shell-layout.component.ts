// Angular imports
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Project imports
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-private-shell-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './private-shell-layout.component.html',
  styleUrl: './private-shell-layout.component.scss',
})
export class PrivateShellLayoutComponent {}
