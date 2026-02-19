import { type Page, expect } from "@playwright/test"

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
        await expect(this.page.getByRole('button', { name: 'Delete' })).not.toBeVisible();
    }

    async verifyNumberOfElements(expectedCount: number) {
        const elements = this.page.locator('button.added-manually');
        await expect(elements).toHaveCount(expectedCount);
    }

    async removeElementAtIndex(index: number) {
        const deleteButton = this.page.locator('button.added-manually').nth(index);
        await deleteButton.click();
    }


}

export default AddRemovePage;