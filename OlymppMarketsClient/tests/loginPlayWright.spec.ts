import { test, expect } from '@playwright/test';

test.describe('Login Component', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/login'); 
  });

  test('should login successfully and navigate', async ({ page }) => {

    await page.fill('#username', 'testuser');
    await page.fill('#password', 'testpassword');
    

    await page.click('#loginButton');

    // Vérifier que la navigation a eu lieu
    await expect(page).toHaveURL('http://localhost:4200/'); 

    // Vérifier que le token est stocké dans le localStorage
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBe('toto');
  });

  test('should handle login error', async ({ page }) => {
    // Simuler une réponse d'erreur pour l'API de connexion (tu devras peut-être utiliser un mock ou stub pour l'API)
    await page.route('**/api/login', route =>
        route.fulfill({ status: 404, contentType: 'application/json', body: JSON.stringify({ message: 'Not Found' }) })
      );

    // Simuler la saisie des informations de connexion
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'testpassword');
    
    // Cliquer sur le bouton de connexion
    await page.click('#loginButton');

    // Vérifier la présence d'un message d'erreur (ajuste en fonction de l'implémentation de ton application)
    const errorMessage = await page.locator('text=Login failed').innerText();
    expect(errorMessage).toContain('Login failed');
  });

});
