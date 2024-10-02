export interface languageContentType {
  [language: string]: {
    [page: string]: {
      [section: string]: string;
    };
  };
}
