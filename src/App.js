import React, { useState, useReducer } from 'react';
import './App.css';
import Game from './Game';
import firebase from './util/firebase'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.sz]: event.value
  }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  // const [historyplay, setHistoryplay] = useState([]);
  // const [hist, setHist] = useState(false);

  // const ref = firebase.firestore().collection('HistoryPlay')
  // console.log(ref)

  // function gethistoryplay() {
  //   ref.onSnapshot((querySnapshot) => {
  //     const item = [];
  //     querySnapshot.forEach((doc) => {
  //       item.push(doc.data())
  //     })
      // setHist(true)
    //   setHistoryplay(item)
    // })
    // console.log(historyplay)
  // }
  function addItemToList(stepon) {
    var ul = document.getElementById('list')
    var _stepon = document.createElement('li')
    _stepon.className = "history__item";

    _stepon.innerHTML = stepon

    ul.appendChild(_stepon)
    
  }

  function gethistoryplay() {
    var i = 1
    firebase.database().ref('HistoryPlay').once('value', function(snapshot){
      snapshot.forEach(
        function(ChilSnapShot){
          let stepon = ChilSnapShot.val().stepon
          if(stepon == "Game start") 
            {stepon = 'round '+ i++ + ' ' + stepon}
          addItemToList(stepon)
        }
      )
    })
  }

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
          
  {/* {window.onload = gethistoryplay} */}

          <div className="col">
            <button onClick={gethistoryplay} type="submit" className="btn btn-success">replay</button>
            {/* {hist && */}
              <ul id="list">
                {/* {historyplay.map((h) => ( onClick={gethistoryplay()} 
                  h.stepon
                ))} */}
              </ul>
            {/* } */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
