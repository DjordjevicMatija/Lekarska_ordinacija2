import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class AutentikacijaLekarService implements CanActivate{

  constructor(private router: Router) { }

  ulogovanKorisnik: Korisnik;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.ulogovanKorisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
    if (this.ulogovanKorisnik != null && this.ulogovanKorisnik.tip == 'lekar') {
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
