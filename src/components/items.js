import React from "react";
import Product from "./product";

function Items({ name }) {
  const options = [];
  let n = Math.floor(Math.random() * 10);
  n += 5;
  for (let i = 1; i <= n; i++) {
    let url = `https://source.unsplash.com/random/${i * 100}x700/?${name}`;
    options.push(<Product name={url} />);
  }
  return (
    <div className="grid grid-cols-4">{options} </div>
  );
}

export default Items;
