import { Component, signal } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './detalle-parte.html',
  styleUrl: './detalle-parte.css'
})
export class DetalleParte {
  protected readonly title = signal('manse');
}