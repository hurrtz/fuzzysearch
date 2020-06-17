import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import FindSelect from '../../components/FindSelect';
import DataIsBeingFetched from '../../components/DataIsBeingFetched';
import axios from 'axios';
import { uniq } from 'lodash';
import './styles.css';

const Home = () => {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    const DELAY_MIN = 1250;
    const DELAY_MAX = 2500;
    const DELAY = Math.floor(
      Math.random() * (DELAY_MAX - DELAY_MIN) + DELAY_MIN,
    );

    setTimeout(() => {
      axios.get('/data.json').then(({ data: { fruits: _fetchedFruits } }) => {
        const fetchedFruits = _fetchedFruits;
        fetchedFruits.sort();
        setFruits(uniq(fetchedFruits));
      });
    }, DELAY);
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

export default Home;
