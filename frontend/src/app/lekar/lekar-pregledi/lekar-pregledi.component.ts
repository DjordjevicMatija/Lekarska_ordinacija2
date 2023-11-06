import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { ZakazaniPregled } from 'src/app/models/zakazani-pregled';
import { LekarService } from 'src/app/services/lekar.service';

@Component({
  selector: 'app-lekar-pregledi',
  templateUrl: './lekar-pregledi.component.html',
  styleUrls: ['./lekar-pregledi.component.css']
})
export class LekarPreglediComponent implements OnInit {

  constructor(private router: Router, private lekarService: LekarService) { }

  ngOnInit(): void {
    this.clear();
    this.ulogovanKorisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
    this.lekarService.dohvatiPregledeLekar(this.ulogovanKorisnik.licenca).subscribe((preg: ZakazaniPregled[]) => {
      this.zakazaniPregledi = this.lekarService.sortirajPreglede(preg);
      for (let p of this.zakazaniPregledi) {
        p.formatiran_datum = this.lekarService.formatirajDatum(p.pocetak_pregleda);
        p.formatirano_vreme = this.lekarService.formatirajVreme(p.pocetak_pregleda);
      }
    })
    this.lekarService.dohvatiPregledeBezIzvestaja(this.ulogovanKorisnik.licenca).subscribe((preg: ZakazaniPregled[]) => {
      this.preglediBezIzvestaja = this.lekarService.sortirajPreglede(preg);
      for (let p of this.preglediBezIzvestaja) {
        p.formatiran_datum = this.lekarService.formatirajDatum(p.pocetak_pregleda);
        p.formatirano_vreme = this.lekarService.formatirajVreme(p.pocetak_pregleda);
      }
    })
  }

  ulogovanKorisnik: Korisnik;
  zakazaniPregledi: ZakazaniPregled[] = [];
  preglediBezIzvestaja: ZakazaniPregled[] = [];

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  prikaziKarton(pregled: ZakazaniPregled) {
    this.lekarService.dohvatiPacijenta(pregled.pacijent).subscribe((pacijent: Korisnik) => {
      sessionStorage.setItem('pacijent', JSON.stringify(pacijent));
      this.router.navigate(['lekar/pregledi/karton']);
    })
  }

  razlog_dolaska: string;
  dijagnoza: string;
  datum_np_string: string;
  datum_narednog_pregleda: Date;
  terapija: string;
  izabran_pregled: ZakazaniPregled;

  clear() {
    const date_elem = document.getElementById("datum_vreme") as HTMLInputElement;
    const today = new Date().toISOString().split(".")[0].split("T")[0] + 'T00:00';
    date_elem.setAttribute("value", today);
    date_elem.setAttribute("min", today);

    const razlog_dolaska_elem = document.getElementById("razlog_dolaska") as HTMLInputElement;
    const dijagnoza_elem = document.getElementById("dijagnoza") as HTMLInputElement;
    const terapija_elem = document.getElementById("terapija") as HTMLInputElement;
    razlog_dolaska_elem.value = '';
    dijagnoza_elem.value = '';
    terapija_elem.value = '';
  }
  

  unesiIzvestaj() {
    this.datum_narednog_pregleda = new Date(this.datum_np_string);

    this.lekarService.unesiIzvestaj(this.razlog_dolaska, this.dijagnoza,
      this.datum_narednog_pregleda, this.izabran_pregled.pocetak_pregleda,
      this.ulogovanKorisnik.specijalizacija, this.terapija,
      this.izabran_pregled.pacijent, this.ulogovanKorisnik.licenca,
      this.ulogovanKorisnik.ime, this.ulogovanKorisnik.prezime).subscribe(resp => {
        alert(resp['message']);
        this.clear();
        this.lekarService.dohvatiPregledeBezIzvestaja(this.ulogovanKorisnik.licenca).subscribe((preg: ZakazaniPregled[]) => {
          this.preglediBezIzvestaja = this.lekarService.sortirajPreglede(preg);
          for (let p of this.preglediBezIzvestaja) {
            p.formatiran_datum = this.lekarService.formatirajDatum(p.pocetak_pregleda);
            p.formatirano_vreme = this.lekarService.formatirajVreme(p.pocetak_pregleda);
          }
        })
      })
  }
}
