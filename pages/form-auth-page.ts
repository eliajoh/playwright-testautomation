import { type Page } from "@playwright/test";

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


}

export default FormAuthPage;