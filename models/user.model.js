const mysql = require('mysql');
const dbCon = require('../config/db');

let user = {};

// Get all users
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

// Get user by id
user.getOne = (value, col_name) => {
  return new Promise((resolve, reject) => {
    dbCon.query(
      `SELECT * FROM tbl_users WHERE ?? = ?`,
      [col_name, value],
      (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      }
    );
  });
};

// Add a new user
user.create = newUser => {
  return new Promise((resolve, reject) => {
    dbCon.query(`INSERT INTO tbl_users SET ?`, newUser, (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows.insertId);
    });
  });
};

// Delete a user
user.delete = id => {
  return new Promise((resolve, reject) => {
    dbCon.query(`DELETE FROM tbl_users WHERE id = ?`, id, (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows.affectedRows);
    });
  });
};

// Update user info

user.update = updatedUser => {
  console.log(updatedUser);

  return new Promise((resolve, reject) => {
    // dbCon.query(
    //   `UPDATE tbl_users SET email=?, phone=? WHERE id=?;`,
    //   [user[0], user[1] id],
    //   (err, rows) => {
    //     if (err) {
    //       return reject(err);
    //     }
    //     console.log(user.email, user.phone);
    //     return resolve(rows);
    //   }
    // );
    return resolve();
  });
};

module.exports = user;
