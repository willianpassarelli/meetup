import { Router } from 'express';

const routes = new Router();

routes.post('/test', (req, res) => {
  const { nome, email } = req.body;

  return res.json({ message: 'requisição efetuada' });
});

export default routes;
