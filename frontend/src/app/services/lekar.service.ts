import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZakazaniPregled } from '../models/zakazani-pregled';
import { Izvestaj } from '../models/izvestaj';

@Injectable({
  providedIn: 'root'
})
export class LekarService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/lekar';

  dohvatiPregledeSpec(specijalizacija) {
    const data = {
      specijalizacija: specijalizacija
    }

    return this.http.post(`${this.uri}/dohvatiPregledeSpec`, data);
  }

  dodajPregled(pregled, lekar) {
    const data = {
      naziv: pregled,
      lekar: lekar
    }

    return this.http.post(`${this.uri}/dodajPregled`, data);
  }

  izbaciPregled(pregled, lekar) {
    const data = {
      naziv: pregled,
      lekar: lekar
    }

    return this.http.post(`${this.uri}/izbaciPregled`, data);
  }

  posaljiZahtev(naziv, specijalizacija) {
    const data = {
      naziv: naziv,
      specijalizacija: specijalizacija
    }

    return this.http.post(`${this.uri}/posaljiZahtev`, data);
  }

  dohvatiPregledeLekar(licenca) {
    const data = {
      licenca: licenca
    }

    return this.http.post(`${this.uri}/dohvatiPregledeLekar`, data);
  }

  formatirajDatum(ceoDatum): string {
    const datum = new Date(ceoDatum);
    const dan = datum.getDate();
    const mesec = datum.getMonth() + 1;
    const godina = datum.getFullYear();

    // Formatiranje datuma
    const formatiran_datum = `${dan < 10 ? '0' : ''}${dan}.${mesec < 10 ? '0' : ''}${mesec}.${godina}.`;

    return formatiran_datum;
  }

  formatirajVreme(ceoDatum): string {
    const datum = new Date(ceoDatum);
    const sati = datum.getHours();
    const minuti = datum.getMinutes();

    // Formatiranje vremena
    const formatirano_vreme = `${sati < 10 ? '0' : ''}${sati}:${minuti < 10 ? '0' : ''}${minuti}`;

    return formatirano_vreme;
  }

  sortirajPreglede(pregledi): ZakazaniPregled[] {
    let sviPregledi = pregledi;
    return sviPregledi.sort((p1, p2) => {
      const datumA = new Date(p1.pocetak_pregleda);
      const datumB = new Date(p2.pocetak_pregleda);

      // Uporedi datume
      if (datumA < datumB) return -1;
      if (datumA > datumB) return 1;
      return 0;
    })
  }

  dohvatiPacijenta(kor_ime) {
    const data = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/dohvatiPacijenta`, data);
  }

  dohvatiIzvestaje(pacijent) {
    const data = {
      pacijent: pacijent
    }

    return this.http.post(`${this.uri}/dohvatiIzvestaje`, data);
  }

  sortirajIzvestaje(izvestaji): Izvestaj[] {
    let sviIzvestaji = izvestaji;
    return sviIzvestaji.sort((i1, i2) => {
      const datumA = new Date(i1.datum_pregleda);
      const datumB = new Date(i2.datum_pregleda);

      // Uporedi datume
      if (datumA < datumB) return 1;
      if (datumA > datumB) return -1;
      return 0;
    })
  }

  dohvatiPregledeBezIzvestaja(licenca) {
    const data = {
      licenca: licenca
    }

    return this.http.post(`${this.uri}/dohvatiPregledeBezIzvestaja`, data);
  }

  unesiIzvestaj(razlog_dolaska, dijagnoza, datum_narednog_pregleda,
    datum_pregleda, specijalizacija, terapija, pacijent, lekar,
    ime_lekara, prezime_lekara) {
    const data = {
      razlog_dolaska: razlog_dolaska,
      dijagnoza: dijagnoza,
      datum_narednog_pregleda: datum_narednog_pregleda,
      datum_pregleda: datum_pregleda,
      specijalizacija: specijalizacija,
      terapija: terapija,
      pacijent: pacijent,
      lekar: lekar,
      ime_lekara: ime_lekara,
      prezime_lekara: prezime_lekara
    }

    return this.http.post(`${this.uri}/unesiIzvestaj`, data);
  }

  azurirajProfil(data: FormData) {
    return this.http.post(`${this.uri}/azurirajProfil`, data);
  }
}
