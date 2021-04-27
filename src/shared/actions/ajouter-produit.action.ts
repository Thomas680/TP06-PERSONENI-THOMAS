import { Produit } from 'src/shared/models/produit';

export class AjouterProduit {
    static readonly type = "AJOUTER_PRODUIT";

    constructor(public payload:Produit) {}
}
