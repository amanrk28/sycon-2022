import Cors, { CorsRequest } from 'cors';

export const cors = (req: CorsRequest, res, methods: string | string[]) => {
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
