import React, { useEffect, useState } from 'react';

interface WheelProps {
  options: string[];
  winner: string;
}

const Wheel: React.FC<WheelProps> = ({ options, winner }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    if (isSpinning) {
      const spinInterval = setInterval(() => {
        setRotation((prevRotation) => prevRotation + 20); // Increased rotation speed
      }, 100);
      return () => clearInterval(spinInterval);
    }
  }, [isSpinning]);

  useEffect(() => {
    if (!isSpinning) {
      const winnerIndex = options.findIndex((option) => option === winner);
      const winningRotation = (360 / options.length) * winnerIndex;
      setTimeout(() => {
        alert(`The winner is ${winner}!`);
      }, 1000); // Display winner after some time
      setTimeout(() => {
        setIsSpinning(true);
        setRotation(winningRotation);
      }, 3000); // Reset wheel after some time
    }
  }, [winner, options, isSpinning]);

  const wedgeStyle: React.CSSProperties = {
    position: 'absolute',
    width: '0',
    height: '0',
    borderTop: '100px solid transparent',
    borderBottom: '100px solid transparent',
    borderRight: '100px solid', // Removed left border and changed to right border
    transformOrigin: '100% 50%',
  };

  return (
    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
      {options.map((option, index) => (
        <div
          key={index}
          style={{
            ...wedgeStyle,
            transform: `rotate(${(360 / options.length) * index}deg)`,
            borderColor: option, // Set border color dynamically
          }}
        ></div>
      ))}
      <div
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'black',
          top: '75px',
          left: '75px',
          transform: `rotate(${rotation}deg)`, // Rotate the pointer
        }}
      ></div>
    </div>
  );
};

export default Wheel;
