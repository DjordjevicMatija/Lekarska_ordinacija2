import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Specijalizacija } from 'src/app/models/specijalizacija';
import { VrstaPregleda } from 'src/app/models/vrsta-pregleda';
import { ZahtevPregled } from 'src/app/models/zahtev-pregled';
import { MenadzerService } from 'src/app/services/menadzer.service';

@Component({
  selector: 'app-menadzer-zahtev-pregled',
  templateUrl: './menadzer-zahtev-pregled.component.html',
  styleUrls: ['./menadzer-zahtev-pregled.component.css']
})
export class MenadzerZahtevPregledComponent implements OnInit {

  constructor(private router: Router, private menadzerService: MenadzerService) { }

  ngOnInit(): void {
    this.menadzerService.dohvatiZahtevPregled().subscribe((zah: ZahtevPregled[]) => {
      this.sviZahtevi = zah;
    });
    this.menadzerService.dohvatiSpecijalizacije().subscribe((s: Specijalizacija[]) => {
      this.sveSpecijalizacije = s;
    });
  }

  sviZahtevi: ZahtevPregled[] = [];

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  odobriPregled(zahtev: ZahtevPregled) {
    this.menadzerService.odobriPregled(zahtev.naziv, zahtev.specijalizacija).subscribe(resp => {
      alert(resp['message']);
      this.menadzerService.dohvatiZahtevPregled().subscribe((zah: ZahtevPregled[]) => {
        this.sviZahtevi = zah;
      });
      if(this.specijalizacijaIzabrana){
        this.prikaziPreglede();
      }
    })
  }

  odbijPregled(zahtev: ZahtevPregled) {
    this.menadzerService.odbijPregled(zahtev.naziv, zahtev.specijalizacija).subscribe(resp => {
      alert(resp['message']);
      this.menadzerService.dohvatiZahtevPregled().subscribe((zah: ZahtevPregled[]) => {
        this.sviZahtevi = zah;
      });
    })
  }

  specijalizacija: string = '';

  dodajSpecijalizaciju() {
    if (this.specijalizacija != '') {
      const spec = this.specijalizacija.toLocaleLowerCase();
      this.menadzerService.dodajSpecijalizaciju(spec).subscribe(resp => {
        alert(resp['message']);
        this.specijalizacija = '';
      })
    }
  }

  izabranaSpecijalizacija: string = '';
  sveSpecijalizacije: Specijalizacija[] = [];
  preglediSpec: VrstaPregleda[] = [];

  prikaziPreglede() {
    this.menadzerService.dohvatiPreglede(this.izabranaSpecijalizacija).subscribe((preg: VrstaPregleda[]) => {
      this.preglediSpec = preg;
    })
    this.specijalizacijaIzabrana = true;
  }

  //TODO
  izmeniPregled(preg: VrstaPregleda) {
    sessionStorage.setItem('pregled', JSON.stringify(preg));
    this.router.navigate(['menadzer/azuriranje-pregleda']);
  }

  obrisiPregled(preg: VrstaPregleda) {
    this.menadzerService.obrisiPregled(preg.naziv, preg.specijalizacija).subscribe(resp=>{
      alert(resp['message']);
      this.prikaziPreglede();
    })
  }

  specijalizacijaIzabrana: boolean = false;

  pregled: string = '';
  trajanje: number = 30;
  cena: number = null;

  poruka_pregled: string;
  poruka_trajanje: string;
  poruka_cena: string;

  postaviNaziv() {
    if (this.pregled.length === 0) return;
    const firstLetter = this.pregled.charAt(0).toUpperCase();
    const restOfString = this.pregled.slice(1).toLowerCase();
    this.pregled = firstLetter + restOfString;
  }

  proveriTrajanje() {
    if (this.trajanje <= 0) {
      this.poruka_trajanje = 'Trajanje pregleda mora biti pozitivan broj';
    } else {
      this.poruka_trajanje = '';
    }
  }

  proveriCenu() {
    if (this.cena <= 0) {
      this.poruka_cena = 'Cena pregleda mora biti pozitivan broj';
    } else {
      this.poruka_cena = '';
    }
  }

  dodajPregled() {
    if (this.pregled != '' && this.cena != null && this.trajanje != null && this.izabranaSpecijalizacija != '') {
      this.poruka_pregled = '';
    }
    else {
      this.poruka_pregled = 'Nisu uneti svi podaci';
    }
    if (this.poruka_cena == '' && this.poruka_pregled == '' && this.poruka_trajanje == '') {
      this.menadzerService.dodajPregled(this.pregled, this.izabranaSpecijalizacija, this.cena, this.trajanje).subscribe(resp => {
        alert(resp['message']);
        this.prikaziPreglede();
        this.pregled = '';
        this.trajanje = 30;
        this.cena = null;
      })
    }
  }

}
