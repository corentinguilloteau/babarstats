import React from "react";
import '../css/Card.css';

class ControlCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleChange = this.handleChange.bind(this);
    }

    switchComponents(state, idx)
    {
        console.log(state)
        switch(state.type)
        {
            case 'boolean':
                console.log("timeserie");
                return (
                    <div class="form-group mb-3">           
                        <input index={idx} type="checkbox" class="btn-check" id={"state" + idx} readOnly={!state.editable} onChange={this.handleChange} defaultChecked={this.props.sensor[state.name] ? "checked" : ""}/> 
                        <label htmlFor={"state" + idx} className="btn btn-outline-primary">{state.displayedname}</label>               
                    </div>)   
            case 'range':
                return (
                    <div class="form-group mb-3">
                        <label htmlFor={"state" + idx} className="form-label">{state.displayedname}</label>
                        <input index={idx} type="range" className="form-range" id={"state" + idx} min={state.min} max={state.max} onMouseUp={this.handleChange} readOnly={!state.editable} defaultValue={this.props.sensor[state.name]}/>
                    </div>
                )
            default:
                console.log("defaultr");
                break;
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const index = target.getAttribute("index");

        console.log(target)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index: index, value: value })
        };
        fetch(this.props.currentLocation, requestOptions)
    }

    render() {
        console.log()
      return (
            <div className="col-12 col-sm-6 col-xxl-3 d-flex">
                <div className="card">
                    <div className="card-header mt-2">
                        <h5 className="car-title">Controles</h5>
                    </div>
                    <div className="card-body py-2">
                        <form>
                            {
                                Object.values(this.props.states[0]).map((item, idx) => {
                                    return this.switchComponents(item, idx);
                                })

                            }
                        </form>
                    </div>
                </div>
            </div>
      );
    }
  }

export default ControlCard;