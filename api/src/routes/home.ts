import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (request: Request, response: Response) => {
  return response.json({
    message: 'Welcome to Gimme a Gift API!'
  });
});

export { router as homeRouter };
