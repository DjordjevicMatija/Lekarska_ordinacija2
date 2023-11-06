import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-promocije',
  templateUrl: './menadzer-promocije.component.html',
  styleUrls: ['./menadzer-promocije.component.css']
})
export class MenadzerPromocijeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  odjaviSe() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
