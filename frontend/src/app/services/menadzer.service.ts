import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class MenadzerService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/menadzer';

  dohvatiKorisnike() {
    return this.http.get(`${this.uri}/dohvatiKorisnike`);
  }

  dohvatiSpecijalizacije(){
    return this.http.get(`${this.uri}/dohvatiSpecijalizacije`);
  }

  pretraga(kor_ime, ime, prezime, tip): Promise<Korisnik[]> {
    return new Promise((resolve, reject) => {
      this.dohvatiKorisnike().subscribe((korisnici: Korisnik[]) => {
        const sviKorisnici = korisnici.filter(korisnik => {
          return korisnik.ime.includes(ime) && korisnik.prezime.includes(prezime) &&
           korisnik.kor_ime.includes(kor_ime) && korisnik.tip.includes(tip);
        });
        resolve(sviKorisnici);
      }, error => {
        reject(error);
      });
    });
  }

  sortTip(korisnici): Korisnik[] {
    let sviKorisnici = korisnici;
    return sviKorisnici.sort((k1, k2) => {
      return (k1.tip).localeCompare(k2.tip);
    })
  }

  obrisiKorisnika(kor_ime, tip) {
    const data = {
      kor_ime: kor_ime,
      tip: tip
    }

    return this.http.post(`${this.uri}/obrisiKorisnika`, data);
  }
  
  proveriLicencu(licenca) {
    const data = {
      licenca: licenca
    }

    return this.http.post(`${this.uri}/proveriLicencu`, data);
  }

  azurirajKorisnika(data: FormData){
    return this.http.post(`${this.uri}/azurirajKorisnika`, data);
  }

  dodajLekara(data: FormData){
    return this.http.post(`${this.uri}/dodajLekara`, data);
  }

  dohvatiZahteveReg() {
    return this.http.get(`${this.uri}/dohvatiZahteveReg`);
  }

  prihvatiZahtev(kor_ime){
    const data = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/prihvatiZahtev`, data);
  }

  odbaciZahtev(kor_ime){
    const data = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/odbaciZahtev`, data);
  }

  dohvatiZahtevPregled(){
    return this.http.get(`${this.uri}/dohvatiZahtevPregled`);
  }

  odbijPregled(naziv, specijalizacija){
    const data = {
      naziv: naziv,
      specijalizacija: specijalizacija
    }

    return this.http.post(`${this.uri}/odbijPregled`, data);
  }

  odobriPregled(naziv, specijalizacija){
    const data = {
      naziv: naziv,
      specijalizacija: specijalizacija
    }

    return this.http.post(`${this.uri}/odobriPregled`, data);
  }
  
  dodajSpecijalizaciju(naziv){
    const data = {
      naziv: naziv
    }

    return this.http.post(`${this.uri}/dodajSpecijalizaciju`, data);
  }

  dohvatiPreglede(specijalizacija){
    const data = {
      specijalizacija: specijalizacija
    }

    return this.http.post(`${this.uri}/dohvatiPreglede`, data);
  }

  dodajPregled(naziv, specijalizacija, cena, trajanje){
    const data = {
      naziv: naziv,
      specijalizacija: specijalizacija,
      cena: cena,
      trajanje_u_min: trajanje
    }

    return this.http.post(`${this.uri}/dodajpregled`, data);
  }

  obrisiPregled(naziv, specijalizacija){
    const data = {
      naziv: naziv,
      specijalizacija: specijalizacija
    }

    return this.http.post(`${this.uri}/obrisiPregled`, data);
  }

  azurirajPregled(stariNaziv, naziv, specijalizacija, trajanje, cena){
    const data = {
      stariNaziv: stariNaziv,
      naziv: naziv,
      specijalizacija: specijalizacija,
      cena: cena,
      trajanje_u_min: trajanje
    }

    return this.http.post(`${this.uri}/azurirajPregled`, data);
  }

}
