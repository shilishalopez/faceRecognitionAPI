import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import knex from 'knex';


import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleApiCall,handleImage } from './controllers/image.js';
import { handleProfile } from './controllers/profile.js';

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'lisha',
        password: 'trust',
        database: 'smart_brain'
    }
});


const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {res.send(db.users)})
app.post('/signin', handleSignin(db, bcrypt)) 

app.post('/register', (req, res) => {handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {handleProfile(req,res,db)})

app.put('/image', (req,res) => {handleImage(req,res, db)})
app.post('/imageurl', (req, res) => {handleApiCall(req, res)})

app.listen(3001, ()=>{
    console.log('app is runnin on port 3001');
})

export default app;