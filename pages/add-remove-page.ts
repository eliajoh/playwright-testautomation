import { type Page } from "@playwright/test"

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


    async removeElementAtIndex(index: number) {
        const deleteButton = this.page.locator('button.added-manually').nth(index);
        await deleteButton.click();
    }


    async removeAllElements() {
        while ((await this.getNumberOfElements()) > 0) {
            await this.page.locator('button.added-manually').first().click();
        }
    }


    async getNumberOfElements(): Promise<number> {
        return await this.page.locator('button.added-manually').count();
    }


}

export default AddRemovePage;