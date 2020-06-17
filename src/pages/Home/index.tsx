import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fuzzyfind from '../../components/Fuzzyfind';
import DataIsBeingFetched from '../../components/DataIsBeingFetched';
import axios from 'axios';
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
      axios.get('/data.json').then(({ data: { fruits: fetchedFruits } }) => {
        setFruits(fetchedFruits);
      });
    }, DELAY);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Pick your fruit!
        </Typography>

        <Fuzzyfind
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
