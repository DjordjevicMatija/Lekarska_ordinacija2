import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lekar } from '../models/lekar';

@Injectable({
  providedIn: 'root'
})
export class LekariService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/neregistrovan';

  dohvatiLekare() {
    return this.http.get(`${this.uri}/dohvatiLekare`);
  }

  sortImeAsc(lekari): Lekar[] {
    let sviLekari = lekari;
    return sviLekari.sort((l1, l2) => {
      return (l1.ime).localeCompare(l2.ime);
    })
  }

  sortImeDes(lekari): Lekar[] {
    let sviLekari = lekari;
    return sviLekari.sort((l1, l2) => {
      return (l2.ime).localeCompare(l1.ime);
    })
  }

  sortPrezimeAsc(lekari): Lekar[] {
    let sviLekari = lekari;
    return sviLekari.sort((l1, l2) => {
      return (l1.prezime).localeCompare(l2.prezime);
    })
  }

  sortPrezimeDes(lekari): Lekar[] {
    let sviLekari = lekari;
    return sviLekari.sort((l1, l2) => {
      return (l2.prezime).localeCompare(l1.prezime);
    })
  }

  sortSpecAsc(lekari): Lekar[] {
    let sviLekari = lekari;
    return sviLekari.sort((l1, l2) => {
      return (l1.specijalizacija).localeCompare(l2.specijalizacija);
    })
  }

  sortSpecDes(lekari): Lekar[] {
    let sviLekari = lekari;
    return sviLekari.sort((l1, l2) => {
      return (l2.specijalizacija).localeCompare(l1.specijalizacija);
    })
  }

  sortOgranakAsc(lekari): Lekar[] {
    let sviLekari = lekari;
    return sviLekari.sort((l1, l2) => {
      return (l1.ogranak).localeCompare(l2.ogranak);
    })
  }

  sortOgranakDes(lekari): Lekar[] {
    let sviLekari = lekari;
    return sviLekari.sort((l1, l2) => {
      return (l2.ogranak).localeCompare(l1.ogranak);
    })
  }

  pretraga(ime, prezime, specijalizacija): Promise<Lekar[]> {
    return new Promise((resolve, reject) => {
      this.dohvatiLekare().subscribe((lekari: Lekar[]) => {
        const sviLekari = lekari.filter(lekar => {
          return lekar.ime.includes(ime) && lekar.prezime.includes(prezime) && lekar.specijalizacija.includes(specijalizacija);
        });
        resolve(sviLekari);
      }, error => {
        reject(error);
      });
    });
  }

  pretragaOgranak(ime, prezime, specijalizacija, ogranak): Promise<Lekar[]> {
    return new Promise((resolve, reject) => {
      this.dohvatiLekare().subscribe((lekari: Lekar[]) => {
        const sviLekari = lekari.filter(lekar => {
          return lekar.ime.includes(ime) && lekar.prezime.includes(prezime) &&
            lekar.specijalizacija.includes(specijalizacija) && lekar.ogranak.includes(ogranak);
        });
        resolve(sviLekari);
      }, error => {
        reject(error);
      });
    });
  }

  ulogujSe(kor_ime, lozinka) {
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/ulogujSe`, data);
  }

  proveriKorIme(kor_ime) {
    const data = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/proveriKorIme`, data);
  }

  proveriKorImeZahtev(kor_ime) {
    const data = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/proveriKorImeZahtev`, data);
  }

  proveriLoz(lozinka): boolean {
    const regex = /^(?!.*(\w)\1)(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z][A-Za-z\d@#$%^&+=!]{6,12}$/;

    return regex.test(lozinka);
  }

  proveriMejlRegex(mejl): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(mejl);
  }

  proveriMejlBaza(mejl) {
    const data = {
      imejl: mejl
    }

    return this.http.post(`${this.uri}/proveriMejlBaza`, data);
  }

  proveriMejlBazaZahtev(mejl) {
    const data = {
      imejl: mejl
    }

    return this.http.post(`${this.uri}/proveriMejlBazaZahtev`, data);
  }

  proveriTelefon(telefon) {
    const regex = /^\d{3}\/\d{6,7}$/;

    return regex.test(telefon);
  }

  proveriSliku(slika, callback) {
    const dozvoljeniFormati = ['image/jpeg', 'image/png'];

    if (!dozvoljeniFormati.includes(slika.type)) {
      return callback(new Error('Nedozvoljen format slike. Dozvoljeni formati su JPG i PNG'));
    }

    const minimalnaSirina = 100;
    const minimalnaVisina = 100;
    const maksimalnaSirina = 300;
    const maksimalnaVisina = 300;

    const img = new Image();
    img.src = URL.createObjectURL(slika);

    img.onload = () => {
      if (img.width < minimalnaSirina || img.height < minimalnaVisina) {
        return callback(new Error(`Slika je premala. Minimalne dimenzije su ${minimalnaSirina}x${minimalnaVisina} px`));
      }

      if (img.width > maksimalnaSirina || img.height > maksimalnaVisina) {
        return callback(new Error(`Slika je prevelika. Maksimalne dimenzije su ${maksimalnaSirina}x${maksimalnaVisina} px`));
      }

      callback(null, 'Slika je u redu');
    };

    img.onerror = () => {
      return callback(new Error('Greška pri čitanju dimenzija slike'));
    };
  }

  posaljiZahtev(data: FormData) {
    return this.http.post(`${this.uri}/posaljiZahtev`, data);
  }

  proveriStaruLoz(kor_ime, lozinka) {
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/proveriStaruLoz`, data);
  }

  promeniLozinku(kor_ime, lozinka) {
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/promeniLozinku`, data);
  }

}
