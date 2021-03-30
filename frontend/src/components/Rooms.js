import React from "react";
import TableCard from './TableCard';
import '../css/App.css';

class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          items: []
        };
    }

    componentDidMount() {
      console.log(this.context)
      fetch("/api/rooms/", {headers : 
        { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
        .then((res) => {return res.json()})
        .then(
          (result) => {
            console.log(result)
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
            console.log(error);
          }
        )
    }

    render() {
      return (
        <div className="container-fluid">
            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                    <h3>{'Rooms'}</h3>
                </div>
            </div>
            <div className="row">
                <TableCard name="Rooms List" items={this.state.items} baseUrl='/rooms/'/>
            </div> 
        </div>
      );
    }
  }

export default Rooms;