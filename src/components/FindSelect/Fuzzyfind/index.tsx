import React, { RefObject } from 'react';
import { Popper, Card, CardContent, List, ListItem } from '@material-ui/core';
import Fuse from 'fuse.js';
import './styles.css';

interface Props {
  needle: string;
  haystack: string[];
  anchorEl: RefObject<HTMLInputElement>;
  onSelect: Function;
  open: boolean;
}

const Fuzzyfind = ({ needle, haystack, anchorEl, onSelect, open }: Props) => {
  console.log(open);

  if (!needle) {
    return null;
  }

  const FUSE = new Fuse(haystack, { threshold: 0.3 });

  const handleSelect = (item: string) => {
    onSelect(item);
  };

  const renderResults = () => {
    const RESULTS = FUSE.search(needle);

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
            {RESULTS.map(({ item: itemText }) => (
              <ListItem
                key={itemText}
                button
                onClick={() => handleSelect(itemText)}
              >
                {itemText}
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

export default Fuzzyfind;
