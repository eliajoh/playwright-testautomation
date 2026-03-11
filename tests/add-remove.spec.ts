import {test, expect} from '@playwright/test';
import { AddRemovePage } from "../pages/add-remove-page";
import {buildUrl} from "../fixtures/urlBuilder";

let addRemovePage: AddRemovePage;


test.beforeEach(async( {page}) => {
    await page.goto(buildUrl('addRemoveElements'));
    addRemovePage = new AddRemovePage(page);
});


test('@smoke Add element and verify 1 element has appeared', async ({} ) => {
    await addRemovePage.addElement();
    await expect(addRemovePage.getNumberOfElements()).resolves.toBe(1);
})


test('Add 3 elements and verify 3 elements have appeared', async ({}) => {
    for(let i = 0; i<3; i++) {
        await addRemovePage.addElement();
    }
    await expect(addRemovePage.getNumberOfElements()).resolves.toBe(3);
});


test('@smoke Remove element and verify it is no longer visible', async ({}) => {
    await addRemovePage.addElement();
    await addRemovePage.removeElement();
    await expect(addRemovePage.getNumberOfElements()).resolves.toBe(0);
})


test('Remove all elements', async ({}) => {
    for(let i = 0; i<3; i++) {
        await addRemovePage.addElement();
    }

    await addRemovePage.removeAllElements();
    await expect(addRemovePage.getNumberOfElements()).resolves.toBe(0);
})


test('Add 5 elements and remove last', async ({}) => {
    for (let i = 0; i < 5; i++) {
        await addRemovePage.addElement();
        await expect(addRemovePage.getNumberOfElements()).resolves.toBe(i+1);
    }

    const currentCount = await addRemovePage.getNumberOfElements();
    await addRemovePage.removeElementAtIndex(currentCount - 1);
    await expect(addRemovePage.getNumberOfElements()).resolves.toBe(currentCount -1);
});


test('Remove non-existent element', async ({}) => {
    await expect(addRemovePage.getNumberOfElements()).resolves.toBe(0);
});


test('Add element, leave page, and return', async ({page} ) => {
    await addRemovePage.addElement();
    await expect(addRemovePage.getNumberOfElements()).resolves.toBe(1);

    await page.goto(buildUrl('home'));
    await page.goto(buildUrl('addRemoveElements'));
    await expect(addRemovePage.getNumberOfElements()).resolves.toBe(0);
})
