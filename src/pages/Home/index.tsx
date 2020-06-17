import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fuzzyfind from '../../components/Fuzzyfind';
import './styles.css';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Pick your fruit!
        </Typography>
        <Fuzzyfind />
      </Box>
    </Container>
  );
};

export default Home;
