import React, { ReactElement, memo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '../../utils/injectReducer';
import FindSelect from '../../components/FindSelect';
import { NS } from './constants';
import {
  setFinderOpen,
  setNeedle,
  setPreviewNeedle,
  setResults,
} from './actions';
import {
  makeSelectFinderOpen,
  makeSelectNeedle,
  makeSelectPreviewNeedle,
  makeSelectResults,
} from './selectors';
import reducer from './reducer';

const mapState = createStructuredSelector({
  finderOpen: makeSelectFinderOpen(),
  needle: makeSelectNeedle(),
  previewNeedle: makeSelectPreviewNeedle(),
  results: makeSelectResults(),
});

const mapDispatch = { setFinderOpen, setNeedle, setPreviewNeedle, setResults };

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

export default memo(connector(FindSelectContainer), (prevProps, nextProps) => {
  console.log(prevProps, nextProps);
  return false;
});
