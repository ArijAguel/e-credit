import { Component, OnInit } from '@angular/core';
import { Demande } from '../Models/Demande';
import { DemandeService } from '../Service/demande.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CreditFormComponent } from '../credit-form/credit-form.component';



@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
  listeDemandes: any[] = [];
  //etatDemande="en cours";
  visible=false;
  flag!:string;
  idDemande!: number ;
  



  constructor(private demandeService: DemandeService,
    private router: Router,
    private route: ActivatedRoute
  ) { 

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
     const state=navigation.extras.state as{
       flag:string,
       idDemande:number,
     };
     this.flag=state.flag;
     this.idDemande=state.idDemande;
    }
    else{
     this.router.navigate(["../","consultation-credit"],{relativeTo:this.route});
    }
  }


  ngOnInit(): void {
   this.afficherDemandes();


  }


   navigateToComponent(flag:string,idDemande:number){
    const navigationExtras: NavigationExtras={
      state:{flag:flag,
        idDemande:idDemande
      },
       relativeTo:this.route
    };

    console.log("flag:",flag);
    console.log("navigationExtras:",navigationExtras);
    this.router.navigate(["/demande-credit"],navigationExtras);

   }



  afficherDemandes(): void {
    this.demandeService.getListeDemandes().subscribe(
      (demandes: any[]) => {
        this.listeDemandes = demandes;
        console.log("affichage de la liste",this.listeDemandes);
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes', error);
      }
    );
  }

rejeter(idDemande:number){
  this.demandeService.getDemandeById(idDemande).subscribe(demande => {
    if (demande) {
      demande.etatDemande="rejetée"
      this.demandeService.saveDemande(demande).subscribe(demandeUpdated => {
        this.afficherDemandes();
      console.log("demande rejetée",demandeUpdated); })

    } 
    else {
      console.log("erreur recuperation demande");
    }
  });

  

}

valider(idDemande:number){
  this.demandeService.getDemandeById(idDemande).subscribe(demande => {
    if (demande) {
      demande.etatDemande="validée"
      this.demandeService.saveDemande(demande).subscribe(demandeUpdated => {


        console.log("demande validée",demandeUpdated);
        this.afficherDemandes();
      })
this.afficherDemandes()
    } 
    else {
      console.log("erreur recuperation demande");
    }
  });

  

}



}



  