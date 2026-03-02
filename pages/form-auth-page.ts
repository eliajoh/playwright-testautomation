import { type Page, expect } from "@playwright/test";

export class FormAuthPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addUsername() {
        const username = "tomsmith";
        await this.page.getByRole('textbox', { name: 'username' }).click();
        //await this.page.locator('#username').click();
        await this.page.getByRole('textbox', { name: 'username' }).fill(username);
        //await this.page.locator('#username').fill(username);
    }

    async addPassword() {
        const password = "SuperSecretPassword!";
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        //await this.page.locator('#password').fill(password);
    }


}

export default FormAuthPage;