const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Identities = function () {

};

Identities.prototype.bindEvents = function () {
  PubSub.subscribe('Gender:selected', (evt) => {
    const selectedGender = evt.detail;
    this.getIdentityData(selectedGender);
  });
};

Identities.prototype.getIdentityData = function (selectedGender) {
  const requestHelper = new RequestHelper(`http://uinames.com/api/?gender=${selectedGender}&ext&region=spain`);
  requestHelper.get((data) => {
    data = this.addImage(data)
    this.handleDataReady(data)
  });
};

Identities.prototype.addImage = function (data) {
  const names = ['aileen', 'alex', 'Alex2', 'andris', 'balazs', 'brendan', 'claire', 'ewa', 'jaime', 'jemma', 'joe', 'lewis', 'marta', 'matthew', 'michael', 'michelle', 'rachel', 'ryan', 'sebastian', 'simon', 'keith', 'pawel', 'alexb', 'sian'];
  const randomNumber = Math.floor(Math.random()*24);
  console.log(randomNumber);

  data.src = `images/${names[randomNumber]}.jpeg`
  return data
};

Identities.prototype.handleDataReady = function (data) {
  PubSub.publish('Identities:data-ready', data);
};


module.exports = Identities;
