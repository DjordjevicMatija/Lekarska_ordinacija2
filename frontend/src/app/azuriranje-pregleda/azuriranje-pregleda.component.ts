import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VrstaPregleda } from '../models/vrsta-pregleda';
import { MenadzerService } from '../services/menadzer.service';

@Component({
  selector: 'app-azuriranje-pregleda',
  templateUrl: './azuriranje-pregleda.component.html',
  styleUrls: ['./azuriranje-pregleda.component.css']
})
export class AzuriranjePregledaComponent implements OnInit {

  constructor(private router: Router, private menadzerService: MenadzerService) { }

  ngOnInit(): void {
    this.pregled = JSON.parse(sessionStorage.getItem('pregled'));
    this.stariNaziv = this.pregled.naziv;
  }

  pregled: VrstaPregleda;
  stariNaziv: string;

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  poruka_pregled: string = '';
  poruka_trajanje: string = '';
  poruka_cena: string = '';

  proveriTrajanje() {
    if (this.pregled.trajanje_u_min <= 0) {
      this.poruka_trajanje = 'Trajanje pregleda mora biti pozitivan broj';
    } else {
      this.poruka_trajanje = '';
    }
  }

  postaviNaziv() {
    if (this.pregled.naziv.length === 0) return;
    const firstLetter = this.pregled.naziv.charAt(0).toUpperCase();
    const restOfString = this.pregled.naziv.slice(1).toLowerCase();
    this.pregled.naziv = firstLetter + restOfString;
  }

  proveriCenu() {
    if (this.pregled.cena <= 0) {
      this.poruka_cena = 'Cena pregleda mora biti pozitivan broj';
    } else {
      this.poruka_cena = '';
    }
  }

  azurirajPregled() {
    if (this.pregled.naziv != '' && this.pregled.cena != null && this.pregled.trajanje_u_min != null) {
      this.poruka_pregled = '';
    }
    else {
      this.poruka_pregled = 'Nisu uneti svi podaci';
    }
    if (this.poruka_cena == '' && this.poruka_pregled == '' && this.poruka_trajanje == '') {
      this.menadzerService.azurirajPregled(this.stariNaziv, this.pregled.naziv,
        this.pregled.specijalizacija, this.pregled.trajanje_u_min, this.pregled.cena).subscribe((preg: VrstaPregleda) => {
          if (preg != null) {
            alert('Uspešno ažuriran pregled');
          }
          sessionStorage.removeItem('pregled');
          sessionStorage.setItem('pregled', JSON.stringify(preg));
          this.pregled = JSON.parse(sessionStorage.getItem('pregled'));
          this.stariNaziv = this.pregled.naziv;
        })
    }
  }

}
