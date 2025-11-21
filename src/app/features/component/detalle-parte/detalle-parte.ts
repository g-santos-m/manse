import { Component, signal } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './detalle-parte.html',
<<<<<<< HEAD
  styleUrl: './detalle-parte.scss'
})
export class DetalleParte {
  protected readonly title = signal('manse');
}
=======
  styleUrl: './detalle-parte.css'
})
export class DetalleParte {
  protected readonly title = signal('manse');
}
>>>>>>> 166c2cc14bb55f6e344576cdd29dbbcb5002888b
