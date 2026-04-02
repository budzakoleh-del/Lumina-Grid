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
  BatteryCharging,
  ShieldCheck,
  Award,
  Wrench,
  Home,
  ChevronRight,
  Check
} from 'lucide-react';

// --- SEO & Conversion Optimized Localization Data ---
const translations = {
  en: {
    nav: { solar: "Solar Panels", pumps: "Heat Pumps", grants: "Grants", savings: "Savings", contact: "Get Quote" },
    hero: { 
      badge: "Expert Solar & Heat Pump Installers in London", 
      title: "Cut Your Energy Bills by Up to ", 
      accent: "70%", 
      cost: " Today.", 
      desc: "MCS-certified solar panel and air source heat pump installations across Greater London. We manage your £7,500 government grant application from start to finish.", 
      consultBtn: "Calculate Your Savings", 
      casesBtn: "View Case Studies" 
    },
    trust: {
      mcs: "MCS Certified Installers",
      trustmark: "TrustMark Approved",
      warranty: "10-Year Workmanship Warranty"
    },
    services: {
      s1: { t: "Solar Panel Installation in London", d: "Maximize your roof's potential with premium Tier-1 solar PV systems. Designed specifically for UK weather to deliver year-round electricity savings and energy independence." },
      s2: { t: "Air Source Heat Pumps (ASHP)", d: "Replace your old gas boiler with an ultra-efficient, whisper-quiet heat pump. Eligible for the £7,500 Boiler Upgrade Scheme grant with zero repayment required." },
      s3: { t: "Battery Storage Ecosystems", d: "Don't lose your generated solar power. Our smart battery storage solutions allow you to store cheap daytime energy and power your home through the night." }
    },
    grantsPage: {
      title: "UK Government Green Energy Grants 2026",
      subtitle: "Navigating financial support for your home transition. We handle the paperwork so you don't have to.",
      helpText: "Our dedicated grants team manages the entire application process. From initial home survey to MCS certification and final payout, we ensure you receive maximum funding.",
      contactBtn: "Check Your Grant Eligibility",
      items: [
        { t: "Boiler Upgrade Scheme (BUS)", v: "£7,500 Fixed Grant", d: "Upfront voucher available for Air Source and Ground Source heat pumps. Directly lowers your installation cost." },
        { t: "0% VAT Exemption", v: "Save 20% Instantly", d: "The UK government has extended the 0% VAT rate on energy-saving materials, including solar panels and batteries, until 2027." },
        { t: "Smart Export Guarantee (SEG)", v: "Earn Money Back", d: "Get paid by your energy supplier for every excess kWh of renewable electricity you export back to the National Grid." }
      ]
    },
    savingsPage: {
      title: "Projected Energy Savings in London",
      subtitle: "Based on current UK energy price caps and average London property consumption.",
      solar: { t: "Solar PV System", s: "Up to £1,200/yr", d: "Slash daytime electricity bills. Average system payback period is currently between 6 to 8 years." },
      pump: { t: "Heat Pump Upgrade", s: "Up to £900/yr", d: "Operates at 300-400% efficiency compared to gas. Massive savings when replacing old electric or oil heating." },
      bundle: { t: "The Complete Bundle", s: "Up to £2,800/yr", d: "Solar + Heat Pump + Battery. Achieve near-total grid independence and protect yourself against future energy price hikes." }
    },
    contact: { 
      title: "Get Your Custom Energy Plan.", 
      desc: "Complete our quick 3-step form to receive a tailored estimate for your London property.", 
      call: "Call Experts", 
      email: "Email Us", 
      wa: "WhatsApp", 
      hours: "Mon-Fri, 8am - 6pm", 
      office: "Canary Wharf, London"
    },
    form: {
      step1Title: "What are you interested in?",
      optSolar: "Solar Panels", optPump: "Heat Pump", optBoth: "Solar + Pump",
      step2Title: "What is your property type?",
      optDetached: "Detached", optSemi: "Semi-detached", optTerraced: "Terraced", optFlat: "Flat/Apartment",
      step3Title: "Where is the property located?",
      postcode: "Enter your Postcode",
      step4Title: "Where should we send your estimate?",
      name: "Full Name", email: "Email Address", phone: "Phone Number",
      btnNext: "Next Step", btnSubmit: "Get My Free Quote",
      successTitle: "Request Received!", successDesc: "One of our London energy experts will call you shortly to discuss your custom savings plan."
    }
  },
  pl: {
    nav: { solar: "Fotowoltaika", pumps: "Pompy Ciepła", grants: "Dotacje", savings: "Oszczędności", contact: "Wycena" },
    hero: { badge: "Certyfikowany montaż w Londynie", title: "Obniż rachunki za prąd nawet o ", accent: "70%", cost: " już dziś.", desc: "Certyfikowane instalacje fotowoltaiczne i pompy ciepła (MCS). Załatwiamy za Ciebie formalności związane z dotacją £7,500.", consultBtn: "Oblicz swoje oszczędności", casesBtn: "Realizacje" },
    trust: { mcs: "Certyfikat MCS", trustmark: "Zatwierdzone przez TrustMark", warranty: "10 Lat Gwarancji na Montaż" },
    services: {
      s1: { t: "Montaż Paneli Fotowoltaicznych", d: "Maksymalizuj potencjał swojego dachu dzięki panelom klasy premium, zaprojektowanym z myślą o brytyjskiej pogodzie." },
      s2: { t: "Pompy Ciepła (Powietrzne)", d: "Wymień stary piec gazowy na cichą i wydajną pompę ciepła. Otrzymaj £7,500 bezzwrotnej dotacji z programu BUS." },
      s3: { t: "Magazyny Energii", d: "Nie trać wyprodukowanej energii. Nasze inteligentne baterie pozwalają na magazynowanie taniego prądu na noc." }
    },
    grantsPage: { title: "Rządowe Dotacje na Zieloną Energię", subtitle: "Przeprowadzimy Cię przez gąszcz przepisów w UK. Odbierz swoje dofinansowanie bez stresu.", helpText: "Zarządzamy całym procesem. Od audytu po certyfikat MCS i ostateczną wypłatę środków.", contactBtn: "Sprawdź, czy kwalifikujesz się do dotacji", items: [ { t: "Boiler Upgrade Scheme (BUS)", v: "£7,500 Dotacji", d: "Bezzwrotny voucher na powietrzne lub gruntowe pompy ciepła, obniżający koszty montażu." }, { t: "0% VAT", v: "Oszczędź 20%", d: "Stawka 0% VAT na fotowoltaikę i baterie obowiązuje do 2027 roku." }, { t: "Smart Export Guarantee (SEG)", v: "Zarabiaj na prądzie", d: "Otrzymuj pieniądze za nadwyżki wyprodukowanej energii oddane do sieci." } ] },
    savingsPage: { title: "Szacowane Oszczędności w Londynie", subtitle: "Kalkulacje oparte na obecnych cenach prądu w UK.", solar: { t: "Sama Fotowoltaika", s: "Do £1,200/rok", d: "Znacznie niższe rachunki za prąd. Średni czas zwrotu to 6-8 lat." }, pump: { t: "Wymiana na Pompę Ciepła", s: "Do £900/rok", d: "Pompa działa ze sprawnością 300-400% w porównaniu do gazu." }, bundle: { t: "Kompletny Pakiet", s: "Do £2,800/rok", d: "Panele + Pompa + Bateria. Osiągnij prawie całkowitą niezależność energetyczną." } },
    contact: { title: "Twój Indywidualny Plan Energetyczny.", desc: "Wypełnij krótki formularz, aby otrzymać bezpłatną wycenę dla Twojego domu.", call: "Zadzwoń do nas", email: "Napisz e-mail", wa: "WhatsApp", hours: "Pn-Pt, 8:00 - 18:00", office: "Canary Wharf, Londyn" },
    form: { step1Title: "Czym jesteś zainteresowany?", optSolar: "Fotowoltaiką", optPump: "Pompą Ciepła", optBoth: "Fotowoltaika + Pompa", step2Title: "Rodzaj nieruchomości?", optDetached: "Wolnostojący", optSemi: "Bliźniak", optTerraced: "Szeregowiec", optFlat: "Mieszkanie", step3Title: "Gdzie znajduje się nieruchomość?", postcode: "Wpisz kod pocztowy (Postcode)", step4Title: "Gdzie wysłać wycenę?", name: "Imię i Nazwisko", email: "Adres E-mail", phone: "Numer Telefonu", btnNext: "Następny Krok", btnSubmit: "Uzyskaj Darmową Wycenę", successTitle: "Zapytanie Otrzymane!", successDesc: "Nasz polskojęzyczny ekspert z Londynu skontaktuje się z Tobą wkrótce." }
  },
  uk: {
    nav: { solar: "Сонячні панелі", pumps: "Теплові насоси", grants: "Гранти", savings: "Економія", contact: "Отримати ціну" },
    hero: { badge: "Експертний монтаж сонячних панелей та теплових насосів", title: "Знизьте рахунки за енергію до ", accent: "70%", cost: " вже сьогодні.", desc: "Сертифіковане встановлення сонячних панелей та теплових насосів у Великому Лондоні. Ми повністю оформлюємо для вас державний грант у розмірі £7,500.", consultBtn: "Розрахувати економію", casesBtn: "Наші кейси" },
    trust: { mcs: "Сертифікація MCS", trustmark: "Схвалено TrustMark", warranty: "10 років гарантії на роботу" },
    services: {
      s1: { t: "Встановлення сонячних панелей у Лондоні", d: "Максимізуйте потенціал вашого даху за допомогою преміальних сонячних систем Tier-1, розроблених спеціально для мінливої британської погоди." },
      s2: { t: "Повітряні теплові насоси", d: "Замініть старий газовий котел на надефективний тепловий насос. Доступний державний грант £7,500, який не потрібно повертати." },
      s3: { t: "Системи зберігання енергії", d: "Не втрачайте згенеровану сонячну енергію. Наші розумні батареї дозволяють зберігати дешеву енергію вдень для використання вночі." }
    },
    grantsPage: { title: "Державні гранти Великої Британії 2026", subtitle: "Фінансова підтримка для переходу на зелену енергію. Ми беремо всю паперову роботу на себе.", helpText: "Наш відділ з грантів повністю контролює процес подачі заявки. Від першого огляду до сертифікації MCS та фінальної виплати.", contactBtn: "Перевірити можливість гранту", items: [ { t: "Схема оновлення котлів (BUS)", v: "Фіксований грант £7,500", d: "Пряма знижка на встановлення теплового насоса. Гроші перераховуються безпосередньо для здешевлення монтажу." }, { t: "0% ПДВ (VAT)", v: "Економія 20% одразу", d: "Уряд Британії подовжив нульову ставку ПДВ на енергозберігаючі матеріали до 2027 року." }, { t: "Smart Export Guarantee (SEG)", v: "Заробляйте гроші", d: "Отримуйте виплати від вашого постачальника за надлишки електроенергії, які ви віддаєте в мережу." } ] },
    savingsPage: { title: "Прогнозована економія у Лондоні", subtitle: "На основі поточних цін на електроенергію в UK та середнього споживання.", solar: { t: "Сонячні панелі", s: "До £1,200/рік", d: "Значне зменшення денних рахунків. Окупність системи складає 6-8 років." }, pump: { t: "Тепловий насос", s: "До £900/рік", d: "Ефективність 300-400% порівняно з газом. Величезна економія при заміні електричного опалення." }, bundle: { t: "Повний пакет", s: "До £2,800/рік", d: "Панелі + Насос + Батарея. Здобудьте незалежність від мережі та захистіть себе від росту цін." } },
    contact: { title: "Отримайте ваш план енергозбереження.", desc: "Заповніть просту форму за 3 кроки для отримання індивідуального розрахунку.", call: "Подзвонити нам", email: "Написати", wa: "WhatsApp", hours: "Пн-Пт, 08:00 - 18:00", office: "Головний офіс: Canary Wharf, London" },
    form: { step1Title: "Що вас цікавить?", optSolar: "Сонячні панелі", optPump: "Тепловий насос", optBoth: "Панелі + Насос", step2Title: "Який у вас тип будинку?", optDetached: "Окремий (Detached)", optSemi: "Напіввідокремлений", optTerraced: "Таунхаус", optFlat: "Квартира", step3Title: "Де знаходиться будинок?", postcode: "Введіть ваш Postcode", step4Title: "Куди надіслати пропозицію?", name: "Повне ім'я", email: "Email адреса", phone: "Номер телефону", btnNext: "Наступний крок", btnSubmit: "Отримати безкоштовний розрахунок", successTitle: "Заявку отримано!", successDesc: "Наш експерт зателефонує вам найближчим часом для обговорення деталей." }
  },
  hi: {
    nav: { solar: "सौर ऊर्जा", pumps: "हीट पंप", grants: "अनुदान", savings: "बचत", contact: "संपर्क" },
    hero: { badge: "लंदन में विशेषज्ञ सौर और हीट पंप स्थापना", title: "अपने ऊर्जा बिल को ", accent: "70%", cost: " तक कम करें।", desc: "लंदन के लिए कस्टम सौर और हीटिंग समाधान। हम £7,500 सरकारी अनुदान को संभालते हैं।", consultBtn: "मुफ्त अनुमान प्राप्त करें", casesBtn: "केस स्टडीज देखें" },
    trust: { mcs: "MCS प्रमाणित", trustmark: "TrustMark स्वीकृत", warranty: "10 वर्ष की वारंटी" },
    services: {
      s1: { t: "सौर पैनल स्थापना", d: "प्रीमियम टियर-1 पीवी पैनल के साथ अपने लंदन घर को शक्ति दें।" },
      s2: { t: "वायु स्रोत हीट पंप", d: "पुराने गैस बॉयलर को बदलें और £7,500 का अनुदान प्राप्त करें।" },
      s3: { t: "बैटरी संग्रहण", d: "अपनी सौर ऊर्जा को रात में उपयोग के लिए स्टोर करें।" }
    },
    grantsPage: { title: "सरकारी अनुदान 2026", subtitle: "यूके में हरित ऊर्जा परिदृश्य।", helpText: "हम संपूर्ण आवेदन प्रक्रिया का प्रबंधन करते हैं।", contactBtn: "अनुदान के लिए संपर्क करें", items: [ { t: "BUS अनुदान", v: "£7,500 अनुदान", d: "हीट पंपों के लिए उपलब्ध।" }, { t: "0% वैट (VAT)", v: "तुरंत 20% बचाएं", d: "सौर पीवी पर 0% वैट।" }, { t: "SEG", v: "प्रति kWh कमाएं", d: "अतिरिक्त ऊर्जा ग्रिड को वापस भेजें।" } ] },
    savingsPage: { title: "आप कितनी बचत कर सकते हैं?", subtitle: "लंदन 2026 में ऊर्जा लागत में कटौती।", solar: { t: "सौर पीवी", s: "£1,200/वर्ष तक", d: "बिजली बिलों में 60-70% की कटौती।" }, pump: { t: "हीट पंप", s: "£900/वर्ष तक", d: "गैस की तुलना में 3-4 गुना अधिक कुशल।" }, bundle: { t: "संपूर्ण पैकेज", s: "£2,800/वर्ष तक", d: "सौर + पंप + बैटरी।" } },
    contact: { title: "अपना ग्रिड डिजाइन करें।", desc: "अनुकूलित अनुमान के लिए फॉर्म भरें।", call: "हमें कॉल करें", email: "ईमेल करें", wa: "WhatsApp", hours: "सोम-शुक्र, 8-6", office: "कैनरी वार्फ, लंदन" },
    form: { step1Title: "आपकी रुचि किसमें है?", optSolar: "सौर पैनल", optPump: "हीट पंप", optBoth: "दोनों", step2Title: "संपत्ति का प्रकार?", optDetached: "स्वतंत्र", optSemi: "अर्ध-स्वतंत्र", optTerraced: "टेरेस्ड", optFlat: "फ्लैट", step3Title: "पिन कोड?", postcode: "अपना पोस्टकोड दर्ज करें", step4Title: "संपर्क विवरण?", name: "नाम", email: "ईमेल", phone: "फोन", btnNext: "अगला", btnSubmit: "अनुरोध भेजें", successTitle: "प्राप्त हुआ!", successDesc: "हम जल्द ही आपसे संपर्क करेंगे।" }
  },
  ru: {
    nav: { solar: "Солнечные панели", pumps: "Тепловые насосы", grants: "Гранты", savings: "Экономия", contact: "Цены" },
    hero: { badge: "Экспертный монтаж солнечных панелей в Лондоне", title: "Сократите счета за свет на ", accent: "70%", cost: " уже сегодня.", desc: "MCS-сертифицированные установки солнечных систем и тепловых насосов. Мы оформляем государственный грант на £7,500 под ключ.", consultBtn: "Рассчитать выгоду", casesBtn: "Наши кейси" },
    trust: { mcs: "MCS Сертификация", trustmark: "Одобрено TrustMark", warranty: "10 лет гарантии на монтаж" },
    services: {
      s1: { t: "Установка солнечных панелей", d: "Максимизируйте потенциал вашей крыши с премиальными панелями Tier-1, разработанными для погоды Великобритании." },
      s2: { t: "Тепловые насосы", d: "Замените старый котел на ультра-эффективный тепловой насос. Доступен грант £7,500 (BUS) без возврата." },
      s3: { t: "Аккумуляторные системы", d: "Не теряйте выработанную энергию. Умные батареи запасают дешевое электричество для использования ночью." }
    },
    grantsPage: { title: "Государственные гранты Великобритании 2026", subtitle: "Финансовая поддержка вашего перехода на зеленую энергию. Всю бюрократию мы берем на себя.", helpText: "Наш отдел полностью ведет процесс заявки. От первого аудита до выплаты финансирования.", contactBtn: "Проверить доступность гранта", items: [ { t: "Boiler Upgrade Scheme (BUS)", v: "Грант £7,500", d: "Прямая субсидия на тепловые насосы, снижающая общую стоимость установки." }, { t: "0% НДС (VAT)", v: "Экономия 20%", d: "Британское правительство обнулило НДС на зеленые технологии до 2027 года." }, { t: "Smart Export Guarantee", v: "Зарабатывайте", d: "Получайте деньги за излишки энергии, которые вы отдаете обратно в сеть." } ] },
    savingsPage: { title: "Прогнозируемая экономия в Лондоне", subtitle: "Основано на текущих тарифах и среднем потреблении.", solar: { t: "Солнечные панели", s: "До £1,200/год", d: "Резкое снижение дневных счетов. Окупаемость системы около 6-8 лет." }, pump: { t: "Тепловой насос", s: "До £900/год", d: "Эффективность до 400% по сравнению с газом. Огромная экономия." }, bundle: { t: "Полный пакет", s: "До £2,800/год", d: "Панели + Насос + Батарея. Полная независимость от роста тарифов." } },
    contact: { title: "Получите ваш план энергосбережения.", desc: "Заполните форму из 3 шагов для получения точного расчета.", call: "Позвонить", email: "Написать", wa: "WhatsApp", hours: "Пн-Пт, 08:00 - 18:00", office: "Главный офис: Canary Wharf, London" },
    form: { step1Title: "Что вас интересует?", optSolar: "Солнечные панели", optPump: "Тепловой насос", optBoth: "Панели + Насос", step2Title: "Тип вашего дома?", optDetached: "Отдельный дом", optSemi: "Смежный дом", optTerraced: "Таунхаус", optFlat: "Квартира", step3Title: "Где находится дом?", postcode: "Ваш Postcode", step4Title: "Куди отправить расчет?", name: "Полное имя", email: "Email адрес", phone: "Телефон", btnNext: "Следующий шаг", btnSubmit: "Получить расчет", successTitle: "Заявка принята!", successDesc: "Наш эксперт скоро свяжется с вами." }
  }
};

