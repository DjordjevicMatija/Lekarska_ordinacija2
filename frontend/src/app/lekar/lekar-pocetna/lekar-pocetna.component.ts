import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lekar } from 'src/app/models/lekar';
import { LekariService } from 'src/app/services/lekari.service';

@Component({
  selector: 'app-lekar-pocetna',
  templateUrl: './lekar-pocetna.component.html',
  styleUrls: ['./lekar-pocetna.component.css']
})
export class LekarPocetnaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
