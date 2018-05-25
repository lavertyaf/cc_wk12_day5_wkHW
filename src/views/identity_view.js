const PubSub = require('../helpers/pub_sub.js');


const IdentityView = function (container, identity) {
  this.container = container;
  this.identity = identity;
};

IdentityView.prototype.bindEvents = function () {
  PubSub.subscribe('Identities:data-ready', (evt) => {
    this.identity = evt.detail;
    this.displayIdentity(event.detail);
  });
};

IdentityView.prototype.displayIdentity = function (data) {

  const newIdContainer = document.createElement('div');
  const newImageContainer = document.createElement('div');
  const newInfoContainer = document.createElement('div');
  const container = document.querySelector('#identity');
  newIdContainer.classList.add('new-id-container');
  newImageContainer.classList.add('new-image-container');
  newInfoContainer.classList.add('new-info-container');

  container.innerHTML = '';

  const nameInfo = document.createElement('li');
  const ageInfo = document.createElement('li');
  const birthdayInfo = document.createElement('li');
  const mobileInfo = document.createElement('li');
  const countryInfo = document.createElement('li');
  const image = document.createElement('img');

  nameInfo.textContent = data.name + " " + data.surname;
  ageInfo.textContent = data.age;
  birthdayInfo.textContent = data.birthday.dmy;
  mobileInfo.textContent = data.phone;
  countryInfo.textContent = data.region;
  image.src = data.src

  newIdContainer.appendChild(nameInfo)
  newIdContainer.appendChild(ageInfo)
  newIdContainer.appendChild(birthdayInfo)
  newIdContainer.appendChild(mobileInfo)
  newIdContainer.appendChild(countryInfo)
  newImageContainer.appendChild(image)

  newInfoContainer.appendChild(newIdContainer);
  newInfoContainer.appendChild(newImageContainer);

  container.appendChild(newInfoContainer);

};

module.exports = IdentityView;
