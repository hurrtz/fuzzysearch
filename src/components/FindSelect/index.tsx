import React, { ReactElement, useState, useRef, ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import Fuzzyfind from './Fuzzyfind';

interface Props {
  items: string[];
  fallbackComponent?: ReactElement;
}

const FindSelect = ({ items, fallbackComponent }: Props) => {
  const [needle, setNeedle] = useState('');
  const inputRef = useRef(null);

  if (!items.length) {
    return fallbackComponent || null;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNeedle(event.target.value);
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        value={needle}
        onChange={handleChange}
        variant="outlined"
        inputRef={inputRef}
        fullWidth
      />
      <Fuzzyfind needle={needle} haystack={items} anchorEl={inputRef} />
    </form>
  );
};

export default FindSelect;
