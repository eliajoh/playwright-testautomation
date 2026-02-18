import {test, expect} from '@playwright/test';

const URL = 'https://the-internet.herokuapp.com/';


test.beforeEach(async( {page}) => {
    await page.goto(`${URL}/add_remove_elements/`);
});


test('@smoke Add element and verify 1 element has appeared', async ({page} ) => {
    await page.getByRole('button', { name: 'Add Element' }).click();
    await expect(page.locator('button.added-manually')).toHaveCount(1);
})


test('Add 3 elements and verify 3 elements have appeared', async ({ page }) => {

    for(let i = 0; i<3; i++) {
        await page.getByRole('button', { name: 'Add Element' }).click();
    }
    await expect(page.locator('button.added-manually')).toHaveCount(3);
});


test('@smoke Remove element', async ({page}) => {
    await page.getByRole('button', { name: 'Add Element' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page.locator('button.added-manually')).toHaveCount(0);
})


test('Remove all elements', async ({page}) => {

    for(let i = 0; i<3; i++) {
        await page.getByRole('button', { name: 'Add Element' }).click();
    }
    await expect(page.locator('button.added-manually')).toHaveCount(3);

    while ((await page.locator('button.added-manually').count()) > 0) {
        await page.locator('button.added-manually').first().click();
    }

    await expect(page.locator('button.added-manually')).toHaveCount(0);
})


test('Add 5 elements and remove last', async ({ page }) => {

    for (let i = 0; i < 5; i++) {
        await page.getByRole('button', { name: 'Add Element' }).click();
        await expect(page.locator('button.added-manually')).toHaveCount(i + 1);
    }

    const lastDeleteButton = page.locator('button.added-manually').nth(4);
    await lastDeleteButton.click();
    await expect(page.locator('button.added-manually')).toHaveCount(4);
});


test('Remove non-existent element', async ({ page }) => {
    await expect(page.locator('button.added-manually')).toHaveCount(0);
});


test('Add element, leave page, and return', async ({page} ) => {
    await page.getByRole('button', { name: 'Add Element' }).click();
    await expect(page.locator('button.added-manually')).toHaveCount(1);

    await page.goto(URL);
    await page.goto(`${URL}/add_remove_elements/`);
    await expect(page.locator('button.added-manually')).toHaveCount(0);
})
