import React, {
  ReactElement,
  useRef,
  ChangeEvent,
  memo,
  useCallback,
} from 'react';
import { TextField } from '@material-ui/core';
import { debounce } from 'lodash';
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
}: Props) => {
  const inputRef = useRef(null);

  const setNeedle = useCallback(
    debounce((value: string) => {
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
    }, 250),
    [],
  );

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
    setNeedle(result);

    if (finderOpen) {
      setFinderOpen(false);
    }

    onSelect(result);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // event.preventDefault();

    if (event.key === 'ArrowDown') {
    }
  };

  return (
    <form noValidate autoComplete="off" className="findSelect">
      <TextField
        defaultValue={needle}
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
