import {expect, Locator, type Page} from "@playwright/test";

export class FormAuthPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole("textbox", {name: "username"});
        this.passwordInput = page.getByRole("textbox", {name: "Password"});
        this.loginButton = page.getByRole("button", {name: "Login"});
    }

    async fillCredentials(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async loginWithCorrectCredentials() {
        await this.fillCredentials(
            process.env.USERNAME || '',
            process.env.PASSWORD || '',
        );
        await this.clickLogin();
    }

    async addWrongUsername() {
        await this.fillCredentials(
            process.env.WRONGUSERNAME || '',
            process.env.PASSWORD || '',
        );
        await this.clickLogin();
    }

    async addWrongPassword() {
        await this.fillCredentials(
            process.env.USERNAME || '',
            process.env.WRONGPASSWORD || '',
        );
        await this.clickLogin();
    }

    async addFaultyCredentials() {
        await this.fillCredentials(
            process.env.WRONGUSERNAME || '',
            process.env.WRONGPASSWORD || '',
        )
        await this.clickLogin();
    }

    async clickLogin() {
        await expect(this.page.getByRole('button')).toBeVisible();
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async inputsAreVisible() {
        await expect(this.page.getByRole('textbox', { name: 'Username' })).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    }

    async loginSuccess() {
        await expect(this.page.getByText('You logged into a secure area')).toBeVisible();
    }

    async userNameIsInvalid() {
        await expect(this.page.getByText('Your username is invalid')).toBeVisible();
    }

    async passwordIsInvalid() {
        await expect (this.page.getByText('Your password is invalid')).toBeVisible();
    }


}

export default FormAuthPage;