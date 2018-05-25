const PubSub = require('../helpers/pub_sub.js');

const IdentityView = function (container, identity) {
  this.container = container;
  this.identity = identity;
};

IdentityView.prototype.bindEvents = function () {
  PubSub.subscribe('Identities:data-ready', (evt) => {
    this.identity = evt.detail;
    console.log(this.identity);
    // this.render();
  });
};

module.exports = IdentityView;
