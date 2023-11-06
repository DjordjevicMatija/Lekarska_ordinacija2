import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { PrijavaMenadzerComponent } from './prijava-menadzer/prijava-menadzer.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { PacijentPocetnaComponent } from './pacijent/pacijent-pocetna/pacijent-pocetna.component';
import { PacijentLekariComponent } from './pacijent/pacijent-lekari/pacijent-lekari.component';
import { PacijentPreglediComponent } from './pacijent/pacijent-pregledi/pacijent-pregledi.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { LekarProfilComponent } from './lekar-profil/lekar-profil.component';
import { PacijentObavestenjaComponent } from './pacijent/pacijent-obavestenja/pacijent-obavestenja.component';
import { LekarPocetnaComponent } from './lekar/lekar-pocetna/lekar-pocetna.component';
import { LekarPreglediComponent } from './lekar/lekar-pregledi/lekar-pregledi.component';
import { LekarRaznoComponent } from './lekar/lekar-razno/lekar-razno.component';
import { PacijentKartonComponent } from './pacijent-karton/pacijent-karton.component';
import { KorisnikProfilComponent } from './korisnik-profil/korisnik-profil.component';
import { MenadzerZahtevRegComponent } from './menadzer/menadzer-zahtev-reg/menadzer-zahtev-reg.component';
import { MenadzerZahtevPregledComponent } from './menadzer/menadzer-zahtev-pregled/menadzer-zahtev-pregled.component';
import { MenadzerPromocijeComponent } from './menadzer/menadzer-promocije/menadzer-promocije.component';
import { AzuriranjePregledaComponent } from './azuriranje-pregleda/azuriranje-pregleda.component'

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    LekarComponent,
    PacijentComponent,
    PrijavaMenadzerComponent,
    RegistracijaComponent,
    MenadzerComponent,
    PacijentPocetnaComponent,
    PacijentLekariComponent,
    PacijentPreglediComponent,
    PromenaLozinkeComponent,
    LekarProfilComponent,
    PacijentObavestenjaComponent,
    LekarPocetnaComponent,
    LekarPreglediComponent,
    LekarRaznoComponent,
    PacijentKartonComponent,
    KorisnikProfilComponent,
    MenadzerZahtevRegComponent,
    MenadzerZahtevPregledComponent,
    MenadzerPromocijeComponent,
    AzuriranjePregledaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
