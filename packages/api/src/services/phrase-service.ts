import * as fs from 'fs';
import {type Phrase} from 'localize-translation-search-common';

class PhraseService {
  public async getPhraseById(id: Phrase['id']): Promise<Phrase | undefined> {
    try {
      const data = await fs.promises.readFile('data/phrases.json', 'utf-8');    
      const phrases = JSON.parse(data);
      const phrase = phrases.find((phrase: Phrase) => phrase.id === id);

      if (!phrase) {
        return undefined;
      }

      delete phrase.translations;

      return phrase;
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

  public async getPhrasesBySearch(query?: string | undefined, sortKey: keyof Phrase = 'phrase', sortOrder: 'asc' | 'desc' = 'asc'): Promise<Phrase[]> {
    try {
      const data = await fs.promises.readFile('data/phrases.json', 'utf-8');
      const phrases = JSON.parse(data) as Phrase[];
      const sortOrderInt = sortOrder === 'asc' ? 1 : -1;
      
      if (!query?.trim()) {
        return phrases;
      }

      return phrases
        .filter((phrase: Phrase) => phrase.phrase.toLowerCase().includes(query?.toLowerCase()))
        .sort((a: Phrase, b: Phrase) => {
          if (a[sortKey as keyof Phrase]! < b[sortKey as keyof Phrase]!) {
            return -1 * sortOrderInt;
          }

          if (a[sortKey as keyof Phrase]! > b[sortKey as keyof Phrase]!) {
            return 1 * sortOrderInt;
          }

          return 0;
        });
    } catch (error) {
      console.error('Error fetching phrases:', error);
      throw error;
    }
  }
}

export default PhraseService;