import * as fs from 'fs';
import PhraseService from '../../services/phrase-service';

describe('PhraseService', () => {
  let phraseService: PhraseService;

  beforeEach(() => {
    phraseService = new PhraseService();
  });

  describe('getPhraseById', () => {
    it('should return the phrase when a valid id is provided', async () => {
      const id = 1;
      const expectedPhrase = { id: 1, phrase: 'Hello' };

      jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify([{ id: 1, phrase: 'Hello' }]));

      const result = await phraseService.getPhraseById(id);

      expect(result).toEqual(expectedPhrase);
    });

    it('should return undefined when the id is not found', async () => {
      const id = 2;

      jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify([{ id: 1, phrase: 'Hello' }]));

      const result = await phraseService.getPhraseById(id);

      expect(result).toBeUndefined();
    });

    it('should throw an error when an exception is thrown', async () => {
      const id = 1;

      jest.spyOn(fs.promises, 'readFile').mockRejectedValue(new Error('Test error'));

      await expect(phraseService.getPhraseById(id)).rejects.toThrow('Test error');
    });
  });

  describe('getPhraseTranslationByLanguage', () => {
    it('should return the translation when a valid id and language are provided', async () => {
      const id = 1;
      const language = 'es';
      const expectedTranslation = 'Hola';

      jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify([{ id: 1, phrase: 'Hello', translations: { es: 'Hola' } }]));

      const result = await phraseService.getPhraseTranslationByLanguage(id, language);

      expect(result).toEqual(expectedTranslation);
    });

    it('should return undefined when the id is not found', async () => {
      const id = 2;
      const language = 'es';

      jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify([{ id: 1, phrase: 'Hello', translations: { es: 'Hola' } }]));

      const result = await phraseService.getPhraseTranslationByLanguage(id, language);

      expect(result).toBeUndefined();
    });

    it('should return undefined when the translation is not found', async () => {
      const id = 1;
      const language = 'fr';

      jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify([{ id: 1, phrase: 'Hello', translations: { es: 'Hola' } }]));

      const result = await phraseService.getPhraseTranslationByLanguage(id, language);

      expect(result).toBeUndefined();
    });

    it('should throw an error when an exception is thrown', async () => {
      const id = 1;
      const language = 'es';

      jest.spyOn(fs.promises, 'readFile').mockRejectedValue(new Error('Test error'));

      await expect(phraseService.getPhraseTranslationByLanguage(id, language)).rejects.toThrow('Test error');
    });
  });

  describe('getPhrasesBySearch', () => {
    it('should return all phrases when no query is provided', async () => {
      const expectedPhrases = [{ id: 1, phrase: 'Hello' }, { id: 2, phrase: 'Goodbye' }];

      jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify(expectedPhrases));

      const result = await phraseService.getPhrasesBySearch();

      expect(result).toEqual(expectedPhrases);
    });

    it('should return phrases that match the query', async () => {
      const query = 'hello';
      const expectedPhrases = [{ id: 1, phrase: 'Hello' }];

      jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify([{ id: 1, phrase: 'Hello' }, { id: 2, phrase: 'Goodbye' }]));

      const result = await phraseService.getPhrasesBySearch(query);

      expect(result).toEqual(expectedPhrases);
    });

    it('should return an empty array when no phrases match the query', async () => {
      const query = 'test';

      jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify([{ id: 1, phrase: 'Hello' }, { id: 2, phrase: 'Goodbye' }]));

      const result = await phraseService.getPhrasesBySearch(query);

      expect(result).toEqual([]);
    });

    it('should throw an error when an exception is thrown', async () => {
      jest.spyOn(fs.promises, 'readFile').mockRejectedValue(new Error('Test error'));

      await expect(phraseService.getPhrasesBySearch()).rejects.toThrow('Test error');
    });
  });
});