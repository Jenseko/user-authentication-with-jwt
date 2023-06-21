import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import 'dotenv/config';

// ---

import { User } from './model/User.js';
import cookieParser from 'cookie-parser';
import { authenticateToken, generateAccessToken } from './lib/jwt.js';

// --------------------------------------

// dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

// Verbinden mit der MongoDB Datenbank über den in der .env angegebenen Connection-String
mongoose.connect(process.env.DB);


const app = express();
const PORT = process.env.PORT || 3001;


// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const ReactAppDistPath = new URL("../front-end/dist/", import.meta.url);
const ReactAppIndex = new URL("../front-end/dist/index.html", import.meta.url);

app.use(express.static(ReactAppDistPath.pathname));

// ----------------


app.get("/api/", (req, res) => {
    res.send({ status: "Ok" });
});


// --- LOGIN ----------------------------------------------------------------------


app.post('/api/login', async (req, res) => {
    // Extrahieren der Email aus dem Anfragekörper (geschickt via Postman)
    const { email } = req.body;



    try {
        // Suchen eines Benutzereintrags anhand der Email
        const user = await User.findOne({ email });

        // Wenn KEIN Benutzer gefunden wird --> Fehlermeldung
        if (!user) {
            return res
                .status(401)
                .send({ error: { message: "Email und Password Kombination nicht korrekt" } });
        }

        // wenn Benutzer gefunden wurde, dann wird mit 'verifyPassword' das hinterlegte Password mit dem 
        // im Frontend eingetragenen Password abgeglichen
        const isVerifed = user.verifyPassword(req.body.password);
        if (!isVerifed) {
            return res.status(401).json({ error: { message: "Email und Password Kombination nicht korrekt" } });
        }

        const token = generateAccessToken({ email });
        console.log(token)
        res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 30 });
        res.status(200).json({ message: "Login erfolgreich" });
    } catch (error) {
        res.status(500).json({ message: "Login fehlgeschlagen" })
    }
});


// --- SIGN UP ----------------------------------------------------------------------

// Registrierung eines neuen Benutzers
app.post('/api/signup', async (req, res) => {
    // Extrahieren des Namens und der Email aus Anfregekörper (geschickt via Postman)
    const { name, email } = req.body;
    // neuer User wird extrahierten Werten wird erstellt
    const newUser = new User({ name, email });
    // Extrahieren des passwort Wertes aus Anfragekörper (via Postman) und setzten eines neuen Passwortes
    newUser.setPassword(req.body.password);
    console.log(newUser);

    // speichern der Daten des neuen Users, Name und Email, nicht das Passwort!
    try {
        await newUser.save();

        return res.send({
            data: {
                message: "New User created",
                user: { name, email },
            },
        });

        // wenn Fehler auftritt, dann werfe Fehlermeldung
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send({ error: error });
        }

        // wenn Fehler bei der Speicherung auftritt und Benutzer doch bereits existieren sollte
        // --> Weiterleitung zu Login
        if (error.name === "MongoServerError" && error.code == 11000) {
            return res.redirect('/login');
        }
        return res.status(500).send({ error: { message: "Unknown Server error" } });
    }
});

// --- VERIFIED ---------------------------------------------------


app.get('/api/verified', (req, res) => {
    res.send(req.user)
});


// --- LOGOUT -----------------------------------------------------

app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
});

// --- ALL OTHER ROUTES -------------------------------------------

app.get("/*", (req, res) => {
    res.sendFile(ReactAppIndex.pathname);
});

// --- LISTEN -----------------------------------------------------

app.listen(PORT, () => {
    console.log(`Port is running ${PORT} Miles per Day!`);
});

