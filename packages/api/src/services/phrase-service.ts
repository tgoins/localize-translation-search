import * as fs from 'fs';
import {type Phrase} from 'localize-translation-search-common';

class PhraseService {
  public async getPhraseById(id: Phrase['id']): Promise<Phrase> {
    try {
      const data = await fs.promises.readFile('data/phrases.json', 'utf-8');    
      const phrases = JSON.parse(data);
      return phrases.find((phrase: Phrase) => phrase.id === id);
    } catch (error) {
      console.error('Error fetching phrases:', error);
      throw error;
    }
  }

  public async getPhraseTranslationByLanguage(id: Phrase['id'], language: string): Promise<string | undefined> {
    try {
      const data = await fs.promises.readFile('data/phrases.json', 'utf-8');    
      const phrases = JSON.parse(data);
      const phrase = phrases.find((phrase: Phrase) => phrase.id === id);

      if (!phrase) {
        return undefined;
      }

      const translation = phrase.translations[language];

      if (!translation) {
        return undefined;
      }

      return translation;
    } catch (error) {
      console.error('Error fetching phrases:', error);
      throw error;
    }
  }

  public async getPhrasesBySearch(query?: string | undefined): Promise<Phrase[]> {
    try {
      const data = await fs.promises.readFile('data/phrases.json', 'utf-8');
      const phrases = JSON.parse(data);
      
      if (!query?.trim()) {
        return phrases;
      }

      return phrases.filter((phrase: Phrase) => phrase.phrase.toLowerCase().includes(query?.toLowerCase()));
    } catch (error) {
      console.error('Error fetching phrases:', error);
      throw error;
    }
  }
}

export default PhraseService;