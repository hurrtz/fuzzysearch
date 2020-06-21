import React, { memo, RefObject } from 'react';
import { Popper, Card, CardContent, List, ListItem } from '@material-ui/core';
import Fuse from 'fuse.js';
import classnames from 'classnames';
import './styles.css';

interface Props {
  needle: string;
  haystack: string[];
  anchorEl: RefObject<HTMLInputElement>;
  onSelect: Function;
  open: boolean;
  onPreview: Function;
  onResults: Function;
  selectedIndex: number;
}

const Fuzzyfind = ({
  needle,
  haystack,
  anchorEl,
  onSelect,
  open,
  onPreview,
  onResults,
  selectedIndex,
}: Props) => {
  if (!needle) {
    return null;
  }

  const FUSE = new Fuse(haystack, { threshold: 0.1, includeMatches: true });

  const handleSelect = (item: string) => {
    onSelect(item);
  };

  const handleMouseEnter = (item: string) => {
    onPreview(item);
  };

  const renderResultItem = (
    item: string,
    matches: readonly Fuse.FuseResultMatch[] | undefined,
  ) => {
    const characters = Array.from(item).map((character, index) => (
      <span key={`${character}_${index}`}>{character}</span>
    ));

    if (matches) {
      matches[0].indices.forEach((indice) => {
        const rangeOfMatchedCharacters = [indice[0]];

        for (let i = indice[0]; i <= indice[1]; i += 1) {
          rangeOfMatchedCharacters.push(i);
        }

        rangeOfMatchedCharacters.forEach((matchedCharacterPosition) => {
          characters[matchedCharacterPosition] = (
            <span
              className="matched"
              key={`${item[matchedCharacterPosition]}_${matchedCharacterPosition}`}
            >
              {item[matchedCharacterPosition]}
            </span>
          );
        });
      });
    }

    return characters;
  };

  const getResults = () => {
    const RESULTS = FUSE.search(needle);

    if (RESULTS) {
      onResults(RESULTS.map((result) => result.item));
    }

    return RESULTS;
  };

  const renderResults = () => {
    const RESULTS = getResults();

    if (!RESULTS || !RESULTS.length) {
      return (
        <Card>
          <CardContent>
            <List>
              <ListItem>no results found</ListItem>
            </List>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="results">
        <CardContent>
          <List>
            {RESULTS.map(({ item: itemText, matches }, index) => (
              <ListItem
                key={itemText}
                button
                className={classnames('result', {
                  active: selectedIndex === index,
                })}
                onClick={() => handleSelect(itemText)}
                onMouseEnter={() => handleMouseEnter(itemText)}
              >
                {renderResultItem(itemText, matches)}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };

  return (
    <Popper
      open={open}
      placeholder="bottom"
      disablePortal
      modifiers={{
        flip: {
          enabled: false,
        },
        preventOverflow: {
          enabled: true,
          boundariesElement: 'scrollParent',
        },
      }}
      anchorEl={anchorEl.current}
    >
      {renderResults()}
    </Popper>
  );
};

export default memo(Fuzzyfind);
