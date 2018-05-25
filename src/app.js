const GendersView = require('./views/genders_view');
const IdentityView = require('./views/identity_view');
const Identities = require('./models/identities.js');


document.addEventListener("DOMContentLoaded", () => {
  console.log("Sup!");

  const gendersViewContainer = document.querySelector('#genders')
  const gendersView = new GendersView(gendersViewContainer);
  gendersView.render();

  const identityViewContainer = document.querySelector('#identities')
  const identityView = new IdentityView(identityViewContainer);
  identityView.bindEvents();

  const identities = new Identities();
  identities.bindEvents();
});
