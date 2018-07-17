import React, { Component } from 'react';
import logo32 from './tree_icon_32dp.png';
import logo72 from './tree_icon_72dp.png';
import logo128 from './tree_icon_128dp.png';
import './App.css';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

import Message from './components/Message/Message';
import Login from './components/Login/Login';

const styles = {
	image: {
		alignSelf: 'center',
		height: 50,
		width: 50,
		padding: 10
	},
	bar: {
		backgroundColor: '#222'
	},
	flex: {
	  	flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	}
};

class App extends Component {
	constructor(props) {
	  super(props)
  
	  this.handler = this.handler.bind(this)
	}
	
	handler(e, field, value) {
		e.preventDefault();
		this.setState({
		  	[field]: value
		});
	}

	state = {
		drawerOpen: false,
		isLoggedIn: false,
		matches: [],

		page: 'Login'
	}

	page() {
		if (this.state.isLoggedIn) return this.mainPage();
		else return this.notLoggedInPage();
	}

	mainPage() {
		const { classes } = this.props;
		
		const menu = (
			<div className={classes.list}>
				<List>
					<ListItem button>
						<ListItemIcon>
							<ProfileIcon />
						</ListItemIcon>
						<ListItemText primary="Profile"/>
					</ListItem>
				</List>
				<Divider />
			</div>
		);
		
		return (
			<div className="App">
				<div className={ classes.flex }>
					<AppBar position="static" className={ classes.bar }>
						<Toolbar>
							<IconButton className={ classes.menuButton } color="inherit" aria-label="Menu" onClick={ (e) => this.handler(e, 'drawerOpen', true) }>
								<MenuIcon />
								<Drawer open={ this.state.drawerOpen } onClose={ (e) => this.handler(e, 'drawerOpen', false) }>
									<div tabIndex={ 0 } 
										role="button" 
										onClick={ (e) => this.handler(e, 'drawerOpen', false) }
										onKeyDown={ (e) => this.handler(e, 'drawerOpen', false) }>
										{ menu }
									</div>
								</Drawer>
							</IconButton>
							<Typography variant="title" color="inherit" className={ classes.flex }>
								<img src={ logo128 } className={ classes.image }/>
							</Typography>
							<Button color="inherit" onClick={ (e) => this.handler(e, 'isLoggedIn', false) }>Logout</Button>
						</Toolbar>
					</AppBar>
				</div>
				<div className="messages">
					<Message value={ 'default message' }/>
				</div>
			</div>	
		);
	}

	notLoggedInPage() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo72}/>
					<h1 className="App-title">Login to Togather!</h1>
				</header>
				<div className="messages">
					<Login page={ this.state.page } isLoggedIn={ this.state.isLoggedIn } handler={ this.handler }/>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				{ this.page() }
			</div>
		);
	}
}

export default withStyles(styles)(App);