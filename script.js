/**
 * DevPortfolio - 个人作品集网站
 * 纯原生 JavaScript 实现
 */

// ==================== DOM 元素 ====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const loader = document.getElementById('loader');
const contactForm = document.getElementById('contact-form');
const typewriterElement = document.getElementById('typewriter');
const particlesContainer = document.getElementById('particles');

// ==================== 打字机效果 ====================
class Typewriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        // 当前单词索引
        const current = this.wordIndex % this.words.length;
        // 获取当前单词全文
        const fullTxt = this.words[current];

        // 检查是删除还是添加字符
        if (this.isDeleting) {
            // 删除字符
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // 添加字符
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // 将文本插入元素
        this.element.innerHTML = this.txt;

        // 打字速度
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2; // 删除速度更快
        }

        // 如果单词完成
        if (!this.isDeleting && this.txt === fullTxt) {
            // 在单词结尾暂停
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // 移动到下一个单词
            this.wordIndex++;
            // 在输入前短暂暂停
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ==================== 粒子效果 ====================
function createParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机大小
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机位置
        particle.style.left = `${Math.random() * 100}%`;
        
        // 随机动画延迟和持续时间
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// ==================== 导航栏滚动效果 ====================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ==================== 移动端导航菜单 ====================
function toggleMobileNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileNav() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== 平滑滚动与导航高亮 ====================
function handleNavLinkClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        closeMobileNav();
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==================== 返回顶部按钮 ====================
function handleBackToTop() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==================== 统计数字动画 ====================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 动画持续时间
        const step = target / (duration / 16); // 每帧增量
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        
        updateNumber();
    });
}

// ==================== 技能卡片动画 ====================
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    
                    // 动画进度条
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const progress = progressBar.getAttribute('data-progress');
                        setTimeout(() => {
                            progressBar.style.width = `${progress}%`;
                        }, 300);
                    }
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillCards.forEach(card => observer.observe(card));
}

// ==================== 关于我区域动画 ====================
function animateAboutSection() {
    const aboutSection = document.querySelector('.about');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(aboutSection);
}

// ==================== 项目筛选 ====================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新活动按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // 筛选项目
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// 添加 fadeIn 动画
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(styleSheet);

// ==================== 联系表单处理 ====================
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // 表单验证
    if (!validateForm(data)) {
        return;
    }
    
    // 模拟表单提交
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>发送中...</span>';
    
    // 模拟API请求
    setTimeout(() => {
        console.log('表单数据:', data);
        showToast('消息发送成功！我会尽快回复您。', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 1500);
}

function validateForm(data) {
    const { name, email, subject, message } = data;
    
    if (name.trim().length < 2) {
        showToast('请输入有效的姓名', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showToast('请输入有效的邮箱地址', 'error');
        return false;
    }
    
    if (subject.trim().length < 2) {
        showToast('请输入消息主题', 'error');
        return false;
    }
    
    if (message.trim().length < 10) {
        showToast('消息内容至少需要10个字符', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== Toast 通知 ====================
function showToast(message, type = 'success') {
    // 移除已存在的 toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 触发重排以启动动画
    setTimeout(() => toast.classList.add('show'), 10);
    
    // 自动隐藏
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== 页面滚动动画 ====================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ==================== 鼠标跟随效果（可选） ====================
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease, opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // 在可点击元素上放大光标
    const clickables = document.querySelectorAll('a, button, .filter-btn, .project-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ==================== 键盘导航支持 ====================
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC 关闭移动菜单
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileNav();
        }
        
        // 快捷键导航
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '2':
                    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '3':
                    document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '4':
                    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '5':
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                    break;
            }
        }
    });
}

// ==================== 图片懒加载 ====================
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // 回退方案
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ==================== 性能优化：防抖函数 ====================
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== 性能优化：节流函数 ====================
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== 暗黑模式切换（可扩展） ====================
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--bg-gray);
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(darkModeToggle);
    
    // 检查本地存储的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// 添加暗黑模式样式
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    body.dark-mode {
        --bg-color: #111827;
        --bg-gray: #1f2937;
        --text-color: #f9fafb;
        --text-light: #9ca3af;
        --border-color: #374151;
    }
    
    body.dark-mode .navbar.scrolled {
        background: rgba(17, 24, 39, 0.95);
    }
    
    body.dark-mode .skill-card,
    body.dark-mode .project-card,
    body.dark-mode .contact-form {
        background: var(--bg-gray);
    }
    
    body.dark-mode .filter-btn {
        background: var(--bg-gray);
        color: var(--text-color);
    }
    
    body.dark-mode .form-group input,
    body.dark-mode .form-group textarea {
        background: var(--bg-color);
        color: var(--text-color);
        border-color: var(--border-color);
    }
    
    body.dark-mode .nav-menu {
        background: var(--bg-color);
    }
`;
document.head.appendChild(darkModeStyles);

// ==================== 页面加载完成处理 ====================
function hideLoader() {
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
    }, 500);
}

// ==================== 初始化函数 ====================
function init() {
    // 隐藏加载动画
    hideLoader();
    
    // 创建粒子效果
    createParticles();
    
    // 初始化打字机效果
    const words = ['前端开发者', 'UI设计师', '全栈工程师', '问题解决者'];
    new Typewriter(typewriterElement, words, 2000);
    
    // 事件监听器
    window.addEventListener('scroll', throttle(() => {
        handleNavbarScroll();
        handleBackToTop();
        updateActiveNavLink();
    }, 50));
    
    navToggle.addEventListener('click', toggleMobileNav);
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    backToTopBtn.addEventListener('click', scrollToTop);
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // 初始化各功能模块
    animateSkillCards();
    animateAboutSection();
    initProjectFilters();
    initScrollAnimations();
    initKeyboardNavigation();
    initLazyLoading();
    initDarkMode();
    
    // 仅在桌面端启用自定义光标
    if (window.innerWidth > 768) {
        // initCursorEffect(); // 如需启用请取消注释
    }
    
    console.log('🚀 DevPortfolio 初始化完成！');
    console.log('💡 提示：使用 Alt + 1-5 可快速导航到各个区域');
}

// ==================== 启动应用 ====================
document.addEventListener('DOMContentLoaded', init);

// 页面完全加载后执行
window.addEventListener('load', () => {
    // 可在此添加需要页面完全加载后执行的代码
});