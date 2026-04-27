const express = require('express')
const pool = require('./db')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')


app.use(cors());// this will help in cross origin request with api
app.use(express.json());
app.get('/', (req, res) => {
    res.send("menu api");
})

app.get('/menu', async (req, res) => {
    try {
        console.log("API HIT")
        const result = await pool.query(`select m.mid, m.mname, q.size, m.price, c.category from menu m
join food_cat as c on m.fid = c.fid 
join qty_mast as q on m.qid = q.qid`)
        res.json({ data: result.rows });
    } catch (err) {
        console.error("DB Error",err);
        res.status(500).send("server error");
    }

})
// this for deleting the api

app.delete('/menu/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM menu WHERE mid = $1 RETURNING *`,
            [id]
        );

        res.json({
            message: "deleted successfully",
            data: result.rows
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// this is for inserting the data

app.post('/addmenu', async (req, res) => {
    try {
        const { mname, price, fid, qid } = req.body;

        if (!mname || !price || !fid || !qid) {
            return res.status(400).json({ message: "All fields required" });
        }

        const result = await pool.query(
            `INSERT INTO menu (mname, price, fid, qid)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [mname, price, fid, qid]
        );

        res.status(201).json({
            message: "Save success",
            data: result.rows
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// getting menu by id

// app.get('/menubyId',async(req,res)=>{ // this is not correct beacuse req.params is right

app.get('/menubyId/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`select * from menu where mid=$1`,
            [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "menu not found" })
        }
        res.json({ menu: result.rows[0] });// returns the object instead the array

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }

})



// now creating the update api by id
app.put('/updatemenu/:id', async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("PARAMS:", req.params);

        const id = Number(req.params.id);   
        const { mname, price, fid, qid } = req.body;

        
        if (!mname || !price || !fid || !qid || isNaN(id)) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const result = await pool.query(
            `UPDATE menu 
             SET mname = $1, price = $2, fid = $3, qid = $4
             WHERE mid = $5
             RETURNING *`,
            [mname, price, fid, qid, id]
        );

        res.json(result.rows);

    } catch (err) {
        console.error("ERROR FULL:", err);  
        res.status(500).send("Server error");
    }
});

// register api
const bcrypt = require('bcrypt');

app.post('/register', async (req, res) => {
    try {
        const { uname, pwd } = req.body;

        // validation
        if (!uname || !pwd) {
            return res.status(400).json({ message: "All fields required" });
        }

        // check if user already exists
        const existingUser = await pool.query(
            `SELECT * FROM users WHERE uname = $1`,
            [uname]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        // hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(pwd, saltRounds);

        // insert user
        const result = await pool.query(
            `INSERT INTO users (uname, pwd)
             VALUES ($1, $2)
             RETURNING id, uname`,
            [uname, hashedPassword]
        );

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
// now the login api



app.post('/login', async (req, res) => {
    try {
        const { uname, pwd } = req.body;

        // validation
        if (!uname || !pwd) {
            return res.status(400).json({ message: "All fields required" });
        }

        // check user exists
        const result = await pool.query(
            `SELECT * FROM admin WHERE uname = $1`,
            [uname]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result.rows[0];

        // compare password
        const isMatch = await bcrypt.compare(pwd, user.pwd);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // success
        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                uname: user.uname
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});