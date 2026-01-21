const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Zhang San';
    pptx.title = 'DevPortfolio - 前端开发者作品集';

    const colors = {
        primary: '6366F1',
        primaryDark: '4F46E5',
        secondary: 'F43F5E',
        text: '1F2937',
        textLight: '6B7280',
        bg: 'FFFFFF',
        bgGray: 'F3F4F6'
    };

    // Slide 1: Title Slide
    let slide = pptx.addSlide();
    slide.background = { fill: '667EEA' };
    slide.addText('DevPortfolio', {
        x: 0, y: 1.5, w: 10, h: 0.8,
        fontSize: 72, bold: true, color: 'FFFFFF', align: 'center', fontFace: 'Arial'
    });
    slide.addText('前端开发者作品集', {
        x: 0, y: 2.5, w: 10, h: 0.5,
        fontSize: 32, color: 'FFFFFF', align: 'center', fontFace: 'Arial'
    });
    slide.addText('创造优雅、高效的Web应用程序', {
        x: 0, y: 3.2, w: 10, h: 0.4,
        fontSize: 22, color: 'FFFFFF', align: 'center', fontFace: 'Arial'
    });

    // Slide 2: About
    slide = pptx.addSlide();
    slide.background = { fill: colors.bg };
    slide.addText('关于我', {
        x: 0.4, y: 0.3, w: 9, h: 0.5,
        fontSize: 44, bold: true, color: colors.primary, fontFace: 'Arial'
    });
    slide.addText('全栈开发者 & UI设计爱好者', {
        x: 0.4, y: 1.0, w: 9, h: 0.4,
        fontSize: 20, bold: true, color: colors.primary, fontFace: 'Arial'
    });
    slide.addText('拥有5年前端开发经验，专注于构建响应式、用户友好的Web应用程序', {
        x: 0.4, y: 1.5, w: 9, h: 0.5,
        fontSize: 16, color: colors.text, fontFace: 'Arial'
    });
    slide.addText('热衷于学习新技术，并将其应用于实际项目中', {
        x: 0.4, y: 2.1, w: 9, h: 0.5,
        fontSize: 16, color: colors.text, fontFace: 'Arial'
    });

    // Slide 3: Skills
    slide = pptx.addSlide();
    slide.background = { fill: colors.bg };
    slide.addText('专业技能', {
        x: 0.4, y: 0.3, w: 9, h: 0.5,
        fontSize: 44, bold: true, color: colors.primary, fontFace: 'Arial'
    });

    const skills = [
        { name: '前端开发', list: 'HTML5, CSS3, JavaScript, TypeScript' },
        { name: '框架', list: 'React, Vue.js, Angular, Next.js' },
        { name: '后端开发', list: 'Node.js, Python, Java, Go' },
        { name: '数据库', list: 'MySQL, MongoDB, PostgreSQL, Redis' }
    ];

    skills.forEach((skill, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const x = 0.4 + col * 4.8;
        const y = 1.2 + row * 1.2;

        slide.addText(skill.name, {
            x: x, y: y, w: 4.5, h: 0.35,
            fontSize: 16, bold: true, color: colors.primary, fontFace: 'Arial'
        });
        slide.addText(skill.list, {
            x: x, y: y + 0.4, w: 4.5, h: 0.4,
            fontSize: 14, color: colors.textLight, fontFace: 'Arial'
        });
    });

    // Slide 4: Projects
    slide = pptx.addSlide();
    slide.background = { fill: colors.bg };
    slide.addText('代表作品', {
        x: 0.4, y: 0.3, w: 9, h: 0.5,
        fontSize: 44, bold: true, color: colors.primary, fontFace: 'Arial'
    });

    const projects = [
        { title: '电商平台', desc: '现代化电商网站，支持多种支付方式', tech: 'React, Node.js, MongoDB' },
        { title: '健身追踪App', desc: '帮助用户追踪运动数据和健康状况', tech: 'React Native, Firebase' },
        { title: '数据可视化平台', desc: '实时数据分析和可视化仪表板', tech: 'Vue.js, D3.js, Python' }
    ];

    projects.forEach((proj, idx) => {
        const y = 1.1 + idx * 0.95;
        slide.addShape(pptx.ShapeType.rect, {
            x: 0.4, y: y, w: 0.08, h: 0.7,
            fill: { color: colors.primary }, line: { type: 'none' }
        });
        slide.addText(proj.title, {
            x: 0.6, y: y, w: 8.8, h: 0.3,
            fontSize: 16, bold: true, color: colors.text, fontFace: 'Arial'
        });
        slide.addText(proj.desc, {
            x: 0.6, y: y + 0.35, w: 8.8, h: 0.3,
            fontSize: 13, color: colors.textLight, fontFace: 'Arial'
        });
    });

    // Slide 5: Stats
    slide = pptx.addSlide();
    slide.background = { fill: colors.bg };
    slide.addText('成就', {
        x: 0.4, y: 0.3, w: 9, h: 0.5,
        fontSize: 44, bold: true, color: colors.primary, fontFace: 'Arial'
    });

    const stats = [
        { number: '50+', label: '完成项目' },
        { number: '30+', label: '满意客户' },
        { number: '5', label: '年经验' }
    ];

    stats.forEach((stat, idx) => {
        const x = 1.2 + idx * 3;
        slide.addText(stat.number, {
            x: x, y: 1.8, w: 2.6, h: 0.8,
            fontSize: 56, bold: true, color: colors.primary, align: 'center', fontFace: 'Arial'
        });
        slide.addText(stat.label, {
            x: x, y: 2.8, w: 2.6, h: 0.4,
            fontSize: 16, color: colors.textLight, align: 'center', fontFace: 'Arial'
        });
    });

    // Slide 6: Contact
    slide = pptx.addSlide();
    slide.background = { fill: colors.bg };
    slide.addText('联系我', {
        x: 0.4, y: 0.5, w: 9, h: 0.5,
        fontSize: 44, bold: true, color: colors.primary, align: 'center', fontFace: 'Arial'
    });

    const contacts = [
        '邮箱: hello@example.com',
        '位置: 中国，上海',
        '电话: +86 123 4567 8900'
    ];

    contacts.forEach((contact, idx) => {
        slide.addText(contact, {
            x: 1, y: 1.8 + idx * 0.8, w: 8, h: 0.5,
            fontSize: 20, color: colors.text, align: 'center', fontFace: 'Arial'
        });
    });

    // Save presentation
    await pptx.writeFile({ fileName: 'DevPortfolio.pptx' });
    console.log('✓ PowerPoint presentation created: DevPortfolio.pptx');
}

createPresentation().catch(err => {
    console.error('Error creating presentation:', err.message);
    process.exit(1);
});
