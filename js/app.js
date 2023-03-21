'use strict';

function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesShown = 0;
  this.timesClicked = 0;
}

const products = [];

let totalRounds = 25;
let currentRound = 0;
let currentProducts = [];

products.push(new Product('bag', './img/bag.jpg'));
products.push(new Product('banana', './img/banana.jpg'));
products.push(new Product('bathroom', './img/bathroom.jpg'));
products.push(new Product('boots', './img/boots.jpg'));
products.push(new Product('breakfast', './img/breakfast.jpg'));
products.push(new Product('bubblegum', './img/bubblegum.jpg'));
products.push(new Product('chair', './img/chair.jpg'));
products.push(new Product('cthulhu', './img/cthulhu.jpg'));
products.push(new Product('dog-duck', './img/dog-duck.jpg'));
products.push(new Product('dragon', './img/dragon.jpg'));
products.push(new Product('pen', './img/pen.jpg'));
products.push(new Product('pet-sweep', './img/pet-sweep.jpg'));
products.push(new Product('scissors', './img/scissors.jpg'));
products.push(new Product('shark', './img/shark.jpg'));
products.push(new Product('sweep', './img/sweep.png'));
products.push(new Product('tauntaun', './img/tauntaun.jpg'));
products.push(new Product('unicorn', './img/unicorn.jpg'));
products.push(new Product('water-can', './img/water-can.jpg'));
products.push(new Product('wine-glass', './img/wine-glass.jpg'));

let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');
let productDisplay = document.getElementById('product-display');
productDisplay.addEventListener('click', handleProductClick);

function getRandomIndex() {
  return Math.floor(Math.random() * products.length);
}

function renderProducts() {

  let product1 = products[getRandomIndex()];
  let product2 = products[getRandomIndex()];
  let product3 = products[getRandomIndex()];

  while (product1.name === product2.name || product1.name === product3.name) {
    product1 = products[getRandomIndex()];
  }

  while (product2.name === product1.name || product2.name === product3.name) {
    product2 = products[getRandomIndex()];
  }

  image1.src = product1.filePath;
  image1.alt = product1.name;
  product1.timesShown += 1;

  image2.src = product2.filePath;
  image2.alt = product2.name;
  product2.timesShown += 1;

  image3.src = product3.filePath;
  image3.alt = product3.name;
  product3.timesShown += 1;

  currentProducts = [product1, product2, product3];
}

renderProducts();

function handleProductClick(event) {
  const clickedProduct = event.target.alt;
  
  for (let i = 0; i < currentProducts.length; i++) {
    if (clickedProduct === currentProducts[i].name) {
      currentProducts[i].timesClicked++;
      break;
    }
  }
  
 
  currentRound++;
  if (currentRound <= totalRounds) {
    renderProducts();
  } else {

    productDisplay.removeEventListener('click', handleProductClick);
    displayResults();
  }
}

function displayResults() {
  products.sort((a, b) => (a.timesClicked / a.timesShown) > (b.timesClicked / b.timesShown) ? -1 : 1);
  
  productDisplay.innerHTML = '';
  const heading = document.createElement('h2');
  heading.textContent = 'Results';
  productDisplay.appendChild(heading);
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const listItem = document.createElement('li');
    listItem.textContent = `${product.name}: ${product.timesClicked} clicks (${((product.timesClicked / product.timesShown) * 100).toFixed(1)}% click-through rate)`;
    productDisplay.appendChild(listItem);
  }
}