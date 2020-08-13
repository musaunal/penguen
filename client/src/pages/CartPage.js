import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { Cart } from "../Context/cart";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import L from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  table: {
    minWidth: 700,
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function A({ match }) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const { value, setValue } = useContext(Cart);

  const getProducts = async () => {
    fetch("http://localhost:4000/product")
      .then(Response => Response.json())
      .then(Response => setProducts(Response.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getProducts()
  }, [])
  console.log(products)


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

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Products</b></TableCell>
              <TableCell align="right" > <b> Price </b></TableCell>
              <TableCell align="right"> <b> Amount&nbsp; </b></TableCell>
              <TableCell align="right"> <b> Bonus&nbsp; </b></TableCell>
              <TableCell align="right"> <b> Total&nbsp; </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(value).map((row) => (
              <TableRow key={row}>
                <TableCell component="th" scope="row">{products[row]?.Name}</TableCell>
                <TableCell align="right">{products[row]?.Price}</TableCell>
                <TableCell align="right">{value[row]}</TableCell>
                <TableCell align="right">{products[row]?.Bonus}</TableCell>
                <TableCell align="right">{products[row]?.Price * value[row]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Container style={{ marginTop: 60 }}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Typography variant="h6" style={{color:"black"}} className={classes.title}>
                Total : { (products.length != 0) ?
                  Object.keys(value).reduce((a,v) => (a + (products[v]?.Price * value[v])), 0 ) : 0 }
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" color="primary" component={Link} to="/order sum">
              Buy
              </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => setValue({})}>
              Clear Cart
              </Button>
          </Grid>
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