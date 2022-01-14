import React from "react";
import sun from "./images/icon-sun.svg";
import moonpic from "./images/icon-moon.svg";
import "./App.css";
import Value from "./Value";
import _ from "lodash";
import Nestable from "react-nestable";
import "react-nestable/dist/styles/index.css";


class App extends React.Component {
  state = {
    moon: false,
    value: [],
    dummyValue: "",
    enter: false,
    all: true,
    active: false,
    completed: false,
    completedElements: [],
    checkedIn: false,
    atlikums: 0,
    item: [],
    children: [],
    selectedChild: {}
  };


  //mainīt tēmu
  changeStatus = (e) => {
    this.setState({
      moon: !this.state.moon,
    });
  };
  //nodzēst iepriekšejo input ierakstu
  onChange = (e) => {
    e.preventDefault();
    this.setState({
      dummyValue: e.target.value,
    });
  };
  //nosūtīt input ierakstu
  submit = (e) => {
    const { dummyValue, value, checkedIn, completedElements, children } =
      this.state;
    e.preventDefault();
    let id = _.uniqueId();
    value.push({ id, dummyValue, checkedIn, children });
    this.setState({
      enter: true,
      atlikums: value.length - completedElements.length,
    });
    e.target[0].value = "";
  };
  //all poga zila
  all = () => {
    this.setState({
      all: !this.state.all,
      active: false,
      completed: false,
    });
  };
  //active poga zila
  active = () => {
    this.setState({
      active: !this.state.active,
      all: false,
      completed: false,
    });
  };
  //completed poga zila
  completed = () => {
    this.setState({
      completed: !this.state.completed,
      all: false,
      active: false,
    });
  };

  //izdzest elementu
  del = (text) => {
    const { value, completedElements } = this.state;

    let selectedItem = value.filter((item) => item.id === text.id);
    _.remove(value, selectedItem[0]);
    this.setState({
      value: value,
    });
    if (selectedItem[0].checkedIn) {
      _.remove(this.state.completedElements, selectedItem[0]);
    }
    this.setState({
      atlikums: value.length - completedElements.length,
    });
  };

  count = (text) => {
    const { value, completedElements } = this.state;

    let selectedItem = value.filter((item) => item.id === text.id);

    let sel = selectedItem[0];
    if (sel === undefined ) {
      return "";
    }

    //pārsteito, lai attēlotu checkboxu
    if (sel.checkedIn === false ) {
      sel.checkedIn = true;
    } else {
      sel.checkedIn = false;
    }

    //pievieno un izdzēš no array pabeigtos
    if (sel.checkedIn) {
      completedElements.push(sel);
    } else {
      _.remove(completedElements, sel);
    }

    this.setState({
      atlikums: value.length - completedElements.length,
    });

  };


  //izdzest pabeigtos elementus
  remove = () => {
    const { completedElements, value } = this.state;

   _.pullAllBy(completedElements, completedElements);
 let atzimetie = _.filter(value,{checkedIn: true} )
if(atzimetie.length > 0){
  _.pullAllBy(value, atzimetie)
}

    this.setState({
      value: value,
      completedElements: completedElements,
    });

    this.setState({
      atlikums: value.length - completedElements.length,
    });
  };

  onExampleChange = (e) => {
    const items = e.items;

    this.setState({
      value: items,
    });

console.log(e)
  };

  render() {
    const {
      moon,
      value,
      enter,
      all,
      active,
      completed,
      atlikums,
    } = this.state;

    const renderItem = ({ item }) => {
      const { value, enter, all, active, completed, completedElements, selectedChild } =
        this.state;
      return (
        <div>
          <Value
          selectedChild={selectedChild[0] === undefined ? "" : selectedChild[0]}
          moon={moon}
            remove={this.remove}
            func={this.count}
            del={this.del}
            value={value}
            data={item}
            enter={enter}
            all={all}
            active={active}
            completed={completed}
            comp={completedElements}
          />
        </div>
      );
    };

    return (
      <div className={moon ? "white" : "black"}>
        <div className={moon ? "image2" : "image"}>
          <div className="flex">
            <span>
              <h1>TO DO</h1>
              <img
                onClick={this.changeStatus}
                className="span"
                src={moon ? moonpic : sun}
                alt="sun"
              />
            </span>
            {/* teksta inputs  */}
            <form onSubmit={this.submit} className={moon ? "" : "black1"}>
              <div className="radio2" style={{ marginRight: "15px" }} />
              <input
                className={moon ? "text " : "text black1"}
                type="text"
                placeholder="Create a new todo..."
                onChange={this.onChange}
              />
            </form>
            <form className={moon ? "border" : "black1"}>
              <div className="logs">
                <Nestable
                  items={value}
                  renderItem={renderItem}
                  onChange={this.onExampleChange}
                  maxDepth={0}
                />

                {enter && (
                  <>
                    <div className="flexForm last">
                      <div className="margin">
                        {atlikums < 0 ? 0 : atlikums} {"items left"}
                      </div>
                      <div className={moon ? "seperate border1" : "black1 seperate"}>
                      <ul className="list">
                        <li className={all ? "blue" : ""} onClick={this.all}>
                          All
                        </li>
                        <li
                          className={active ? "blue" : ""}
                          onClick={this.active}
                        >
                          Active
                        </li>
                        <li
                          className={completed ? "blue" : ""}
                          onClick={this.completed}
                        >
                          Completed
                        </li>
                      </ul>
                      </div>
                      <div className="margin cursor" onClick={this.remove}>
                        {"Clear completed"}
                      </div>
                    </div>  
                  </>
                )}
              </div>
            </form>
            <p className="pTag">{"Drag and drop to reorder list"}</p>
          </div>
        </div>
      </div>  
    );
  }
}

export default App;
