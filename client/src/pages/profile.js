import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { Loggin } from "../Context/loggin";

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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
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

const Profile = () => {
  const classes = useStyles();
  const [ user, setUser] = useState({});
  const [ orders, setOrders ] = useState([]);
  const { auth, setAuth } = useContext(Loggin);

  const getProducts = () => {
    // await fetch("http://localhost:4000/product")
    //   .then(Response => Response.json())
    //   .then(Response => setProducts(Response.data))
    //   .catch(err => console.log(err))
    return {
      Order_ID: 3015,
      Username: "musa",
      Price: 10,
      cargo_price: 3,
      Order_date: "2020-07-23",
      total_bonus: 3,
      address: "Adana a mahallesi 10 sokak no:3",
      City: "Adana"
    }
  }

  const getUser = async ()  => {
    const data = await fetch(`http://localhost:4000/login?username=${auth.id}&pass=${auth.pass}`).then(res => res.json())
    setUser(data);
  }

  console.log(user)

  useEffect(() => {
      const order = getProducts();
      orders.push(order);
      orders.push(order);
      orders.push(order);
      orders.push(order);

      getUser();
      // orders.forEach( row => console.log(row.Order_ID));
    }, [])
    
    // console.log(orders);
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
          <Button size="large" color="inherit" component={Link} to="/" onClick={(event) =>{
            // event.preventDefault();
            setAuth({});
          }}>Log out</Button>
        </Toolbar>
      </AppBar>

      <List className={classes.root}>
      <ListItem>
        <ListItemText primary="User Name" secondary={user[0]?.User_ID} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Name" secondary={user[0]?.Name} />
      </ListItem>
      <ListItem>
        <ListItemText primary="E-Mail" secondary={user[0]?.Email} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Phone Number" secondary={user[0]?.Phone} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Adress" secondary={user[0]?.Adress} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Password" secondary={user[0]?.Password} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Registiration Date" secondary={user[0]?.Reg_date} />
      </ListItem>
    </List>

    <h1>Your Orders</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Orders</b></TableCell>
              <TableCell align="right" > <b> Order_ID </b></TableCell>
              <TableCell align="right"> <b> User Name&nbsp; </b></TableCell>
              <TableCell align="right"> <b> Price&nbsp; </b></TableCell>
              <TableCell align="right"> <b> Cargo Price&nbsp; </b></TableCell>
              <TableCell align="right"> <b> Order Date&nbsp; </b></TableCell>
              <TableCell align="right"> <b> Total Bonus&nbsp; </b></TableCell>
              <TableCell align="right"> <b> Adress&nbsp; </b></TableCell>
              <TableCell align="right"> <b> City&nbsp; </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map( row => (
              <TableRow key={row}>
                <TableCell component="th" scope="row">{row.Order_ID}</TableCell>
                <TableCell align="right">{row.Username}</TableCell>
                <TableCell align="right">{row.Price}</TableCell>
                <TableCell align="right">{row.cargo_price}</TableCell>
                <TableCell align="right">{row.cargo_price}</TableCell>
                <TableCell align="right">{row.cargo_price}</TableCell>
                <TableCell align="right">{row.cargo_price}</TableCell>
                <TableCell align="right">{row.cargo_price}</TableCell>
                <TableCell align="right">{row.cargo_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default Profile;