'use strict';

const ctx = document.getElementById('myChart');
let resultsButton = document.getElementById('view-results')

// let mainChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: [],
//     datasets: [{
//       label: '# of Votes',
//       data: [],
//       backgroundColor: 'white',
//       borderWidth: 1
//     },
//     {
//       label: '# of Times Seen',
//       data: [],
//       backgroundColor: 'red',
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       },
//       x: {
//         ticks: {
//           font: {
//             weight: 'bold', // set font weight to bold
//             size: 14 // set font size to 14px
//           },
//         },
//     },
//     plugins: {
//       legend: {
//         labels: {
//           font: {
//             size: 30, 
//             weight: 'bold'
//           }
//         }
//       }
//     }
//   }
// });

let mainChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: '# of Votes',
      data: [],
      backgroundColor: 'white',
      borderWidth: 1
    },
    {
      label: '# of Times Seen',
      data: [],
      backgroundColor: 'red',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            weight: 'bold', // set font weight to bold
            size: 14 // set font size to 14px
          },
        },
        scaleLabel: {
          display: true,
          labelString: 'Y Axis Label',
          font: {
            weight: 'bold',
            size: 16
          }
        }
      },
      x: {
        ticks: {
          font: {
            weight: 'bold', // set font weight to bold
            size: 14 // set font size to 14px
          },
        },
        scaleLabel: {
          display: true,
          labelString: 'X Axis Label',
          font: {
            weight: 'bold',
            size: 16
          }
        }
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 30, 
            weight: 'bold'
          }
        }
      }
    }
  }
});

const products = [];

function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesShown = 0;
  this.timesClicked = 0;
}

function loadFromLocalStorage() {
  const savedProducts = JSON.parse(localStorage.getItem('products'));

  if (savedProducts) {
    for (let i = 0; i < savedProducts.length; i++) {
      const product = new Product(
        savedProducts[i].name,
        savedProducts[i].filePath
      );
      product.timesShown = savedProducts[i].timesShown;
      product.timesClicked = savedProducts[i].timesClicked;
      products.push(product);
    }
  } else {
    // Populate the products array with default values
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
  }
}

loadFromLocalStorage();

let totalRounds = 25;
let currentRound = 0;

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
  while (randomImage.name === image1.alt || randomImage.name === image2.alt || randomImage.name === image3.alt) {
    randomImage = products[getRandomIndex()];
  }
  return randomImage;
}

function renderProducts() {
  let product1 = getRandomImage();
  let product2 = getRandomImage();
  let product3 = getRandomImage();

  while (product1.name === product2.name || product1.name === product3.name) {
    product1 = getRandomImage();
  }

  while (product2.name === product1.name || product2.name === product3.name) {
    product2 = getRandomImage();
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

  for (let i = 0; i < products.length; i++) {
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
    resultsSection.style.visibility = "visible";
    // displayResults();
  }

  saveToLocalStorage();
}

function displayResults() {
  products.sort((a, b) => (a.timesClicked / a.timesShown) > (b.timesClicked / b.timesShown) ? -1 : 1);

  populateChartData();
  mainChart.update();
}

function populateChartData() {
  
  for (let i = 0; i < products.length; i++) {
    let product = products[i];

    // Adding the name to labels array
    mainChart.data.labels.push(product.name);

    // Add the number of times clicked to first data set
    mainChart.data.datasets[0].data.push(product.timesClicked);

    // Add the number of times seen to the second data set
    mainChart.data.datasets[1].data.push(product.timesShown);

  }
  resultsButton.removeEventListener('click', displayResults)
}

function saveToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

resultsButton.addEventListener('click', displayResults)