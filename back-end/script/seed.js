import mongoose from 'mongoose';
import { User } from '../model/User.js';
// import data from './data.json' assert {type:'json'};

// --------------------------------------


await mongoose.connection.dropDatabase();


mongoose.connect('mongodb://localhost:27017/authentication-with-jwt');



