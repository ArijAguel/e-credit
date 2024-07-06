import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Garantie } from '../Models/Garantie';
import { MessageService } from 'primeng/api';
import { Piece } from '../Models/Piece';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}


@Component({
  selector: 'app-credit-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.scss']
})
export class CreditFormComponent implements OnInit {


  CredForm!: UntypedFormGroup;
  GarantieForm!: UntypedFormGroup;
  PieceJointeForm!: UntypedFormGroup;

  visible!: boolean;
  visible2: boolean = false;
  piece: Piece = new Piece();;



  submitted: boolean = false;
  colonnesGarantie: any[] = [];
  listeGaranties: Garantie[] = [];
  statutPieces: String[] = ["non","non"];
  // garantie: Garantie = {};
  isEditMode: boolean = false;
  editIndex: number = -1;




  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    // this.listeGaranties=[
    //   {
    //     nature: 'Nature 1',
    //     type: 'Type 1',
    //     valeur: '1000',
    //     devise: 'USD'
    //   },
    //   {
    //     nature: 'Nature 2',
    //     type: 'Type 2',
    //     valeur: '2000',
    //     devise: 'EUR'
    //   },
    //   {
    //     nature: 'Nature 3',
    //     type: 'Type 3',
    //     valeur: '3000',
    //     devise: 'GBP'
    //   }
    // ]
    this.CredForm = this.formBuilder.group({
      cin: [],
      nom: [],
      prenom: [],
      numCompte: [],
      devise: [],
      dateOuverture: [],
      dateNaissance: [],
      situationFamiliale: [],
      typeCredit: [],
      montant: [],
      unite: [],
      nbrEcheance: [],
      observations:[],



    })

    this.GarantieForm = this.formBuilder.group({
      nature: [],
      type: [],
      valeur: [],
      devise: [],
    })

    this.PieceJointeForm = this.formBuilder.group({
      document: [],
      photo: [],

    })

    this.colonnesGarantie = [
      { field: 'nature', header: 'nature' },
      { field: 'type', header: 'type' },
      { field: 'valeur', header: 'valeur' },
      { field: 'devise', header: 'devise' },
    ]




  }


  dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
  ];

  NumeroDropdownItems = [
    { name: 'NumOption 1', code: 'NumOption 1' },
    { name: 'NumOption 2', code: 'NumOption 2' },
    { name: 'NumOption 3', code: 'NumOption 3' }
  ];

  UniteDropdownItems = [
    { name: 'Unite 1', code: 'Unite 1' },
    { name: 'Unite 2', code: 'Unite 2' },
    { name: 'Unite 3', code: 'Unite 3' }
  ];

  CreditDropdownItems = [
    { name: 'Credit 1', code: 'Credit 1' },
    { name: 'Credit 2', code: 'Credit 2' },
    { name: 'Credit 3', code: 'Credit 3' }
  ];


  PiecesJointes = [];
  GarantiesProposees = [];


  showDialog() {
    this.visible = true;
    console.log('v', this.visible);
  }
  showDialog2() {
    this.visible2 = true;
  }

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
  documentDropdownItems = [
    { name: 'cin', value: 'cin' },
    { name: 'bulletin de paie', value: 'bulletin de paie' }
  ];

  close() {
    this.visible = false
    this.GarantieForm.reset();
    this.visible2 = false
    this.PieceJointeForm.reset();


  }




  enregistrerGarantie() {
    const newGarantie: Garantie = this.GarantieForm.value;

    if (this.isEditMode && this.editIndex > -1) {
      this.listeGaranties[this.editIndex] = newGarantie;
    } else {
      this.listeGaranties.push(newGarantie);
    }

    this.GarantieForm.reset();
    this.isEditMode = false;
    this.editIndex = -1;
    this.visible = false;
  }



  supprimerGarantie(index: number) {
    this.listeGaranties.splice(index, 1);
  }

  modifierGarantie(index: number) {
    const garantie = this.listeGaranties[index];
    this.GarantieForm.patchValue(garantie);
    this.editIndex = index;
    this.isEditMode = true;
    this.visible = true;
  }

  onFileSelected(event: any) {
    const file = event.files[0];
    if (file) {
      this.PieceJointeForm.patchValue({
        photo: file // Update the 'photo' form control with the selected file
      });
    }
    console.log("fileOnFileSelected", file);


  }

  enregistrerPiece() {
    const file = this.PieceJointeForm.get('photo')?.value;

    if (file) {
      const selectedDocument = this.PieceJointeForm.get('document')?.value;
      if (selectedDocument === 'cin') {
        this.piece.cin = true;
        this.piece.cinpath = file.name;
        this.statutPieces[1]="oui"
      } else if (selectedDocument === 'bulletin de paie') {
        this.piece.bulletin = true;
        this.piece.bulletinpath = file.name;
        this.statutPieces[0]="oui"

      }
      console.log("piece", this.piece);
      console.log("statut", this.statutPieces);

      this.visible2 = false;


    }
    this.PieceJointeForm.reset();

  }

} 