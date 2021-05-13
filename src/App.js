import React, { useState, useReducer } from 'react';
import './App.css';
import Game from './Game';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.sz]: event.value
  }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
  }

  const handleChange = event => {
    setFormData({
      value: event.target.value,
    });
  }

  return (
    <div className="container">
      <div className="align-middle p-5">
        <h2>2 players</h2>
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <input name="sz" onChange={handleChange} className="form-control" type="text" placeholder="Pleas Enter Size" aria-label="default input example"></input>
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-primary">GO</button>
                </div>
              </div>
            </form>
          </div>
          {/* <div className="col">
            <Game boardSize={this.state.size}/>
          </div> */}
          {submitting &&
            <div className="col">
              {Object.entries(formData).map(([sz, value]) => (
                // <li key={sz}><strong>{sz}</strong>:{value.toString()}</li>
                <Game boardSize={parseInt(value) < 3? 3: parseInt(value)}/>
                // console.log(typeof parseInt(value))
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
