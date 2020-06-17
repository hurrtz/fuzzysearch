import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Choose your fruit!
        </Typography>

        <FindSelect
          items={fruits}
          fallbackComponent={
            <DataIsBeingFetched text="Your fruits are being plucked from the orchard" />
          }
        />
      </Box>
    </Container>
  );
};

export default Home;
