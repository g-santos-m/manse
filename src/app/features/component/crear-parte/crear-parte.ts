import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-parte',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './crear-parte.html',
  styleUrl: './crear-parte.scss'
})
export class CrearParte {
  tracks = [
    { title: 'City Lights',  artist: 'Synth Academy', durationSec: 215, liked: false },
    { title: 'Analog Dreams', artist: 'Synth Academy', durationSec: 198, liked: false },
    { title: 'Rainy Window', artist: 'Lo-Fi Lab',      durationSec: 241, liked: false }
  ];

  lastAdded: string | null = null;

  onAddFromCard(t: { title: string; artist: string; durationSec: number }) {
    this.lastAdded = `${t.title} — ${t.artist}`;
    // (UD4) Aquí lo enviaríamos a un servicio para compartir con Playlists
  }
}

