import mongoose from 'mongoose';
import { User } from '../model/User.js';
// import data from './data.json' assert {type:'json'};

// --------------------------------------

mongoose.connect('mongodb://localhost:27017/authentication-with-jwt');

await mongoose.connection.dropDatabase();

