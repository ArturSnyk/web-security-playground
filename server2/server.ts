import * as express from 'express';
import * as path from 'path';
import { createReadStream } from 'fs';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

const USERS = {
  alice: 'pass',
  bob: 'achu'
}

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.listen(4000);

app.get('/', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.send(`Hi ${username}!`);
  } else {
    // res.sendFile(path.join(__dirname + '/../../server2/index.html'));
    createReadStream('./server2/index.html').pipe(res);
  }
});

app.post('/login', (req, res) => {
  const username: string = req.body.username;
  const password: string | undefined = USERS[username];

  if (req.body.password === password) {
    res.cookie('username', req.body.username);
    res.send('nice!')
  } else {
    res.send('fail!');
  }
});

