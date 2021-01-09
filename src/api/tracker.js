import axios from 'axios';

export default axios.create({
    baseURL: 'https://mv-dev.fleksbit.org/api/'
});