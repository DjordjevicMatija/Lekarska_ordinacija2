import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LekariService } from '../services/lekari.service';
import { MenadzerService } from '../services/menadzer.service';
import { Korisnik } from '../models/korisnik';
import { Specijalizacija } from '../models/specijalizacija';

@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit {

  constructor(private router: Router, private menadzerService: MenadzerService,
    private korService: LekariService) { }

  ngOnInit(): void {
    this.menadzerService.dohvatiKorisnike().subscribe((korisnici: Korisnik[]) => {
      this.sviKorisnici = korisnici;
      this.prikazaniKorisnici = this.sviKorisnici;
      this.sortTip();
    })
    this.menadzerService.dohvatiSpecijalizacije().subscribe((spec: Specijalizacija[]) => {
      this.sveSpecijalizacije = spec;
    })
  }

  sviKorisnici: Korisnik[] = [];
  prikazaniKorisnici: Korisnik[] = [];
  sveSpecijalizacije: Specijalizacija[] = [];

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  kor_ime: string = '';
  ime: string = '';
  prezime: string = '';
  tip: string = '';

  pretraga() {
    this.menadzerService.pretraga(this.kor_ime, this.ime, this.prezime, this.tip)
      .then((sviKorisnici: Korisnik[]) => {
        this.prikazaniKorisnici = sviKorisnici;
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }

  sortTip() {
    this.prikazaniKorisnici = this.menadzerService.sortTip(this.prikazaniKorisnici);
  }

  azurirajKorisnika(korisnik: Korisnik) {
    sessionStorage.setItem('korisnik', JSON.stringify(korisnik));
    this.router.navigate(['menadzer/profil']);
  }

  obrisiKorisnika(korisnik: Korisnik) {
    this.menadzerService.obrisiKorisnika(korisnik.kor_ime, korisnik.tip).subscribe(resp => {
      this.menadzerService.dohvatiKorisnike().subscribe((korisnici: Korisnik[]) => {
        this.sviKorisnici = korisnici;
        this.prikazaniKorisnici = this.sviKorisnici;
        this.sortTip();
      });
      alert(resp['message']);
    })
  }

  izabran_fajl: File | null = null;
  kor_imeLekar: string = '';
  lozinkaLekar: string = '';
  lozinka_potvrdaLekar: string = '';
  imeLekar: string = '';
  prezimeLekar: string = '';
  adresaLekar: string = '';
  telefonLekar: string = '';
  imejlLekar: string = '';
  tipLekar: string = 'lekar';
  licencaLekar: string = '';
  specijalizacijaLekar: string = '';
  ogranakLekar: string = '';

  poruka_slika: string = '';
  poruka_kor_ime: string;
  poruka_lozinka: string;
  poruka_lozinka_pot: string;
  poruka_mejl: string;
  poruka_podaci: string;
  poruka_telefon: string;
  poruka_licenca: string;

  noviLekarForma: boolean = false;

  dodavanjeLekara() {
    this.noviLekarForma = true;
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

  proveriKorIme() {
    this.korService.proveriKorIme(this.kor_imeLekar).subscribe((kor: Korisnik) => {
      if (kor != null) {
        this.poruka_kor_ime = 'Korisničko ime je već u upotrebi';
      }
      else {
        this.poruka_kor_ime = '';
      }
    })
  }

  proveriLoz() {
    if (this.korService.proveriLoz(this.lozinkaLekar) == false) {
      this.poruka_lozinka = 'Lozinka treba da sadrži 8-14 karaktera, bar 1 veliko slovo, 1 broj, 1 specijalan karakter i mora počinjati slovom';
    }
    else {
      this.poruka_lozinka = '';
    }
  }

  proveriTelefon() {
    if (this.korService.proveriTelefon(this.telefonLekar) == false) {
      this.poruka_telefon = 'Telefon nije u ispravnom formatu';
    }
    else {
      this.poruka_telefon = '';
    }
  }

  proveriPotLoz() {
    if (this.lozinkaLekar != this.lozinka_potvrdaLekar) {
      this.poruka_lozinka_pot = 'Potvrda lozinke nije ista kao i lozinka'
    }
    else {
      this.poruka_lozinka_pot = '';
    }
  }

  proveriMejl() {
    if (this.korService.proveriMejlRegex(this.imejlLekar) == false) {
      this.poruka_mejl = 'Mejl adresa nije u ispravnom formatu';
    }
    else {
      this.korService.proveriMejlBaza(this.imejlLekar).subscribe((kor: Korisnik) => {
        if (kor != null) {
          this.poruka_mejl = 'Mejl adresa je već u upotrebi';
        }
        else {
          this.poruka_mejl = '';
        }
      })
    }
  }

  proveriLicencu() {
    this.menadzerService.proveriLicencu(this.licencaLekar).subscribe((kor: Korisnik) => {
      if (kor != null) {
        this.poruka_licenca = 'Licenca je već u upotrebi';
      }
      else {
        this.poruka_licenca = '';
      }
    })
  }

  postaviOgranak() {
    let ogranak = this.ogranakLekar;
    this.ogranakLekar = ogranak.toLowerCase();
  }

  otkazi() {
    this.noviLekarForma = false;

    this.kor_imeLekar = '';
    this.lozinkaLekar = '';
    this.lozinka_potvrdaLekar = '';
    this.imeLekar = '';
    this.prezimeLekar = '';
    this.adresaLekar = '';
    this.telefonLekar = '';
    this.imejlLekar = '';
    this.licencaLekar = '';
    this.specijalizacijaLekar = '';
    this.ogranakLekar = '';
    this.izabran_fajl = null;
    const slika_elem = document.getElementById('profilna-slika') as HTMLImageElement;
    slika_elem.src = "../assets/default-profile.jpg";
  }

  dodajLekara() {
    if (this.kor_imeLekar != '' && this.lozinkaLekar != '' &&
      this.imeLekar != '' && this.prezimeLekar != '' &&
      this.adresaLekar != '' && this.telefonLekar != '' &&
      this.imejlLekar != '' && this.licencaLekar != '' &&
      this.specijalizacijaLekar != '' && this.ogranakLekar != '' &&
      this.lozinka_potvrdaLekar != '') {
      this.poruka_podaci = '';
    }
    else {
      this.poruka_podaci = 'Nisu uneti svi podaci';
      return;
    }
    if (this.poruka_kor_ime == '' && this.poruka_lozinka == '' &&
      this.poruka_mejl == '' && this.poruka_licenca == '' &&
      this.poruka_podaci == '' && this.poruka_slika == '' &&
      this.poruka_lozinka_pot == '') {

      const formData = new FormData();
      if (this.izabran_fajl != null)
        formData.append('profilnaSlika', this.izabran_fajl);
      else
        formData.append('profilnaSlika', null);
      formData.append('kor_ime', this.kor_imeLekar);
      formData.append('lozinka', this.lozinkaLekar);
      formData.append('ime', this.imeLekar);
      formData.append('prezime', this.prezimeLekar);
      formData.append('adresa', this.adresaLekar);
      formData.append('telefon', this.telefonLekar);
      formData.append('imejl', this.imejlLekar);
      formData.append('tip', this.tipLekar);
      formData.append('ogranak', this.ogranakLekar);
      formData.append('specijalizacija', this.specijalizacijaLekar);
      formData.append('licenca', this.licencaLekar);

      this.menadzerService.dodajLekara(formData).subscribe(resp => {
        alert(resp['message']);
        this.otkazi();
        this.ngOnInit();
      })
    }
  }

}
