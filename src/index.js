import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import indexRoute from './routes/index.routes';
import './database.js';

//Inicialization
const app = express();

//setting
app.set('port', process.env.PORT || 3000);

//Middlewars
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));


//static files
app.use(express.static(path.join(__dirname, 'public')));
  

//routes
app.use(indexRoute);

//server
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
    
});