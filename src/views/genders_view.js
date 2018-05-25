const PubSub = require('../helpers/pub_sub.js');

const GendersView = function (element) {
  this.element = element;
  this.genders = ["male", "female", "random"];
};

GendersView.prototype.render = function () {
  this.genders.forEach((gender) => {
    const menuItem = this.createItem(gender);
    this.element.appendChild(menuItem);
  });
};

GendersView.prototype.createItem = function (gender) {
  const menuItem = document.createElement('button');
  menuItem.classList.add('gender-button');
  menuItem.textContent = gender.toUpperCase();
  menuItem.id = gender;

  menuItem.addEventListener('click', (evt) => {
    console.log(`gender selected ${evt.target.id}`);
    PubSub.publish('Gender:selected', evt.target.id)
  });

  return menuItem;
};

module.exports = GendersView;
