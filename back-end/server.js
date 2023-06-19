import express from 'express';
import mongoose from 'mongooose';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;












// --------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Port is running ${PORT} Miles per Day!`);
});

