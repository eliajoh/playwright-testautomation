import {test, expect} from "@playwright/test";
import FormAuthPage from "../pages/form-auth-page";

let formAuthPage: FormAuthPage;

test.beforeEach(async ( {page}) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
    formAuthPage = new FormAuthPage(page);
});

//These testcases only cover the basics as user is a hardcoded user not created by me. Further testcases would be testing such things as special characters and different length of username and password to ensure that all users can log in.

test.describe('Correct credentials', () => {
    test('Correct username and password', async () => {
        await formAuthPage.inputsAreVisible();
        await formAuthPage.addCredentials();
        await formAuthPage.clickLogin();
        await formAuthPage.loginSuccess();
    })
})

test.describe('Incorrect credentials', () => {
    test('Correct username and incorrect password', async () => {
        await formAuthPage.inputsAreVisible();
        await formAuthPage.addUsername();
        await formAuthPage.addWrongPassword();
        await formAuthPage.clickLogin();
        await formAuthPage.passwordIsInvalid();
    })

    test('Incorrect username and correct password', async () => {
        await formAuthPage.inputsAreVisible();
        await formAuthPage.addWrongUsername();
        await formAuthPage.addPassword();
        await formAuthPage.clickLogin();
        await formAuthPage.userNameIsInvalid();
    })

    test('Incorrect username and password', async () => {
        await formAuthPage.inputsAreVisible();
        await formAuthPage.addWrongUsername();
        await formAuthPage.addWrongPassword();
        await formAuthPage.clickLogin();
        await formAuthPage.userNameIsInvalid();
    })

})