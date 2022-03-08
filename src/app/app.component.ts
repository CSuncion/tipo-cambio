import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoCambio } from './models/tipocambio';
import { TipocambioService } from './services/tipocambio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tipo-cambio';
  public lista: TipoCambio[] = [];
  public tipo = new TipoCambio();


  miFormulario: FormGroup = this.fb.group({
    monto: [, [Validators.required, Validators.minLength(3)]],
    monedaOrigen: [, [Validators.required, Validators.minLength(3)]],
    monedaDestino: [, [Validators.required, Validators.minLength(3)]]
  })
  constructor(private tipoCambioService: TipocambioService,
    private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.getTipoCambio();
    this.miFormulario.setValue({
      monto: 100,
      monedaOrigen: 'SOL',
      monedaDestino: 'USD'
    });
    // this.getTipoCambio();
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  getTipoCambio() {
      this.tipoCambioService.getTipoCambio().subscribe((data) => {
        this.lista = data;
      });
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.tipo.Monto = this.miFormulario.value.monto;
    this.tipo.MonedaOrigen = this.miFormulario.value.monedaOrigen;
    this.tipo.MonedaDestino = this.miFormulario.value.monedaDestino;

    this.tipoCambioService.postTipoCambio(
      this.tipo
    ).subscribe(
      resp => {
        this.getTipoCambio();
      }
    );

  }
}
