import React, { ReactElement, memo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '../../utils/injectReducer';
import FindSelect from '../../components/FindSelect';
import { NS } from './constants';
import {
  setFinderOpen,
  setNeedle,
  setPreviewNeedle,
  setResults,
  setSelectedIndex,
  setResult,
} from './actions';
import {
  makeSelectFinderOpen,
  makeSelectNeedle,
  makeSelectPreviewNeedle,
  makeSelectResults,
  makeSelectSelectedIndex,
  makeSelectResult,
} from './selectors';
import reducer from './reducer';

const mapState = createStructuredSelector({
  finderOpen: makeSelectFinderOpen(),
  needle: makeSelectNeedle(),
  previewNeedle: makeSelectPreviewNeedle(),
  results: makeSelectResults(),
  selectedIndex: makeSelectSelectedIndex(),
  result: makeSelectResult(),
});

const mapDispatch = {
  setFinderOpen,
  setNeedle,
  setPreviewNeedle,
  setResults,
  setSelectedIndex,
  setResult,
};

const connector = connect(mapState, mapDispatch);

export type InjectedProps = ConnectedProps<typeof connector>;

interface Props extends InjectedProps {
  items: string[];
  fallbackComponent?: ReactElement;
  onSelect: Function;
}

const FindSelectContainer = (props: Props) => {
  useInjectReducer({ key: NS, reducer });

  return <FindSelect {...props} />;
};

export default memo(connector(FindSelectContainer));
