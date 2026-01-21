const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle, ShadingType, VerticalAlign, HeadingLevel, LevelFormat } = require('docx');
const fs = require('fs');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 22 }
      }
    },
    paragraphStyles: [
      {
        id: "Title",
        name: "Title",
        basedOn: "Normal",
        run: { size: 48, bold: true, color: "2E75B6", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 120 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        run: { size: 32, bold: true, color: "2E75B6", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        run: { size: 26, bold: true, color: "404040", font: "Arial" },
        paragraph: { spacing: { before: 120, after: 80 }, outlineLevel: 1 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullet-list",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }
        ]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // Title
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [new TextRun("DevPortfolio")]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
        children: [new TextRun({ text: "前端开发者 | 全栈开发者", italics: true, size: 24 })]
      }),

      // Contact Info
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
        children: [new TextRun({ text: "📧 hello@example.com  |  📍 中国，上海  |  📱 +86 123 4567 8900", size: 22 })]
      }),

      // About Section
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("关于我")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("全栈开发者 & UI设计爱好者")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("我是一名拥有5年经验的前端开发者，专注于构建响应式、用户友好的Web应用程序。我热衷于学习新技术，并将其应用于实际项目中。")]
      }),
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun("在空闲时间，我喜欢阅读技术博客、参与开源项目，以及探索最新的前端框架和工具。我相信代码不仅仅是工具，更是一种艺术形式。")]
      }),

      // Stats Table
      new Table({
        columnWidths: [3120, 3120, 3120],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "2E75B6", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "50", bold: true, color: "FFFFFF" })]
                })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "2E75B6", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "30", bold: true, color: "FFFFFF" })]
                })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "2E75B6", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "5", bold: true, color: "FFFFFF" })]
                })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun("完成项目")]
                })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun("满意客户")]
                })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun("年经验")]
                })]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("")] }),

      // Skills Section
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("专业技能")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("🎨 前端开发")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("HTML5, CSS3, JavaScript, TypeScript")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("熟练度: 95%")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("⚛️ 框架")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("React, Vue.js, Angular, Next.js")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("熟练度: 90%")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("🖥️ 后端开发")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Node.js, Python, Java, Go")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("熟练度: 80%")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("🗄️ 数据库")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("MySQL, MongoDB, PostgreSQL, Redis")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("熟练度: 75%")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("☁️ 云服务")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("AWS, Azure, Google Cloud, Docker")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("熟练度: 70%")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("🎯 UI/UX设计")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Figma, Sketch, Adobe XD, Photoshop")]
      }),
      new Paragraph({
        spacing: { after: 240 },
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("熟练度: 85%")]
      }),

      // Projects Section
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("我的作品")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("电商平台")]
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun("现代化的电商网站，支持多种支付方式")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "技术栈: React, Node.js, MongoDB", italics: true, size: 20 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("健身追踪App")]
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun("帮助用户追踪运动数据和健康状况")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "技术栈: React Native, Firebase", italics: true, size: 20 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("品牌设计系统")]
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun("完整的企业品牌视觉设计系统")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "技术栈: Figma, Illustrator", italics: true, size: 20 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("数据可视化平台")]
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun("实时数据分析和可视化仪表板")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "技术栈: Vue.js, D3.js, Python", italics: true, size: 20 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("社交聊天应用")]
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun("实时聊天和社交功能的移动应用")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "技术栈: Flutter, Socket.io", italics: true, size: 20 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("动效设计集")]
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun("创意交互动画和微交互设计")]
      }),
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun({ text: "技术栈: After Effects, Lottie", italics: true, size: 20 })]
      }),

      // Contact Section
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("联系我")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("无论您有项目想法还是只是想打个招呼，我很乐意收到您的来信！")]
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: "社交媒体:", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("🐙 GitHub")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("💼 LinkedIn")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("🐦 Twitter")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("💬 微信")]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("d:\\Code\\testSkill\\DevPortfolio.docx", buffer);
  console.log("Word document created: DevPortfolio.docx");
});