// --- Multi-Step Lead Generation Form Component ---
const LeadForm = ({ formT }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ interest: '', houseType: '', postcode: '', name: '', email: '', phone: '' });

  const handleNext = () => setStep(step + 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would trigger Google Ads Conversion Tracking (e.g., window.gtag)
    console.log("Lead Submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-green-500/30 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black dark:text-white mb-4">{formT.successTitle}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-lg">{formT.successDesc}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-700">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold dark:text-white">
          {step === 1 && formT.step1Title}
          {step === 2 && formT.step2Title}
          {step === 3 && formT.step3Title}
          {step === 4 && formT.step4Title}
        </h3>
        <span className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
          Step {step}/4
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Interest */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-right-4">
            {[formT.optSolar, formT.optPump, formT.optBoth].map((opt) => (
              <button 
                key={opt} type="button" 
                onClick={() => { setFormData({...formData, interest: opt}); handleNext(); }}
                className="p-6 text-lg font-bold border-2 rounded-2xl transition-all hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-white dark:border-slate-700"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Step 2: House Type */}
        {step === 2 && (
          <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-right-4">
            {[formT.optDetached, formT.optSemi, formT.optTerraced, formT.optFlat].map((opt) => (
              <button 
                key={opt} type="button" 
                onClick={() => { setFormData({...formData, houseType: opt}); handleNext(); }}
                className="p-6 text-lg font-bold border-2 rounded-2xl transition-all hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-white dark:border-slate-700"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Postcode */}
        {step === 3 && (
          <div className="animate-in slide-in-from-right-4 space-y-6">
             <input 
              type="text" autoFocus required placeholder={formT.postcode}
              value={formData.postcode} onChange={(e) => setFormData({...formData, postcode: e.target.value})}
              className="w-full p-5 text-xl rounded-2xl border-2 dark:bg-slate-900 dark:text-white dark:border-slate-700 outline-none focus:border-blue-500 transition-all uppercase" 
            />
            <button type="button" onClick={handleNext} disabled={formData.postcode.length < 3} className="w-full bg-blue-600 disabled:opacity-50 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center">
              {formT.btnNext} <ChevronRight className="ml-2" />
            </button>
          </div>
        )}

        {/* Step 4: Contact Details */}
        {step === 4 && (
          <div className="animate-in slide-in-from-right-4 space-y-4">
             <input type="text" required placeholder={formT.name} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl border-2 dark:bg-slate-900 dark:text-white dark:border-slate-700 outline-none focus:border-blue-500" />
             <input type="email" required placeholder={formT.email} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-2xl border-2 dark:bg-slate-900 dark:text-white dark:border-slate-700 outline-none focus:border-blue-500" />
             <input type="tel" required placeholder={formT.phone} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-4 rounded-2xl border-2 dark:bg-slate-900 dark:text-white dark:border-slate-700 outline-none focus:border-blue-500" />
            <button type="submit" className="w-full bg-green-600 text-white py-5 mt-2 rounded-2xl font-black text-xl hover:bg-green-700 transition-all shadow-xl shadow-green-600/30">
              {formT.btnSubmit}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};


// --- UI Components ---
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
                className={`${isDarkMode || (!scrolled && currentPage === 'home') ? 'text-white' : 'text-slate-900'} hover:text-blue-500 transition-colors ${item.id === 'home' && item.target === 'contact' ? 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white' : currentPage === item.id && item.type === 'page' ? 'text-blue-600' : ''}`}
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
      
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 px-4 py-6 border-b border-slate-100 dark:border-slate-800 flex flex-col items-center shadow-2xl">
          {navItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => { 
                setIsOpen(false); 
                if (item.type === 'page') setCurrentPage(item.id); 
                else { 
                  setCurrentPage('home'); 
                  setTimeout(() => document.getElementById(item.target)?.scrollIntoView({behavior:'smooth'}), 100); 
                } 
              }} 
              className="w-full py-4 text-sm font-bold uppercase tracking-widest dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="w-full mt-4 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-center gap-3">
            {languages.map((l) => (
              <button 
                key={l.code} 
                onClick={() => { setLang(l.code); setIsOpen(false); }} 
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${lang === l.code ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Pages ---

const SavingsPage = ({ t, setCurrentPage }) => {
  const cards = [
    { icon: <Sun className="w-8 h-8 text-yellow-500" />, ...t.savingsPage.solar },
    { icon: <Zap className="w-8 h-8 text-blue-500" />, ...t.savingsPage.pump },
    { icon: <BatteryCharging className="w-8 h-8 text-green-500" />, ...t.savingsPage.bundle, featured: true },
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
              <h2 className="text-2xl font-bold mb-2">{card.t}</h2>
              <div className={`text-4xl font-black mb-6 ${card.featured ? 'text-white' : 'text-blue-600'}`}>{card.s}</div>
              <p className={`text-sm leading-relaxed mb-8 ${card.featured ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>{card.d}</p>
              <button 
                onClick={() => {setCurrentPage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}), 100)}}
                className={`w-full py-4 rounded-2xl font-black transition-all ${card.featured ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {t.hero.consultBtn}
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
                   <h2 className="text-xl font-bold dark:text-white group-hover:text-blue-600 transition-colors">{item.t}</h2>
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
  const [lang, setLang] = useState('en'); // Англійська як основна
  const [currentPage, setCurrentPage] = useState('home'); 
  
  const [images, setImages] = useState({ 
    hero: "/hero.png",
    solar: "/solar.png",
    pump: "/pump.png",
    contact: "/contact.png"
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
            {/* HERO SECTION - H1 tag used for SEO */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent z-10" />
                <img src={images.hero} alt="London Solar Home Installation" className="w-full h-full object-cover scale-105 animate-slow-zoom" />
              </div>
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                    <TrendingDown className="w-4 h-4" /><span>{t.hero.badge}</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-8 tracking-tighter">
                    {t.hero.title}<span className="text-blue-500">{t.hero.accent}</span>{t.hero.cost}
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed font-medium">{t.hero.desc}</p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all shadow-2xl shadow-blue-600/40 flex items-center justify-center">
                      {t.hero.consultBtn}<ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <button onClick={() => setCurrentPage('savings')} className="bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-2xl text-lg font-bold transition-all">
                      {t.nav.savings}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* TRUST SIGNALS BANNER (Crucial for CRO) */}
            <section className="bg-blue-900 text-white py-6 border-b border-blue-800 relative z-30 shadow-xl">
              <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-8 h-8 text-blue-300" />
                  <span className="font-bold text-sm md:text-base uppercase tracking-wider">{t.trust.mcs}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-blue-300" />
                  <span className="font-bold text-sm md:text-base uppercase tracking-wider">{t.trust.trustmark}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wrench className="w-8 h-8 text-blue-300" />
                  <span className="font-bold text-sm md:text-base uppercase tracking-wider">{t.trust.warranty}</span>
                </div>
              </div>
            </section>

            {/* SERVICES SECTIONS - H2 tags used for SEO */}
            <section id="solar" className="py-24 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
              <div className="max-w-7xl mx-auto px-4">
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                   <div className="space-y-6">
                     <h2 className="text-4xl md:text-5xl font-black dark:text-white leading-tight">{t.services.s1.t}</h2>
                     <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{t.services.s1.d}</p>
                     <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center group">
                       {t.hero.consultBtn} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                     </button>
                   </div>
                   <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video bg-slate-900">
                     <img src={images.solar} alt={t.services.s1.t} className="w-full h-full object-cover" />
                   </div>
                 </div>
              </div>
            </section>

            <section id="pumps" className="py-24 bg-slate-50 dark:bg-slate-900/50">
              <div className="max-w-7xl mx-auto px-4">
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                   <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video bg-slate-900 order-2 md:order-1">
                     <img src={images.pump} alt={t.services.s2.t} className="w-full h-full object-cover" />
                   </div>
                   <div className="space-y-6 order-1 md:order-2">
                     <h2 className="text-4xl md:text-5xl font-black dark:text-white leading-tight">{t.services.s2.t}</h2>
                     <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{t.services.s2.d}</p>
                     <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center group">
                       {t.grantsPage.contactBtn} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                     </button>
                   </div>
                 </div>
              </div>
            </section>

            {/* MULTI-STEP LEAD CAPTURE SECTION (Replaced basic form) */}
            <section id="contact" className="py-24 relative overflow-hidden bg-slate-900">
              <div className="absolute inset-0 z-0 opacity-20 grayscale">
                 <img src={images.contact} alt="Lumina Grid Office" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 z-10" />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">{t.contact.title}</h2>
                  <p className="text-slate-300 text-lg">{t.contact.desc}</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Side: Trust & Contact Info */}
                  <div className="space-y-4">
                    <a href="tel:+442079460000" className="w-full p-6 rounded-3xl border border-white/10 transition-all text-left flex items-center space-x-4 bg-white/5 text-white hover:border-blue-500 hover:bg-white/10 group backdrop-blur-md block">
                      <div className="p-3 rounded-2xl bg-blue-600/30 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all"><Phone className="w-6 h-6" /></div>
                      <div><p className="text-xs font-bold uppercase tracking-widest opacity-70">{t.contact.call}</p><p className="text-xl font-bold">+44 20 7946 0000</p></div>
                    </a>
                    <a href="mailto:hello@luminagrid.co.uk" className="w-full p-6 rounded-3xl border border-white/10 transition-all text-left flex items-center space-x-4 bg-white/5 text-white hover:border-blue-500 hover:bg-white/10 group backdrop-blur-md block">
                      <div className="p-3 rounded-2xl bg-blue-600/30 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all"><Mail className="w-6 h-6" /></div>
                      <div><p className="text-xs font-bold uppercase tracking-widest opacity-70">{t.contact.email}</p><p className="text-xl font-bold">hello@luminagrid.co.uk</p></div>
                    </a>
                    <div className="p-6 bg-slate-900/50 rounded-3xl border border-dashed border-white/20 backdrop-blur-sm">
                       <div className="flex items-center space-x-3 text-slate-400 text-sm mb-3"><Clock className="w-5 h-5 text-slate-500" /><span>{t.contact.hours}</span></div>
                       <div className="flex items-center space-x-3 text-slate-400 text-sm mb-3"><MapPin className="w-5 h-5 text-slate-500" /><span>{t.contact.office}</span></div>
                       <div className="flex items-center space-x-3 text-green-400 text-sm font-bold"><ShieldCheck className="w-5 h-5" /><span>{t.trust.mcs}</span></div>
                    </div>
                  </div>
                  
                  {/* Right Side: Multi-Step Lead Form */}
                  <div className="lg:col-span-2">
                    <LeadForm formT={t.form} />
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
