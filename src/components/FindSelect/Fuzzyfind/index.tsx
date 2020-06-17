import React, { RefObject } from 'react';
import { Popper, Card, List, ListItem } from '@material-ui/core';
import Fuse from 'fuse.js';

interface Props {
  needle: string;
  haystack: string[];
  anchorEl: RefObject<HTMLInputElement>;
}

const Fuzzyfind = ({ needle, haystack, anchorEl }: Props) => {
  if (!needle) {
    return null;
  }

  const FUSE = new Fuse(haystack, { threshold: 0.3 });

  const renderResults = () => {
    const RESULTS = FUSE.search(needle);

    if (!RESULTS || !RESULTS.length) {
      return (
        <Card>
          <List>
            <ListItem>no results found</ListItem>
          </List>
        </Card>
      );
    }

    return (
      <Card>
        <List>
          {RESULTS.map(({ item: itemText }) => (
            <ListItem key={itemText} button>
              {itemText}
            </ListItem>
          ))}
        </List>
      </Card>
    );
  };

  return (
    <Popper
      open
      placeholder="bottom"
      disablePortal
      modifiers={{
        flip: {
          enabled: true,
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

export default Fuzzyfind;
