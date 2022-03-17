import Head from 'next/head';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Doors -- Kiwi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            KIWI
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        {children}
      </Container>
    </>
  );
}
