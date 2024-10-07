declare const Liferay: {
	Language: {
		get: (key: string) => string
	}
}

/**
 * This file has been generated with the @clavisit/translation-transformer.
 *
 * Liferay will automatically replace all 'Liferay.Language.get('key')' appearances with the corresponding
 * translations through the language filter.
 **/
export default new Map(Object.entries({
	'category.sav-react-portlet': Liferay.Language.get('category.sav-react-portlet'),
	'sav-legal-fees-calculator': Liferay.Language.get('sav-legal-fees-calculator')
}))
