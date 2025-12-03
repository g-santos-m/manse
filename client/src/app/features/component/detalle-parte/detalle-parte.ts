import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ParteService } from '../../../services/parte-service'; // ← Revisa esta ruta
import { Parte } from '../../../interfaces/interfaces';       // ← Revisa esta ruta

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

  // Inicializamos en null. IMPORTANTE: El HTML debe esperar a que esto tenga datos
  parte = signal<Parte | null>(null);

  getNombreTecnico(codigo: string | null | undefined): string {
    if (!codigo) return '— Sin asignar';
    const tecnico = this.listaTecnicos.find(t => t.id === codigo);
    return tecnico ? tecnico.nombre : codigo; // Devuelve el nombre o el código si no lo encuentra
  }

  ngOnInit(): void {
    const idUrl = this.route.snapshot.paramMap.get('id');
    console.log('--- BUSCANDO PARTE ID:', idUrl, ' ---');

    if (idUrl) {
      // USAMOS getPartes() (PLURAL) PORQUE SABEMOS QUE EL LISTADO FUNCIONA
      this.parteService.getPartes().subscribe({
        next: (res: any) => {
          console.log('Datos recibidos:', res);
          
          let lista: any[] = [];

          // 1. Aplanamos la respuesta para tener siempre un array
          if (Array.isArray(res)) {
            lista = res;
          } else if (res.data && Array.isArray(res.data)) {
            lista = res.data;
          }

          // 2. Buscamos el ID (usamos == para que no importe si es string o number)
          const encontrado = lista.find((p: any) => p.id == idUrl);

          if (encontrado) {
            // Arreglamos el booleano urgente
            encontrado.urgente = (encontrado.urgente == 1 || encontrado.urgente === true);
            
            console.log('✅ ENCONTRADO:', encontrado);
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

  editar(): void {
    if (this.parte()) console.log('Editar ID:', this.parte()!.id);
  }
}