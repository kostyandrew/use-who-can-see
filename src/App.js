import logo from './logo.svg';
import './App.css';
import useWhoCanSee from './useWhoCanSee.js';
import React from 'react';

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<span>Loading</span>}><LoadingComp /></React.Suspense>
      <React.Suspense fallback={<span>Loading</span>}><LoadingComp /></React.Suspense>
      <React.Suspense fallback={<span>Loading</span>}><LoadingComp /></React.Suspense>
    </div>
  );
}

const LoadingComp = () => {
  const {name} = useWhoCanSee('https://swapi.dev/api/people/1/')

  return <h1>{name}</h1>
}

export default App;
