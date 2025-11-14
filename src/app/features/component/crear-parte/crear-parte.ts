import { Component, signal } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './crear-parte.html',
  styleUrl: './crear-parte.scss'
})
export class CrearParte {
  protected readonly title = signal('manse');
}
