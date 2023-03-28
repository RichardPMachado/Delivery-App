import { listen } from './app';

const port = process.env.PORT || 3001;

listen(port);
console.log(`Api rodando na porta ${port}`);
