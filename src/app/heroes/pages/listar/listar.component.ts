import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styles: []
})
export class ListarComponent implements OnInit {

  heroes : Heroe[] = [];

  constructor( private heroesService : HeroesService ) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
    .subscribe(resp => 
      this.heroes = resp  
    )

    this.heroes.push({
      superhero: 'Mr. Test',
      publisher: Publisher.DCComics,
      alter_ego: 'Tester aburrido',
      first_appearance: '',
      characters: 'tu mama'
    })
  }

}
