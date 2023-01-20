import { db } from './index.js';

export const all = async () => {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM catdb"
        db.query(q, (err, results) => {
            if (err) return reject(err)
            else {
                resolve(results);
            }
        })
    });
};

export default { all }