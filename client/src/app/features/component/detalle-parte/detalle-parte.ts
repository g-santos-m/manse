import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ParteService } from '../../../services/parte-service';
import { Parte } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-detalle-parte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-parte.html',
  styleUrl: './detalle-parte.css'
})
export class DetalleParte implements OnInit {

  listaTecnicos = [
    { id: 'tecnico1', nombre: 'Juan Pérez' },
    { id: 'tecnico2', nombre: 'Ana Gómez' },
    { id: 'tecnico3', nombre: 'Carlos López' },
    { id: 'tecnico4', nombre: 'María Rodríguez' },
    { id: 'tecnico5', nombre: 'Ninguno' }
  ];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private parteService = inject(ParteService);
  private idUrl = this.route.snapshot.paramMap.get('id');

  parte = signal<Parte | null>(null);

  getNombreTecnico(codigo: string | null | undefined): string {
    if (!codigo) return '— Sin asignar';
    const tecnico = this.listaTecnicos.find(t => t.id === codigo);
    return tecnico ? tecnico.nombre : codigo; 
  }

  ngOnInit(): void {
    console.log('--- BUSCANDO PARTE ID:', this.idUrl, ' ---');

    if (this.idUrl) {
      this.parteService.getPartes().subscribe({
        next: (res: any) => {
          let lista: any[] = [];
          if (Array.isArray(res)) {
            lista = res;
          } else if (res.data && Array.isArray(res.data)) {
            lista = res.data;
          }

          const encontrado = lista.find((p: any) => p.id == this.idUrl);

          if (encontrado) {
            encontrado.urgente = (encontrado.urgente == 1 || encontrado.urgente === true);
            this.parte.set(encontrado);
          } else {
            console.error('❌ No se encontró el ID en la lista');
          }
        },
        error: (err) => console.error('Error de red:', err)
      });
    }
  }

  volver(): void {
    this.router.navigate(['/listado-partes']);
  }

  // --- CORREGIDO: Navega a la ruta de edición ---
  editar(): void {
    const p = this.parte();
    if (p && p.id) {
      this.router.navigate(['/editar-parte', p.id]);
    }
  }

  borrarParte(): void {
    const confirmar = confirm("¿Seguro que quieres borrar el parte?")
    if (confirmar) {
      this.parteService.deleteParte(Number(this.idUrl)).subscribe({
        next: () => console.log("Parte borrado.")
      });
      this.router.navigate(['/listado-partes'])
    }
  }
}