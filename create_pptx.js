const pptxgen = require('pptxgenjs');
const html2pptx = require('C:\\Users\\xiaochang\\.claude\\plugins\\cache\\anthropic-agent-skills\\document-skills\\69c0b1a06741\\skills\\pptx\\scripts\\html2pptx.js');
const path = require('path');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Zhang San';
    pptx.title = 'DevPortfolio - 前端开发者作品集';
    pptx.subject = 'Professional Portfolio Presentation';

    const slidesDir = path.join(__dirname);

    // Create slides from HTML files
    const slides = [
        'slide1.html',
        'slide2.html',
        'slide3.html',
        'slide4.html',
        'slide5.html',
        'slide6.html'
    ];

    for (const slideFile of slides) {
        const htmlPath = path.join(slidesDir, slideFile);
        try {
            await html2pptx(htmlPath, pptx);
            console.log(`✓ ${slideFile} converted`);
        } catch (error) {
            console.error(`✗ Error processing ${slideFile}:`, error.message);
        }
    }

    await pptx.writeFile({ fileName: 'DevPortfolio.pptx' });
    console.log('\n✓ Presentation created: DevPortfolio.pptx');
}

createPresentation().catch(console.error);
