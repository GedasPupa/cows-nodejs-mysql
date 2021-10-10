import express from "express";
import mysql from "mysql";
import cors from 'cors';

const port = 3000;
const app = express();

const corsOptions = {
    origin: "http://localhost:4200"
};

const dbConfig = {
    host: "localhost",
    user: "gedaspupa",
    password: "gedaspupa123",
    database: "cows_farm",
    multipleStatements: false,

};

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
});

connection.connect((error) => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

app.use(cors(corsOptions));
app.use(express.json());

app.get("/test-conn", (req, res) => {
    connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
        if (err) throw err;
        console.log("The solution is: ", rows[0].solution);
        res.status(200).send({ solution: rows[0].solution });
    });
});

app.get("/sum", (req, res) => {
    connection.query("SELECT count(*) as total_records FROM cows", (err, rows, fields) => {
        if (err) throw err;
        console.log("Cows total records: ", rows[0].total_records);
        res.status(200).send({ total_records: rows[0].total_records });
    });
});

app.get("/milk-sum", (req, res) => {
    connection.query("SELECT sum(total_milk) as total_milk_sum FROM cows", (err, rows, fields) => {
        if (err) throw err;
        console.log("Milk total sum: ", rows[0].total_milk_sum);
        res.status(200).send({ total_milk_sum: rows[0].total_milk_sum });
    });
});

app.get("/cows", (req, res) => {
    connection.query("SELECT * FROM cows", (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send(rows);
    });
});

app.get("/cows/:id", (req, res) => {
    connection.query(
        "SELECT * FROM Cows WHERE id = ?",
        req.params.id,
        (err, rows, fields) => {
            if (err) throw err;
            res.status(200).send(rows);
        }
    );
});

app.post("/cows", (req, res) => {
    connection.query(
        "INSERT INTO Cows (`name`, `weight`, `total_milk`, `last_milk_time`) VALUES (?, ?, ?, ?)",
        [
            req.body.name,
            req.body.weight,
            req.body.total_milk,
            req.body.last_milk_time,
        ],
        // TODO :: check if this can be simplify
        // "INSERT INTO Cows VALUES (?)",
        // req.body,
        (err, rows, field) => {
            if (err) throw err;
            console.log("created: ", { id: rows.insertId, ...req.body });
            res.status(201).send({ id: rows.insertId, ...req.body });
        }
    );
});

app.put("/cows/:id", (req, res) => {
    connection.query(
        "UPDATE cows SET name = ?, weight = ?, total_milk = ?, last_milk_time = ? WHERE id = ?",
        [
            req.body.name,
            req.body.weight,
            req.body.total_milk,
            req.body.last_milk_time,
            req.params.id,
        ],
        (err, rows, field) => {
            if (err) throw err;
            console.log("updated: ", { rows });
            res.status(201).send({id: parseInt(req.params.id), ...req.body});
        }
    ); 
});

app.delete("/cows/:id", (req, res) => {
    console.log(req.params.id);
    connection.query(
        "DELETE FROM Cows WHERE id=?",
        req.params.id,
        (err, rows, field) => {
            if (err) throw err;
            console.log("deleted: ", rows);
            // TODO :: should we return 204 when there affectedRows:0
            res.status(204).send();
        }
    );
});

app.listen(port, () =>
    console.log(`LABAS EMILI, AŠ SERVERIS IR KLAUSAUSI ŠIO PORTO: ${port}!`)
);


