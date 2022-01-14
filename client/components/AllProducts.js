import React, { Component } from "react";
import {Grid} from "@material-ui/core";
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Multievel Cat Climbing Tower in Brown",
    imageUrl:
      "https://images.urbndata.com/is/image/UrbanOutfitters/62198411_020_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=1314",
    description:
      "Great climbing tower for cats, aesthetically pleasing design to win over the hearts of your cats and your guests",
    price: 399.0,
  },
  {
    id: 2,
    name: "Neco Hasami Cat Plate Set",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0553/0461/8173/products/neco-hasami-cat-plate-set-musubi-kiln-handmade-japanese-tableware-and-japanese-dinnerware-538065_1000x.jpg?v=1633599695",
    description:
      "A set of five plates of lovely cats drawn with a delicate touch. It has unique shape with slightly pointed up ears of a cat. It can be used for serving side dishes and desserts, and also as an accessory tray. Whether for everyday use or for entertaining your guests, it can be used in various settings. It comes in an original wooden box with a small illustration of cat. This set will be a perfect gift for your cat-loving friends or family members. Of course, it can also be a great gift to yourself.",
    price: 52.0,
  },
  {
    id: 3,
    name: "The Refined Feline Lotus Cat Tower",
    imageUrl:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSYqnf_Li0Df1AwzdXh3dQNxrXJOGyka1TL7-hoewxb70UegBH6FfbBR2S8bcvl3_GoXtmIxVMNt2VdYq6S-QOrWaes286UcCFH6S6Sm9I&usqp=CAE",
    description:
      'A sleek, organic design, the Lotus Cat Tower is a modern take on cat furniture. Its Zen-like design blends symmetry, functionality, and minimalism into a beautiful "flowering" tower. This design accents decors with modern flair or those eclectic homes that have incorporated the minimalist movement.',
    price: 439.99,
  },
];

const AllProducts = () => {
    return (
    <div className="container" >
      {products.map(product => (
          <div className="card" key={product.id}>
          <div className="card-header" >
            <img src={product.imageUrl} />
            <h4>{product.name}</h4>
            <h4>${product.price}</h4>
            <p>{product.description}</p>
            <Link to={`/products/${product.id}`}><button type="button">View Item</button></Link>
            <button type="button">Add to Cart</button>
          </div>
          </div>
    ))}
    </div>
  );
}

  export default AllProducts;
