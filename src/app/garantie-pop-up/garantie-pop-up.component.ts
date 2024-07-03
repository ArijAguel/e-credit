import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-garantie-pop-up',
  templateUrl: './garantie-pop-up.component.html',
  styleUrls: ['./garantie-pop-up.component.scss']
})
export class GarantiePopUpComponent implements OnInit  {
  GarantieForm!: UntypedFormGroup;
  @Input() visible!: boolean ;
  @Output() displayChange = new EventEmitter<Boolean>()
  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.GarantieForm=this.formBuilder.group({
      nature:[],
      type:[],
      valeur:[],
      devise:[],
    }) }





  natureDropdownItems = [
    { name: 'Garantie de paiement', value: 'Garantie de paiement' },
    { name: 'Garantie de bonne fin', value: 'Garantie de bonne fin' },
    { name: 'Garantie soumission', value: 'Garantie soumission' }
];
typeDropdownItems = [
  { name: 'premiere demande', value: 'premiere demande' },
  { name: 'cautionnement bancaire', value: 'cautionnement bancaire' },
  { name: 'lettre de crédit', value: 'lettre de crédit' }
];
deviseDropdownItems = [
  { name: 'TND', value: 'TND' },
  { name: 'USD', value: 'USD' },
  { name: 'GBP', value: 'GBP' }
];

// close(){
//   this.visible=false
//   this.onVisibleChange
  
// }
onVisibleChange(event:boolean){
this.visible=event
this.displayChange.emit(this.visible)

}
}
