import TranslationService from '@clavisit/translation-transformer';
import translations from './translations';

export const translationService = new TranslationService(translations);

export default function useI18n() {
  return translationService.translate;
}
