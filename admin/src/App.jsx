import React from "react";
import { Navbar } from "./components/navbar/Navbar";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { AddFood } from "./pages/Add/AddFood";
import { ListFood } from "./pages/List/ListFood";
import { OrdersFood } from "./pages/Orders/OrdersFood";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Users } from "./pages/Users/Users";

function App() {

const url = 'http://localhost:4000'

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
        <Route path="/users" element={<Users url={url} />} />
          <Route path="/add" element={<AddFood url={url} />} />
         
          <Route path="/list" element={<ListFood url={url} />} />
          <Route path="/orders" element={<OrdersFood url={url} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
