import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { LekarService } from 'src/app/services/lekar.service';

@Component({
  selector: 'app-lekar-razno',
  templateUrl: './lekar-razno.component.html',
  styleUrls: ['./lekar-razno.component.css']
})
export class LekarRaznoComponent implements OnInit {

  constructor(private router: Router, private lekarService: LekarService) { }

  ngOnInit(): void {
    this.ulogovanKorisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
  }

  ulogovanKorisnik: Korisnik;

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  pregled: string;

  postaviNaziv() {
    if (this.pregled.length === 0) return;
    const firstLetter = this.pregled.charAt(0).toUpperCase();
    const restOfString = this.pregled.slice(1).toLowerCase();
    this.pregled = firstLetter + restOfString;
  }

  posaljiZahtev() {
    if(this.pregled != ''){
      this.lekarService.posaljiZahtev(this.pregled, this.ulogovanKorisnik.specijalizacija).subscribe(resp => {
        const pregled_elem = document.getElementById("pregled") as HTMLInputElement;
        pregled_elem.value = '';
        alert(resp['message']);
      })
    }
  }
}
