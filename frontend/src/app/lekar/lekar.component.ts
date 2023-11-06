import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { LekarService } from '../services/lekar.service';
import { VrstaPregleda } from '../models/vrsta-pregleda';
import { LekariService } from '../services/lekari.service';
import { Zahtev } from '../models/zahtev';
import { MenadzerService } from '../services/menadzer.service';
import { Specijalizacija } from '../models/specijalizacija';

@Component({
  selector: 'app-lekar',
  templateUrl: './lekar.component.html',
  styleUrls: ['./lekar.component.css']
})
export class LekarComponent implements OnInit {

  constructor(private router: Router, private lekarService: LekarService,
    private korService: LekariService, private menadzerService: MenadzerService) { }

  ngOnInit(): void {
    this.ulogovanKorisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
    this.lekarService.dohvatiPregledeSpec(this.ulogovanKorisnik.specijalizacija).subscribe((preg: VrstaPregleda[]) => {
      this.vrstePregleda = preg;
    })
    this.menadzerService.dohvatiSpecijalizacije().subscribe((spec: Specijalizacija[]) => {
      this.sveSpecijalizacije = spec;
    })
  }

  sveSpecijalizacije: Specijalizacija[] = [];
  ulogovanKorisnik: Korisnik;
  vrstePregleda: VrstaPregleda[] = [];

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  dodajPregled(pregled) {
    this.lekarService.dodajPregled(pregled.naziv, this.ulogovanKorisnik.licenca).subscribe(resp => {
      alert(resp['message']);
      this.lekarService.dohvatiPregledeSpec(this.ulogovanKorisnik.specijalizacija).subscribe((preg: VrstaPregleda[]) => {
        this.vrstePregleda = preg;
      })
    })
  }

  izbaciPregled(pregled) {
    this.lekarService.izbaciPregled(pregled.naziv, this.ulogovanKorisnik.licenca).subscribe(resp => {
      alert(resp['message']);
      this.lekarService.dohvatiPregledeSpec(this.ulogovanKorisnik.specijalizacija).subscribe((preg: VrstaPregleda[]) => {
        this.vrstePregleda = preg;
      })
    })
  }

  azuriranje: boolean = false;

  izabran_fajl: File | null = null;

  poruka_slika: string = '';
  poruka_mejl: string = '';
  poruka_podaci: string = '';
  poruka_telefon: string = '';
  poruka_licenca: string = '';
  poruka_specijalizacija: string = '';

  izmena() {
    this.azuriranje = true;
  }

  postavi(event: any) {
    const slika_elem = document.getElementById('profilna-slika') as HTMLImageElement;
    if (event.target.files[0]) {
      slika_elem.src = URL.createObjectURL(event.target.files[0]);
      this.izabran_fajl = event.target.files[0] as File;
      this.korService.proveriSliku(this.izabran_fajl, (error, poruka) => {
        if (error) {
          this.poruka_slika = error.message;
        } else {
          this.poruka_slika = '';
        }
      });
    }
  }

  otkazi() {
    this.azuriranje = false;
    this.ngOnInit();
    this.poruka_licenca = '';
    this.poruka_mejl = '';
    this.poruka_podaci = '';
    this.poruka_slika = '';
    this.poruka_specijalizacija = '';
    this.poruka_telefon = '';
    const slika_elem = document.getElementById('profilna-slika') as HTMLImageElement;
    slika_elem.src = this.ulogovanKorisnik.slika;
    this.izabran_fajl = null;
  }

  proveriTelefon() {
    if (this.korService.proveriTelefon(this.ulogovanKorisnik.telefon) == false) {
      this.poruka_telefon = 'Telefon nije u ispravnom formatu';
    }
    else {
      this.poruka_telefon = '';
    }
  }

  proveriLicencu() {
    this.menadzerService.proveriLicencu(this.ulogovanKorisnik.licenca).subscribe((kor: Korisnik) => {
      if (kor != null) {
        this.poruka_licenca = 'Licenca je već u upotrebi';
      }
      else {
        this.poruka_licenca = '';
      }
    })
  }

  proveriPraznoPolje() {
    if (this.ulogovanKorisnik.ime == '' || this.ulogovanKorisnik.prezime == '' ||
      this.ulogovanKorisnik.adresa == '')
      this.poruka_podaci = 'Nisu uneti svi podaci';
    else
      this.poruka_podaci = '';
  }

  posaljiZahtev() {
    if (this.ulogovanKorisnik.ime != '' && this.ulogovanKorisnik.prezime != '' &&
      this.ulogovanKorisnik.adresa != '' && this.ulogovanKorisnik.telefon != '' &&
      this.ulogovanKorisnik.licenca != '' && this.ulogovanKorisnik.specijalizacija != '') {
      this.poruka_podaci = '';
    }
    else {
      this.poruka_podaci = 'Nisu uneti svi podaci';
      return;
    }
    if (this.poruka_mejl == '' && this.poruka_licenca == '' &&
      this.poruka_podaci == '' && this.poruka_slika == '' &&
      this.poruka_specijalizacija == '') {

      const formData = new FormData();
      if (this.izabran_fajl != null)
        formData.append('profilnaSlika', this.izabran_fajl);
      else
        formData.append('profilnaSlika', null);
      formData.append('staroKor_ime', this.ulogovanKorisnik.kor_ime);
      formData.append('kor_ime', this.ulogovanKorisnik.kor_ime);
      formData.append('lozinka', this.ulogovanKorisnik.lozinka);
      formData.append('ime', this.ulogovanKorisnik.ime);
      formData.append('prezime', this.ulogovanKorisnik.prezime);
      formData.append('adresa', this.ulogovanKorisnik.adresa);
      formData.append('telefon', this.ulogovanKorisnik.telefon);
      formData.append('imejl', this.ulogovanKorisnik.imejl);
      formData.append('tip', this.ulogovanKorisnik.tip);
      formData.append('specijalizacija', this.ulogovanKorisnik.specijalizacija);
      formData.append('licenca', this.ulogovanKorisnik.licenca);
      formData.append('ogranak', this.ulogovanKorisnik.ogranak);

      this.lekarService.azurirajProfil(formData).subscribe((kor: Korisnik) => {
        sessionStorage.removeItem('ulogovan');
        sessionStorage.setItem('ulogovan', JSON.stringify(kor));
        this.ulogovanKorisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
        this.azuriranje = false;
      })
    }
  }

}
