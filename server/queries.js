var pool = require("./database");

module.exports.products = {
    "getAll": function (ids, callback) {
        var query;
        if (!callback) {
            callback = ids;
            query = "SELECT * FROM CrapStore.Product as p WHERE hidden=0;";
        } else {
            // To prevent a mysql syntax error we push a empty string into the array (this will not match anything).
            if (ids.length == 0) {
                ids.push("''")
            }
            var set = "(" + ids.join(",") + ")";
            query = "SELECT * FROM CrapStore.Product as p " +
                "WHERE p.idProduct IN " + set
        }

        pool.getConnection(function (err, connection) {
            if (err) return callback(err);

            connection.query(query, function (err, rows, fields) {
                callback(err, rows);
                connection.release();
            })
        });
    },
    "search": function (term, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);
            var searchQuery = "SELECT * FROM CrapStore.Product WHERE name = '" + term + "'";
            connection.query(searchQuery, function (err, rows, fields) {
                callback(err, rows, searchQuery);
                connection.release();
            })
        });
    },
    "getBySupplier": function (idSupplier, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);
            var supplierQuery = "SELECT * FROM CrapStore.Product WHERE idSupplier = " + idSupplier;
            connection.query(supplierQuery, function (err, rows, fields) {
                callback(err, rows, supplierQuery);
                connection.release();
            })
        });
    },
    "save_info": function (product, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);
            connection.query("UPDATE CrapStore.Product SET " +
                "name = ?, qty = ?, description = ?, price = ?, hidden = ? WHERE idProduct = ?",
                [product.name, product.qty, product.description, product.price, product.hidden != undefined ? 1 : 0,
                    product.idProduct],
                function (err, results) {
                    if (err) return callback(err);
                    callback(null, results);
                    connection.release();
                })
        });
    },
    "add": function (product, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);
            connection.query("INSERT INTO CrapStore.Product (name, qty, description, price, hidden, idSupplier) VALUES " +
                "(?, ?, ?, ?, ?, ?)",
                [product.name, product.qty, product.description, product.price, product.hidden != undefined ? 1 : 0,
                    product.idSupplier],
                function (err, results) {
                    if (err) return callback(err);
                    callback(null, results);
                    connection.release();
                })
        });
    },
    "remove": function (id, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);
            connection.query("DELETE FROM CrapStore.Product WHERE idProduct = ?",
                [id],
                function (err, results) {
                    if (err) return callback(err);
                    callback(null, results);
                    connection.release();
                })
        });
    }
};

module.exports.guestBookEntries = {
    "getAll": function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);

            connection.query("SELECT * FROM CrapStore.GuestBookEntry", function (err, rows, fields) {
                callback(err, rows);
                connection.release();
            })
        });
    },
    "add": function (entry, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);

            connection.query("INSERT INTO CrapStore.GuestBookEntry (`name`, `email`, `message`) " +
                "VALUES (?, ?, ?);", [entry.name, entry.email, entry.message],
                function (err, rows, fields) {
                    callback(err, rows);
                    connection.release();
                })
        });
    }
};

