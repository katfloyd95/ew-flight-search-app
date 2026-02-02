import { test, expect } from '@playwright/test';

test.describe('Flight Offers E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should filter and sort the flight offer list', async ({ page }) => {
    const offerCards = page.getByRole('article');
    await expect(offerCards).toHaveCount(12);

    const originInput = page.getByLabel('Departure airport');
    const destinationInput = page.getByLabel('Destination airport');
    const searchBtn = page.getByRole('button', { name: /search/i });

    await originInput.fill('BER');
    await destinationInput.fill('CGN');
    await searchBtn.click();

    await expect(offerCards).toHaveCount(4);

    await page.getByRole('button', { name: /sorted by/i }).click();
    await page.getByRole('option', { name: /price/i }).click();

    const firstCardPrice = offerCards.first().getByText('78.00');
    await expect(firstCardPrice).toBeVisible();

    // verify case insensitivity
    await originInput.fill('fra');
    await destinationInput.fill('ber');
    await searchBtn.click();

    await expect(offerCards).toHaveCount(2);
  });

  test('should be accessible and mobile-friendly', async ({ page }) => {
    // Set to a common mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.getByLabel('Departure airport')).toBeVisible();

    // Check that search button is clickable
    const searchBtn = page.getByRole('button', { name: /search/i });
    const box = await searchBtn.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });
});
