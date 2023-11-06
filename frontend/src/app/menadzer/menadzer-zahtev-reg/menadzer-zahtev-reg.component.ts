import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Zahtev } from 'src/app/models/zahtev';
import { MenadzerService } from 'src/app/services/menadzer.service';

@Component({
  selector: 'app-menadzer-zahtev-reg',
  templateUrl: './menadzer-zahtev-reg.component.html',
  styleUrls: ['./menadzer-zahtev-reg.component.css']
})
export class MenadzerZahtevRegComponent implements OnInit {

  constructor(private router: Router, private menadzerService: MenadzerService) { }

  ngOnInit(): void {
    this.menadzerService.dohvatiZahteveReg().subscribe((zah: Zahtev[]) => {
      this.sviZahtevi = zah; 
    })
  }

  sviZahtevi: Zahtev[] = [];

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  prihvatiZahtev(zahtev: Zahtev){
    this.menadzerService.prihvatiZahtev(zahtev.kor_ime).subscribe(resp=>{
      alert(resp['message']);
      this.ngOnInit();
    })
  }

  odbaciZahtev(zahtev: Zahtev){
    this.menadzerService.odbaciZahtev(zahtev.kor_ime).subscribe(resp=>{
      alert(resp['message']);
      this.ngOnInit();
    })
  }

}
