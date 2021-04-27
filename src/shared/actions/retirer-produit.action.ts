import { Produit } from 'src/shared/models/produit';

export class RetirerProduit {
    static readonly type = "RETIRER_PRODUIT";

    constructor(public payload:Produit) {}
}
