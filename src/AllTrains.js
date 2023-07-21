import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const API_BASE_URL = "http://20.244.56.144/train";

const AllTrains = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/schedule`);
        const currentTime = moment();
        const filteredTrains = response.data.filter((train) => {
          const departureTime = moment(train.departureTime).add(
            train.delayMinutes,
            "minutes"
          );
          return departureTime.diff(currentTime, "minutes") > 30;
        });
        filteredTrains.sort((a, b) => {
          // Sort based on price, seats availability, and departure time
          if (a.prices.sleeper !== b.prices.sleeper)
            return a.prices.sleeper - b.prices.sleeper;
          if (b.seatsAvailability.sleeper !== a.seatsAvailability.sleeper)
            return b.seatsAvailability.sleeper - a.seatsAvailability.sleeper;
          const aDepartureTime = moment(a.departureTime).add(
            a.delayMinutes,
            "minutes"
          );
          const bDepartureTime = moment(b.departureTime).add(
            b.delayMinutes,
            "minutes"
          );
          return bDepartureTime.diff(aDepartureTime, "minutes");
        });
        setTrains(filteredTrains);
      } catch (error) {
        console.error("Error fetching train schedule:", error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <h2>All Trains Schedule</h2>
      <ul>
        {trains.map((train) => (
          <li key={train.trainId}>
            <p>Train Name: {train.trainName}</p>
            <p>
              Departure Time:{" "}
              {moment(train.departureTime)
                .add(train.delayMinutes, "minutes")
                .format("HH:mm")}
            </p>
            <p>
              Seats Availability (Sleeper): {train.seatsAvailability.sleeper}
            </p>
            <p>Seats Availability (AC): {train.seatsAvailability.ac}</p>
            <p>Price (Sleeper): {train.prices.sleeper}</p>
            <p>Price (AC): {train.prices.ac}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTrains;
