import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

export default function SingleApprovalforDoctor() {
  const { backendUrl, userToken } = useContext(AuthContext);
  const { id } = useParams();
  const [data, setData] = useState();
  const fetchData = async (req, res) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/getDoctorIdforAprroval/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setData(response.data);
      console.log(response.data);

      //   console.log("id", id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div>
      <h2>THis is single doctor approval page </h2>
    </div>
  );
}
