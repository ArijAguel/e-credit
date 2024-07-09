import { Client } from "./Client";

export interface Demande {
   
    idDemande: Number,
    client: Client,
    type: String,
    unite: String,
    montant: Number,
    nbrEcheance: Number,
    observations: String,

}