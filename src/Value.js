import React from "react";
import cross from "./images/icon-cross.svg";

import "./App.css";

class Value extends React.Component {
state={
  itemsTemp: {}
}
   radio = () => {
   this.props.func(this.props.data)
   };

  delete = () => {
    this.props.del( this.props.data);
  };

  render() {
    const { data, enter, active, completed, all} = this.props;

    if (enter === false) {
      return <div />;
    }



let ret = ((completed && data.checkedIn) || (active && data.checkedIn === false) || all ? (<div className={this.props.moon? "flexForm" : "flexForm color"}>
      <div
        className= {data.checkedIn ? "radio2 radio-bcg" : "radio2"}
          onClick={this.radio}
        />
        <div className={data.checkedIn ? "data data-cross" : "data"} >{data.dummyValue}</div>
        <img className="cross" src={cross} alt="x" onClick={this.delete} />
        
      </div>) : "")

    return (
      <>
        {ret}
       
      </>
    );
  }
}
export default Value;
