import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import login from '../../modules/login';
import signup from '../../modules/signup';

const styles = theme => ({
    textField: {
        width: 400,
    }, 

    button: {
        marginTop: theme.spacing.unit,
        width: 400,
    }
  });

class Login extends Component {
    // Page variables
    state = {
        username: {
            touched: false,
            value: ''
        },
        password: {
            touched: false,
            value: ''
        },
        confirmPassword: {
            touched: false,
            value: ''
        }
    }

    // Update variables on change
    handleChange = name => event => {
        this.setState({
            [name]: {
                value: event.target.value,
                touched: true
            }
        });
    }

    valueError(field) {
        if (this.props.page === 'Login') return;
        let value = this.state[field].value
        let error = false;
        if (this.state[field].touched) {
            if (value.length < 8) error = true;
            if (field === 'password' && !value.match(/([A-z])([0-9])([!@#$%^&*])/g)) error = true;
            if (field === 'confirmPassword' && this.props.page === 'Signup') {
                if (this.state.password.value !== this.state.confirmPassword.value) error = true;
            }
        }
        return error;
    }

    submit(event) {
        event.preventDefault();
        if (this.props.page === 'Login') login(this.state.username.value, this.state.password.value, event, this.props.handler);
        else signup(this.state.username.value, this.state.password.value, event, this.props.handler);
    }

    confirmPassword(className, onChange, error) {
        if (this.props.page === 'Login') return;
        return (
            <Grid item xs={12}>
                <TextField
                    error={ this.valueError('confirmPassword') }
                    id='confirmPassword'
                    label='Confirm Password'
                    className={ className }
                    value={ this.state.confirmPassword.value }
                    onChange={ onChange }
                    margin='normal'
                    type='password'
                />
            </Grid>
        )
    }

    message() {
        let message = "Don't have an account? Sign up ";
        let nextPage = 'Signup'

        if (this.props.page === 'Signup') {
            message = "Already have an account? Login ";
            nextPage = 'Login';
        }

        return (
            <p>{ message }<a href="" onClick={ (e) => this.props.handler(e, 'page', nextPage) }>here</a></p>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={ this.props.page }>
                <form onSubmit={ (e) => this.submit(e) }>
                    <Grid item xs={12}>
                        <TextField
                            error={ this.valueError('username') }
                            id='username'
                            label='Username'
                            className={ classes.textField }
                            value={ this.state.username.value }
                            onChange={ this.handleChange('username') }
                            margin='normal'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={ this.valueError('password') }
                            id='password'
                            label='Password'
                            className={ classes.textField }
                            value={ this.state.password.value }
                            onChange={ this.handleChange('password') }
                            margin='normal'
                            type='password'
                        />
                    </Grid>

                    { this.confirmPassword(classes.textField, this.handleChange('confirmPassword')) }

                    <Button variant='contained' color='primary' className={ classes.button } type='submit'>
                        { this.props.page }
                    </Button>
                    
                    { this.message() }
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);