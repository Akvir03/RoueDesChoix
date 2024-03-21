'use client';
import React, { useState } from 'react';
import Wheel from './Wheel'; // Assuming you have a Wheel component

export default function Page() {
  const [restaurants, setRestaurants] = useState<string[]>([]);
  const [isWheelVisible, setIsWheelVisible] = useState(false);
  const [winner, setWinner] = useState('');

  const handleInputChange = (index: number, value: string) => {
    const updatedRestaurants = [...restaurants];
    updatedRestaurants[index] = value;
    setRestaurants(updatedRestaurants);
  };

  const handleSpinButtonClick = () => {
    if (restaurants.filter(Boolean).length >= 2) {
      setIsWheelVisible(true);
      // Simulate spinning and pick a winner after some time
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        setWinner(restaurants[randomIndex]);
      }, 3000); // Change the duration as needed
    } else {
      alert('Please fill at least two restaurant names.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <div className='input-container'>
          {[...Array(8)].map((_, index) => (
            <input
              key={index}
              type='text'
              placeholder={`Restaurant ${index + 1}`}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
          <button className='btn-spin' onClick={handleSpinButtonClick}>
            Spin the wheel
          </button>
        </div>
        {isWheelVisible && <Wheel options={restaurants.filter(Boolean)} winner={winner} />}
      </div>
    </div>
  );
}
