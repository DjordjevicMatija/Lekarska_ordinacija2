import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { PrijavaMenadzerComponent } from './prijava-menadzer/prijava-menadzer.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { PacijentLekariComponent } from './pacijent/pacijent-lekari/pacijent-lekari.component';
import { PacijentPreglediComponent } from './pacijent/pacijent-pregledi/pacijent-pregledi.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AutentikacijaPacijentService } from './services/autentikacija-pacijent.service';
import { AutentikacijaMenadzerService } from './services/autentikacija-menadzer.service';
import { AutentikacijaLekarService } from './services/autentikacija-lekar.service';
import { LekarProfilComponent } from './lekar-profil/lekar-profil.component';
import { LekarPreglediComponent } from './lekar/lekar-pregledi/lekar-pregledi.component';
import { LekarRaznoComponent } from './lekar/lekar-razno/lekar-razno.component';
import { PacijentObavestenjaComponent } from './pacijent/pacijent-obavestenja/pacijent-obavestenja.component';
import { PacijentKartonComponent } from './pacijent-karton/pacijent-karton.component';
import { KorisnikProfilComponent } from './korisnik-profil/korisnik-profil.component';
import { MenadzerZahtevRegComponent } from './menadzer/menadzer-zahtev-reg/menadzer-zahtev-reg.component';
import { MenadzerZahtevPregledComponent } from './menadzer/menadzer-zahtev-pregled/menadzer-zahtev-pregled.component';
import { MenadzerPromocijeComponent } from './menadzer/menadzer-promocije/menadzer-promocije.component';
import { AzuriranjePregledaComponent } from './azuriranje-pregleda/azuriranje-pregleda.component';


const routes: Routes = [
  { path: '', component: PocetnaComponent },
  { path: 'lekar', component: LekarComponent, canActivate: [AutentikacijaLekarService] },
  { path: 'lekar/pregledi', component: LekarPreglediComponent, canActivate: [AutentikacijaLekarService] },
  { path: 'lekar/pregledi/karton', component: PacijentKartonComponent, canActivate: [AutentikacijaLekarService] },
  { path: 'lekar/razno', component: LekarRaznoComponent, canActivate: [AutentikacijaLekarService] },
  { path: 'prijavaMenadzer', component: PrijavaMenadzerComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'menadzer', component: MenadzerComponent, canActivate: [AutentikacijaMenadzerService] },
  { path: 'menadzer/profil', component: KorisnikProfilComponent, canActivate: [AutentikacijaMenadzerService] },
  { path: 'menadzer/azuriranje-pregleda', component: AzuriranjePregledaComponent, canActivate: [AutentikacijaMenadzerService] },
  { path: 'menadzer/zahtev-registracija', component: MenadzerZahtevRegComponent, canActivate: [AutentikacijaMenadzerService] },
  { path: 'menadzer/zahtev-pregledi', component: MenadzerZahtevPregledComponent, canActivate: [AutentikacijaMenadzerService] },
  { path: 'menadzer/promocije', component: MenadzerPromocijeComponent, canActivate: [AutentikacijaMenadzerService] },
  { path: 'pacijent', component: PacijentComponent, canActivate: [AutentikacijaPacijentService] },
  { path: 'pacijent/lekari', component: PacijentLekariComponent, canActivate: [AutentikacijaPacijentService] },
  { path: 'pacijent/pregledi', component: PacijentPreglediComponent, canActivate: [AutentikacijaPacijentService] },
  { path: 'pacijent/obavestenja', component: PacijentObavestenjaComponent, canActivate: [AutentikacijaPacijentService] },
  { path: 'promenaLozinke', component: PromenaLozinkeComponent },
  { path: 'pacijent/lekari/profil', component: LekarProfilComponent, canActivate: [AutentikacijaPacijentService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
