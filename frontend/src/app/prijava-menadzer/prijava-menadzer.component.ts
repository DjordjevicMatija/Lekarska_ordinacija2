import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { LekariService } from '../services/lekari.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava-menadzer',
  templateUrl: './prijava-menadzer.component.html',
  styleUrls: ['./prijava-menadzer.component.css']
})
export class PrijavaMenadzerComponent implements OnInit {

  constructor(private lekariService: LekariService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  kor_ime: string = '';
  lozinka: string = '';
  ulogovan: Korisnik;
  poruka: string;

  ulogujSe() {
    if (this.kor_ime == '' || this.lozinka == '') {
      this.poruka = 'Nisu uneti svi podaci';
    }
    else {
      this.lekariService.ulogujSe(this.kor_ime, this.lozinka).subscribe((kor: Korisnik) => {
        if (kor != null) {
          this.ulogovan = kor;
          sessionStorage.setItem('ulogovan', JSON.stringify(kor));
          if (kor.tip == 'menadzer') {
            this.router.navigate(['menadzer']);
          }
          else
            this.poruka = 'Neispravni podaci';
        }
        else {
          this.poruka = 'Neispravni podaci';
        }
      })
    }
  }

}
