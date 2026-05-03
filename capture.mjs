import puppeteer from 'puppeteer';

const proj = { url: 'https://aim-trainerrr.vercel.app/', name: 'aim-trainer.png' };

(async () => {
  try {
    console.log('Iniciando Puppeteer...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    console.log(`Navegando a ${proj.url}...`);
    await page.goto(proj.url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Esperar 12 segundos
    console.log('Esperando 12 segundos...');
    await new Promise(r => setTimeout(r, 12000));

    console.log('Tomando captura...');
    await page.screenshot({ path: `public/${proj.name}`, fullPage: true });
    console.log(`Guardado ${proj.name}`);

    await browser.close();
    console.log('¡Captura lista!');
  } catch (error) {
    console.error('Error:', error);
  }
})();
