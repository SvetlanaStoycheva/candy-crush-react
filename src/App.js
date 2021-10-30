import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './context';
import blank from './images/tesla/blank.jpg';
import ScoreBoard from './components/ScoreBoard';
import Buttons from './components/Buttons';

const width = 8;

const App = () => {
  const {
    currentSetImages,
    squareBeingDragged,
    setSquareBeingDragged,
  } = useGlobalContext();
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

  const [squareBeingReplaced, setSquareBeingReplaced] = useState(0);
  const [scoreDisplay, setScoreDisplay] = useState(0);

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
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (item) => (currentColorArrangement[item] = blank)
        );
        return true;
      }
    }
    // to avoid counting blank squares in the score at the beginning:
    if (squareBeingDragged === 0) {
      setScoreDisplay(0);
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
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach((item) => (currentColorArrangement[item] = blank));
        return true;
      }
    }
    if (squareBeingDragged === 0) {
      setScoreDisplay(0);
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
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach((item) => (currentColorArrangement[item] = blank));
        return true;
      }
    }
    if (squareBeingDragged === 0) {
      setScoreDisplay(0);
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
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach((item) => (currentColorArrangement[item] = blank));
        return true;
      }
    }
    if (squareBeingDragged === 0) {
      setScoreDisplay(0);
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      //if it is first row and empty => generate random image
      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * currentSetImages.length);
        currentColorArrangement[i] = currentSetImages[randomNumber];
      }

      //if the square bellow the square we are looping, is empty => it will adopt the color; moving the colors down and the blanks up
      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    // console.log('drag start', e.target);
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    // console.log('drag Drop', e.target);
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    // console.log('drag End', e.target.dataset);

    const squareBeingReplacedId = parseInt(squareBeingReplaced.dataset.id);
    const squareBeingDraggedId = parseInt(squareBeingDragged.dataset.id);

    currentColorArrangement[
      squareBeingReplacedId
    ] = squareBeingDragged.getAttribute('src');
    currentColorArrangement[
      squareBeingDraggedId
    ] = squareBeingReplaced.getAttribute('src');

    const validMoves = [
      squareBeingDragged + 1,
      squareBeingDragged - 1,
      squareBeingDragged + width,
      squareBeingDragged - width,
    ];
    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfFour = checkForRowOfFour();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)
    ) {
      setSquareBeingReplaced(null);
      setSquareBeingDragged(null);
    } else {
      // currentColorArrangement[squareBeingReplacedId] =
      //   squareBeingReplaced.style.backgroundColor;
      // currentColorArrangement[squareBeingDraggedId] =
      //   squareBeingDragged.style.backgroundColor;
      currentColorArrangement[
        squareBeingReplacedId
      ] = squareBeingReplaced.getAttribute('src');
      currentColorArrangement[
        squareBeingDraggedId
      ] = squareBeingDragged.getAttribute('src');

      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangment = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        currentSetImages[Math.floor(Math.random() * currentSetImages.length)];

      randomColorArrangment.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangment);
  };

  useEffect(() => {
    createBoard();
    setScoreDisplay(0);
  }, [currentSetImages]);

  // check for ColumnsOfThree every 100msec
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveIntoSquareBelow();
      //reset the board
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    // checkForColumnOfFour,
    // checkForColumnOfThree,
    // checkForRowOfFour,
    // checkForRowOfThree,
    // moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  return (
    <main className='main'>
      <Buttons />
      <section className='game-score-container'>
        <ScoreBoard score={scoreDisplay} />
        <div className='game'>
          {currentColorArrangement.map((item, index) => {
            return (
              <img
                key={index}
                // style={{ backgroundColor: item }}
                src={item}
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
      </section>
    </main>
  );
};

export default App;
