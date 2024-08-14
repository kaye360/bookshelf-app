import { UserSettings } from './types/types';

/**
 * GLOBAL CONFIG
 */
export const APP_NAME = 'Bookshelf.app'

export const API_URL = import.meta.env.DEV
    ? 'http://192.168.1.70:8000/api'
    : 'https://ptbjwwdu53mftqio4jk56uno7m0uxrda.lambda-url.us-west-2.on.aws/api'

export const HTML_TITLE = 'Bookshelf.app - Track your book collection'

export const DEFAULT_THEME : UserSettings['theme'] = 'light'

export const VALID_THEMES: UserSettings['theme'][] = ['light', 'dark']

/**
 * BOOKSHELF CONFIG
 */

export const VALID_VIEWS: UserSettings['view'][] = ['grid', 'list', 'card']

export const VALID_SORTS: UserSettings['sort'][] = ['authors', 'title', 'newest', 'oldest']

export const VALID_FILTERS: UserSettings['filter'][] = ['all', 'favourites', 'owned', 'read', 'unread', 'wishlist']