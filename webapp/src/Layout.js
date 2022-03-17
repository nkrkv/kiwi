import Head from "next/head";
import NextLink from "next/link";
import MuiLink from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Layout({
  pageTitle,
  appBarTitle,
  backButtonHref,
  children,
}) {
  const classes = useStyles();

  const backButton = backButtonHref ? (
    <NextLink href={backButtonHref} passHref>
      <IconButton edge="start" color="inherit">
        {" "}
        <ArrowBackIcon style={{ color: "#ffffff" }} />{" "}
      </IconButton>
    </NextLink>
  ) : null;

  return (
    <>
      <Head>
        <title>{pageTitle} -- Kiwi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          {backButton}
          <Typography variant="h6" style={{ color: "#ffffff" }}>
            {"KIWI ⚬ "}
            {appBarTitle || pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className={classes.container}>
        {children}
      </Container>
    </>
  );
}
