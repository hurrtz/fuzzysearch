import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import './styles.css';

interface Props {
  text: string;
}

const DataIsBeingFetched = ({ text }: Props) => {
  const TIME_TILL_NEXT_DOT = 1000;
  const MIN_DOTS_VISIBLE = 1;
  const MAX_DOTS_VISIBLE = 3;
  const [numberOfDotsVisible, setNumberOfDotsVisible] = useState(
    MIN_DOTS_VISIBLE,
  );
  let TIMEOUT_ID: NodeJS.Timeout;

  useEffect(() => () => clearTimeout(TIMEOUT_ID));

  TIMEOUT_ID = setTimeout(() => {
    if (numberOfDotsVisible === MAX_DOTS_VISIBLE) {
      setNumberOfDotsVisible(MIN_DOTS_VISIBLE);
    } else {
      setNumberOfDotsVisible(numberOfDotsVisible + 1);
    }
  }, TIME_TILL_NEXT_DOT);

  return (
    <div className="dataIsBeingFetched">
      {text}
      {Array.from(Array(MAX_DOTS_VISIBLE)).map((_, index) => (
        <span
          key={index}
          className={classnames('dot', {
            inactive: index > numberOfDotsVisible - 1,
          })}
        >
          .
        </span>
      ))}
    </div>
  );
};

export default DataIsBeingFetched;
