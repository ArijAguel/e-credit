import { Demande } from "./Demande";

export interface Garantie {
      idGarantie:Number,
      demande: Demande,
      nature:string,
      type:string,
      valeur:string,
      devise:string,
}