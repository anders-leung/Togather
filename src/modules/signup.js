import axios from 'axios';
import config from './config';

export default function signup(username, password, event, handler) {
    if (!username || !password) return;
    axios({
        method: 'POST',
        url: config.url + '/signup',
        data: {
            doc: username,
            username: username,
            password: password
        }
    }).then(function(response) {
        if (response.data) handler(event, 'isLoggedIn', true);
    });
}