import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup,Validators } from '@angular/forms';
import { Garantie } from '../Models/Garantie';
import { MessageService } from 'primeng/api';
import { Piece } from '../Models/Piece';
import { Demande } from '../Models/Demande';
import { DemandeService } from '../Service/demande.service';
import { Client } from '../Models/Client';
import { DatePipe } from '@angular/common';
import { GarantieService } from 'src/app/Service/garantie.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';




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
  piece: Piece = new Piece();DemandeService: any;
;



  submitted: boolean = false;
  colonnesGarantie: any[] = [];
  listeGaranties: Garantie[] = [];
  statutPieces: String[] = ["non","non"];
  // garantie: Garantie = {};
  isEditMode: boolean = false;
  editIndex: number = -1;
  demande: Demande ={} as Demande;
  flag!:string;
  idDemande!: number ;




  constructor(
    private formBuilder: UntypedFormBuilder,
    private demandeService: DemandeService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private garantieService: GarantieService,
    private router: Router,
    private route: ActivatedRoute) 
    { 
   

   
    const navigation = this.router.getCurrentNavigation();
    console.log('Current Navigation:', navigation); 

    if (navigation?.extras?.state) {
     const state=navigation.extras.state as{
       flag:string,
       idDemande:number,
     };
     this.flag=state.flag;
     this.idDemande=state.idDemande;
     console.log("credit form flag:",this.flag);
    }

    else{
     this.router.navigate(["../","demande-credit"],{relativeTo:this.route});
     console.log("credit form flag error");

    }
   

    }

  ngOnInit(): void {

    this.CredForm = this.formBuilder.group({
      type: ['', Validators.required], 
      montant: ['', [Validators.required, Validators.min(0)]],
      unite: ['', Validators.required], 
      // nbrEcheance: [{ value: '', disabled: true }], 
      nbrEcheance: ['', Validators.required],
      observations:[],


      cin:['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nom: [],
      prenom: [],
      numCompte: ['', Validators.required], 
      devise: [], 
      dateOuverture: [new Date()],
      dateNaissance: [new Date()],
      situationFamiliale: [],
    });
 
    // this.onCinChange();
    this.CredForm.get('unite')?.valueChanges.subscribe(() => this.calculateNbrEcheance());


  

  
    
    console.log("Form based on this flag:",this.flag);
     this.FormDisplayBasedOnFlag(this.flag,this.idDemande);
    // this.FormDisplayBasedOnFlag("consult",this.idDemande);


    

    this.GarantieForm = this.formBuilder.group({
      nature: ['', Validators.required], 
      type: ['', Validators.required],
      valeur: ['', [Validators.required, Validators.min(0)]],
      devise: ['', Validators.required], 
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


  } //ngOnInit

  NumeroDropdownItems = [
    { name: '11', value: 11 },
    { name: '22', value: 22 },
    { name: '23', value: 33 },
    { name: '444', value:444 },
    { name: '55555', value: 55555 },
    { name: '9', value: 9 },
  ];

  situationFamilialeDropdownItems = [
    { name: 'Célibataire', value: 'Célibataire' },
    { name: 'Marié', value: 'Marié' },
    { name: 'Divorcé', value: 'Divorcé' },
    { name: 'Veuf', value: 'Veuf' },
  ];

  uniteDropdownItems = [
    { name: 'mensuelle', value: "mensuelle" },
    { name: 'trimestrielle', value: "trimestrielle" },
    { name: 'semestrielle', value: "semestrielle" },
  ];
  
 
 updateDocumentDropDownItems(){
  
    switch (this.CredForm.get('type')?.value) {
      case 'crédit à la consommation':
        this.documentDropdownItems  = [
          { name: '111', value: 'cin' },
          { name: 'bulletin de paie', value: 'bulletin de paie' }
        ];
        break;
      case 'pret immobilier':
        this.documentDropdownItems  = [
          { name: '222', value: 'cin' },
          { name: 'bulletin de paie', value: 'bulletin de paie' }
        ];
        break;
      case 'crédit automobile':
        this.documentDropdownItems  =[
          { name: '333', value: 'cin' },
          { name: 'bulletin de paie', value: 'bulletin de paie' }
        ];
        break;
        case 'crédit relais':
          this.documentDropdownItems  = [
          { name: '444', value: 'cin' },
          { name: 'bulletin de paie', value: 'bulletin de paie' }
        ];
        break;
      default:
        this.documentDropdownItems  = [
          { name: '555', value: 'cin' },
          { name: 'bulletin de paie', value: 'bulletin de paie' }
        ];
    }

 }

  PiecesJointes = [];
  GarantiesProposees = [];

onCinChange(): void {
    //  this.CredForm.get('cin')?.valueChanges.subscribe(cin => {
      if (this.CredForm.get('cin')?.valid) {
        this.demandeService.getClientByCin(this.CredForm.get('cin')?.value).subscribe(
          (client: Client) => {

            if (client) {

              console.log("Client data from API:",client); 
              console.log("dateNaissanceFormatted",this.datePipe.transform(client.dateNaissance, 'dd/MM/yy'));
              
              
              this.CredForm.patchValue({
                nom: client.nom,
                prenom: client.prenom,
                situationFamiliale: client.situationFamiliale,
                dateNaissance: this.datePipe.transform(client.dateNaissance, 'dd/MM/yy'),
                dateOuverture: this.datePipe.transform(client.dateOuverture, 'dd/MM/yy'),
                numCompte: client.numCompte,
                //numCompte: '',
                devise: client.devise,
                
              });
              //this.NumeroDropdownItems = listeNumComptes.map(numCompte => ({ name: `Compte ${numCompte}`, value: numCompte }));
            }
          },
          error => {
            console.error('Erreur lors de la récupération du client', error);
          }
        );
      }
    // });
  }  

   calculateNbrEcheance(): void {
    const montant = this.CredForm.get('montant')?.value;
    const unite = this.CredForm.get('unite')?.value;

    let U;
    switch (unite) {
      case 'mensuelle':
        U = 1;
        break;
      case 'trimestrielle':
        U = 3;
        break;
      case 'semestrielle':
        U = 6;
        break;
      default:
        U = 1;
    }

    if (montant && U) {
      const nbrEcheance = montant / (300 * U);
      this.CredForm.get('nbrEcheance')?.setValue(nbrEcheance.toFixed(2));
    }
  }

  showDialog() {
    this.visible = true;
    console.log('v', this.visible);
    
  }
  showDialog2() {
    this.visible2 = true;
    this.doc1="AAA";
  }

  natureGarantieDropdownItems = [
    { name: 'Garantie de paiement', value: 'Garantie de paiement' },
    { name: 'Garantie de bonne fin', value: 'Garantie de bonne fin' },
    { name: 'Garantie soumission', value: 'Garantie soumission' }
  ];

  typeGarantieDropdownItems = [
    { name: 'premiere demande', value: 'premiere demande' },
    { name: 'cautionnement bancaire', value: 'cautionnement bancaire' },
    { name: 'lettre de crédit', value: 'lettre de crédit' }
  ];

  deviseDropdownItems = [
    { name: 'TND', value: 'TND' },
    { name: 'USD', value: 'USD' },
    { name: 'euro', value: 'euro' },
    { name: 'GBP', value: 'GBP' },
    { name: 'JPY', value: 'JPY' }
  ];


  typeCreditDropdownItems = [
    { name: 'crédit à la consommation', value: 'crédit à la consommation' },
    { name: 'pret immobilier', value: 'pret immobilier' },
    { name: 'crédit automobile', value: 'crédit automobile' },
    { name: 'crédit relais', value: 'crédit relais' }
    
  ];

  doc1="sss";

  documentDropdownItems = [
    { name: this.doc1, value: 'cin' },
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
    console.log("newnew",newGarantie);
    
    if (this.GarantieForm.valid) {

    if (this.isEditMode && this.editIndex > -1) {
      this.listeGaranties[this.editIndex] = newGarantie;
      
      // this.garantieService.modifierGarantie(newGarantie).subscribe(
      //   (garantieModifiee) => {
      //     this.listeGaranties[this.editIndex] = garantieModifiee;
      //   },
      //   (error) => {
      //     console.error('Erreur lors de la modification de la garantie', error);
      //   }
      // );

    } 
    else {
      this.listeGaranties.push(newGarantie);
      
      // this.garantieService.enregistrerGarantie(newGarantie).subscribe(
      //   (garantieEnregistree) => {
      //     this.listeGaranties.push(garantieEnregistree);
      //   },

        // (error) => {
        //   console.error('Erreur lors de l\'enregistrement de la garantie', error);
        // }
      // );
      

    }

    this.GarantieForm.reset();
    this.isEditMode = false;
    this.editIndex = -1;
    this.visible = false; }// if is valid
    else {console.log("GarantieForm is invalid, cannot submit.");
      this.GarantieForm.markAllAsTouched();
      return;
    }
  }



  supprimerGarantie(index: number) {
    //this.listeGaranties.splice(index, 1);

    const garantie = this.listeGaranties[index];
    if (garantie && garantie.idGarantie) {
      this.garantieService.supprimerGarantie(index).subscribe(
        () => {
          this.listeGaranties.splice(index, 1);
        },
        (error) => {
          console.error('Erreur lors de la suppression de la garantie', error);
        }
      );
    } else {
      console.error('Garantie ID is not defined, cannot delete.');
    }
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
        photo: file 
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
 
  initialiser(){
    this.CredForm.reset();
    console.log("aaaaaaa");
    
  }
 

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  getClientInfoByCin(cin: number) {
    this.demandeService.getClientByCin(cin).subscribe(
      (client: Client) => {
       // ({ client, listeNumComptes }: { client: Client; listeNumComptes: number[] }) => {

        this.CredForm.patchValue({
          nom: client.nom,
          prenom: client.prenom,
          dateNaissance: client.dateNaissance,
          situationFamiliale: client.situationFamiliale
        });
      },
      error => {
        console.error('Client not found', error);
      }
    );
  }
  

  enregistrerDemande(){
    console.log("enregistrement");
    if (this.CredForm.valid) {
    
    
      this.CredForm.patchValue(this.demande)
      console.log("d",this.demande);
      this.demande.type=this.CredForm.controls['type'].value;
      this.demande.unite=this.CredForm.controls['unite'].value;
      this.demande.montant=this.CredForm.controls['montant'].value;
      this.demande.nbrEcheance=this.CredForm.controls['nbrEcheance'].value;
      this.demande.observations=this.CredForm.controls['observations'].value;



     
      
      this.demande.client = {} as Client
      this.demande.client.cin=this.CredForm.controls['cin'].value;
      this.demande.client.nom=this.CredForm.controls['nom'].value;
      this.demande.client.prenom=this.CredForm.controls['prenom'].value;
      
      
       this.demande.client.dateNaissance= this.CredForm.controls['dateOuverture'].value;
       this.demande.client.dateOuverture= this.CredForm.controls['dateNaissance'].value;

      this.demande.client.devise=this.CredForm.controls['devise'].value;
      this.demande.client.numCompte=this.CredForm.controls['numCompte'].value;
      this.demande.client.situationFamiliale=this.CredForm.controls['situationFamiliale'].value;

      

      this.demandeService.saveDemande(this.demande).subscribe(
        (        response: any) => {
          console.log('Demande sauvegardée avec succès', response);
          // Ajoutez ici la logique supplémentaire après la sauvegarde
          console.log("demande",this.demande);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Demande enregistrée avec succes' });
          this.CredForm.reset();


          
        },
        (        error: any) => {
          console.log("demandeErr",this.demande);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l enregistrement de la demande' });


          console.error('Erreur lors de la sauvegarde de la demande', error);
        }
      );
    

  }  else {console.log("Form is invalid, cannot submit.");
    //this.CredForm.markAllAsTouched();
    
     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Remplir les champs obligatoires !' });
     return;

  }
  } 


  FormDisplayBasedOnFlag(flag: string, idDemande: number) {
    this.demandeService.getDemandeById(idDemande).subscribe(demande => {
      if (demande) {
        if (flag === 'edit') {
          this.CredForm.patchValue({
            cin: demande.client.cin,
            nom: demande.client.nom,
            prenom: demande.client.prenom,
            situationFamiliale: demande.client.situationFamiliale,
            dateNaissance: this.datePipe.transform(demande.client.dateNaissance, 'dd/MM/yy'),
            dateOuverture: this.datePipe.transform(demande.client.dateOuverture, 'dd/MM/yy'),
            numCompte: demande.client.numCompte,
            devise: demande.client.devise,

            montant: demande.montant ,
            type:demande.type ,
            nbrEcheance:demande.nbrEcheance ,
            unite:demande.unite 
          });
        } else if (flag === 'consult') {
          this.CredForm.patchValue({
            cin: demande.client.cin,
            nom: demande.client.nom,
            prenom: demande.client.prenom,
            situationFamiliale: demande.client.situationFamiliale,
            dateNaissance: this.datePipe.transform(demande.client.dateNaissance, 'dd/MM/yy'),
            dateOuverture: this.datePipe.transform(demande.client.dateOuverture, 'dd/MM/yy'),
            numCompte: demande.client.numCompte,
            devise: demande.client.devise,

            montant: demande.montant ,
            type:demande.type ,
            nbrEcheance:demande.nbrEcheance ,
            unite:demande.unite 
          });
  
          Object.keys(this.CredForm.controls).forEach(element => {
            this.CredForm.get(element)!.disable();
          });
        }
      } else {
        console.log("erreur recuperation demande");
      }
    });
  }
  
  }



