import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers'

export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    const acceptLanguage = headers().get('Accept-Language')
    let locale = 'en';

    if (acceptLanguage) {
        const preferredLanguage = acceptLanguage.split(',')[0];
        if (preferredLanguage.startsWith('fr')) {
            locale = 'fr';
        }
    }
    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});