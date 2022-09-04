import express, { Application, Request, Response } from 'express';

import users from '../db/users.json';
import { User, Error } from './interfaces';

const app: Application = express();
const port = 3000;

app.get('/users', (req: Request, res: Response<Array<User> | Error>) => {

  try {
    res.json(users).status(200);
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
      res.status(200).json(user);
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
