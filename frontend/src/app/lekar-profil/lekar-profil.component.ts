import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lekar } from '../models/lekar';
import { VrstaPregleda } from '../models/vrsta-pregleda';
import { PacijentService } from '../services/pacijent.service';

@Component({
  selector: 'app-lekar-profil',
  templateUrl: './lekar-profil.component.html',
  styleUrls: ['./lekar-profil.component.css']
})
export class LekarProfilComponent implements OnInit {

  constructor(private router: Router, private pacijentService: PacijentService) { }

  ngOnInit(): void {
    this.lekar = JSON.parse(sessionStorage.getItem('lekar'));
    this.clear();
    this.pacijentService.dohvatiPreglede(this.lekar.licenca).subscribe((preg: VrstaPregleda[]) => {
      this.pregledi = preg;
    })
  }

  lekar: Lekar;
  pregledi: VrstaPregleda[] = [];

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  clear(){
    const date_elem = document.getElementById("datum_vreme") as HTMLInputElement;
    const today = new Date().toISOString().split(".")[0].split("T")[0] + 'T00:00';
    date_elem.setAttribute("value", today);
    date_elem.setAttribute("min", today);
  }

  datumZakazivanjaString: string;
  datumZakazivanja: Date;
  izabranPregled: VrstaPregleda = new VrstaPregleda();

  izaberiPregled(pregled) {
    this.izabranPregled = pregled;
  }

  zakazi() {
    this.datumZakazivanja = new Date(this.datumZakazivanjaString);
    const pacijent = JSON.parse(sessionStorage.getItem('ulogovan'));
    const pacijent_kor_ime = pacijent.kor_ime;
    const lekar_licenca = this.lekar.licenca;
    const ime_lekara = this.lekar.ime;
    const prezime_lekara = this.lekar.prezime;
    const ogranak = this.lekar.ogranak;
    const pocetak_pregleda = this.datumZakazivanja;
    const vreme_pregleda_milisek = this.izabranPregled.trajanje_u_min * 60 * 1000;
    const kraj_pregleda = new Date(pocetak_pregleda.getTime() + vreme_pregleda_milisek);

    this.pacijentService.zakaziPregled(pacijent_kor_ime, lekar_licenca, ime_lekara, prezime_lekara,
      ogranak, this.izabranPregled.naziv, pocetak_pregleda, kraj_pregleda, this.izabranPregled.cena).subscribe(resp => {
        document.getElementById("zatvoriModal").click();
        alert(resp['message']);
      })
  }

}
