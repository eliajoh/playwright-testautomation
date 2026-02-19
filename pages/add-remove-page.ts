import { type Locator, type Page, expect } from "@playwright/test"

export class AddRemovePage {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    async addElement() {
        await this.page.getByRole('button', { name: 'Add Element' }).click();
    }

    async removeElement() {
        await this.page.locator('button.added-manually').click();
    }

    async assertElementIsRemoved() {
        await expect(this.page.locator('button.added-manually')).toHaveCount(0);
    }


}

export default AddRemovePage;