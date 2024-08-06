
export const APP_NAME = 'Bookshelf.app'

export const API_URL = import.meta.env.DEV
    ? 'http://192.168.1.70:8000/api'
    : 'https://ehmy43uvlft4rdrwhajkzpchte0tbjia.lambda-url.us-west-2.on.aws/api'

export const HTML_TITLE = 'Bookshelf.app - Track your book collection'