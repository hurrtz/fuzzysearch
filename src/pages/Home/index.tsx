import React, { useEffect } from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import FindSelect from '../../components/FindSelect';
import DataIsBeingFetched from '../../components/DataIsBeingFetched';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from './saga';
import { fetchFruits } from './actions';
import { makeSelectFruits } from './selectors';
import reducer from './reducer';
import './styles.css';

const key = 'HOME';

const mapState = createStructuredSelector({
  fruits: makeSelectFruits(),
});

const mapDispatch = { fetchFruits };

const connector = connect(mapState, mapDispatch);

interface Props extends ConnectedProps<typeof connector> {}

const Home = ({ fetchFruits, fruits }: Props) => {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  useEffect(() => {
    fetchFruits();
  }, []);

  const onResult = (result: string) => {
    console.log(`we have the fruit: ${result}`);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Choose your fruit!
        </Typography>

        <FindSelect
          items={fruits}
          fallbackComponent={
            <Box textAlign="center">
              <DataIsBeingFetched text="Your fruits are being plucked from the orchard" />
            </Box>
          }
          onSelect={onResult}
        />
      </Box>
    </Container>
  );
};

export default compose(connector)(Home);
