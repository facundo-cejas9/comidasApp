import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./Users.css";

export const Users = ({ url }) => {
  const [usersList, setUsersList] = useState([]);

  const getAllUsers = async () => {
    const response = await axios.get(`${url}/api/user/users`);
    if (response.data.success) {
      setUsersList(response.data.users);
     
    } else {
      console.log(response.data.message);
    }
  };

  const removeUser = async (userId) => {
    const response = await axios.post(`${url}/api/user/users/delete`, {
      _id: userId,
    });
    if (response.data.success) {
      toast.success("Usuario Borrado Correctamente");
    } else {
      toast.error(response.data.message);
    }
    await getAllUsers();
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container-user-list">
      <h2>Lista de usuarios</h2>
      <div className="row">
        {usersList.map(user => (
          <div key={user._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">Correo: {user.email}</p>
                <p className="card-text">Registrado: {user.createdAt}</p>
                <button onClick={() => removeUser(user._id)} className="btn btn-danger delete-btn">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
