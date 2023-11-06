import { Component, OnInit } from '@angular/core';
import { LekariService } from '../services/lekari.service';
import { Lekar } from '../models/lekar';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private lekariService: LekariService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.lekariService.dohvatiLekare().subscribe((lekari: Lekar[]) => {
      this.sviLekari = lekari;
      this.prikazaniLekari = this.sviLekari;
    })
  }

  sviLekari: Lekar[] = [];
  prikazaniLekari: Lekar[] = [];

  sortImeAsc() {
    this.prikazaniLekari = this.lekariService.sortImeAsc(this.prikazaniLekari);
  }

  sortImeDes() {
    this.prikazaniLekari = this.lekariService.sortImeDes(this.prikazaniLekari);
  }

  sortPrezimeAsc() {
    this.prikazaniLekari = this.lekariService.sortPrezimeAsc(this.prikazaniLekari);
  }

  sortPrezimeDes() {
    this.prikazaniLekari = this.lekariService.sortPrezimeDes(this.prikazaniLekari);
  }

  sortSpecAsc() {
    this.prikazaniLekari = this.lekariService.sortSpecAsc(this.prikazaniLekari);
  }

  sortSpecDes() {
    this.prikazaniLekari = this.lekariService.sortSpecDes(this.prikazaniLekari);
  }

  ime: string = '';
  prezime: string = '';
  specijalizacija: string = '';

  pretraga() {
    this.lekariService.pretraga(this.ime, this.prezime, this.specijalizacija)
      .then((sviLekari: Lekar[]) => {
        this.prikazaniLekari = sviLekari;
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }

  kor_ime: string = '';
  lozinka: string = '';
  poruka: string;

  ulogovanKorisnik: Korisnik;

  clear(){
    const kor_ime_elem = document.getElementById("kor_ime") as HTMLInputElement;
    const lozinka_elem = document.getElementById("lozinka") as HTMLInputElement;
    kor_ime_elem.value = '';
    lozinka_elem.value = '';
    this.poruka = '';
  }

  ulogujSe() {
    if (this.kor_ime == '' || this.lozinka == '') {
      this.poruka = 'Nisu uneti svi podaci';
    }
    else {
      this.lekariService.ulogujSe(this.kor_ime, this.lozinka).subscribe((kor: Korisnik) => {
        if (kor != null) {
          this.ulogovanKorisnik = kor;
          sessionStorage.setItem('ulogovan', JSON.stringify(this.ulogovanKorisnik));
          if (kor.tip == 'lekar') {
            document.getElementById("zatvoriModal").click();
            this.router.navigate(['lekar']);
          }
          else if (kor.tip == 'pacijent') {
            document.getElementById("zatvoriModal").click();
            this.router.navigate(['pacijent']);
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
