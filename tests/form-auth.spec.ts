import {test, expect} from "@playwright/test";
import FormAuthPage from "../pages/form-auth-page";

let formAuthPage: FormAuthPage;

test.beforeEach(async ( {page}) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    formAuthPage = new FormAuthPage(page);
});

//These testcases only cover the basics as user is a hardcoded user not created by me, where further testcases would be testing such things as special characters and different length of username and password to ensure that all users can log in.

test.describe('Correct credentials', () => {
    test('Correct username and password', async ( {page}) => {
        await formAuthPage.addUsername();
        await formAuthPage.addPassword()
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('You logged into a secure area')).toBeVisible();
    })
})

test.describe('Incorrect credentials', async () => {
    test('Correct username and incorrect password', () => {

    })

    test('Incorrect username and correct password', async () => {

    })

    test('Incorrect username and password', async () => {

    })

})