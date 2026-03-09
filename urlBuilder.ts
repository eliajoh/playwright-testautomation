
const BASE_URL = 'https://the-internet.herokuapp.com';

export function buildUrl(...pathSegments: string[]): string {
    const path = pathSegments.join('/');
    return `${BASE_URL}/${path}`;
}