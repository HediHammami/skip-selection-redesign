"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedSkipId, setSelectedSkipId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelect = (id) => {
    setSelectedSkipId(id);
  };

  const selectedSkip = data.find((item) => item.id === selectedSkipId);
  return (
    <div className="page-container">
      <h1 className="page-title">Pick Your Perfect Skip Size</h1>

      <div className="grid-container">
        {data.map((item) => (
          <div
            key={item.id}
            className={`card ${
              selectedSkipId === item.id ? "card-selected" : ""
            }`}
          >
            <div className="image-container">
              <img
                src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${item.size}-yarder-skip.jpg`}
                alt={`${item.size} yard skip`}
                className="skip-image"
              />
              {item.allowed_on_road ? (
                <span className="badge badge-allowed">Allowed On The Road</span>
              ) : (
                <span className="badge badge-not-allowed">
                  🚫 Not Allowed On The Road
                </span>
              )}
              <span className="badge badge-size">{item.size} Yards</span>
            </div>

            <h2 className="card-title">{item.size} Yard Skip</h2>
            <p className="card-text">Hire: {item.hire_period_days} days</p>
            <p className="card-price">£{item.price_before_vat}</p>

            <button
              onClick={() => handleSelect(item.id)}
              className={`select-button ${
                selectedSkipId === item.id ? "selected" : ""
              }`}
            >
              {selectedSkipId === item.id ? "✔ Selected" : "Select This Skip"}
            </button>
          </div>
        ))}
      </div>

      {selectedSkip && (
        <div className="bottom-bar">
          <p>
            Selected Skip Size:{" "}
            <span className="selected-id">{selectedSkip.size} Yards</span>
          </p>
          <button className="continue-button">Continue</button>
        </div>
      )}
    </div>
  );
}
