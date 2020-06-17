import React, { ReactElement, useState, useRef, ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import Fuzzyfind from './Fuzzyfind';

interface Props {
  items: string[];
  fallbackComponent?: ReactElement;
  onSelect: Function;
}

const FindSelect = ({ items, fallbackComponent, onSelect }: Props) => {
  const [needle, setNeedle] = useState('');
  const [previewNeedle, setPreviewNeedle] = useState<string | null>(null);
  const [finderIsOpen, setFinderIsOpen] = useState(true);
  const inputRef = useRef(null);

  if (!items.length) {
    return fallbackComponent || null;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNeedle(event.target.value);
    setFinderIsOpen(true);
  };

  const handleOnPreview = (previewText?: string) => {
    setPreviewNeedle(previewText || null);
  };

  const handleSelect = (result: string) => {
    setNeedle(result);
    setFinderIsOpen(false);
    onSelect(result);
  };

  return (
    <form noValidate autoComplete="off" className="findSelect">
      <TextField
        value={previewNeedle || needle}
        onChange={handleChange}
        variant="outlined"
        inputRef={inputRef}
        fullWidth
      />
      <Fuzzyfind
        needle={needle}
        haystack={items}
        anchorEl={inputRef}
        onSelect={handleSelect}
        open={finderIsOpen}
        onPreview={handleOnPreview}
      />
    </form>
  );
};

export default FindSelect;
