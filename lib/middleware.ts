import Cors, { CorsRequest } from 'cors';
import type { NextApiResponse } from 'next';

export const cors = (
  req: CorsRequest,
  res: NextApiResponse,
  methods?: string | string[]
) => {
  const cors = Cors({
    methods: methods || ['GET', 'POST', 'PUT', 'DELETE'],
  });
  return new Promise((resolve, reject) => {
    cors(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
