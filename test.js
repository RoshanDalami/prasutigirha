// const totalMilk = 670;
// const bottleSize = 150;

// let remainingMilk = totalMilk;
// let bottleNumber = 1;

// while (remainingMilk >= bottleSize) {
//   const bottleName = `CA:CA${bottleNumber}`;
//   console.log(`${bottleName}: ${bottleSize} ml`);
  
//   remainingMilk -= bottleSize;
//   bottleNumber++;
// }

// // If there is any remaining milk less than the bottle size, you can handle it separately
// if (remainingMilk > 0) {
//   const lastBottleName = `CA:CA${bottleNumber}`;
//   console.log(`${lastBottleName}: ${remainingMilk} ml`);
// }

const totalMilk = 1500;
const bottleSize = 150;

let remainingMilk = totalMilk;
let bottleNumber = 1;

const bottles = [];

while (remainingMilk >= bottleSize) {
  const bottleName = `Bottle-${bottleNumber}`;
  const bottle = { name: bottleName, size: bottleSize };
  bottles.push(bottle);
  
  remainingMilk -= bottleSize;
  bottleNumber++;
}

// If there is any remaining milk less than the bottle size, add it to the last bottle
if (remainingMilk > 0) {
  const lastBottleName = `Bottle-${bottleNumber}`;
  const lastBottle = { name: lastBottleName, size: remainingMilk };
  bottles.push(lastBottle);
}

// Output the array of bottles
console.log(bottles);
