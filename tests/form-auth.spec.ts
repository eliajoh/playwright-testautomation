import {test, expect} from "@playwright/test";
import FormAuthPage from "../pages/form-auth-page";
import {buildUrl} from "../fixtures/urlBuilder";
import dotenv from 'dotenv'

dotenv.config();

let formAuthPage: FormAuthPage;


test.beforeEach(async ( {page}) => {
    await page.goto(buildUrl('login'))
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
    formAuthPage = new FormAuthPage(page);
});

//These testcases only cover the basics as user is a hardcoded user not created by me. Further testcases would be testing such things as special characters and different length of username and password to ensure that all users can log in.

test.describe('Correct credentials', () => {
    test('Correct username and password', async () => {
        await formAuthPage.inputsAreVisible();
        await formAuthPage.loginWithCorrectCredentials();
        await formAuthPage.loginSuccess();
    })
})

test.describe('Incorrect credentials', () => {
    test('Correct username and incorrect password', async () => {
        await formAuthPage.inputsAreVisible();
        await formAuthPage.addWrongPassword();
        await formAuthPage.passwordIsInvalid();
    })

    test('Incorrect username and correct password', async () => {
        await formAuthPage.inputsAreVisible();
        await formAuthPage.addWrongUsername();
        await formAuthPage.userNameIsInvalid();
    })

    test('Incorrect username and password', async () => {
        await formAuthPage.inputsAreVisible();
        await formAuthPage.addFaultyCredentials();
        await formAuthPage.userNameIsInvalid();
    })

})