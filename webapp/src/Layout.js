import Head from 'next/head';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Doors -- Kiwi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <NextLink href="/" passHref>
              <MuiLink color="inherit">KIWI</MuiLink>
            </NextLink>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className={classes.container}>
        {children}
      </Container>
    </>
  );
}