module.exports.account = {
    "info": function (userId, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);

            connection.query("SELECT * FROM CrapStore.User as u WHERE idUser=?;" +
                "SELECT o.idOrder, DATE_FORMAT(created, '%k:%i    %d-%b-%y') as created, COUNT(*) as count, ROUND(SUM(price),2) as total FROM `CrapStore`.`Order` as o\
                    JOIN CrapStore.OrderItem as item ON item.idOrder=o.idOrder\
                    JOIN CrapStore.Product as p ON item.idProduct=p.idProduct\
                    WHERE User_id=?\
                    GROUP BY o.idOrder;"
                , [userId, userId], function (err, results) {
                    if (err) return callback(err);
                    callback(null, results[0][0], results[1]);
                    connection.release();
                })
        });
    },
    "getAll": function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);

            connection.query("SELECT * FROM CrapStore.User",
                function (err, results) {
                    if (err) return callback(err);
                    callback(null, results);
                    connection.release();
                });
        });
    },
    "login": function (email, password, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);

            connection.query("SELECT * FROM CrapStore.User WHERE email = '" + email + "' AND password = '" + password + "'",
                function (err, results) {
                    if (err) return callback(err);
                    callback(null, results);
                    connection.release();
                });
        });
    },
    "register": function (user, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);

            connection.query("INSERT INTO CrapStore.User (name, password, email, isAdmin, isSupplier, hint) VALUES " +
                "('" + user.name + "', '" + user.password + "', '" + user.email + "', 0, 0, '" + user.hint + "');",
                function (err, results) {
                    if (err) return callback(err);
                    callback(null, results);
                    connection.release();
                })
        });
    },
    "change_password": function (email, password, hint, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);

            connection.query("SELECT * FROM CrapStore.User WHERE email = '" + email + "' AND hint = '" + hint + "'",
                function (err, results) {
                    if (err) return callback(err);
                    connection.release();
                    if (results.length == 0) {
                        callback(null, false);
                        return;
                    }
                    pool.getConnection(function (err, updateConnection) {
                        updateConnection.query("UPDATE CrapStore.User SET password = '" + password + "' " +
                            "WHERE email = '" + email + "'", function (err, results) {
                            if (err) return callback(err);
                            callback(null, true);
                        });
                        updateConnection.release();
                    });

                })
        });
    },
    "save_info": function (user, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);

            connection.query("UPDATE CrapStore.User SET " +
                "name = '" + user.name + "', password = '" + user.password + "', email = '" + user.email + "', " +
                "isAdmin = '" + (user.isAdmin != undefined ? 1 : 0) + "', " +
                "isSupplier = '" + (user.isSupplier != undefined ? 1 : 0) + "', hint = '" + user.hint + "' " +
                "WHERE idUser = " + user.idUser,
                function (err, results) {
                    if (err) return callback(err);
                    callback(null, results);
                    connection.release();
                })
        });
    },
    "become_supplier": function (idUser, callback) {
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);

            connection.query("UPDATE CrapStore.User SET isSupplier = 1 WHERE idUser = ?", [idUser],
                function (err, results) {
                    if (err) return callback(err);
                    callback(null, results);
                    connection.release();
                })
        });
    }
};

module.exports.orders = {
    "order": function (order, callback) {
        console.log(order,order.products.join(','))
        pool.getConnection(function (err, connection) {
            if (err) return callback(err);

            connection.beginTransaction(function () {
                connection.query("UPDATE `CrapStore`.`Product` " +
                    "SET qty = qty-1 " +
                    "WHERE idProduct IN (?) AND qty >= 1", [order.products], function (err, result) {

                    if (err) {
                        return connection.rollback(function () {
                            callback(err);
                        })
                    } else if (result.changedRows != order.products.length) {
                        return connection.rollback(function () {
                            callback(err);
                        })
                    }

                    connection.query("INSERT INTO `CrapStore`.`Order` (`User_id`) VALUE (?)", [order.userId], function (err, result) {
                        if (err) {
                            return connection.rollback(function () {
                                callback(err);
                            })
                        }

                        var orderItems = [];
                        for (var i = 0; i < order.products.length; i++) {
                            orderItems.push([result.insertId, order.products[i]])
                        }

                        connection.query("INSERT INTO `CrapStore`.`OrderItem` (`idOrder`, `idProduct`) VALUES ?", [orderItems], function (err, result) {
                            if (err) {
                                return connection.rollback(function () {
                                    callback(err);
                                })
                            }

                            connection.commit(function (err) {
                                if (err) {
                                    return connection.rollback(function () {
                                        callback(err);
                                    })
                                }
                                return callback(null)
                            })
                        })
                    });
                });

            })
        })
    }
};
