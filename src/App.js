import React, { useState, useEffect } from 'react';

const width = 8;
const candyColors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow'];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      // first column contains squares with index 0, 9, 16. Tha last square that can start a columnOfThree has index 47
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];

      // check if column of square 1, 9 and 16 are all the same color as the first square, whitch is the decidedColor. If so, set the color to ''.
      if (
        columnOfThree.every(
          (item) => currentColorArrangement[item] === decidedColor
        )
      ) {
        columnOfThree.forEach((item) => (currentColorArrangement[item] = ''));
      }
    }
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];

      if (
        columnOfFour.every(
          (item) => currentColorArrangement[item] === decidedColor
        )
      ) {
        columnOfFour.forEach((item) => (currentColorArrangement[item] = ''));
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      // exclude from checking the last two squares of each row
      const notValid = [
        6,
        7,
        14,
        15,
        22,
        23,
        30,
        31,
        38,
        39,
        46,
        47,
        54,
        55,
        63,
        64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (item) => currentColorArrangement[item] === decidedColor
        )
      ) {
        rowOfThree.forEach((item) => (currentColorArrangement[item] = ''));
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      // exclude from checking the last two squares of each row
      const notValid = [
        5,
        6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
        62,
        63,
        64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (item) => currentColorArrangement[item] === decidedColor
        )
      ) {
        rowOfFour.forEach((item) => (currentColorArrangement[item] = ''));
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      //if it is first row and empty => generate random color
      if (isFirstRow && currentColorArrangement[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      //if the square bellow the square we are looping, is empty => it will adopt the color; moving the colors down and the blanks up
      if (currentColorArrangement[i + width] === '') {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = '';
      }
    }
  };

  const dragStart = (e) => {
    console.log('drag start', e.target);
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    console.log('drag Drop', e.target);
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = (e) => {
    console.log('drag End', e.target.dataset);

    const squareBeingReplacedId = parseInt(squareBeingReplaced.dataset.id);
    const squareBeingDraggedId = parseInt(squareBeingDragged.dataset.id);
    console.log(squareBeingReplacedId, squareBeingDraggedId);
  };

  const createBoard = () => {
    const randomColorArrangment = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];

      randomColorArrangment.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangment);
  };

  useEffect(() => {
    createBoard();
  }, []);

  // check for ColumnsOfThree every 1sec
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveIntoSquareBelow();
      //reset the board
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 1000);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForColumnOfThree,
    checkForRowOfFour,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  return (
    <div className='app'>
      <div className='game'>
        {currentColorArrangement.map((item, index) => {
          return (
            <img
              key={index}
              style={{ backgroundColor: item }}
              src=''
              alt={item}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
