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
  DemandeService: any;

  piece = new Piece();

  
  
   



  submitted: boolean = false;
  colonnesGarantie: any[] = [];
  listeGaranties: Garantie[] = [];
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
   

    console.log("Form based on this flag:",this.flag);
     this.FormDisplayBasedOnFlag(this.flag,this.idDemande);

    } // constructor

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
  
 
 updatePieceJointe(){
  console.log(this.CredForm.get('type')?.value);
  
    switch (this.CredForm.get('type')?.value) {
      case 'crédit à la consommation':
        this.piece.doc1="aaa";
        this.piece.statut1=false;
        this.piece.obligatoire1=true;

        this.piece.doc2="bbb";
        this.piece.statut2=false;
        this.piece.obligatoire2=true;
        break;
      case 'pret immobilier':
        this.piece.doc1="ccc";
        this.piece.statut1=false;
        this.piece.obligatoire1=true;

        this.piece.doc2="ddd";
        this.piece.statut2=false;
        this.piece.obligatoire2=true;
        break;
      case 'crédit automobile':
        this.piece.doc1="eee";
        this.piece.statut1=false;
        this.piece.obligatoire1=true;

        this.piece.doc2="fff";
        this.piece.statut2=false;
        this.piece.obligatoire2=true;
        break;
        case 'crédit relais':
          this.piece.doc1="iii";
          this.piece.statut1=false;
          this.piece.obligatoire1=true;
          this.piece.doc2="jjj";
          this.piece.statut2=false;
          this.piece.obligatoire2=true;
        break;
      
    }

 }

 

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
                devise: client.devise,
                
              });
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



  close() {
    this.visible = false
    this.GarantieForm.reset();
   


  }


  enregistrerGarantie() {
    const newGarantie: Garantie = this.GarantieForm.value;
    console.log("newnew",newGarantie);
    
    if (this.GarantieForm.valid) {

    if (this.isEditMode && this.editIndex > -1) {
      this.listeGaranties[this.editIndex] = newGarantie;
      console.log("modification garantie");
     

    } 
    else {
      this.listeGaranties.push(newGarantie);
      console.log("ajout garantie");
     
      

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
    this.listeGaranties.splice(index, 1);
    console.log("suppression garantie");
    
  }
  

  modifierGarantie(index: number) {
    const garantie = this.listeGaranties[index];
    this.GarantieForm.patchValue(garantie);
    this.editIndex = index;
    this.isEditMode = true;
    this.visible = true;
    
  }

  onFile1Selected(event: any) {
    const file = event.files[0];
    if (file) {
      this.piece.statut1=true;
    }
    console.log("fileOnFileSelected doc1", file);
  }

  onFile2Selected(event: any) {
    const file = event.files[0];
    if (file) {
      this.piece.statut2=true;
    }
    console.log("fileOnFileSelected doc2", file);
  }


  initialiser(){
    this.CredForm.reset();
    console.log("aaaaaaa");
    
  }
 

 

  getClientInfoByCin(cin: number) {
    this.demandeService.getClientByCin(cin).subscribe(
      (client: Client) => {

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
    
      this.demande.etatDemande="en cours";
      this.demande.dateCre=new Date;

      this.CredForm.patchValue(this.demande)
      console.log("d",this.demande);
      this.demande.type=this.CredForm.controls['type'].value;
      this.demande.unite=this.CredForm.controls['unite'].value;
      this.demande.montant=this.CredForm.controls['montant'].value;
      this.demande.nbrEcheance=this.CredForm.controls['nbrEcheance'].value;

      this.demande.listeGaranties=this.listeGaranties;
      this.demande.pieceJointe= this.piece;
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
        console.log("form display method: flag:",flag,"id",idDemande,"demande",demande);
        
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



