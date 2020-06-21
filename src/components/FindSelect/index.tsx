import React, {
  ReactElement,
  useRef,
  ChangeEvent,
  memo,
  useCallback,
} from 'react';
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
  setNeedle: _setNeedle,
  setPreviewNeedle,
  previewNeedle,
  needle,
  finderOpen,
  setResults,
  setSelectedIndex,
  selectedIndex,
  result,
  setResult,
}: Props) => {
  const inputRef = useRef(null);

  const setNeedle = useCallback((value: string) => {
    if (previewNeedle) {
      setPreviewNeedle('');
    }

    _setNeedle(value);

    if (value && !finderOpen) {
      setFinderOpen(true);
    } else {
      setFinderOpen(false);
    }

    if (!value) {
      setResults([]);
    }
  }, []);

  if (!items.length) {
    return fallbackComponent || null;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNeedle(event.target.value);
  };

  const handleOnPreview = (previewText?: string) => {
    setPreviewNeedle(previewText || '');
  };

  const handleSelect = (result: string) => {
    setResult(result);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      setSelectedIndex(1);
    }

    if (event.key === 'ArrowUp') {
      setSelectedIndex(-1);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      setResult(previewNeedle);
    }
  };

  return (
    <form noValidate autoComplete="off" className="findSelect">
      <TextField
        value={result || previewNeedle || needle}
        onChange={handleChange}
        variant="outlined"
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        fullWidth
      />
      <Fuzzyfind
        needle={needle}
        haystack={items}
        anchorEl={inputRef}
        onSelect={handleSelect}
        open={finderOpen}
        onPreview={handleOnPreview}
        onResults={setResults}
        selectedIndex={selectedIndex}
      />
    </form>
  );
};

export default memo(FindSelect, (propsBefore, propsAfter) => {
  const keysPropsBefore = Object.keys(propsBefore);
  const keysChanged: string[] = [];

  keysPropsBefore.forEach((key) => {
    // @ts-ignore
    if (propsBefore[key] !== propsAfter[key]) {
      keysChanged.push(key);
    }
  });

  if (keysChanged.length === 1 && keysChanged[0] === 'results') {
    return true;
  }

  return false;
});
