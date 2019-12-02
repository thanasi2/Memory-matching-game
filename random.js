var num = [];

while (num.length < 16){
  var int = randomNum = Math.floor((Math.random() * 16));
  if (num.indexOf(int) === -1){
     num.push(int);
  }
}

console.log(num);
