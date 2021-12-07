import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe !: Heroe;

  constructor(private activatedRoute : ActivatedRoute,
              private HeroesService : HeroesService,
              private router : Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => 
        this.HeroesService.getHeroePorId( id ))
      )
      .subscribe( respuesta => 
        this.heroe = respuesta
      )
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }
}