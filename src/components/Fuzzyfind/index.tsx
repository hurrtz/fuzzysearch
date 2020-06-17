import React, { ReactElement } from 'react';

interface Props {
  items: string[];
  fallbackComponent?: ReactElement;
}

const Fuzzyfind = ({ items, fallbackComponent }: Props) => {
  if (!items.length) {
    return fallbackComponent || null;
  }

  return <div>fuzzy</div>;
};

export default Fuzzyfind;
