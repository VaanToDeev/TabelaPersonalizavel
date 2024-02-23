import React, { useState, useEffect } from 'react';
import './custom.css';

const CustomTable = () => {
  const colorOptions = ['#FF5733', '#3498DB', '#27AE60', '#F1C40F', '#9B59B6'];

  const [showColorOptions, setShowColorOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [originalColor, setOriginalColor] = useState([]);

  const handleCellClick = (e) => {
    if (e.target.classList.contains('color-button')) {
      setShowColorOptions(true);
      const cell = e.target.closest('td');
      setOriginalColor(cell.style.backgroundColor);
      cell.style.backgroundColor = selectedColor;
    }
  };

  const handleMouseEnter = () => {
    setShowColorOptions(true);
  };

  const handleMouseLeave = () => {
    setShowColorOptions(false);
    const cell = document.querySelector(`td[data-row="${rowIndex}"][data-col="${colIndex}"]`);
    cell.style.backgroundColor = originalColor;
  };

  const handleColorChange = (color, rowIndex, colIndex) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
      for (let colIndex = 0; colIndex < 5; colIndex++) {
        const savedColor = localStorage.getItem(`cell-${rowIndex}-${colIndex}`);
        if (savedColor) {
          document.querySelector(`td[data-row="${rowIndex}"][data-col="${colIndex}"]`).style.backgroundColor = savedColor;
        }
      }
    }
  }, []);

  return (
    <div className="App">
      <table className="table">
        <tbody>
          {Array.from({ length: 5 }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 5 }, (_, colIndex) => (
                <td key={colIndex} onClick={handleCellClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} data-row={rowIndex} data-col={colIndex}>
                  {showColorOptions && (
                    <div className="color-options active">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          className="color-button"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color, rowIndex, colIndex)}
                        />
                      ))}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
