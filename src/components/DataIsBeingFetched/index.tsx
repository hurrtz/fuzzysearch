import React, { Fragment, useState, useEffect } from 'react';

interface Props {
  text: string;
}

const DataIsBeingFetched = ({ text }: Props) => {
  const TIME_TILL_NEXT_DOT = 1000;
  const MIN_DOTS = 1;
  const MAX_DOTS = 3;
  const [numberOfDots, setNumberOfDots] = useState(MIN_DOTS);
  let TIMEOUT_ID: NodeJS.Timeout;

  useEffect(() => () => clearTimeout(TIMEOUT_ID));

  TIMEOUT_ID = setTimeout(() => {
    if (numberOfDots === MAX_DOTS) {
      setNumberOfDots(MIN_DOTS);
    } else {
      setNumberOfDots(numberOfDots + 1);
    }
  }, TIME_TILL_NEXT_DOT);

  return (
    <Fragment>
      {text}
      {Array.from(Array(numberOfDots)).map(() => '.')}
    </Fragment>
  );
};

export default DataIsBeingFetched;
