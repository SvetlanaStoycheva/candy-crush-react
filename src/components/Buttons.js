import React from 'react';
import { buttons } from '../utils';
import { useGlobalContext } from '../context';

const Buttons = () => {
  const { handleCurrentBtn } = useGlobalContext();

  return (
    <section className='header'>
      <div className='header-center'>
        <h1>play your kind of candy crush</h1>

        <div className='buttons-container'>
          <p>choose the main character and have fun!</p>
          {buttons.map((item) => {
            return (
              <button
                type='button'
                className='choose-btn'
                key={item.id}
                data-id={item.title}
                onClick={(e) => handleCurrentBtn(e)}
              >
                <p>{item.title}</p>
                <img
                  className='choose-btn-img'
                  src={item.img}
                  alt={item.title}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Buttons;
