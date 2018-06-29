import * as math from './math';

const arr = [1,2,3,4,5];
let squares = arr.map(elem => elem*elem);

console.log(math.addMe(squares[4], squares[0]));
