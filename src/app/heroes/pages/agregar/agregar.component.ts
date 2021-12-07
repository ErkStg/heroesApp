import { Component, OnInit } from '@angular/core';
import { Publisher, Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  creadores = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe : Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    publisher: Publisher.DCComics,
    first_appearance: '',
    alt_image: ''
  }

  constructor( private heroesService : HeroesService,
               private ActivatedRoute : ActivatedRoute,
               private router : Router,
               private snackBar : MatSnackBar,
               private dialog : MatDialog) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }

    this.ActivatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorId(id))
      )  
      .subscribe( heroe => this.heroe = heroe)
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){ return;}

    if(this.heroe.id){
      this.heroesService.actualizarHeroe( this.heroe );
      this.mostrarSnacBar("Registro actualizado");
    }
    else{
      this.heroesService.agregarHeroe( this.heroe )
      .subscribe( resp => this.router.navigate(['/heroes/editar', resp.id]));
      this.mostrarSnacBar("Registro creado");
    }
  }

  borrarHeroe(){

    const dialog = this.dialog.open(ConfirmarComponent, {
      data: {...this.heroe}
    });

    dialog.afterClosed().subscribe( (result) => {
      if(result){
        this.heroesService.borrarHeroe(this.heroe.id!)
        .subscribe( resp => this.router.navigate(['/heroes']))
      }
    })
  }

  mostrarSnacBar( mensaje: string){
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    });
  }
}
