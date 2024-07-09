import { Component, OnInit } from '@angular/core';
import { Demande } from '../Models/Demande';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
  listeDemandes: Demande[] = [];

  ngOnInit(): void {

  }
}
