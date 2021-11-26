const express = require("express");
const connectdatabase = require('./connection')
const app = express();
const mysql = require("mysql");
const cors = require("cors")

app.use(express.json())
app.use(cors());

app.post("/signup", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("INSERT INTO `customer`( `phone`, `user_name`, `password`) VALUES ('" + req.body.phone + "','" + req.body.username + "','" + req.body.password + "')",
                    [], function (err) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/checksignup", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `customer` WHERE user_name = " + "'" + req.body.username + "'",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });

                            if (result.length == 0) {
                                res.send(true)
                            } else {
                                res.send(false)
                            };
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
});

app.post("/checksignin", cors(), function (req, res) {
    const con = mysql.createConnection(connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `customer` WHERE user_name = " + "'" + req.body.username + "'" + "and password=" + "'" + req.body.password + "'",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("-------------------- Connect Closed --------------------");
                            });
                            if (result.length == 0) {
                                res.send(false)
                            } else {
                                console.log(result);
                                let newObj = { id: result[0].id, username: result[0].user_name }
                                res.send(newObj)
                            };
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
});

app.post("/addtocart", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("INSERT INTO `cart`( `customer_id`, `product_id`, `name`, `Image`,`type_pr_id`, `quantity`, `color`, `size`,`amount`,`create_date`) VALUES ('" + req.body.customer_id + "','" + req.body.product_id + "','" + req.body.nameProduct + "','" + req.body.imagePro + "','" + req.body.type_pr_id + "','" + req.body.quantity + "','" + req.body.color + "','" + req.body.size + "','" + req.body.amount + "','" + req.body.create_date + "') ",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });

                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/remoteproductcart", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query(" DELETE FROM `cart` WHERE id_cart = " + req.body.id_cart,
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) {
                                    console.log(err);
                                    res.send(false)
                                }
                            });
                            res.send(true)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/payment", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("INSERT INTO `payment`(`id_pay`,`customer_id` ,`cart_id`,`product_id`, `name`, `address`, `phone`,`date_payment`,`amount`,`type_pr_id`) VALUES ('" + req.body.id_pay + "','" + req.body.customer_id + "','" + req.body.cart_id + "','" + req.body.product_id + "','" + req.body.name + "','" + req.body.address + "','" + req.body.phone + "','" + req.body.date_payment + "','" + req.body.amount + "','" + req.body.type_pr_id + "')",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) {
                                    console.log(err);
                                    console.log("ERROR !!!");
                                }
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/checkpermissions", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `admin` WHERE username = " + "'" + req.body.username + "'" + "and password=" + "'" + req.body.password + "'",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) {
                                    console.log(err);
                                    console.log("ERROR !!!");
                                }
                            });

                            if (result.length == 0) {
                                res.send(false)
                            } else {
                                let newObj = {
                                    id: result[0].id,
                                    key_check: result[0].key_check,
                                    message: 'OK',
                                    responseCode: 200
                                }
                                res.send(newObj)
                            };
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/children", cors(), function (req, res) {
    console.log(req);
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `product` WHERE type_gender_id = 3",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result);
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
});

app.post("/homecollection", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `product` WHERE type_pr_id = 0",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result);
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
});

app.post("/jeancouture", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `product` WHERE type_pr_id = 7",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result);
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
});

app.get("/handbag", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `product` WHERE type_pr_id = 4", [], function (err, result) {
                    console.log("EXECUTE");
                    if (err) {
                        console.log("DONE");
                        res.send("ERR " + err.message);
                        return;
                    } else {
                        con.end(function (err) {
                            if (err) console.log(err);
                            console.log("Connect Closed");
                        });
                        res.send(result);
                    }
                });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })

});

app.get("/Mensellection", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `product` WHERE id >= 16 and id<=19", [], function (err, result) {
                    console.log("EXECUTE");
                    if (err) {
                        console.log("DONE");
                        res.send("ERR " + err.message);
                        return;
                    } else {
                        con.end(function (err) {
                            if (err) console.log(err);
                            console.log("Connect Closed");
                        });
                        res.send(result);
                    }
                });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })

});

app.get("/detail", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT a.id, a.name, a.price, a.description, a.color, b.image_url, c.size, a.type_pr_id FROM( SELECT X.id, X.name,X.price, X.description, X.type_pr_id, GROUP_CONCAT(X.color_pr SEPARATOR ',') color FROM ( SELECT p.*, c.color_pr FROM product p, color_id c WHERE p.id = c.id AND p.id = " + req.query.product + " ) X GROUP BY X.id,X.name,X.price,X.description, X.type_pr_id ) a LEFT JOIN( SELECT Y.id, GROUP_CONCAT(Y.image_url SEPARATOR ',') image_url FROM ( SELECT p.*, i.image_url FROM product p, image_id i WHERE p.id = i.id AND p.id = " + req.query.product + " ) Y GROUP BY Y.id ) b ON a.id = b.id LEFT JOIN( SELECT s.id, GROUP_CONCAT(s.size SEPARATOR ',') size FROM ( SELECT p.*, s.size FROM product p, size_id s WHERE p.id = s.id AND p.id = " + req.query.product + ") s GROUP BY s.id) c ON a.id=c.id",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            result.map(item => {
                                item.color = item.color.split(",")
                                item.image_url = item.image_url.split(",")
                                if (item.size != null) {
                                    item.size = item.size.split(",")
                                }
                            })
                            res.send(result);
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
});

app.post("/countcart", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("SELECT COUNT(*) count_pro FROM `cart` WHERE customer_id =" + req.body.customer_id,
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            let lastResult
                            result.map(item => lastResult = item)
                            res.send(lastResult)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.get("/relatedProductList", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `product` WHERE type_pr_id = " + req.query.relate,
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result);
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
});

