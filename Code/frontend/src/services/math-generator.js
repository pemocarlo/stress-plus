//import React from 'react';

export default function Arithmetic() {
    let mathArray = [
        "10-1=9",
        "8/2+1=5",
        "1*8-2*3=2",
        "4+5=9",
        "2*5-9+3=4",
        "9/3=3",
        "4*2-7=1",
        "2*7-8=6",
        "15/3-3=2"
      ];
  
      let randomMath = mathArray[Math.floor(Math.random() * mathArray.length)];
      let res = randomMath.slice(-1);
      let math = randomMath.toString().slice(0, -1);
      return [math, res];
}


