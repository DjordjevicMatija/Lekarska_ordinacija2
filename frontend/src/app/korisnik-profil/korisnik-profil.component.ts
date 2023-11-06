import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenadzerService } from '../services/menadzer.service';
import { Korisnik } from '../models/korisnik';
import { LekariService } from '../services/lekari.service';
import { Zahtev } from '../models/zahtev';
import { Specijalizacija } from '../models/specijalizacija';

@Component({
  selector: 'app-korisnik-profil',
  templateUrl: './korisnik-profil.component.html',
  styleUrls: ['./korisnik-profil.component.css']
})
export class KorisnikProfilComponent implements OnInit {

  constructor(private router: Router, private menadzerService: MenadzerService,
    private korService: LekariService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('korisnik'));
    this.staroKor_ime = this.korisnik.kor_ime;
    this.menadzerService.dohvatiSpecijalizacije().subscribe((spec: Specijalizacija[]) => {
      this.sveSpecijalizacije = spec;
    })
  }

  korisnik: Korisnik;
  staroKor_ime: string;
  sveSpecijalizacije: Specijalizacija[] = [];

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  izabran_fajl: File | null = null;

  poruka_slika: string = '';
  poruka_kor_ime: string = '';
  poruka_lozinka: string = '';
  poruka_mejl: string = '';
  poruka_podaci: string = '';
  poruka_telefon: string = '';
  poruka_licenca: string = '';
  poruka_specijalizacija: string = '';

  azuriranje: boolean = false;

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

  posaljiZahtev() {
    //pacijent
    if (this.korisnik.tip == 'pacijent') {
      if (this.korisnik.kor_ime != '' && this.korisnik.lozinka != '' &&
        this.korisnik.ime != '' && this.korisnik.prezime != '' &&
        this.korisnik.adresa != '' && this.korisnik.telefon != '' &&
        this.korisnik.imejl != '') {
        this.poruka_podaci = '';
      }
      else {
        this.poruka_podaci = 'Nisu uneti svi podaci';
        return;
      }
      if (this.poruka_kor_ime == '' && this.poruka_lozinka == '' &&
        this.poruka_mejl == '' && this.poruka_licenca == '' &&
        this.poruka_podaci == '' && this.poruka_slika == '' &&
        this.poruka_specijalizacija == '') {

        const formData = new FormData();
        if (this.izabran_fajl != null)
          formData.append('profilnaSlika', this.izabran_fajl);
        else
          formData.append('profilnaSlika', null);
        formData.append('staroKor_ime', this.staroKor_ime);
        formData.append('kor_ime', this.korisnik.kor_ime);
        formData.append('lozinka', this.korisnik.lozinka);
        formData.append('ime', this.korisnik.ime);
        formData.append('prezime', this.korisnik.prezime);
        formData.append('adresa', this.korisnik.adresa);
        formData.append('telefon', this.korisnik.telefon);
        formData.append('imejl', this.korisnik.imejl);
        formData.append('tip', this.korisnik.tip);

        this.menadzerService.azurirajKorisnika(formData).subscribe((kor: Korisnik) => {
          sessionStorage.removeItem('korisnik');
          sessionStorage.setItem('korisnik', JSON.stringify(kor));
          this.korisnik = JSON.parse(sessionStorage.getItem('korisnik'));
          this.staroKor_ime = this.korisnik.kor_ime;
          this.azuriranje = false;
        })
      }
    }
    //lekar
    else if (this.korisnik.tip == 'lekar') {
      if (this.korisnik.kor_ime != '' && this.korisnik.lozinka != '' &&
        this.korisnik.ime != '' && this.korisnik.prezime != '' &&
        this.korisnik.adresa != '' && this.korisnik.telefon != '' &&
        this.korisnik.imejl != '' && this.korisnik.licenca != '' &&
        this.korisnik.specijalizacija != '' && this.korisnik.ogranak != '') {
        this.poruka_podaci = '';
      }
      else {
        this.poruka_podaci = 'Nisu uneti svi podaci';
        return;
      }
      if (this.poruka_kor_ime == '' && this.poruka_lozinka == '' &&
        this.poruka_mejl == '' && this.poruka_licenca == '' &&
        this.poruka_podaci == '' && this.poruka_slika == '' &&
        this.poruka_specijalizacija == '') {

        const formData = new FormData();
        if (this.izabran_fajl != null)
          formData.append('profilnaSlika', this.izabran_fajl);
        else
          formData.append('profilnaSlika', null);
        formData.append('staroKor_ime', this.staroKor_ime);
        formData.append('kor_ime', this.korisnik.kor_ime);
        formData.append('lozinka', this.korisnik.lozinka);
        formData.append('ime', this.korisnik.ime);
        formData.append('prezime', this.korisnik.prezime);
        formData.append('adresa', this.korisnik.adresa);
        formData.append('telefon', this.korisnik.telefon);
        formData.append('imejl', this.korisnik.imejl);
        formData.append('tip', this.korisnik.tip);
        formData.append('ogranak', this.korisnik.ogranak);
        formData.append('specijalizacija', this.korisnik.specijalizacija);
        formData.append('licenca', this.korisnik.licenca);

        this.menadzerService.azurirajKorisnika(formData).subscribe((kor: Korisnik) => {
          sessionStorage.removeItem('korisnik');
          sessionStorage.setItem('korisnik', JSON.stringify(kor));
          this.korisnik = JSON.parse(sessionStorage.getItem('korisnik'));
          this.staroKor_ime = this.korisnik.kor_ime;
          this.azuriranje = false;
        })
      }
    }
  }

  otkazi() {
    this.azuriranje = false;
    this.ngOnInit();
    this.poruka_kor_ime = '';
    this.poruka_licenca = '';
    this.poruka_lozinka = '';
    this.poruka_mejl = '';
    this.poruka_podaci = '';
    this.poruka_slika = '';
    this.poruka_specijalizacija = '';
    this.poruka_telefon = '';
    const slika_elem = document.getElementById('profilna-slika') as HTMLImageElement;
    slika_elem.src = this.korisnik.slika;
    this.izabran_fajl = null;
  }

  proveriKorIme() {
    this.korService.proveriKorIme(this.korisnik.kor_ime).subscribe((kor: Korisnik) => {
      if (kor != null) {
        this.poruka_kor_ime = 'Korisničko ime je već u upotrebi';
      }
      else {
        this.korService.proveriKorImeZahtev(this.korisnik.kor_ime).subscribe((zah: Zahtev) => {
          if (zah != null) {
            this.poruka_kor_ime = 'Korisničko ime je već u upotrebi';
          }
          else {
            this.poruka_kor_ime = '';
          }
        })
      }
    })
  }

  proveriLoz() {
    if (this.korService.proveriLoz(this.korisnik.lozinka) == false) {
      this.poruka_lozinka = 'Lozinka treba da sadrži 8-14 karaktera, bar 1 veliko slovo, 1 broj, 1 specijalan karakter i mora počinjati slovom';
    }
    else {
      this.poruka_lozinka = '';
    }
  }

  proveriTelefon() {
    if (this.korService.proveriTelefon(this.korisnik.telefon) == false) {
      this.poruka_telefon = 'Telefon nije u ispravnom formatu';
    }
    else {
      this.poruka_telefon = '';
    }
  }

  proveriMejl() {
    if (this.korService.proveriMejlRegex(this.korisnik.imejl) == false) {
      this.poruka_mejl = 'Mejl adresa nije u ispravnom formatu';
    }
    else {
      this.korService.proveriMejlBaza(this.korisnik.imejl).subscribe((kor: Korisnik) => {
        if (kor != null) {
          this.poruka_mejl = 'Mejl adresa je već u upotrebi';
        }
        else {
          this.korService.proveriMejlBazaZahtev(this.korisnik.imejl).subscribe((zah: Zahtev) => {
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

  proveriLicencu() {
    this.menadzerService.proveriLicencu(this.korisnik.licenca).subscribe((kor: Korisnik) => {
      if (kor != null) {
        this.poruka_licenca = 'Licenca je već u upotrebi';
      }
      else {
        this.poruka_licenca = '';
      }
    })
  }

  postaviOgranak() {
    let ogranak = this.korisnik.ogranak;
    this.korisnik.ogranak = ogranak.toLowerCase();
    if (this.korisnik.ogranak == '')
      this.poruka_podaci = 'Nisu uneti svi podaci';
    else
      this.poruka_podaci = '';
  }

  proveriPraznoPolje() {
    if (this.korisnik.ime == '' || this.korisnik.prezime == '' ||
      this.korisnik.adresa == '')
      this.poruka_podaci = 'Nisu uneti svi podaci';
    else
      this.poruka_podaci = '';
  }

}
