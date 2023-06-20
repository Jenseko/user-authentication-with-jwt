import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { User } from './model/User.js';

// -------------------

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

// -------------------

// LOGIN ---------------


app.post('/api/login', async (req, res) => {
    const { email } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'User nicht gefunden' });
    }

    if (user.password !== password) {
        return res.status(401).json({ error: "Falsches Passwort" });
    }

    return res.json({ message: 'Erfolgreich eingeloggt' });
});




















// SIGN UP -----------

app.post('/api/signup', async (req, res) => {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    newUser.setPassword(reg.body.password);

    try {
        await newUser.save();
        return res.send({
            data: {
                message: "New User created",
                user: { name, email },
            }
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send({ error: error });
        }

        if (error.name === "MongoServerError" && error.code === 11_000) {
            return res.redirect('/login');
        }
        return res.status(500).send({ error: { message: "Unknown Server error" } })
    }
});








// -------------------------------


// app.get('/api/login', async (req, res) => {
//     res.send(users);
// });


// --------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Port is running ${PORT} Miles per Day!`);
});

