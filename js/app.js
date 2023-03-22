'use strict';

const products = [];

let totalRounds = 5;
let currentRound = 0;
let currentProducts = [];

function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesShown = 0;
  this.timesClicked = 0;
}


products.push(new Product('Bag', './img/bag.jpg'));
products.push(new Product('Banana', './img/banana.jpg'));
products.push(new Product('Bathroom', './img/bathroom.jpg'));
products.push(new Product('Boots', './img/boots.jpg'));
products.push(new Product('Breakfast', './img/breakfast.jpg'));
products.push(new Product('Bubblegum', './img/bubblegum.jpg'));
products.push(new Product('Chair', './img/chair.jpg'));
products.push(new Product('Cthulhu', './img/cthulhu.jpg'));
products.push(new Product('Dog-duck', './img/dog-duck.jpg'));
products.push(new Product('Dragon', './img/dragon.jpg'));
products.push(new Product('Pen', './img/pen.jpg'));
products.push(new Product('Pet-sweep', './img/pet-sweep.jpg'));
products.push(new Product('Scissors', './img/scissors.jpg'));
products.push(new Product('Shark', './img/shark.jpg'));
products.push(new Product('Sweep', './img/sweep.png'));
products.push(new Product('Tauntaun', './img/tauntaun.jpg'));
products.push(new Product('Unicorn', './img/unicorn.jpg'));
products.push(new Product('Water-can', './img/water-can.jpg'));
products.push(new Product('Wine-glass', './img/wine-glass.jpg'));

let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');
let productDisplay = document.getElementById('product-display');

image1.addEventListener('click', handleProductClick);
image2.addEventListener('click', handleProductClick);
image3.addEventListener('click', handleProductClick);

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

 
  currentProducts.push(product1)
  currentProducts.push(product2)
  currentProducts.push(product3)
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

    image1.removeEventListener('click', handleProductClick);
    image2.removeEventListener('click', handleProductClick);
    image3.removeEventListener('click', handleProductClick);

    // displayResults();

  }
}

function displayResults() {
  products.sort((a, b) => (a.timesClicked / a.timesShown) > (b.timesClicked / b.timesShown) ? -1 : 1);
  
  productDisplay.innerHTML = '';

  let resultList = document.getElementById("results-list")
  // const heading = document.createElement('h2');

  // heading.textContent = 'Results';
  // productDisplay.appendChild(heading);

  for (let i = 0; i < products.length; i++) {

    const product = products[i];
    const listItem = document.createElement('li');
    // banana had 3 votes, and was seen 5 times.
    listItem.textContent = `${product.name} had ${product.timesClicked} votes and was seen ${product.timesShown} times.`;
    resultList.appendChild(listItem)

  }
}