const mysql = require('mysql');
const dbCon = require('../config/db');

let user = {};

user.getAll = () => {
  return new Promise((resolve, reject) => {
    dbCon.query(`SELECT * FROM tbl_users`, (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
};

user.getOne = id => {
  return new Promise((resolve, reject) => {
    dbCon.query(`SELECT * FROM tbl_users WHERE id = ?`, id, (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
};

module.exports = user;
