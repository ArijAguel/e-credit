import { Client } from "./Client";
import { Garantie } from "./Garantie";
import { Piece } from "./Piece";

export interface Demande {
   
    idDemande: Number,
    dateCre:Date;
    etatDemande:String;

    client: Client,

    type: String,
    unite: String,
    montant: Number,
    nbrEcheance: Number,

    listeGaranties: Garantie[];
    
    pieceJointe: Piece;

    observations: String,
    

}