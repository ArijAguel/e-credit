import { Demande } from "./Demande";

export class Piece {
    idPiece: Number;
    // demande: Demande;
    cin: boolean;
    cinpath: string;
    bulletin: boolean;
    bulletinpath: string;

    constructor() {
      this.idPiece = 0;
        this.cin = false;
        this.cinpath = '';
        this.bulletin = false;
        this.bulletinpath = '';
      }
}

