import './App.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LongURLInput from './components/LongURLInput.tsx';
import Grid from '@mui/material/Unstable_Grid2';

function App() {

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid xs={12} spacing={4}>
          <Typography align="center" variant="h4">URL Shortener</Typography>
        </Grid>
        <Grid xs={12}>
          <LongURLInput />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
