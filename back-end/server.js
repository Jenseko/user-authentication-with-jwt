import express from 'express';
import 'dotenv/config';

// ---
import { User } from './model/User.js';

// --------------------------------------


const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());


// --- LOGIN ----------------------------------------------------------------------


app.post('/api/login', async (req, res) => {
    // Extrahieren der Email aus dem Anfragekörper (geschickt via Postman)
    const { email } = req.body;
    // Suchen eines Benutzereintrags anhand der Email
    const user = await User.findOne({ email });

    // Ween KEIN Benutzer gefunden wird --> Fehlermeldung
    if (!user) {
        return res
            .status(401)
            .send({ error: { message: "Email und Password Kombination nicht korrekt" } });
    }

    // wenn Benutzer gefunden wurde, dann wird mit 'verifyPassword' das hinterlegte Password mit dem 
    // im Frontend eingetragenen Password abgeglichen
    const isVerifed = user.verifyPassword(req.body.password);
    if (isVerifed) {
        return res.status(401).json({ error: { message: "Email und Password Kombination nicht korrekt" } });
    }


    return res.json({ message: 'Erfolgreich eingeloggt' });
});


// --- SIGN UP ----------------------------------------------------------------------

// Registrierung eines neuen Benutzers
app.post('/api/signup', async (req, res) => {
    // Extrahieren des Namens und der Email aus Anfregekörper (geschickt via Postman)
    const { name, email } = req.body;
    // neuer User wird extrahierten Werten wird erstellt
    const newUser = new User({ name, email });
    // Extrahieren des passwort Wertes aus Anfragekörper (via Postman) und setzten eines neuen Passwortes
    newUser.setPassword(reg.body.password);

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
        if (error.name === "MongoServerError" && error.code === 11_000) {
            return res.redirect('/login');
        }
        return res.status(500).send({ error: { message: "Unknown Server error" } })
    }
});


// --- LISTEN -----------------------------------------------------

app.listen(PORT, () => {
    console.log(`Port is running ${PORT} Miles per Day!`);
});

