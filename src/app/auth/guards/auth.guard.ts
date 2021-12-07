import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree, ɵangular_packages_router_router_h } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private AuthService: AuthService,
              private router : Router){

  }
 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      return this.AuthService.verificarAutenticacion()
              .pipe(
                  tap( estaAutenticado => {
                  if( !estaAutenticado){
                    this.router.navigate(['./auth/login'])
                  }
              }));
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    
      return this.AuthService.verificarAutenticacion()
              .pipe(
                  tap( estaAutenticado => {
                  if( !estaAutenticado){
                    this.router.navigate(['./auth/login'])
                  }
              }));
              
  }
}
