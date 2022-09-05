import express, { Application, Request, Response } from 'express';

import cors from 'cors';

import users from '../db/users.json';
import { User, Error } from './interfaces';

const app: Application = express();
const port = 8000;

app.use(cors());

app.get('/users', (req: Request, res: Response<Array<User> | Error>) => {

  try {

    setTimeout(() => {
      res.json(users).status(200);
    }, 500);
  } catch(error) {
    res.status(500).send({ message: 'Something went wrong' });
    console.error(`[server]: server error ${error}`);
  }
});

app.get('/users/:id', async (req: Request<{id: string}>, res: Response<User | Error>) => {
  try {
    const user = await users.find(({ id }) => {
      return Number(req.params.id) === id;
    });


    if (user) {
      setTimeout(() => {
        res.status(200).json(user);
      }, 500);
      return;
    }

    res.status(404).send({ message: 'user not found' });

  } catch(error) {
    res.status(500).send({ message: 'something went wrong' });
    console.error(`[server]: server error ${error}`);
  }
});

app.listen(port, () => {
  console.log(`[server]: server is listening on port ${port}`);
});
