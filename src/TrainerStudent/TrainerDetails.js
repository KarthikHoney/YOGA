import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TrainerDetails({ studentId }) {
  const [trainer, setTrainer] = useState([]);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios.get(`http://localhost/CURD/backend_y/trainerDetails.php?id=${studentId}`)
      .then((response) => {
        if (response.data.error) {
          console.log("Error", response.data.error);
        }
        const datas = Array.isArray(response.data) ? response.data:[response.data]
        setTrainer(datas);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-5">
        <h2>Trainer Details</h2>
        <div>
          <a href="#">
            <FaUser className="user-icon me-2" />
          </a>
          <a href="" onClick={logout}>
            <CiLogout className="user-icon" />
          </a>
        </div>
      </div>
      {trainer.length > 0 ? (
        trainer.map((eachTrainer) => {
          return (
            <Table className="mt-5" key={eachTrainer.id}>
              <tr>
                <th>Name</th>
                <td>{eachTrainer.name}</td>
              </tr>
              <tr>
                <th>Studio Name</th>
                <td>{eachTrainer.studio}</td>
              </tr>
              <tr>
                <th>Gmail</th>
                <td>{eachTrainer.gmail}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{eachTrainer.number}</td>
              </tr>
              <tr>
                <th>WhatsApp Number</th>
                <td>{eachTrainer.wnumber}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{eachTrainer.address}</td>
              </tr>
            </Table>
          );
        })
      ) : (
        <div>
          <p>No Trainer Found...</p>
        </div>
      )}
    </div>
  );
}
