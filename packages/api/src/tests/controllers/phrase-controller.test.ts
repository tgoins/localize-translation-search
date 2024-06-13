import express, { Request, Response } from 'express';
import PhraseService from '../../services/phrase-service';
import PhraseController from '../../controllers/phrase-controller';

describe('PhraseController', () => {
  let phraseService: PhraseService;
  let router: express.Router;
  let phraseController: PhraseController;

  beforeEach(() => {
    phraseService = new PhraseService();
    router = express.Router();
    phraseController = new PhraseController(phraseService, router);
  });

  describe('getPhraseById', () => {
    it('should return the phrase when a valid id is provided', async () => {
      const req = { params: { id: '1' } } as unknown as Request;
      const res = { json: jest.fn() } as unknown as Response;

      phraseService.getPhraseById = jest.fn().mockResolvedValue({ id: 1, phrase: 'Hello' });

      await phraseController.getPhraseById(req, res);

      expect(phraseService.getPhraseById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith({ id: 1, phrase: 'Hello' });
    });

    it('should return an error when the id is missing', async () => {
      const req = { params: {} } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await phraseController.getPhraseById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing phrase Id' });
    });

    it('should return an error when the phrase is not found', async () => {
      const req = { params: { id: '2' } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      phraseService.getPhraseById = jest.fn().mockResolvedValue(undefined);

      await phraseController.getPhraseById(req, res);

      expect(phraseService.getPhraseById).toHaveBeenCalledWith(2);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Phrase not found' });
    });

    it('should return an error when an exception is thrown', async () => {
      const req = { params: { id: '1' } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      phraseService.getPhraseById = jest.fn().mockRejectedValue(new Error('Test error'));

      await phraseController.getPhraseById(req, res);

      expect(phraseService.getPhraseById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('getPhraseTranslationByLanguage', () => {
    it('should return the translation when a valid id and language are provided', async () => {
      const req = { params: { id: '1', language: 'es' } } as unknown as Request;
      const res = { json: jest.fn() } as unknown as Response;

      phraseService.getPhraseTranslationByLanguage = jest.fn().mockResolvedValue('Hola');

      await phraseController.getPhraseTranslationByLanguage(req, res);

      expect(phraseService.getPhraseTranslationByLanguage).toHaveBeenCalledWith(1, 'es');
      expect(res.json).toHaveBeenCalledWith('Hola');
    });

    it('should return an error when the id is missing', async () => {
      const req = { params: { language: 'es' } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await phraseController.getPhraseTranslationByLanguage(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing phrase Id' });
    });

    it('should return an error when the language is missing', async () => {
      const req = { params: { id: '1' } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await phraseController.getPhraseTranslationByLanguage(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing language' });
    });

    it('should return an error when the translation is not found', async () => {
      const req = { params: { id: '1', language: 'es' } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      phraseService.getPhraseTranslationByLanguage = jest.fn().mockResolvedValue(undefined);

      await phraseController.getPhraseTranslationByLanguage(req, res);

      expect(phraseService.getPhraseTranslationByLanguage).toHaveBeenCalledWith(1, 'es');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Phrase or translation not found' });
    });

    it('should return an error when an exception is thrown', async () => {
      const req = { params: { id: '1', language: 'es' } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      phraseService.getPhraseTranslationByLanguage = jest.fn().mockRejectedValue(new Error('Test error'));

      await phraseController.getPhraseTranslationByLanguage(req, res);

      expect(phraseService.getPhraseTranslationByLanguage).toHaveBeenCalledWith(1, 'es');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('getPhrasesBySearch', () => {
    it('should return the phrases when a valid query is provided', async () => {
      const req = { query: { query: 'hello' } } as unknown as Request;
      const res = { json: jest.fn() } as unknown as Response;

      phraseService.getPhrasesBySearch = jest.fn().mockResolvedValue([{ id: 1, phrase: 'Hello' }]);

      await phraseController.getPhrasesBySearch(req, res);

      expect(phraseService.getPhrasesBySearch).toHaveBeenCalledWith('hello');
      expect(res.json).toHaveBeenCalledWith([{ id: 1, phrase: 'Hello' }]);
    });

    it('should return all phrases when the query is missing', async () => {
      const req = { query: {} } as unknown as Request;
      const res = { json: jest.fn() } as unknown as Response;

      phraseService.getPhrasesBySearch = jest.fn().mockResolvedValue([{ id: 1, phrase: 'Hello' }]);

      await phraseController.getPhrasesBySearch(req, res);

      expect(phraseService.getPhrasesBySearch).toHaveBeenCalledWith(undefined);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, phrase: 'Hello' }]);
    });

    it('should return an error when an exception is thrown', async () => {
      const req = { query: { query: 'hello' } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      phraseService.getPhrasesBySearch = jest.fn().mockRejectedValue(new Error('Test error'));

      await phraseController.getPhrasesBySearch(req, res);

      expect(phraseService.getPhrasesBySearch).toHaveBeenCalledWith('hello');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});