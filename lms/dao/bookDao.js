var db = require("./db");

exports.getAllBooks = function(cb) {
  db.query("select * from book", function(err, result) {
    cb(err, result);
  });
};

exports.addBook = function(book, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "insert into book(title, author_name) values(?,?)",
      [book.title, book.author_name],
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

exports.updateBook = function(book_id, book, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "update book set book.title = ?, book.author_name = ? where book.book_id = ?",
      [book.title, book.author_name, book_id],
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

exports.removeBook = function(book_id, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query("delete from book where book.book_id = ?", [book_id], function(
      err,
      res
    ) {
      if (err) {
        db.rollback(function(err, res) {
          cb(err, res);
        });
      }
      db.commit(function(err, res) {
        cb(err, res);
      });
    });
  });
};
