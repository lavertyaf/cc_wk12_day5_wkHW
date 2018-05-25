const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Identities = function () {

};

Identities.prototype.bindEvents = function () {
  PubSub.subscribe('Gender:selected', (evt) => {
    console.log("subscribed to gs");
    const selectedGender = evt.detail; //"female"
    this.getIdentityData(selectedGender);
  });
};

Identities.prototype.getIdentityData = function (selectedGender) {
  const requestHelper = new RequestHelper(`http://uinames.com/api/?gender=${selectedGender}&ext`);

  requestHelper.get((data) => this.handleDataReady(data));
};

Identities.prototype.handleDataReady = function (data) {
  PubSub.publish('Identities:data-ready', data)
  console.log(data);
};


module.exports = Identities;
