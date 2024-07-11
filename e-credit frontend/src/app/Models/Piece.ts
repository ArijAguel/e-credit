import { Demande } from "./Demande";

 
  export class Piece {
    idPiece!: number;
    demande!: Demande;
  
    doc1: string;
    statut1: boolean;
    obligatoire1: boolean;
  
    doc2: string;
    statut2: boolean;
    obligatoire2: boolean;
  
    constructor()
    {
 
      this.doc1 = "document1";
      this.statut1 = false;
      this.obligatoire1 = false;
      
      this.doc2 = "document2";
      this.statut2 = false;
      this.obligatoire2 = false;
    }
  }
  
 
  

