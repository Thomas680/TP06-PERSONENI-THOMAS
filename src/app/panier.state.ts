import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AjouterProduit } from "../shared/actions/ajouter-produit.action";
import { RetirerProduit } from "../shared/actions/retirer-produit.action";
import { Panier } from 'src/shared/models/panier';

@State<Panier>({
    name:"products",
    defaults: {
        products:[]
    }
})

export class PanierState {
    @Selector()
    static getProducts(state:Panier) {
        return state.products;
    }

    @Action(AjouterProduit)
    add({getState, patchState}:StateContext<Panier>, {payload}:AjouterProduit) {
        const state = getState();
        patchState({
            products:[...state.products, payload]
        })
    }

    @Action(RetirerProduit)
    remove({getState, patchState}:StateContext<Panier>, {payload}:RetirerProduit) {
        const state = getState();
        let productsCopy = [...state.products];
        let indexToRemove = productsCopy.indexOf(payload);
        productsCopy.splice(indexToRemove, 1);
        patchState({
            products:productsCopy
        })
    }
}