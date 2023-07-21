import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";

const API_BASE_URL = "http://20.244.56.144/train";

const SingleTrain = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/details/${trainId}`);
        setTrain(response.data);
      } catch (error) {
        console.error("Error fetching train details:", error);
      }
    };

    fetchTrainDetails();
  }, [trainId]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Train Details</h2>
      <p>Train Name: {train.trainName}</p>
      <p>
        Departure Time:{" "}
        {moment(train.departureTime)
          .add(train.delayMinutes, "minutes")
          .format("HH:mm")}
      </p>
      <p>Seats Availability (Sleeper): {train.seatsAvailability.sleeper}</p>
      <p>Seats Availability (AC): {train.seatsAvailability.ac}</p>
      <p>Price (Sleeper): {train.prices.sleeper}</p>
      <p>Price (AC): {train.prices.ac}</p>
    </div>
  );
};

export default SingleTrain;
