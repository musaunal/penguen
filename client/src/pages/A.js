import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { Cart } from "../Context/cart";

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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

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
    height: '80%',
    textAlign: "center",
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

function A({ match }) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { value, setValue } = useContext(Cart);

  const getProducts = async () => {
    await fetch("http://localhost:4000/product")
      .then(Response => Response.json())
      .then(res => {
        fetch(`http://localhost:4000/comments?id=${res.data[match.params.id]?.Product_ID}`)
          .then(res => res.json())
          .then(res => setComments(res))
          .catch(err => console.log(err))
        setProducts(res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.title}>
              Penguen Store
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image="https://images.unsplash.com/photo-1551415923-a2297c7fda79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80"  // "https://source.unsplash.com/random"
            title={products[match.params.id]?.Name}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {products[match.params.id]?.Name}
            </Typography>
            <Typography >
              Product_ID: {products[match.params.id]?.Product_ID} <br />
              Price: {products[match.params.id]?.Price} <br />
              Stock: {products[match.params.id]?.Stock} <br />
              Star: {products[match.params.id]?.Star} <br />
              Bonus: {products[match.params.id]?.Bonus}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary" component={Link} to="/cart">
                  Buy Now
              </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => {
                  value[match.params.id] = (value[match.params.id] || 0) + 1
                }}>
                  Add to Cart
              </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" component={Link} to="/">
                  Return Home
              </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Container>

      <Container>
        <h1> Comments </h1>
        <List className={classes.root}>
          {comments.map(row => (
            <ListItem>
              <ListItemText primary={row?.Username} secondary={row?.Comment} />
            </ListItem>
          ))}
        </List>

        <Grid item xs={5}>
          <TextField
            variant="outlined"
            fullWidth
            name="Comment"
            label="Comment"
            type="Comment"
            id="Comment"
            onChange={event => { setComment(event.target.value) }}
          />
        </Grid>

        <Grid item xs={5}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
              // event.preventDefault();
              fetch(`http://localhost:4000/comment?product_id=${products[match.params.id]?.Product_ID}&star=5&comment=${comment}`)
              // props.history.push("/");
              }
            }
          >
            Add comment
          </Button>
        </Grid>

      </Container>

      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          The White Penguen Inc
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          White Penguen
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <L color="inherit">
            Your Website
          </L>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </footer>
    </React.Fragment>
  );
}

export default A;