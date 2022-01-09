import React from 'react';
import './App.css';
import { AuthProvider } from './contexts';
import { AppRouter } from './routes';



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
