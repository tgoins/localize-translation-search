import { PhraseStatus } from ".";

export interface Phrase {
  id: number;
  phrase: string;
  status: PhraseStatus;
  createdAt: Date;
  updatedAt: Date;
  translations?: {
    [key: string]: string;
  };
}