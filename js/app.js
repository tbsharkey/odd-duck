'use strict';

const ctx = document.getElementById('myChart');

  let mainChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: '# of Votes',
        data: [],
        borderWidth: 1
      },
      {
        label: '# of Times Seen',
        data: [],
        borderWidth: 1
      }
    ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


mainChart.data.datasets[0].data
const products = [];

let totalRounds = 10;
let currentRound = 0;
// let currentProducts = [];

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
let resultsSection = document.getElementById('results')

image1.addEventListener('click', handleProductClick);
image2.addEventListener('click', handleProductClick);
image3.addEventListener('click', handleProductClick);

function getRandomIndex() {
  return Math.floor(Math.random() * products.length);
}

function getRandomImage() {
  
  let randomImage = products[getRandomIndex()]
  while (randomImage.name === image1.alt || randomImage.name === image2.alt || randomImage.name === image3.alt ) {

    randomImage = products[getRandomIndex()];

  }


  return randomImage;
}



function renderProducts() {

  let product1 = getRandomImage()
  let product2 = getRandomImage()
  let product3 = getRandomImage()

  while (product1.name === product2.name || product1.name === product3.name) {
    product1 = getRandomImage()
  }

  while (product2.name === product1.name || product2.name === product3.name) {
    product2 = getRandomImage()
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

 
  
}

renderProducts();

function handleProductClick(event) {
  const clickedProduct = event.target.alt;
  
  for (let i =0; i < products.length - 1; i++) {
    
    if (clickedProduct === products[i].name) {
        products[i].timesClicked++;
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
    productDisplay.innerHTML = '';  
    resultsSection.style.visibility = "visible"
  }
}

function displayResults() {
  products.sort((a, b) => (a.timesClicked / a.timesShown) > (b.timesClicked / b.timesShown) ? -1 : 1);
  
  
  
populateChartData(); 
mainChart.update();

  // let resultList = document.getElementById("results-list")
  // resultList.innerHTML = '';

  // for (let i = 0; i < products.length; i++) {

  //   const product = products[i];
  //   const listItem = document.createElement('li');
  //   // banana had 3 votes, and was seen 5 times.
  //   listItem.textContent = `${product.name} had ${product.timesClicked} votes and was seen ${product.timesShown} times.`;
  //   resultList.appendChild(listItem)

  // }


}

function populateChartData() {

  for (let i = 0; i < products.length -1 ; i++) {
    
      let product = products[i];
      
      // Adding the name to labels array
      mainChart.data.labels.push(product.name)

      // Add the number of times clicked to first data set
      mainChart.data.datasets[0].data.push(product.timesClicked)

      // Add the number of times seen to the second data set
      mainChart.data.datasets[1].data.push(product.timesShown)
  }

}

