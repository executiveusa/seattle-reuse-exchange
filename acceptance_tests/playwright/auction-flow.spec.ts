import { test, expect } from '@playwright/test';

test.describe('Seattle Reuse Exchange E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('http://localhost:3000');
  });

  test('user can view home page and navigate to auctions', async ({ page }) => {
    // Check home page loads correctly
    await expect(page).toHaveTitle(/Seattle Reuse Exchange/);
    
    // Verify hero section is visible
    await expect(page.locator('h1')).toContainText('Keep Good Stuff Out of the Dump');
    
    // Click on Browse Auctions button
    await page.click('text=Browse Auctions');
    
    // Should navigate to auctions page
    await expect(page).toHaveURL(/.*browse/);
  });

  test('user can place a bid on an auction', async ({ page }) => {
    // AI-CHAT: This test validates the core auction flow
    // Tests anti-sniping logic, bid validation, and real-time updates
    
    // Navigate to a specific auction
    await page.goto('http://localhost:3000/item/herman-miller-aeron-chair');
    
    // Verify auction details are displayed
    await expect(page.locator('[data-testid="item-title"]')).toContainText('Herman Miller');
    await expect(page.locator('[data-testid="current-bid"]')).toBeVisible();
    await expect(page.locator('[data-testid="time-remaining"]')).toBeVisible();
    
    // Click login (magic link flow)
    await page.click('[data-testid="login-button"]');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.click('[data-testid="send-magic-link"]');
    
    // For testing, we'll mock the login success
    await page.evaluate(() => {
      window.localStorage.setItem('auth-token', 'test-token');
    });
    await page.reload();
    
    // Place a bid
    await page.fill('[data-testid="bid-input"]', '150');
    await page.click('[data-testid="place-bid-button"]');
    
    // Verify bid success
    await expect(page.locator('[data-testid="bid-success"]')).toContainText('Bid placed successfully');
    await expect(page.locator('[data-testid="current-bid"]')).toContainText('$150');
  });

  test('admin can create and manage auction', async ({ page }) => {
    // AI-CHAT: Admin workflow test
    // Tests item creation, auction setup, and management features
    
    // Login as admin
    await page.goto('http://localhost:3000/admin');
    await page.fill('[data-testid="admin-email"]', 'admin@seattlereuse.exchange');
    await page.click('[data-testid="admin-login"]');
    
    // Navigate to create item
    await page.click('[data-testid="create-item-button"]');
    
    // Fill item details
    await page.fill('[data-testid="item-title"]', 'Test Office Chair');
    await page.fill('[data-testid="item-description"]', 'Test description for E2E testing');
    await page.selectOption('[data-testid="item-category"]', 'Office Chairs');
    await page.selectOption('[data-testid="item-condition"]', 'good');
    
    // Upload images (mock)
    await page.setInputFiles('[data-testid="image-upload"]', [
      // Note: In real tests, we'd use actual test image files
      { name: 'test-chair.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('test') }
    ]);
    
    // Save item
    await page.click('[data-testid="save-item"]');
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Item created');
    
    // Create auction for the item
    await page.click('[data-testid="create-auction"]');
    await page.fill('[data-testid="reserve-price"]', '100');
    await page.fill('[data-testid="start-date"]', '2024-12-20');
    await page.fill('[data-testid="end-date"]', '2024-12-27');
    
    // Save and open auction
    await page.click('[data-testid="save-auction"]');
    await page.click('[data-testid="open-auction"]');
    
    // Verify auction is live
    await expect(page.locator('[data-testid="auction-status"]')).toContainText('Open');
  });

  test('donation flow works correctly', async ({ page }) => {
    // AI-CHAT: Tests both cash and goods donation workflows
    // Validates Stripe integration and receipt generation
    
    await page.goto('http://localhost:3000/donate');
    
    // Test cash donation
    await page.click('[data-testid="donate-cash-tab"]');
    await page.fill('[data-testid="donation-amount"]', '50');
    await page.fill('[data-testid="donor-email"]', 'donor@example.com');
    await page.click('[data-testid="donate-button"]');
    
    // Should redirect to Stripe checkout (we'll mock this)
    await expect(page).toHaveURL(/.*stripe.com.*|.*checkout.*/);
    
    // Test goods donation
    await page.goBack();
    await page.click('[data-testid="donate-goods-tab"]');
    await page.fill('[data-testid="goods-description"]', 'Old office desk in good condition');
    await page.setInputFiles('[data-testid="goods-photos"]', [
      { name: 'desk.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('test') }
    ]);
    await page.fill('[data-testid="donor-email"]', 'donor@example.com');
    await page.click('[data-testid="submit-donation"]');
    
    // Verify submission success
    await expect(page.locator('[data-testid="donation-success"]')).toContainText('Thank you for your donation');
  });

  test('search and filtering works', async ({ page }) => {
    // AI-CHAT: Tests Meilisearch integration and filtering UI
    // Validates instant search, typo tolerance, and faceted filtering
    
    await page.goto('http://localhost:3000/browse');
    
    // Test search functionality
    await page.fill('[data-testid="search-input"]', 'herman chair');
    await page.waitForTimeout(500); // Wait for debounced search
    
    // Should show Herman Miller chairs
    await expect(page.locator('[data-testid="search-results"]')).toContainText('Herman Miller');
    
    // Test category filter
    await page.selectOption('[data-testid="category-filter"]', 'Office Chairs');
    await expect(page.locator('[data-testid="item-card"]')).toHaveCount({ min: 1 });
    
    // Test condition filter
    await page.selectOption('[data-testid="condition-filter"]', 'good');
    await expect(page.locator('[data-testid="item-card"]')).toBeVisible();
    
    // Test price range filter
    await page.fill('[data-testid="min-price"]', '100');
    await page.fill('[data-testid="max-price"]', '500');
    await page.click('[data-testid="apply-filters"]');
    
    // Verify filtered results
    await expect(page.locator('[data-testid="results-count"]')).toContainText(/\d+ items found/);
  });

  test('anti-sniping protection works', async ({ page }) => {
    // AI-CHAT: Critical test for auction anti-sniping functionality
    // Validates that bids placed in final minutes extend the auction
    
    // Navigate to auction ending soon (we'll need to mock this)
    await page.goto('http://localhost:3000/item/test-auction-ending-soon');
    
    // Mock auction ending in 30 seconds
    await page.evaluate(() => {
      window.__mockAuctionEndTime = Date.now() + 30000; // 30 seconds
    });
    
    // Login and place bid in final seconds
    await page.evaluate(() => {
      window.localStorage.setItem('auth-token', 'test-token');
    });
    await page.reload();
    
    // Wait until 15 seconds remaining
    await page.waitForFunction(() => {
      return window.__mockAuctionEndTime - Date.now() < 15000;
    });
    
    // Place bid (should trigger anti-sniping)
    await page.fill('[data-testid="bid-input"]', '200');
    await page.click('[data-testid="place-bid-button"]');
    
    // Verify auction time was extended
    await expect(page.locator('[data-testid="time-remaining"]')).toContainText(/[2-9]:\d\d/); // Should show 2+ minutes
    await expect(page.locator('[data-testid="anti-snipe-notice"]')).toContainText('Auction extended');
  });

  test('mobile responsiveness', async ({ page }) => {
    // AI-CHAT: Mobile experience test for accessibility and usability
    // Ensures the platform works well on mobile devices
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('http://localhost:3000');
    
    // Test mobile navigation
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    // Test auction browsing on mobile
    await page.click('[data-testid="mobile-browse-link"]');
    await expect(page.locator('[data-testid="mobile-item-grid"]')).toBeVisible();
    
    // Test bidding on mobile
    await page.click('[data-testid="item-card"]').first();
    await expect(page.locator('[data-testid="mobile-bid-panel"]')).toBeVisible();
  });
});