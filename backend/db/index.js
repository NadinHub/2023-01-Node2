import * as mysql from 'mysql';
import config from '../config/index.js';
import Cats from './cats.js';
// import AllUser from './users';

export const db = mysql.createConnection(config.mysql);

db.connect(err => {
    if (err) console.log(err);
});

export default Cats 