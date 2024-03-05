'use strict';

let showNImages = 3;
let collectNVotes = 1;

let products = [];

function Product(name) {
  this.name = name;
  this.src = 'images/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  products.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

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
    resultsButton.remove();
    const canvas1 = document.createElement('canvas');
    canvas1.id = 'chart1';
    results.appendChild(canvas1);
    const canvas2 = document.createElement('canvas');
    canvas2.id = 'chart2';
    results.appendChild(canvas2);
    makeCharts();
  };
  results.appendChild(resultsButton);
}

function makeCharts() {
  let namesArray = [];
  let viewsArray = [];
  let votesArray = [];
  let chartColors = [];
  for (let i = 0; i < products.length; i++) {
    namesArray.push(products[i].name);
    viewsArray.push(products[i].views);
    votesArray.push(products[i].votes);
    let color1 = Math.floor(256 * Math.random());
    let color2 = Math.floor(256 * Math.random());
    let color3 = Math.floor(256 * Math.random());
    chartColors.push(`rgba(${color1}, ${color2}, ${color3}, 1)`);
  }

  function makeBarChart(canvasid, data, labels, chartLabel) {
    const ctx = document.getElementById(canvasid);
    Chart.defaults.color = 'white';
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# of ' + chartLabel,
          data: data,
          backgroundColor: chartColors,
          borderWidth: 1,
          text: 'white'
        }]
      },
      options: {
        scales: {
          y: {
            grid: {
              color: 'white'
            },
            ticks: {
              color: 'white'
            },
            beginAtZero: true
          },
          x: {
            grid: {
              color: 'white'
            },
            ticks: {
              color: 'white'
            }
          }
        }
      }
    });
  }

  makeBarChart('chart1', viewsArray, namesArray, 'Views');
  makeBarChart('chart2', votesArray, namesArray, 'Votes');
}

loadPictureScheme();
loadNewProducts();
