import express, { Request, Response } from 'express';
import PhraseService from '../services/phrase-service';

class PhraseController {
  constructor(private phraseService: PhraseService, router: express.Router) {
    const baseRoute = '/phrase';
    router.get(`${baseRoute}/search`, this.getPhrasesBySearch)
    router.get(`${baseRoute}/:id`, this.getPhraseById);
    router.get(`${baseRoute}/:id/:language`, this.getPhraseTranslationByLanguage);
  }

  // GET /phrase/:id
  getPhraseById = async (req: Request, res: Response) => {
    try {
      const phraseId = parseInt(req.params.id, 10);
      
      if (!phraseId) {
        return res.status(400).json({ error: 'Missing phrase Id' });
      }
      
      const phrase = await this.phraseService.getPhraseById(phraseId);
      
      if (!phrase) {
        return res.status(404).json({ error: 'Phrase not found' });
      }
      
      return res.json(phrase);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  // GET /phrase/:id/:language
  getPhraseTranslationByLanguage = async (req: Request, res: Response) => {
    try {
      const phraseId = parseInt(req.params.id, 10);
      const language = req.params.language;
      
      if (!phraseId) {
        return res.status(400).json({ error: 'Missing phrase Id' });
      }
      
      if (!language) {
        return res.status(400).json({ error: 'Missing language' });
      }
      
      const translation = await this.phraseService.getPhraseTranslationByLanguage(phraseId, language);

      if (!translation) {
        return res.status(404).json({ error: 'Phrase or translation not found' });
      }

      return res.json(translation);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /phrase/search?query={phrase_text}&sort={key:asc|desc}
  getPhrasesBySearch = async (req: Request, res: Response) => {
    try {
      const query = req.query.query as string | undefined;
      const sort = req.query.sort as string | undefined;
      let sortOrder: 'asc' | 'desc' | undefined;
      let sortKey: 'phrase' | 'status' | 'createdAt' | 'updatedAt' | undefined;

      if (sort) {
        if (!sort.includes(':')) {
          return res.status(400).json({ error: 'Invalid sort format' });
        }

        sortKey = sort.split(':')[0] as 'phrase' | 'status' | 'createdAt' | 'updatedAt';
        sortOrder = sort.split(':')[1] as 'asc' | 'desc';

        if ([ 'phrase', 'status', 'createdAt', 'updatedAt' ].indexOf(sortKey) === -1) {
          return res.status(400).json({ error: 'Invalid sort key' });
        }

        if (sortOrder !== 'asc' && sortOrder !== 'desc') {
          return res.status(400).json({ error: 'Invalid sort order' });
        }
      }

      const phrases = await this.phraseService.getPhrasesBySearch(query, sortKey, sortOrder);

      return res.json(phrases);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default PhraseController;