app.get("/productMen", cors(), function (req, res) {
    console.log(req);
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `product` WHERE type_gender_id = 1",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result);
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
});

app.get("/productWomen", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `product` WHERE type_gender_id = 2",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result);
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
});

app.get("/searchproduct", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                console.log(req.query);
                con.query("SELECT id, name, price, Image FROM `product` WHERE name like '%" + req.query.namePro + "%'",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.get("/showcart", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `cart` WHERE customer_id =" + req.query.customer_id + "",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

// ---------------------------- Thống kê doanh số ----------------------------

app.post("/revenuebymonth", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("SELECT SUBSTRING(date_payment,6,2) date_payment1, SUM(amount) revenue FROM `payment`GROUP BY date_payment1",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) {
                                    console.log(err);
                                    console.log("ERROR !!!");
                                }
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/revenuebyproduct", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("SELECT SUM(amount) revenue, type_pr_id FROM `payment` GROUP BY type_pr_id",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) {
                                    console.log(err);
                                    console.log("ERROR !!!");
                                }
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

// ---------------------------- Quản lý tài khoản ----------------------------

app.post("/admin", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `admin`",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/addAccountAdmin", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("INSERT INTO `admin` (`name`, `username`, `password`, `key_check`) VALUES ('" + req.body.name + "','" + req.body.username + "','" + req.body.password + "','" + req.body.keycheck + "')",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/removeAccount", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("DELETE FROM `admin` WHERE id=" + req.body.id + "",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/removeAccountUser", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("DELETE FROM `customer` WHERE id=" + req.body.id + "",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/updateAccount", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("UPDATE `admin` SET `name`='" + req.body.name + "',`username`='" + req.body.username + "',`password`='" + req.body.password + "',`key_check`='" + req.body.keycheck + "' WHERE id=" + req.body.id + "",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/manage_users", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `customer`",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

// ---------------------------- Quản lý sản phẩm ----------------------------

app.post("/allproduct", cors(), function (req, res) {
    console.log(req);
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `product`",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });

                            result.map((item, index) => {
                                if (item.type_gender_id == 1) item.type_gender_id = 'Nam'
                                if (item.type_gender_id == 2) item.type_gender_id = 'Nữ'
                                if (item.type_pr_id == 0) item.type_pr_id = 'Áo choàng'
                                if (item.type_pr_id == 1) item.type_pr_id = 'Áo'
                                if (item.type_pr_id == 2) item.type_pr_id = 'Quần'
                                if (item.type_pr_id == 3) item.type_pr_id = 'Giày'
                                if (item.type_pr_id == 4) item.type_pr_id = 'Túi xách'
                                if (item.type_pr_id == 5) item.type_pr_id = 'Thắt lưng'
                                if (item.type_pr_id == 6) item.type_pr_id = 'Balo'
                                if (item.type_pr_id == 7) item.type_pr_id = 'Jean'
                            })
                            res.send(result);
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
});

app.post("/showPr", cors(), function (req, res) {
    console.log(req);
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------Connect Success!!!!!!!!------------------------------"
            );
            try {
                con.query("SELECT * FROM `product`",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });

                            result.map((item, index) => {
                                if (item.type_gender_id == 1) item.type_gender_id = 'Nam'
                                if (item.type_gender_id == 2) item.type_gender_id = 'Nữ'
                                if (item.type_pr_id == 0) item.type_pr_id = 'Áo choàng'
                                if (item.type_pr_id == 1) item.type_pr_id = 'Áo'
                                if (item.type_pr_id == 2) item.type_pr_id = 'Quần'
                                if (item.type_pr_id == 3) item.type_pr_id = 'Giày'
                                if (item.type_pr_id == 4) item.type_pr_id = 'Túi xách'
                                if (item.type_pr_id == 5) item.type_pr_id = 'Thắt lưng'
                                if (item.type_pr_id == 6) item.type_pr_id = 'Balo'
                                if (item.type_pr_id == 7) item.type_pr_id = 'Jean'
                            })
                            res.send(result);
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
});

app.post("/create_product", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("INSERT INTO `product`( `name`, `price`, `Image`, `description`, `type_gender_id`, `type_pr_id`) VALUES" +
                    `('${req.body.name}','${req.body.price}','${req.body.image}','${req.body.desc}','${req.body.gender}','${req.body.typeProduct}')`,
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/delete_product", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("DELETE FROM `product` WHERE id=" + req.body.id + "",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });
                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

app.post("/update_product", cors(), function (req, res) {
    const con = mysql.createConnection(
        connectdatabase.root);
    con.connect(function (err) {
        if (err) {
            error = err;
            console.log(err);
            res.send("ERR " + err.message);
        } else {
            console.log(
                "------------------------------ !!! Connect Success !!!------------------------------"
            );
            try {
                con.query("UPDATE `product` SET `name`='" + req.body.name + "',`price`='" + req.body.price + "'," +
                    "`Image`='" + req.body.image + "',`description`='" + req.body.desc + "',`type_gender_id`='" + req.body.gender + "',`type_pr_id`='" + req.body.typeProduct + "' WHERE id = " + req.body.id + " ",
                    [], function (err, result) {
                        console.log("EXECUTE");
                        if (err) {
                            console.log("DONE");
                            res.send("ERR " + err.message);
                            return;
                        } else {
                            con.end(function (err) {
                                if (err) console.log(err);
                                console.log("Connect Closed");
                            });

                            res.send(result)
                        }
                    });
            } catch (err) {
                console.log("ERR: " + err);
            }
        }
    })
})

// ---------------------------- ||| ----------------------------\\
app.listen(8080);