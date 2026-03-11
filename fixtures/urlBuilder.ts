import { test as base } from '@playwright/test';

const BASE_URL = 'https://the-internet.herokuapp.com';

interface PageConfig {
    path: string;
    trailingSlash?: boolean;
}

const PAGES: Record<string, PageConfig> = {
    addRemoveElements: { path: 'add_remove_elements', trailingSlash: true },
    login: { path: 'login', trailingSlash: false },
    home: { path: '', trailingSlash: false },
};

export function buildUrl(pageKey: keyof typeof PAGES): string {
    const { path, trailingSlash } = PAGES[pageKey];
    return `${BASE_URL}/${path}${trailingSlash ? '/' : ''}`;
}

export const test = base.extend({
    buildUrl: async ({}, use) => {
        use(buildUrl);
    },
});