import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Zap, 
  Phone, 
  Mail,
  Menu,
  X,
  ArrowRight,
  Clock,
  MapPin,
  Globe,
  FileText,
  CheckCircle2,
  TrendingDown,
  BatteryCharging
} from 'lucide-react';

// --- Localization Data ---
const translations = {
  en: {
    nav: { solar: "Solar", pumps: "Heat Pumps", grants: "Grants", savings: "Savings", contact: "Contact" },
    hero: { badge: "2026 Future-Proofing London", title: "Power Your Home for ", accent: "Near-Zero", cost: " Cost.", desc: "Custom solar and heating solutions for London. We handle all UK government grants from start to finish.", consultBtn: "Book Free Consultation", casesBtn: "View Case Studies" },
    services: {
      s1: { t: "Solar Excellence", d: "Premium Tier-1 PV panels engineered specifically for London's variable daylight cycles to maximize energy yield." },
      s2: { t: "Heat Pump Innovation", d: "Advanced air-source technology providing ultra-quiet, carbon-neutral heating even in sub-zero temperatures." },
      s3: { t: "Intelligent Storage", d: "Smart battery ecosystems that learn your habits to store cheap energy and power your home through the night." }
    },
    grantsPage: {
      title: "Government Grants & Incentives",
      subtitle: "Navigating the 2026 Green Energy Landscape in the UK.",
      helpText: "We manage the entire application process for you. From MCS certification to final approval, our team ensures you get every penny of support available.",
      contactBtn: "Contact Expert for Grant Help",
      items: [
        { t: "Boiler Upgrade Scheme (BUS)", v: "£7,500 Fixed Grant", d: "Available for Air Source and Ground Source heat pumps. No repayment needed." },
        { t: "0% VAT Incentive", v: "Save 20% Instantly", d: "The UK government has extended 0% VAT on energy-saving materials including solar PV and batteries." },
        { t: "Smart Export Guarantee (SEG)", v: "Earn per kWh", d: "Get paid for the excess energy you send back to the London grid." }
      ]
    },
    savingsPage: {
      title: "How Much Can You Save?",
      subtitle: "Detailed breakdown of energy cost reductions in London 2026.",
      solar: { t: "Solar PV Only", s: "Up to £1,200/yr", d: "Cut daytime electricity bills by 60-70%. Payback in 6-8 years." },
      pump: { t: "Heat Pump Only", s: "Up to £900/yr", d: "3-4x more efficient than gas. Significant savings when replacing old electric or oil systems." },
      bundle: { t: "The Lumina Bundle", s: "Up to £2,800/yr", d: "Solar + Pump + Battery. Achieve 90% grid independence. Run your heating using stored solar energy." }
    },
    contact: { title: "Let's Design Your Grid.", desc: "Choose your preferred way to connect with our London experts.", call: "Call Us", email: "Email Us", wa: "WhatsApp", chat: "Quick Chat Support", hours: "Available Mon-Fri, 8am - 6pm", office: "Head Office: Canary Wharf, London", formTitle: "Send a Message", name: "Full Name", postcode: "Postcode", message: "Message", send: "Send Request" },
    alert: { status: "Grant Status: ACTIVE", desc: "£7,500 BUS Grant is still available. Contact us to reserve yours." }
  },
  pl: {
    nav: { solar: "Panele Słoneczne", pumps: "Pompy Ciepła", grants: "Dotacje", savings: "Oszczędności", contact: "Kontakt" },
    hero: { badge: "2026 Przyszłość Londynu", title: "Zasilaj dom za ", accent: "prawie zero", cost: " funtów.", desc: "Indywidualne rozwiązania solarne i grzewcze dla Londynu. Obsługujemy wszystkie brytyjskie dotacje rządowe od A do Z.", consultBtn: "Bezpłatna Konsultacja", casesBtn: "Zobacz Realizacje" },
    services: {
      s1: { t: "Doskonałość Solarna", d: "Panele PV klasy premium Tier-1 zaprojektowane specjalnie dla zmiennego oświetlenia Londynu, aby zmaksymalizować zyski." },
      s2: { t: "Innowacyjne Pompy Ciepła", d: "Zaawansowana technologia powietrzna zapewniająca ciche, neutralne dla klimatu ogrzewanie nawet przy ujemnych temperaturach." },
      s3: { t: "Inteligentne Magazynowanie", d: "Ekosystemy baterii, które uczą się Twoich nawyków, aby zasilać dom w nocy tanią energią." }
    },
    grantsPage: {
      title: "Dotacje Rządowe i Zachęty",
      subtitle: "Przewodnik po zielonej energii w Wielkiej Brytanii w 2026 roku.",
      helpText: "Zarządzamy całym procesem aplikacji. Od certyfikacji MCS po finalną zgodę — nasz zespół dba, abyś otrzymał każde należne wsparcie.",
      contactBtn: "Kontakt w Sprawie Dotacji",
      items: [
        { t: "Boiler Upgrade Scheme (BUS)", v: "£7,500 Stała Dotacja", d: "Dostępne dla powietrznych i gruntowych pomp ciepła. Brak konieczności spłaty." },
        { t: "0% VAT", v: "Oszczędź 20% Natychmiast", d: "Rząd przedłużył stawkę 0% VAT na materiały energooszczędne, w tym panele fotowoltaiczne." },
        { t: "Smart Export Guarantee (SEG)", v: "Zarabiaj na kWh", d: "Otrzymuj zapłatę za nadmiar energii oddawany do londyńskiej sieci." }
      ]
    },
    savingsPage: {
      title: "Ile Możesz Oszczędzić?",
      subtitle: "Szczegółowe zestawienie redukcji kosztów energii w Londynie 2026.",
      solar: { t: "Tylko Fotowoltaika", s: "Do £1,200/rok", d: "Obniż dzienne rachunki o 60-70%. Zwrot z inwestycji w 6-8 lat." },
      pump: { t: "Tylko Pompa Ciepła", s: "Do £900/rok", d: "3-4 razy wydajniejsza niż gaz. Ogromne oszczędności przy wymianie starych systemów." },
      bundle: { t: "Pakiet Lumina", s: "Do £2,800/rok", d: "Panele + Pompa + Bateria. Osiągnij 90% niezależności od sieci." }
    },
    contact: { title: "Zaprojektujmy Twoją Sieć.", desc: "Wybierz preferowany sposób kontaktu z naszymi ekspertami.", call: "Zadzwoń", email: "E-mail", wa: "WhatsApp", chat: "Szybki Czat", hours: "Pn-Pt, 8:00 - 18:00", office: "Biuro: Canary Wharf, Londyn", formTitle: "Wyślij Wiadomość", name: "Imię i Nazwisko", postcode: "Kod Pocztowy", message: "Wiadomość", send: "Wyślij Zapytanie" },
    alert: { status: "Status Dotacji: AKTYWNY", desc: "Dotacja BUS £7,500 jest wciąż dostępna. Skontaktuj się z nami." }
  },
  uk: {
    nav: { solar: "Сонячні панелі", pumps: "Теплові насоси", grants: "Гранти", savings: "Економія", contact: "Контакти" },
    hero: { badge: "2026 Майбутнє Лондона", title: "Живіть з ", accent: "майже нульовими", cost: " витратами.", desc: "Індивідуальні рішення для Лондона. Ми беремо на себе оформлення всіх державних грантів Великобританії.", consultBtn: "Записатися на консультацію", casesBtn: "Наші кейси" },
    services: {
      s1: { t: "Експертна фотовольтаїка", d: "Високопродуктивні панелі класу Tier-1, спроектовані спеціально для мінливого світлового дня Лондона." },
      s2: { t: "Технологія теплових насосів", d: "Передова технологія повітряного опалення: безшумна робота та енергонезалежність." },
      s3: { t: "Розумне зберігання", d: "Інтелектуальні акумуляторні системи, що адаптуються до ваших звичок." }
    },
    grantsPage: {
      title: "Державні гранти та пільги",
      subtitle: "Огляд можливостей зеленої енергетики у Великобританії 2026 року.",
      helpText: "Ми повністю керуємо процесом подачі заявки за вас. Гарантуємо отримання кожної доступної копійки підтримки.",
      contactBtn: "Зв'язатися з експертом",
      items: [
        { t: "Схема оновлення котлів (BUS)", v: "Фіксований грант £7,500", d: "Доступно для теплових насосів. Повернення коштів не потрібне." },
        { t: "0% ПДВ (VAT)", v: "Економія 20% одразу", d: "Уряд Британії подовжив дію 0% ПДВ на енергозберігаючі матеріали." },
        { t: "Smart Export Guarantee (SEG)", v: "Заробляйте за кВт-год", d: "Отримуйте виплати за надлишкову енергію, яку ви віддаєте назад у мережу." }
      ]
    },
    savingsPage: {
      title: "Скільки ви зможете заощадити?",
      subtitle: "Детальний розрахунок скорочення витрат на енергію в Лондоні 2026.",
      solar: { t: "Тільки сонячні панелі", s: "До £1,200/рік", d: "Скорочення денних рахунків на 60-70%. Окупність за 6-8 років." },
      pump: { t: "Тільки тепловий насос", s: "До £900/рік", d: "У 3-4 рази ефективніше за газ. Значна економія при заміні старих систем." },
      bundle: { t: "Пакет Lumina (Комбіновано)", s: "До £2,800/рік", d: "Панелі + Насос + Акумулятор. 90% незалежності від мережі." }
    },
    contact: { title: "Спроектуємо вашу мережу.", desc: "Оберіть зручний спосіб зв'язку з нашими експертами у Лондоні.", call: "Подзвонити", email: "Написати", wa: "WhatsApp", chat: "Швидкий чат", hours: "Пн-Пт, 08:00 - 18:00", office: "Головний офіс: Canary Wharf, London", formTitle: "Надіслати повідомлення", name: "Повне ім'я", postcode: "Індекс", message: "Повідомлення", send: "Надіслати запит" },
    alert: { status: "Гранти: АКТИВНО", desc: "Грант BUS £7,500 все ще доступний. Зв'яжіться з нами." }
  },
  hi: {
    nav: { solar: "सौर ऊर्जा", pumps: "हीट पंप", grants: "अनुदान", savings: "बचत", contact: "संपर्क" },
    hero: { badge: "2026 लंदन का भविष्य", title: "अपने घर को ", accent: "लगभग शून्य", cost: " लागत पर चलाएं।", desc: "लंदन के लिए कस्टम सौर और हीटिंग समाधान। हम सभी यूके सरकारी अनुदानों को संभालते हैं।", consultBtn: "मुफ्त परामर्श बुक करें", casesBtn: "केस स्टडीज देखें" },
    services: {
      s1: { t: "सोलर मास्टरी", d: "लंदन की रोशनी की स्थिति के लिए अनुकूलित।" },
      s2: { t: "हीट पंप तकनीक", d: "शांत और शक्तिशाली हीटिंग।" },
      s3: { t: "स्मार्ट स्टोरेज", d: "बुद्धिमान बैटरी सिस्टम।" }
    },
    grantsPage: {
      title: "सरकारी अनुदान और प्रोत्साहन",
      subtitle: "यूके में 2026 हरित ऊर्जा परिदृश्य।",
      helpText: "हम आपके लिए संपूर्ण आवेदन प्रक्रिया का प्रबंधन करते हैं।",
      contactBtn: "अनुदान सहायता के लिए संपर्क करें",
      items: [
        { t: "बॉयलर अपग्रेड स्कीम (BUS)", v: "£7,500 निश्चित अनुदान", d: "हीट पंपों के लिए उपलब्ध।" },
        { t: "0% वैट (VAT)", v: "तुरंत 20% बचाएं", d: "सौर पीवी पर 0% वैट।" }
      ]
    },
    savingsPage: {
      title: "आप कितनी बचत कर सकते हैं?",
      subtitle: "लंदन 2026 में ऊर्जा लागत में कटौती का विस्तृत विवरण।",
      solar: { t: "केवल सौर पीवी", s: "£1,200/वर्ष तक", d: "दिन के बिजली बिलों में 60-70% की कटौती।" },
      pump: { t: "केवल हीट पंप", s: "£900/वर्ष तक", d: "गैस की तुलना में 3-4 गुना अधिक कुशल।" },
      bundle: { t: "ल्यूमिना बंडल", s: "£2,800/वर्ष तक", d: "सौर + पंप + बैटरी। 90% ग्रिड स्वतंत्रता।" }
    },
    contact: { title: "अपना ग्रिड डिजाइन करें।", desc: "हमसे जुड़ने का तरीका चुनें।", call: "हमें कॉल करें", email: "ईमेल करें", wa: "WhatsApp", chat: "त्वरित चैट", hours: "सोम-शुक्र, 8-6", office: "कैनरी वार्फ, लंदन", formTitle: "संदेश भेजें", name: "पूरा नाम", postcode: "पोस्टकोड", message: "संदेश", send: "अनुरोध भेजें" },
    alert: { status: "अनुदान स्थिति: सक्रिय", desc: "£7,500 अनुदान अभी भी उपलब्ध है।" }
  },
  ru: {
    nav: { solar: "Солнечные панели", pumps: "Тепловые насосы", grants: "Гранты", savings: "Экономия", contact: "Контакты" },
    hero: { badge: "2026 Будущее Лондона", title: "Энергия для дома по ", accent: "почти нулевой", cost: " цене.", desc: "Индивидуальные решения для Лондона. Мы берем на себя оформление всех госсубсидий Великобритании.", consultBtn: "Консультация", casesBtn: "Кейсы" },
    services: {
      s1: { t: "Экспертная фотовольтаика", d: "Высокопроизводительные панели Tier-1, разработанные специально для переменчивого светового дня Лондона." },
      s2: { t: "Инновационное тепло", d: "Продвинутые воздушные насосы: бесшумная работа и полная энергоэффективность." },
      s3: { t: "Умное хранение", d: "Интеллектуальные системы батарей, адаптирующиеся к вашему графику потребления." }
    },
    grantsPage: {
      title: "Государственные гранты и льготы",
      subtitle: "Обзор возможностей зеленой энергетики в Великобритании 2026.",
      helpText: "Мы полностью берем на себя процесс подачи заявки. От сертификации до одобрения — наша команда поможет получить максимум поддержки.",
      contactBtn: "Связаться с экспертом",
      items: [
        { t: "Схема обновления котлов (BUS)", v: "Фиксированный грант £7,500", d: "Для тепловых насосов. Возврат средств не требуется." },
        { t: "0% НДС (VAT)", v: "Экономия 20% сразу", d: "Правительство продлило 0% НДС на солнечные панели и батареи." },
        { t: "Smart Export Guarantee (SEG)", v: "Зарабатывайте на кВт-ч", d: "Получайте выплаты за излишки энергии в сеть Лондона." }
      ]
    },
    savingsPage: {
      title: "Сколько вы сможете сэкономить?",
      subtitle: "Подробный расчет сокращения затрат на энергию в Лондоне 2026.",
      solar: { t: "Только солнечные панели", s: "До £1,200/год", d: "Сокращение дневных счетов на 60-70%. Окупаемость за 6-8 лет." },
      pump: { t: "Только тепловой насос", s: "До £900/год", d: "В 3-4 раза эффективнее газа. Огромная выгода при замене старых систем." },
      bundle: { t: "Пакет Lumina (Комбо)", s: "До £2,800/год", d: "Панели + Насос + Аккумулятор. 90% независимости от сети." }
    },
    contact: { title: "Спроектируем вашу сеть.", desc: "Выберите способ связи с нашими экспертами.", call: "Позвонить", email: "Написать", wa: "WhatsApp", chat: "Быстрый чат", hours: "Пн-Пт, 08:00 - 18:00", office: "Главный офис: Canary Wharf, London", formTitle: "Отправить сообщение", name: "Имя", postcode: "Индекс", message: "Сообщение", send: "Отправить запрос" },
    alert: { status: "Гранти: АКТИВНО", desc: "Грант BUS £7,500 все еще доступен на 2026 год." }
  }
};

