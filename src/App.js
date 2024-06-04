import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
// Импортируйте другие страницы и компоненты

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" component={Register} />
          {/* Определите другие маршруты */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
