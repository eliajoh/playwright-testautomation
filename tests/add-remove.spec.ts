import {test, expect} from '@playwright/test';
import { AddRemovePage } from "../pages/add-remove-page";

const URL = 'https://the-internet.herokuapp.com/';
let addRemovePage: AddRemovePage;


test.beforeEach(async( {page}) => {
    await page.goto(`${URL}/add_remove_elements/`);
    addRemovePage = new AddRemovePage(page);
});


test('@smoke Add element and verify 1 element has appeared', async ({page} ) => {
    await addRemovePage.addElement();
    await addRemovePage.verifyNumberOfElements(1);
})


test('Add 3 elements and verify 3 elements have appeared', async ({ page }) => {

    for(let i = 0; i<3; i++) {
        await addRemovePage.addElement();
    }

    await addRemovePage.verifyNumberOfElements(3);
});


test('@smoke Remove element and verify it is no longer visible', async ({}) => {
    await addRemovePage.addElement();
    await addRemovePage.removeElement();
    await addRemovePage.assertElementIsRemoved();
})


test('Remove all elements', async ({page}) => {

    for(let i = 0; i<3; i++) {
        await addRemovePage.addElement();
    }

    await addRemovePage.verifyNumberOfElements(3);

    while ((await page.locator('button.added-manually').count()) > 0) {
        await page.locator('button.added-manually').first().click();
    }

    await addRemovePage.assertElementIsRemoved();
})


test('Add 5 elements and remove last', async ({ page }) => {

    for (let i = 0; i < 5; i++) {
        await addRemovePage.addElement();
        await addRemovePage.verifyNumberOfElements(i+1);
    }

    await addRemovePage.removeElementAtIndex(4);
    await addRemovePage.verifyNumberOfElements(4);
});


test('Remove non-existent element', async ({}) => {
    await addRemovePage.assertElementIsRemoved();
});


test('Add element, leave page, and return', async ({page} ) => {
    await addRemovePage.addElement();
    await addRemovePage.verifyNumberOfElements(1);

    await page.goto(URL);
    await page.goto(`${URL}/add_remove_elements/`);
    await addRemovePage.assertElementIsRemoved();
})
