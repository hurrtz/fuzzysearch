import React, { ReactElement, useRef, ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import Fuzzyfind from './Fuzzyfind';

import { InjectedProps as PropsFromContainer } from '../../containers/FindSelect';

interface Props extends PropsFromContainer {
  items: string[];
  fallbackComponent?: ReactElement;
  onSelect: Function;
}

const FindSelect = ({
  items,
  fallbackComponent,
  onSelect,
  setFinderOpen,
  setNeedle,
  setPreviewNeedle,
  previewNeedle,
  needle,
  finderOpen,
}: Props) => {
  const inputRef = useRef(null);

  if (!items.length) {
    return fallbackComponent || null;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPreviewNeedle('');
    setNeedle(event.target.value);
    setFinderOpen(true);
  };

  const handleOnPreview = (previewText?: string) => {
    setPreviewNeedle(previewText || '');
  };

  const handleSelect = (result: string) => {
    setNeedle(result);
    setFinderOpen(false);
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
        open={finderOpen}
        onPreview={handleOnPreview}
      />
    </form>
  );
};

export default FindSelect;
