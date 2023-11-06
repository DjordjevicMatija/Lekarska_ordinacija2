import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lekar } from 'src/app/models/lekar';
import { LekariService } from 'src/app/services/lekari.service';

@Component({
  selector: 'app-pacijent-lekari',
  templateUrl: './pacijent-lekari.component.html',
  styleUrls: ['./pacijent-lekari.component.css']
})
export class PacijentLekariComponent implements OnInit {

  constructor(private lekariService: LekariService, private router: Router) { }

  ngOnInit(): void {
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

  sortOgranakAsc() {
    this.prikazaniLekari = this.lekariService.sortOgranakAsc(this.prikazaniLekari);
  }

  sortOgranakDes() {
    this.prikazaniLekari = this.lekariService.sortOgranakDes(this.prikazaniLekari);
  }
  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  ime: string = '';
  prezime: string = '';
  specijalizacija: string = '';
  ogranak: string = '';

  pretraga() {
    this.lekariService.pretragaOgranak(this.ime, this.prezime, this.specijalizacija, this.ogranak)
      .then((sviLekari: Lekar[]) => {
        this.prikazaniLekari = sviLekari;
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }

  prikaziProfil(lekar: Lekar) {
    sessionStorage.setItem('lekar', JSON.stringify(lekar));
    this.router.navigate(['pacijent/lekari/profil']);
  }
}
