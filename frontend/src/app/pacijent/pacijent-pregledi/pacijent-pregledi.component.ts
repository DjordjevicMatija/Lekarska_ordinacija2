import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Izvestaj } from 'src/app/models/izvestaj';
import { Korisnik } from 'src/app/models/korisnik';
import { ZakazaniPregled } from 'src/app/models/zakazani-pregled';
import { PacijentService } from 'src/app/services/pacijent.service';

@Component({
  selector: 'app-pacijent-pregledi',
  templateUrl: './pacijent-pregledi.component.html',
  styleUrls: ['./pacijent-pregledi.component.css']
})
export class PacijentPreglediComponent implements OnInit {

  constructor(private router: Router, private pacijentService: PacijentService) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(sessionStorage.getItem('ulogovan'));
    this.pacijentService.dohvatiPregledePacijent(this.ulogovan.kor_ime).subscribe((preg: ZakazaniPregled[])=>{
      this.zakazaniPregledi = this.pacijentService.sortirajPreglede(preg);
      for(let p of this.zakazaniPregledi){
        p.formatiran_datum = this.pacijentService.formatirajDatum(p.pocetak_pregleda);
        p.formatirano_vreme = this.pacijentService.formatirajVreme(p.pocetak_pregleda);
      }
    });
    this.pacijentService.dohvatiIzvestaje(this.ulogovan.kor_ime).subscribe((izv: Izvestaj[])=>{
      this.izvestaji = this.pacijentService.sortirajIzvestaje(izv);
      for(let i of this.izvestaji){
        i.formatiran_datum = this.pacijentService.formatirajDatum(i.datum_pregleda);
        i.formatirano_vreme = this.pacijentService.formatirajVreme(i.datum_pregleda);
        i.formatiran_datum_naredni = this.pacijentService.formatirajDatum(i.datum_narednog_pregleda);
      }
    });
  }

  ulogovan: Korisnik;
  zakazaniPregledi: ZakazaniPregled[] = [];
  izvestaji: Izvestaj[] = [];

  odjaviSe(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  otkaziPregled(pregled){
    this.pacijentService.otkaziPregled(pregled.lekar, pregled.pocetak_pregleda).subscribe(resp=>{
      this.pacijentService.dohvatiPregledePacijent(this.ulogovan.kor_ime).subscribe((preg: ZakazaniPregled[])=>{
        this.zakazaniPregledi = this.pacijentService.sortirajPreglede(preg);
        for(let p of this.zakazaniPregledi){
          p.formatiran_datum = this.pacijentService.formatirajDatum(p.pocetak_pregleda);
          p.formatirano_vreme = this.pacijentService.formatirajVreme(p.pocetak_pregleda);
        }
      });
      alert(resp['message']);
    })
  }

}
