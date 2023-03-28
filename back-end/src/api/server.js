const port = process.env.PORT || 3001;

import { listen } from './app';

listen(port);
console.log(`Api rodando na porta ${port}`);