// --- Components ---

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="relative w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden shadow-lg shadow-blue-600/20">
      <Sun className="text-white w-6 h-6 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
    </div>
    <div className="leading-none text-left">
      <span className="text-xl font-black tracking-tighter block dark:text-white">LUMINA <span className="text-blue-600">GRID</span></span>
      <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500">London</span>
    </div>
  </div>
);

const Navbar = ({ isDarkMode, lang, setLang, t, currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const languages = [
    { code: 'en', label: 'EN' }, 
    { code: 'pl', label: 'PL' }, 
    { code: 'uk', label: 'UA' }, 
    { code: 'hi', label: 'IN' }, 
    { code: 'ru', label: 'RU' }
  ];

  const navItems = [
    { id: 'home', label: t.nav.solar, type: 'scroll', target: 'solar' },
    { id: 'home', label: t.nav.pumps, type: 'scroll', target: 'pumps' },
    { id: 'grants', label: t.nav.grants, type: 'page' },
    { id: 'savings', label: t.nav.savings, type: 'page' },
    { id: 'home', label: t.nav.contact, type: 'scroll', target: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || currentPage !== 'home' ? (isDarkMode ? 'bg-slate-950/95 py-3' : 'bg-white/95 py-3 shadow-lg') : 'bg-transparent py-6'} backdrop-blur-md border-b border-white/5`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button onClick={() => setCurrentPage('home')}><Logo /></button>
          
          <div className="hidden md:flex space-x-6 items-center font-bold text-[10px] uppercase tracking-widest">
            {navItems.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  if (item.type === 'page') setCurrentPage(item.id);
                  else {
                    setCurrentPage('home');
                    setTimeout(() => {
                      const element = document.getElementById(item.target);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className={`${isDarkMode || (!scrolled && currentPage === 'home') ? 'text-white' : 'text-slate-900'} hover:text-blue-500 transition-colors ${currentPage === item.id && item.type === 'page' ? 'text-blue-600' : ''}`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="relative">
              <button onClick={() => setShowLangMenu(!showLangMenu)} className={`flex items-center space-x-1 ${isDarkMode || (!scrolled && currentPage === 'home') ? 'text-white' : 'text-slate-900'} bg-white/10 dark:bg-slate-800 p-2 rounded-lg border border-white/10`}><Globe className="w-3 h-3" /><span>{languages.find(l => l.code === lang).label}</span></button>
              {showLangMenu && (
                <div className="absolute top-full mt-2 right-0 bg-white dark:bg-slate-800 shadow-2xl rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden min-w-[100px]">
                  {languages.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l.code); setShowLangMenu(false); }} className={`w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs font-bold ${lang === l.code ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300'}`}>{l.label}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={isDarkMode || (!scrolled && currentPage === 'home') ? 'text-white' : 'text-slate-900'}>{isOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const SavingsPage = ({ t, setCurrentPage }) => {
  const cards = [
    { icon: <Sun className="w-8 h-8 text-yellow-500" />, ...t.savingsPage.solar, color: "yellow" },
    { icon: <Zap className="w-8 h-8 text-blue-500" />, ...t.savingsPage.pump, color: "blue" },
    { icon: <BatteryCharging className="w-8 h-8 text-green-500" />, ...t.savingsPage.bundle, color: "green", featured: true },
  ];

  return (
    <section className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{t.savingsPage.title}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.savingsPage.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className={`relative p-8 rounded-[3rem] border transition-all duration-500 ${card.featured ? 'bg-blue-600 border-blue-500 text-white shadow-2xl scale-105 z-10' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 dark:text-white hover:border-blue-400'}`}>
              {card.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-blue-950 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">Best Value</div>}
              <div className={`p-4 rounded-2xl w-fit mb-6 ${card.featured ? 'bg-white/20' : 'bg-slate-50 dark:bg-slate-900'}`}>{card.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{card.t}</h3>
              <div className={`text-4xl font-black mb-6 ${card.featured ? 'text-white' : 'text-blue-600'}`}>{card.s}</div>
              <p className={`text-sm leading-relaxed mb-8 ${card.featured ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>{card.d}</p>
              <button 
                onClick={() => {setCurrentPage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}), 100)}}
                className={`w-full py-4 rounded-2xl font-black transition-all ${card.featured ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Get Custom Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GrantsPage = ({ t, setCurrentPage }) => {
  return (
    <section className="pt-32 pb-24 min-h-screen animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{t.grantsPage.title}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.grantsPage.subtitle}</p>
        </div>

        <div className="grid gap-8 mb-16">
          {t.grantsPage.items.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-blue-500 transition-all group">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                   <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg"><FileText className="w-5 h-5 text-blue-600" /></div>
                   <h3 className="text-xl font-bold dark:text-white group-hover:text-blue-600 transition-colors">{item.t}</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400">{item.d}</p>
              </div>
              <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black whitespace-nowrap">{item.v}</div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-10 rounded-[3rem] border border-blue-100 dark:border-blue-800/50 text-center">
          <div className="flex justify-center mb-6"><CheckCircle2 className="w-12 h-12 text-blue-600" /></div>
          <h2 className="text-2xl font-bold dark:text-white mb-4">Expert Application Support</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto text-lg">{t.grantsPage.helpText}</p>
          <button 
            onClick={() => {setCurrentPage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}), 100)}}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/30"
          >
            {t.grantsPage.contactBtn}
          </button>
        </div>
      </div>
    </section>
  );
}

// --- Main App ---

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState('en'); 
  const [currentPage, setCurrentPage] = useState('home'); 
  
  const [images, setImages] = useState({ 
    hero: "/hero.jpg",
    solar: "/solar.jpg",
    pump: "/pump.jpg",
    contact: "/contact.jpg"
  });

  const t = translations[lang];

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDarkMode(hour >= 18 || hour <= 6);
  }, []);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-slate-950 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-1000 min-h-screen">
        
        <Navbar isDarkMode={isDarkMode} lang={lang} setLang={setLang} t={t} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        {currentPage === 'home' ? (
          <>
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent z-10" />
                <img src={images.hero} alt="London Solar Home" className="w-full h-full object-cover scale-105 animate-slow-zoom" />
              </div>
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
                    <TrendingDown className="w-3 h-3" /><span>{t.hero.badge}</span>
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-8 tracking-tighter">
                    {t.hero.title}<span className="text-blue-500">{t.hero.accent}</span>{t.hero.cost}
                  </h1>
                  <p className="text-xl text-slate-300 mb-10 leading-relaxed font-medium">{t.hero.desc}</p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all shadow-2xl shadow-blue-600/40 flex items-center justify-center">
                      {t.hero.consultBtn}<ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <button onClick={() => setCurrentPage('savings')} className="bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-2xl text-lg font-bold transition-all">Check Savings</button>
                  </div>
                </div>
              </div>
            </section>

            <section id="solar" className="py-24 border-b border-slate-100 dark:border-slate-800">
              <div className="max-w-7xl mx-auto px-4">
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                   <div className="space-y-6">
                     <h2 className="text-4xl font-black dark:text-white">{t.services.s1.t}</h2>
                     <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{t.services.s1.d}</p>
                     <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center group">
                       {lang === 'en' ? 'Learn More' : lang === 'pl' ? 'Dowiedz się więcej' : 'Дізнатися більше'} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                     </button>
                   </div>
                   <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video bg-slate-900">
                     <img src={images.solar} alt="Solar" className="w-full h-full object-cover" />
                   </div>
                 </div>
              </div>
            </section>

            <section id="pumps" className="py-24 bg-slate-50 dark:bg-slate-900/50">
              <div className="max-w-7xl mx-auto px-4">
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                   <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video bg-slate-900 order-2 md:order-1">
                     <img src={images.pump} alt="Heat Pump" className="w-full h-full object-cover" />
                   </div>
                   <div className="space-y-6 order-1 md:order-2">
                     <h2 className="text-4xl font-black dark:text-white">{t.services.s2.t}</h2>
                     <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{t.services.s2.d}</p>
                     <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center group">
                       {lang === 'en' ? 'Get Quote' : lang === 'pl' ? 'Otrzymaj wycenę' : 'Отримати пропозицію'} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                     </button>
                   </div>
                 </div>
              </div>
            </section>

            <section id="contact" className="py-24 relative overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-10 grayscale">
                 <img src={images.contact} alt="Office" className="w-full h-full object-cover" />
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t.contact.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">{t.contact.desc}</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <button className="w-full p-6 rounded-3xl border transition-all text-left flex items-center space-x-4 bg-white dark:bg-slate-800 dark:text-white hover:border-blue-500 group">
                      <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><Phone className="w-6 h-6" /></div>
                      <div><p className="text-xs font-bold uppercase tracking-widest opacity-70">{t.contact.call}</p><p className="text-xl font-bold">+44 20 7946 0000</p></div>
                    </button>
                    <button className="w-full p-6 rounded-3xl border transition-all text-left flex items-center space-x-4 bg-white dark:bg-slate-800 dark:text-white hover:border-blue-500 group">
                      <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><Mail className="w-6 h-6" /></div>
                      <div><p className="text-xs font-bold uppercase tracking-widest opacity-70">{t.contact.email}</p><p className="text-xl font-bold">hello@luminagrid.co.uk</p></div>
                    </button>
                    <div className="p-6 bg-slate-100 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-600">
                       <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400 text-sm mb-2"><Clock className="w-4 h-4" /><span>{t.contact.hours}</span></div>
                       <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400 text-sm"><MapPin className="w-4 h-4" /><span>{t.contact.office}</span></div>
                    </div>
                  </div>
                  <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-700">
                    <h3 className="text-2xl font-bold dark:text-white mb-8">{t.contact.formTitle}</h3>
                    <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.contact.name}</label><input type="text" className="w-full p-4 rounded-2xl border dark:bg-slate-900 dark:text-white outline-none focus:border-blue-500 transition-all" /></div>
                      <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.contact.postcode}</label><input type="text" className="w-full p-4 rounded-2xl border dark:bg-slate-900 dark:text-white outline-none focus:border-blue-500 transition-all" /></div>
                      <div className="md:col-span-2 space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.contact.message}</label><textarea rows="4" className="w-full p-4 rounded-2xl border dark:bg-slate-900 dark:text-white outline-none focus:border-blue-500 transition-all"></textarea></div>
                      <button className="md:col-span-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all active:scale-95">{t.contact.send}</button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : currentPage === 'grants' ? (
          <GrantsPage t={t} setCurrentPage={setCurrentPage} />
        ) : (
          <SavingsPage t={t} setCurrentPage={setCurrentPage} />
        )}

        <footer className="bg-slate-950 text-slate-500 py-20 border-t border-white/5 text-center">
          <div className="max-w-7xl mx-auto px-4">
             <div className="flex flex-col items-center mb-10"><Logo /></div>
             <div className="pt-10 border-t border-white/5 text-[10px] uppercase tracking-[0.4em] font-bold text-slate-600">
               Lumina Grid London — Future-Proofing the Capital © 2026
             </div>
          </div>
        </footer>
      </div>
      <style>{`
        @keyframes slow-zoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-slow-zoom { animation: slow-zoom 20s ease-in-out infinite alternate; }
      `}</style>
    </div>
  );
}
