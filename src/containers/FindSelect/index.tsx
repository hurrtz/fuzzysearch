import React, { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '../../utils/injectReducer';
import FindSelect from '../../components/FindSelect';
import { NS } from './constants';
import { setFinderOpen, setNeedle, setPreviewNeedle } from './actions';
import {
  makeSelectFinderOpen,
  makeSelectNeedle,
  makeSelectPreviewNeedle,
} from './selectors';
import reducer from './reducer';

const mapState = createStructuredSelector({
  finderOpen: makeSelectFinderOpen(),
  needle: makeSelectNeedle(),
  previewNeedle: makeSelectPreviewNeedle(),
});

const mapDispatch = { setFinderOpen, setNeedle, setPreviewNeedle };

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

export default compose(connector)(FindSelectContainer);
