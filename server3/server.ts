import * as express from 'express';
import * as path from 'path';
import { createReadStream } from 'fs';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

const COOKIE_SECRET = 'not_so_random_string';

const USERS = {
  alice: 'pass',
  bob: 'achu'
};

const BALANCE = {
  alice: 500,
  bob: 100
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(COOKIE_SECRET));
app.listen(4000);

app.get('/', (req, res) => {
  const username = req.signedCookies.username;
  if (username) {
    const balance = BALANCE[username];
    res.send(`Hi ${username}. Your balance is ${balance}$`);
  } else {
    // res.sendFile(path.join(__dirname + '/../../server2/index.html'));
    createReadStream('./server2/index.html').pipe(res);
  }
});

app.post('/login', (req, res) => {
  const username: string = req.body.username;
  const password: string | undefined = USERS[username];

  if (req.body.password === password) {
    res.cookie('username', req.body.username, { signed: true });
    res.send('nice!')
  } else {
    res.send('fail!');
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/');
});

