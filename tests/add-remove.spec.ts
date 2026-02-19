import {test, expect} from '@playwright/test';
import { AddRemovePage } from "../pages/add-remove-page";

const URL = 'https://the-internet.herokuapp.com/';
let addRemovePage: AddRemovePage;


test.beforeEach(async( {page}) => {
    await page.goto(`${URL}/add_remove_elements/`);
    addRemovePage = new AddRemovePage(page);
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


test('@smoke Remove element and verify it is no longer visible', async ({page}) => {
    await addRemovePage.addElement();
    await addRemovePage.removeElement();
    await addRemovePage.assertElementIsRemoved();
})


test('Remove all elements', async ({page}) => {

    for(let i = 0; i<3; i++) {
        await page.getByRole('button', { name: 'Add Element' }).click();
    }
    await expect(page.locator('button.added-manually')).toHaveCount(3);

    while ((await page.locator('button.added-manually').count()) > 0) {
        await page.locator('button.added-manually').first().click();
    }

    await addRemovePage.assertElementIsRemoved();
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
    await addRemovePage.assertElementIsRemoved();
});


test('Add element, leave page, and return', async ({page} ) => {
    await page.getByRole('button', { name: 'Add Element' }).click();
    await expect(page.locator('button.added-manually')).toHaveCount(1);

    await page.goto(URL);
    await page.goto(`${URL}/add_remove_elements/`);
    await addRemovePage.assertElementIsRemoved();
})
