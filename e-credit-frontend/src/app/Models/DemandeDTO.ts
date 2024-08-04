export interface DemandeDTO {
   idDemande: number;
   nom: string;
   etatDemande: string;
   dateCre: Date | string; // Assuming you want to handle date as Date or string
   type: string;
}
