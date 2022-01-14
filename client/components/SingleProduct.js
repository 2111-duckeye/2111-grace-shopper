import React, { Component } from "react";
import { connect } from "react-redux";

const item = {
  id: 1,
  name: "Cat Tree",
  price: "$3500",
  description: "a cozy tree",
  imageUrl:
    "https://cdn.vox-cdn.com/thumbor/MjIS9HYCYfMr2Q4s9e3KPI4dRME=/0x0:2100x1457/1200x800/filters:focal(882x561:1218x897)/cdn.vox-cdn.com/uploads/chorus_image/image/58123273/img_gal_3_5_zoom.0.jpg",
};

export default class SingleProduct extends Component {
  render() {
    const name = item.name;
    const price = item.price;
    const description = item.description;
    const imgUrl = item.imageUrl;

    return (
      <main class="container">
        <div class="left-column">
        <img src={imgUrl} style={{ width: "500px", height: "500px" }} />
        </div>
        <div class="right-column">
        <h1 className="singleItemName">{name}</h1>
        <p>{description}</p>
        <div class="product-price">
          <span>{price}</span>
          <button type="submit">Add to cart</button></div>
        </div>
      </main>
    );
  }
}

/*const mapStateToProps = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    loadSingleCampus: (id) => dispatch(fetchCampus(id)),
    updateStudent: (student) => dispatch(updateStudent(student, history)),
  };
};
*/
