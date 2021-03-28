import { Produit } from "../model/produit.model";

export class RetirerProduit {
    static readonly type = "RETIRER_PRODUIT";

    constructor(public payload:Produit) {}
}
