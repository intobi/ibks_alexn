import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.css";
import "devextreme/dist/css/dx.material.teal.light.css";
import './index.css';

import Tickets from './pages/tickets/tickets-grid.component';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketDetails from './pages/tickets/edit/edit-ticket.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Tickets />} />

        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path="/tickets" element={<TicketDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
