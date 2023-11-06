import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacijent-obavestenja',
  templateUrl: './pacijent-obavestenja.component.html',
  styleUrls: ['./pacijent-obavestenja.component.css']
})
export class PacijentObavestenjaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  odjaviSe(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
