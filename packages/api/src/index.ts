import express from 'express';
import PhraseController from './controllers/phrase-controller';
import PhraseService from './services/phrase-service';

const app = express();

const phraseService = new PhraseService();
const phraseController = new PhraseController(phraseService, app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
