const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")

// ---------------------------------------------------------------------
app.use(express.json())
app.use(cors());

app.post("/login", cors(), function (req, res) {
    console.log(req.body)
})

// ---------------------------------------------------------------------

app.get("/handbag", cors(), function (req, res) {
    const con = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "123",
            database: "web_sell_db"
        });
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
        {
            host: "localhost",
            user: "root",
            password: "123",
            database: "web_sell_db"
        });
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
    console.log(req.query);
    const con = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "123",
            database: "web_sell_db"
        });
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
                con.query("SELECT product.*,color_id.color_pr,image_id.image_url FROM product,color_id,image_id WHERE product.id = color_id.id AND product.id = image_id.id AND product.id = " + req.query.product, [], function (err, result) {
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
app.listen(8080);