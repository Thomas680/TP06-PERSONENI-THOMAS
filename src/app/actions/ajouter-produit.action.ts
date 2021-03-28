import { Produit } from "../model/produit.model";

export class AjouterProduit {
    static readonly type = "AJOUTER_PRODUIT";

    constructor(public payload:Produit) {}
}
