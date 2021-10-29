import React from 'react';
import { buttons } from '../utils';

const Buttons = () => {
  return (
    <section className='header'>
      <div className='header-center'>
        <h1>play your kind of candy crush</h1>

        <div className='buttons-container'>
          <p>choose the main character and have fun!</p>
          {buttons.map((item) => {
            return (
              <button className='choose-btn' key={item.id}>
                <p>{item.title}</p>
                <img className='choose-btn-img' src={item.img} alt='' />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Buttons;
