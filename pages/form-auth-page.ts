import {expect, type Page} from "@playwright/test";

export class FormAuthPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addUsername() {
        const username = "tomsmith";
        await this.page.getByRole('textbox', { name: 'username' }).click();
        await this.page.getByRole('textbox', { name: 'username' }).fill(username);
    }

    async addPassword() {
        const password = "SuperSecretPassword!";
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    }

    async addCredentials() {
        const username = "tomsmith";
        const password = "SuperSecretPassword!";
        await this.page.getByRole('textbox', { name: 'username' }).click();
        await this.page.getByRole('textbox', { name: 'username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    }

    async addWrongUsername() {
        const WrongUsername = "Lampan Larsson";
        await this.page.getByRole('textbox', { name: 'username' }).click();
        await this.page.getByRole('textbox', {name: 'username'}).fill(WrongUsername);
    }

    async addWrongPassword() {
        const wrongPassword = "anteater5";
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', {name: 'Password'}).fill(wrongPassword);
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