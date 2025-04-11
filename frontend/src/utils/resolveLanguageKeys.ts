import Dictionary from '@/types/Dictionary'
import de from '@/dictionaries/de.json'
import fr from '@/dictionaries/fr.json'
import it from '@/dictionaries/it.json'
import en from '@/dictionaries/en.json'

const availableLanguages = ['de', 'fr', 'it', 'en'] as const

type Language = typeof availableLanguages[number]

const dictionaries: Record<Language, Dictionary> = { de, fr, it, en }

export default function resolveLanguageKeys() {
  const dictionary = dictionaries[getLanguage()]

  if (dictionary === undefined) {
    return en as Dictionary
  }

  return dictionary
}

function getLanguage(): Language {
  // @ts-expect-error
  if (window.Liferay) {
    const liferayLocale = Liferay.ThemeDisplay.getLanguageId().split('_')[0] as Language

    if (availableLanguages.includes(liferayLocale)) {
      console.info('Determined language through Liferay.')
      return liferayLocale
    }
  }

  const browserLocale = navigator.language.split('-')[0] as Language
  if (availableLanguages.includes(browserLocale)) {
    console.info('Determined language through Browser settings.')
    return browserLocale
  }

  console.info('Using fallback language.')
  return 'en'
}
