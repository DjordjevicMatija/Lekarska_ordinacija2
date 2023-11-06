import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LekarService } from '../services/lekar.service';
import { Izvestaj } from '../models/izvestaj';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-pacijent-karton',
  templateUrl: './pacijent-karton.component.html',
  styleUrls: ['./pacijent-karton.component.css']
})
export class PacijentKartonComponent implements OnInit {

  constructor(private router:Router, private lekarService: LekarService) { }

  ngOnInit(): void {
    this.pacijent = JSON.parse(sessionStorage.getItem('pacijent'));
    this.lekarService.dohvatiIzvestaje(this.pacijent.kor_ime).subscribe((izv: Izvestaj[]) => {
      this.izvestaji = this.lekarService.sortirajIzvestaje(izv);
      for(let i of this.izvestaji){
        i.formatiran_datum = this.lekarService.formatirajDatum(i.datum_pregleda);
        i.formatirano_vreme = this.lekarService.formatirajVreme(i.datum_pregleda);
        i.formatiran_datum_naredni = this.lekarService.formatirajDatum(i.datum_narednog_pregleda);
      }
    })
  }

  pacijent: Korisnik;
  izvestaji: Izvestaj[] = [];

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
