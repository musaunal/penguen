import React, { useEffect, useState, useContext } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Loggin } from "../Context/loggin";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import L from '@material-ui/core/Link';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <L color="inherit" href="https://material-ui.com/">
        Your Website
      </L>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none"
  }
}));

const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const Home = (props) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const { auth, setAuth } = useContext(Loggin);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const getProducts = async () => {
    await fetch("http://localhost:4000/product")
      .then(Response => Response.json())
      .then(Response => setProducts(Response.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getProducts()
  }, [])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAuth({});
  };

  const handleGoProfile = () => {
    setAnchorEl(null);
    props.history.push("/profile");
  };

  // console.log(products);
  // console.log(products[0]?.Name);

  return (
    <React.Fragment>
      <CssBaseline />
      {
        auth["id"] == undefined ?
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <Link to="/" className={classes.title}>
                  Penguen Store
            </Link>
              </Typography>
              <Button size="large" color="inherit" component={Link} to="/login">Login</Button>
            </Toolbar>
          </AppBar>
          :
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Penguen Store
              </Typography>
              {auth && (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={handleGoProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Log Out</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
      }
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Penguen Store
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Penguens what a lovely creatures, in the faraway lands, under the freezing nature,
              My dear fellow friends support these penguen products, don&apos;t just skip over it
              hollowly.
            </Typography>
            {
              auth["id"] == undefined ?
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary" component={Link} to="/singup">
                        Sing Up
                    </Button>
                    </Grid>
                  </Grid>
                </div>
                :
                null
            }
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://images.unsplash.com/photo-1551415923-a2297c7fda79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80"  // "https://source.unsplash.com/random"
                    title={products[card]?.Name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {products[card]?.Name}
                    </Typography>
                    <Typography>
                      Price: {products[card]?.Price} <br />
                      Stock: {products[card]?.Stock}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" component={Link} to={`/a/${card}`}>
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          The White Penguen Inc
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          White Penguen
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default withRouter(Home);