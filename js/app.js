'use strict';

let showNImages = 3;
let collectNVotes = 25;

let products = [];

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.votes = 0;
  this.views = 0;
  products.push(this);
}

new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.jpg');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');

function loadPictureScheme() {
  const imagesSection = document.getElementById('images');
  for (let i = 0; i < showNImages; i++) {
    const newDiv = document.createElement('div');
    newDiv.id = 'newDiv-' + i;

    const newImage = document.createElement('img');
    newImage.id = 'newImage-' + i;
    newImage.alt = 'Image of product ' + (i + 1);
    newDiv.appendChild(newImage);

    const newButton = document.createElement('button');
    newButton.id = 'newButton-' + i;
    newButton.innerHTML = 'Vote for product ' + (i + 1);
    newDiv.appendChild(newButton);

    imagesSection.appendChild(newDiv);
  }
}

let voteCounter = 0;
let lastProducts = [];
function loadNewProducts() {
  let availableProducts = [...products];
  while (lastProducts.length > 0) {
    availableProducts.splice(availableProducts.indexOf(lastProducts.pop()), 1);
  }
  for (let i = 0; i < showNImages; i++) {
    let indexOfChoice = Math.floor(availableProducts.length * Math.random());
    let chosenProduct = availableProducts[indexOfChoice];
    availableProducts.splice(indexOfChoice, 1);
    lastProducts.push(chosenProduct);
    chosenProduct['views']++;

    const image = document.getElementById('newImage-' + i);
    image.src = chosenProduct.src;

    const button = document.getElementById('newButton-' + i);
    button.onclick = function() {
      voteCounter++;
      chosenProduct.votes++;
      if (voteCounter === collectNVotes) {
        endVoting();
      } else {
        loadNewProducts();
      }
    };
  }
}

function endVoting() {
  const imageSection = document.getElementById('images');
  while (imageSection.firstChild) {
    imageSection.removeChild(imageSection.firstChild);
  }
  const newP = document.createElement('p');
  newP.textContent = 'Voting has ended.';
  imageSection.appendChild(newP);

  const results = document.getElementById('results');
  results.textContent = '';
  const resultsButton = document.createElement('button');
  resultsButton.textContent = 'View Results';
  resultsButton.onclick = function() {
    resultsButton.textContent = '';
    resultsButton.remove();
    for (let i = 0; i < products.length; i++) {
      results.innerHTML += `${products[i].name} had ${products[i].votes} votes, and was seen ${products[i].views} times.<br>`;
    }
  };
  results.appendChild(resultsButton);
}

loadPictureScheme();
loadNewProducts();
