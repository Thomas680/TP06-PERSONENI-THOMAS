const base = "https://tp06-personeni-thomas.herokuapp.com/api/";

export const environment = {
  production: true,
  login: base + 'login',
  register: base + 'register',
  getProduits: base + 'produits',
  getProduitDetails: base + 'produits/{id}',
  name:"prod"
};
