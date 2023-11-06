import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Izvestaj } from '../models/izvestaj';
import { ZakazaniPregled } from '../models/zakazani-pregled';

@Injectable({
  providedIn: 'root'
})
export class PacijentService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/pacijent'

  dohvatiPreglede(licenca) {
    const data = {
      licenca: licenca
    }

    return this.http.post(`${this.uri}/dohvatiPreglede`, data);
  }

  zakaziPregled(pacijent_kor_ime, lekar_licenca, ime_lekara, prezime_lekara,
    ogranak, izabranPregled, pocetak_pregleda, kraj_pregleda, cena) {
    const data = {
      pacijent: pacijent_kor_ime,
      lekar: lekar_licenca,
      ime_lekara: ime_lekara,
      prezime_lekara: prezime_lekara,
      ogranak: ogranak,
      pregled: izabranPregled,
      pocetak_pregleda: pocetak_pregleda,
      kraj_pregleda: kraj_pregleda,
      cena: cena
    }

    return this.http.post(`${this.uri}/zakaziPregled`, data);
  }

  dohvatiPregledePacijent(pacijent) {
    const data = {
      pacijent: pacijent
    }

    return this.http.post(`${this.uri}/dohvatiPregledePacijent`, data);
  }

  dohvatiIzvestaje(pacijent) {
    const data = {
      pacijent: pacijent
    }

    return this.http.post(`${this.uri}/dohvatiIzvestaje`, data);
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

  otkaziPregled(lekar, termin) {
    const data = {
      lekar: lekar,
      termin: termin
    }

    return this.http.post(`${this.uri}/otkaziPregled`, data);
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

  azurirajProfil(data: FormData) {
    return this.http.post(`${this.uri}/azurirajProfil`, data);
  }

}
