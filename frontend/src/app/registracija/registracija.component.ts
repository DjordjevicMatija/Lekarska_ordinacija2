import { Component, OnInit } from '@angular/core';
import { LekariService } from '../services/lekari.service';
import { Korisnik } from '../models/korisnik';
import { Zahtev } from '../models/zahtev';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korService: LekariService, private router: Router) { }

  ngOnInit(): void {
  }

  izabran_fajl: File | null = null;
  kor_ime: string = '';
  lozinka: string = '';
  lozinka_potvrda: string = '';
  ime: string = '';
  prezime: string = '';
  adresa: string = '';
  telefon: string = '';
  imejl: string = '';
  tip: string = 'pacijent';

  poruka_slika: string = '';
  poruka_kor_ime: string;
  poruka_lozinka: string;
  poruka_lozinka_pot: string;
  poruka_mejl: string;
  poruka_podaci: string;
  poruka_telefon: string;

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
    this.korService.proveriKorIme(this.kor_ime).subscribe((kor: Korisnik) => {
      if (kor != null) {
        this.poruka_kor_ime = 'Korisničko ime je već u upotrebi';
      }
      else {
        this.korService.proveriKorImeZahtev(this.kor_ime).subscribe((zah: Zahtev) => {
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
    if (this.korService.proveriLoz(this.lozinka) == false) {
      this.poruka_lozinka = 'Lozinka treba da sadrži 8-14 karaktera, bar 1 veliko slovo, 1 broj, 1 specijalan karakter i mora počinjati slovom';
    }
    else {
      this.poruka_lozinka = '';
    }
  }

  proveriTelefon() {
    if (this.korService.proveriTelefon(this.telefon) == false) {
      this.poruka_telefon = 'Telefon nije u ispravnom formatu';
    }
    else {
      this.poruka_telefon = '';
    }
  }

  proveriPotLoz() {
    if (this.lozinka != this.lozinka_potvrda) {
      this.poruka_lozinka_pot = 'Potvrda lozinke nije ista kao i lozinka'
    }
    else {
      this.poruka_lozinka_pot = '';
    }
  }

  proveriMejl() {
    if (this.korService.proveriMejlRegex(this.imejl) == false) {
      this.poruka_mejl = 'Mejl adresa nije u ispravnom formatu';
    }
    else {
      this.korService.proveriMejlBaza(this.imejl).subscribe((kor: Korisnik) => {
        if (kor != null) {
          this.poruka_mejl = 'Mejl adresa je već u upotrebi';
        }
        else {
          this.korService.proveriMejlBazaZahtev(this.imejl).subscribe((zah: Zahtev) => {
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

  imagePath;

  posaljiZahtev() {
    if (this.kor_ime != '' && this.lozinka != '' &&
      this.lozinka_potvrda != '' && this.ime != '' && this.prezime != '' &&
      this.adresa != '' && this.telefon != '' && this.imejl != '') {
      this.poruka_podaci = '';
    }
    else {
      this.poruka_podaci = 'Nisu uneti svi podaci';
      return;
    }
    if (this.poruka_kor_ime == '' && this.poruka_lozinka == '' &&
      this.poruka_lozinka_pot == '' && this.poruka_mejl == '' &&
      this.poruka_podaci == '' && this.poruka_slika == '' && this.poruka_telefon == '') {

      const formData = new FormData();
      if (this.izabran_fajl != null)
        formData.append('profilnaSlika', this.izabran_fajl);
      else
        formData.append('profilnaSlika', null);
      formData.append('kor_ime', this.kor_ime);
      formData.append('lozinka', this.lozinka);
      formData.append('ime', this.ime);
      formData.append('prezime', this.prezime);
      formData.append('adresa', this.adresa);
      formData.append('telefon', this.telefon);
      formData.append('imejl', this.imejl);
      formData.append('tip', this.tip);

      this.korService.posaljiZahtev(formData).subscribe(resp => {
        alert(resp['message']);
        this.router.navigate(['']);
      })
    }
  }

}
