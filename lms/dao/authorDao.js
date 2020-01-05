var db = require("./db");

exports.getAllAuthors = function(cb) {
  db.query("select * from author", function(err, result) {
    cb(err, result);
  });
};

// exports.getAllAuthors = function(){
//   return new Promises(function(resolve, reject){
//       db.query('select * from lms.author', function(err, result){            
//           return err ? reject(err) : resolve(result);
//       });
//   });

exports.addAuthor = function(author, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "insert into author(author_name) values(?)",
      [author.author_name],
      function(err, res) {
        if (err) {
          db.rollback(function(err, res) {
            cb(err, res);
          });
        }
        db.commit(function(err, res) {
          cb(err, res);
        });
      }
    );
  });
};

exports.updateAuthor = function(author_id, author, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "update author set author.author_name = ? where author.author_id = ?",
      [author.author_name, author_id],
      function(err, res) {
        if (err) {
          db.rollback(function(err, res) {
            cb(err, res);
          });
        }
        db.commit(function(err, res) {
          cb(err, res);
        });
      }
    );
  });
};

exports.removeAuthor = function(author_id, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "delete from author where author.author_id = ?",
      [author_id],
      function(err, res) {
        if (err) {
          db.rollback(function(err, res) {
            cb(err, res);
          });
        }
        db.commit(function(err, res) {
          cb(err, res);
        });
      }
    );
  });
};
