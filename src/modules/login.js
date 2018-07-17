import axios from 'axios';
import config from './config';

export default function login(username, password, event, handler) {
    axios({
        method: 'get',
        url: config.url + '/login/' + username + '/' + password
    }).then(function(response) {
        if (response.data) {
            handler(event, 'isLoggedIn', true);
        }
    });
}