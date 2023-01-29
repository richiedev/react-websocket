import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import './App.css';

const socket = socketIO.connect('http://localhost:4000');

function App() {
  const [terminals, setTerminals] = useState([]);
  // const [terminalSessionId] = useState(1);
  const [terminalSessionId] = useState(Math.floor(Math.random() * 10));

  useEffect(() => {
    socket.emit('saveid', { id: terminalSessionId });

    // socket.on('showchargemodal', (data) => alert('Pay now....', data));
    socket.on(`showchargemodal/5`, (data) => {
    // socket.on(`showchargemodal/${terminalSessionId}`, (data) => {
      console.log('Pay now....', data);
      alert(data.amount)
    });

    // socket.on('sortoutpayment', (data) => {
    //   console.log('Pay now....', data);
    //   alert(data.amount)
    // });
  }, []);

  const getTerminals = () => {
    fetch('http://localhost:5000/listofterminals')
      .then(data => data.json())
      .then(data => setTerminals(data));
  }

  const sortOutPayment = (id) => {
    fetch('http://localhost:5000/terminalpayment/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ id, orderId: '123445678' })
    })
      .then(data => data.json())
      .then(data => setTerminals(data));
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getTerminals}>
          Card
        </button>

        <ul>
         {terminals.map((terminal) => (
          <li
            style={{cursor: 'pointer'}}
            // onClick={() => socket.emit('cardpayment', { data: 'carddata '})}
            onClick={() => sortOutPayment(terminal)}
          >
            {terminal}
          </li>
         ))}

        </ul>
      </header>
    </div>
  );
}

export default App;
