import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);

  currentLang = signal<string>('en');
  mobileMenuOpen = signal<boolean>(false);
  activeSection = signal<string>('hero');
  expandedProject = signal<string | null>(null);
  lightboxImage = signal<string | null>(null);

  languages = ['en', 'fr', 'es'];
  langLabels: Record<string, string> = { en: 'EN', fr: 'FR', es: 'ES' };

  navLinks = [
    { id: 'about', key: 'nav.about' },
    { id: 'journey', key: 'nav.journey' },
    { id: 'playground', key: 'nav.skills' },
    { id: 'projects', key: 'nav.projects' },
    { id: 'credentials', key: 'nav.credentials' },
    { id: 'contact', key: 'nav.contact' },
  ];

  playgroundSkills = [
    { icon: '📊', key: 'playground.skills.pivot' },
    { icon: '🔍', key: 'playground.skills.vlookup' },
    { icon: '🧮', key: 'playground.skills.formulas' },
    { icon: '⚙️', key: 'playground.skills.automation' },
    { icon: '📈', key: 'playground.skills.dashboards' },
    { icon: '📋', key: 'playground.skills.reporting' },
  ];

  toolkitItems = [
    {
      icon: '📊',
      titleKey: 'skills.toolkit.excel',
      detailKey: 'skills.toolkit.excelDetail',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: '🤝',
      titleKey: 'skills.toolkit.crm',
      detailKey: 'skills.toolkit.crmDetail',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      icon: '🤖',
      titleKey: 'skills.toolkit.dataAi',
      detailKey: 'skills.toolkit.dataAiDetail',
      color: 'from-purple-400 to-violet-500',
    },
    {
      icon: '🌍',
      titleKey: 'skills.toolkit.languages',
      detailKey: 'skills.toolkit.languagesDetail',
      color: 'from-orange-400 to-red-500',
    },
  ];

  credentials = [
    { image: 'assets/images/vet-degree.png', title: 'Doctor of Veterinary Medicine Degree' },
    { image: 'assets/images/cert-microsoft-365-administration.jpg', title: 'Microsoft 365 Administration' },
    { image: 'assets/images/cert-administrative-human-resources.jpg', title: 'Administrative & Human Resources' },
    { image: 'assets/images/cert-ai-marketing.jpg', title: 'AI Marketing' },
    { image: 'assets/images/cert-excel-copilot-pivot-tables.jpg', title: 'Excel Copilot & Pivot Tables' },
    { image: 'assets/images/cert-google-ads-display.png', title: 'Google Ads Display' },
    { image: 'assets/images/cert-data-driven-research-design.png', title: 'Data-Driven Research Design' },
    { image: 'assets/images/cert-digital-marketing-simternship.png', title: 'Digital Marketing Simternship' },
    { image: 'assets/images/cert-ai-ads.png', title: 'AI Automation & Ads' },
    { image: 'assets/images/cert-digital-marketing-foundations.png', title: 'Digital Marketing Foundations' },
    { image: 'assets/images/cert-greystone.png', title: 'Greystone College Certificate' },
    { image: 'assets/images/cert-client-service.png', title: 'Client Service Excellence' },
  ];

  projects = [
    {
      id: 'colagican',
      image: 'assets/images/project-colagican.png',
      accent: 'from-teal-400 to-emerald-500',
      accentBg: 'bg-teal-50',
    },
    {
      id: 'atd',
      image: 'assets/images/project-atd.png',
      accent: 'from-violet-400 to-purple-500',
      accentBg: 'bg-violet-50',
    },
    {
      id: 'clinical',
      image: 'assets/images/montse_vet.png',
      accent: 'from-blue-400 to-cyan-500',
      accentBg: 'bg-blue-50',
    },
    {
      id: 'hospitality',
      image: 'assets/images/hilton_tru.jpg',
      accent: 'from-amber-400 to-orange-500',
      accentBg: 'bg-amber-50',
    },
  ];

  private sparkleInterval: any;

  ngOnInit(): void {
    this.translate.addLangs(this.languages);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
      this.initParallax();
      this.initSparkles();
      this.initNavHighlight();
    }
  }

  ngOnDestroy(): void {
    if (this.sparkleInterval) clearInterval(this.sparkleInterval);
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  switchLanguage(lang: string): void {
    this.currentLang.set(lang);
    this.translate.use(lang);
    this.mobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.mobileMenuOpen.set(false);
  }

  toggleProject(id: string): void {
    this.expandedProject.set(this.expandedProject() === id ? null : id);
  }

  openLightbox(image: string): void {
    this.lightboxImage.set(image);
  }

  closeLightbox(): void {
    this.lightboxImage.set(null);
  }

  private initScrollAnimations(): void {
    const reveals = this.el.nativeElement.querySelectorAll('.reveal');
    reveals.forEach((el: HTMLElement) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    // Hero entrance
    const heroTimeline = gsap.timeline({ delay: 0.3 });
    heroTimeline
      .from('.hero-greeting', { opacity: 0, y: 30, duration: 0.6 })
      .from('.hero-name', { opacity: 0, y: 30, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
      .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
      .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
      .from('.hero-cta', { opacity: 0, scale: 0.8, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2')
      .from('.hero-badge', { opacity: 0, scale: 0.5, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' }, '-=0.3');
  }

  private initParallax(): void {
    gsap.utils.toArray<HTMLElement>('.parallax-slow').forEach((el) => {
      gsap.to(el, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
  }

  private initSparkles(): void {
    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (Math.random() > 0.92) {
        this.createSparkle(e.clientX, e.clientY);
      }
    });
  }

  private createSparkle(x: number, y: number): void {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-particle';
    const size = Math.random() * 6 + 3;
    const colors = ['#7c3aed', '#f97316', '#14b8a6', '#fbbf24', '#ec4899'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.background = color;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.setProperty('--dx', `${(Math.random() - 0.5) * 30}px`);
    sparkle.style.setProperty('--dy', `${(Math.random() - 0.5) * 30}px`);
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  }

  private initNavHighlight(): void {
    const sections = ['hero', 'about', 'journey', 'playground', 'projects', 'credentials', 'contact'];
    sections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => this.activeSection.set(id),
        onEnterBack: () => this.activeSection.set(id),
      });
    });
  }
}
