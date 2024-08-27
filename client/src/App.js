import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000');
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setGameState(data);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleMove = (move) => {
    if (socket) {
      socket.send(JSON.stringify({ move }));
    }
  };

  return (
    <div className="App">
      <h1>Chess-like Game</h1>
      <div className="game-board">
        <div className="grid">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div className="row" key={rowIndex}>
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <div className="cell" key={colIndex}>
                  {/* Example: Display game pieces based on gameState */}
                  {gameState[`cell-${rowIndex}-${colIndex}`] || ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => handleMove('example-move')}>Make Move</button>
    </div>
  );
};

export default App;