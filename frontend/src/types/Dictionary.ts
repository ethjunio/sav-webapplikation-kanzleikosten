import dictEN from '@/dictionaries/de.json'
import dictDE from '@/dictionaries/en.json'
import dictFR from '@/dictionaries/fr.json'
import dictIT from '@/dictionaries/it.json'

type Dictionary = typeof dictDE & typeof dictEN & typeof dictFR & typeof dictIT

export default Dictionary
