import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-ee4ff.firebaseio.com/'
});

export default instance;