import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      try {
        const response = await axios.post(
          'http://localhost:3000/api/users/${userId}/usersStore',
          body
        );

        const cookie = serialize('sessionToken', response.data.sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        res.setHeader('Set-Cookie', cookie);
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
      }
      break;

    case 'GET':
      try {
        const response = await axios.get(
          'http://localhost:3000/api/users/${userId}/usersStore'
        );

        res.status(200).json(response.data);
      } catch (error) {
        res.status(404).json({ message: 'User not found' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}

