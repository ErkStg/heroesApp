import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen'
})
export class ImagenPipePipe implements PipeTransform {

  transform(heroe: Heroe): string {
    if(!heroe.id && !heroe.alt_image)
    {
      return `assets/no-image.png`;
    }
    else if(heroe.alt_image){
      return heroe.alt_image;
    }
    else{
    return `assets/heroes/${heroe.id}.jpg`;
  }
  }
}