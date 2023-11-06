import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LekariService } from '../services/lekari.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private router: Router, private korService: LekariService) { }

  ngOnInit(): void {
    this.ulogovanKorisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
  }

  ulogovanKorisnik: Korisnik;

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  staraLozinka: string = '';
  novaLozinka: string = '';
  lozinkaPotvrda: string = '';

  porukaStara: string;
  porukaNova: string;
  porukaPotvrda: string;
  porukaPodaci: string;

  proveriStaruLoz() {
    this.korService.proveriStaruLoz(this.ulogovanKorisnik.kor_ime, this.staraLozinka).subscribe((kor: Korisnik) => {
      if (kor == null) {
        this.porukaStara = 'Neispravna lozinka';
      }
      else {
        this.porukaStara = '';
      }
    })
  }

  proveriLoz() {
    if (this.korService.proveriLoz(this.novaLozinka) == false) {
      this.porukaNova = 'Lozinka treba da sadrži 8-14 karaktera, bar 1 veliko slovo, 1 broj, 1 specijalan karakter i mora počinjati slovom';
    }
    else {
      this.porukaNova = '';
    }
  }

  proveriPotLoz() {
    if (this.novaLozinka != this.lozinkaPotvrda) {
      this.porukaPotvrda = 'Potvrda lozinke nije ista kao i lozinka'
    }
    else {
      this.porukaPotvrda = '';
    }
  }

  promeniLozinku() {
    if (this.staraLozinka == '' && this.novaLozinka == '' &&
      this.lozinkaPotvrda == '') {
      this.porukaPodaci = 'Nisu uneti svi podaci';
      return;
    }
    else {
      this.porukaPodaci = '';
    }
    if (this.porukaNova == '' && this.porukaPodaci == '' &&
      this.porukaPotvrda == '' && this.porukaStara == '') {
      this.korService.promeniLozinku(this.ulogovanKorisnik.kor_ime, this.novaLozinka).subscribe(resp => {
        alert(resp['message']);
        this.odjaviSe();
      })
    }
  }
}
