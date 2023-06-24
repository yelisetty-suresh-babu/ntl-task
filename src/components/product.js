import React from "react";
var randomSentence = require("random-sentence");
function Product({ name }) {
  // let url=`https://source.unsplash.com/random/900x700/?${name}`

  let price = `₹${Math.floor(Math.random() * 100) * 10} /-`;
  return (
    <div className="m-10">
      <img className="w-96 h-96  rounded-2xl shadow-xl" src={name} alt="" />
      <div className="m-2">
        <h1 className="text-xl mt-4 font-extrabold">
          {randomSentence({ words: 1 })}
        </h1>
        <h3 className="text-lg">{price}</h3>
        <p>{randomSentence({ words: 20 })}</p>
        <button className="bg-blue-600 hover:bg-blue-500 w-32 h-8 mt-2 rounded-lg text-white shadow-lg">
          add to cart
        </button>
      </div>
    </div>
  );
}

export default Product;
