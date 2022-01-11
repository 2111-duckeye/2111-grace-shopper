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

export default class SingleItem extends Component {
  render() {
    const name = item.name;
    const price = item.price;
    const description = item.description;
    const imgUrl = item.imageUrl;

    return (
      <div id="singleItem">
        <img src={imgUrl} style={{ width: "500px", height: "500px" }} />
        <h1 className="singleItemName">{name}</h1>
        <div>{price}</div>
        <p>{description}</p>

        {/*<div>
          {campus.students
            ? campus.students.map((student) => (
                <div className="student" key={student.id}>
                  <Link to={`/students/${student.id}`}>
                    <p>{`${student.firstName} ${student.lastName}`}</p>
                  </Link>
                  <button
                    type="button"
                    key={student.campusId}
                    className="remove"
                    onClick={() => this.unregister(student)}
                  >
                    Unregister
                  </button>
                </div>
              ))
            : `There are no students at this campus`}
        </div>
            */}
      </div>
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
