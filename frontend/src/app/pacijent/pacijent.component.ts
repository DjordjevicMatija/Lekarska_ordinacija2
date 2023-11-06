import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { LekariService } from '../services/lekari.service';
import { MenadzerService } from '../services/menadzer.service';
import { PacijentService } from '../services/pacijent.service';
import { Zahtev } from '../models/zahtev';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit {

  constructor(private router: Router, private korService: LekariService,
    private menadzerService: MenadzerService, private pacijentService: PacijentService) { }

  ngOnInit(): void {
    this.ulogovanKorisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
  }

  ulogovanKorisnik: Korisnik;

  odjaviSe(){
    sessionStorage.clear();
    this.router.navigate(['']);
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

  proveriMejl() {
    if (this.korService.proveriMejlRegex(this.ulogovanKorisnik.imejl) == false) {
      this.poruka_mejl = 'Mejl adresa nije u ispravnom formatu';
    }
    else {
      this.korService.proveriMejlBaza(this.ulogovanKorisnik.imejl).subscribe((kor: Korisnik) => {
        if (kor != null) {
          this.poruka_mejl = 'Mejl adresa je već u upotrebi';
        }
        else {
          this.korService.proveriMejlBazaZahtev(this.ulogovanKorisnik.imejl).subscribe((zah: Zahtev) => {
            if (zah != null) {
              this.poruka_mejl = 'Mejl adresa je već u upotrebi';
            }
            else {
              this.poruka_mejl = '';
            }
          })
        }
      })
    }
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

      this.pacijentService.azurirajProfil(formData).subscribe((kor: Korisnik) => {
        sessionStorage.removeItem('ulogovan');
        sessionStorage.setItem('ulogovan', JSON.stringify(kor));
        this.ulogovanKorisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
        this.azuriranje = false;
      })
    }
  }

}
