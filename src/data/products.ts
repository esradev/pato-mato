export interface ProductColor {
  id: string;
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  persianName: string;
  subtitle: string;
  category: 'suitcases' | 'backpacks' | 'totes' | 'business' | 'accessories';
  price: number; // in Tomans
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  images: string[];
  material: string;
  weight: string;
  dimensions: {
    height: number; // cm
    width: number; // cm
    depth: number; // cm
  };
  capacity: string;
  colors: ProductColor[];
  cabinApproved: boolean;
  tsaLock: boolean;
  features: string[];
  airlineCompatibility: string[];
  description: string;
  specifications: Record<string, string>;
}

export interface Category {
  id: string;
  slug: 'suitcases' | 'backpacks' | 'totes' | 'business' | 'accessories';
  name: string;
  englishName: string;
  description: string;
  image: string;
  itemCount: number;
}

// Local generated image assets
export const ASSETS = {
  hero: '/src/assets/images/hero_luxury_luggage_1791111241993.jpg',
  suitcase: '/src/assets/images/product_cabin_suitcase_1791111256786.jpg',
  backpack: '/src/assets/images/product_urban_backpack_1791111269777.jpg',
  tote: '/src/assets/images/product_leather_tote_1791111281630.jpg',
};

export const CATEGORIES: Category[] = [
  {
    id: '1',
    slug: 'suitcases',
    name: 'چمدان‌های مسافرتی',
    englishName: 'Travel Suitcases',
    description: 'چمدان‌های بدنه پلی‌کربنات نشکن با قفل استاندارد TSA و چرخ‌های دوبل بی‌صدا',
    image: ASSETS.suitcase,
    itemCount: 18,
  },
  {
    id: '2',
    slug: 'backpacks',
    name: 'کوله‌پشتی‌های شهری و لپ‌تاپ',
    englishName: 'Urban Backpacks',
    description: 'طراحی مینیمال و ارگونومیک، پارچه آب‌گریز بالستیک و ضربه‌گیر اختصاصی',
    image: ASSETS.backpack,
    itemCount: 24,
  },
  {
    id: '3',
    slug: 'totes',
    name: 'کیف‌های چرم و دوشی',
    englishName: 'Leather & Shoulder Bags',
    description: 'دست‌دوز از چرم طبیعی با یراق‌آلات برنجی عیار بالا برای استایل روزمره و مجالس',
    image: ASSETS.tote,
    itemCount: 16,
  },
  {
    id: '4',
    slug: 'business',
    name: 'کیف‌های اداری و اسناد',
    englishName: 'Business Briefcases',
    description: 'محفظه امن لپ‌تاپ، اسناد سایز A4 و ساختار مستحکم و شیک ویژه مدیران و متخصصان',
    image: ASSETS.backpack,
    itemCount: 12,
  },
  {
    id: '5',
    slug: 'accessories',
    name: 'اکسسوری سفر و نظم‌دهنده',
    englishName: 'Travel Accessories',
    description: 'ست‌های پکینگ کیوب، کیف پاسپورت ضد سرقت RFID و تگ هوشمند چمدان',
    image: ASSETS.suitcase,
    itemCount: 15,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'pm-101',
    slug: 'aero-voyage-cabin-spinner',
    name: 'AeroVoyage Carbon S20',
    persianName: 'چمدان کابین آئروویج سایز ۲۰ (کابین پرواز)',
    subtitle: 'بدنه ۱۰۰٪ پلی‌کربنات ماکرولون آلمان با فریم آلومینیومی تقویت‌شده',
    category: 'suitcases',
    price: 6850000,
    discountPrice: 5980000,
    rating: 4.9,
    reviewsCount: 84,
    isFeatured: true,
    isNew: true,
    inStock: true,
    images: [ASSETS.suitcase, ASSETS.hero],
    material: 'پلی‌کربنات ۳ لایه Makrolon بایر آلمان با فریم آلومینیوم هوانوردی',
    weight: '۲.۹ کیلوگرم',
    dimensions: {
      height: 55,
      width: 38,
      depth: 23,
    },
    capacity: '۴۰ لیتر',
    colors: [
      { id: 'c1', name: 'مشکی کربن مات', hex: '#1C1917' },
      { id: 'c2', name: 'تیتانیوم نقره‌ای', hex: '#94A3B8' },
      { id: 'c3', name: 'شامپاینی برنز', hex: '#C2A374' },
    ],
    cabinApproved: true,
    tsaLock: true,
    features: [
      'سازگار با سایز استاندارد کابین تمامی ایرلاین‌های داخلی و خارجی (IATA Standard)',
      'قفل دوگانه توکار استاندارد جهانی TSA008 با رمز ۳ رقمی',
      '۴ چرخ دوبل ژاپنی Hinomoto با چرخش ۳۶۰ درجه و ژل جاذب لرزش',
      'دسته تلسکوپی چندمرحله‌ای از آلومینیوم فوق‌سبک با ارگونومی ضد تعریق',
      'پارتیشن‌بندی داخلی با جیب ضدآب اختصاصی البسه نم‌دار و کمربند فشرده‌سازی Y',
      '۵ سال گارانتی طلایی تعویض قطعات و بدنه پتو متو',
    ],
    airlineCompatibility: [
      'ایران‌ایر (Iran Air)',
      'ماهان (Mahan Air)',
      'امارات (Emirates)',
      'قطر ایرویز (Qatar Airways)',
      'ترکیش (Turkish Airlines)',
      'فلای‌دبی (Flydubai)',
      'لوفت‌هانزا (Lufthansa)',
    ],
    description:
      'چمدان کابین آئروویج سری اس۲۰ از برند پتو متو، برای مسافرانی طراحی شده است که زیبایی مینیمال را همراه با نهایت دوام و استقامت جستجو می‌کنند. بدنه این چمدان از پلی‌کربنات ماکرولون ۳ لایه با قابلیت بازگشت به حالت اولیه پس از ضربه ساخته شده و چارچوب دور آن با آلومینیوم آلیاژی تقویت شده است.',
    specifications: {
      'کشور سازنده متریال': 'آلمان و ژاپن (مونتاژ اختصاصی پتو متو)',
      'نوع قفل': 'TSA 008 بین‌المللی توکار',
      'جنس چرخ': 'هینوموتو ژاپن (روکش پلی‌اورتان ضد سایش)',
      'گارانتی': '۶۰ ماه ضمانت تعویض چرخ، دسته و قفل',
      'مقاومت در برابر نفوذ آب': 'دارای زیپ محافظ با روکش PU ضد آب',
    },
  },
  {
    id: 'pm-102',
    slug: 'zenith-urban-tech-backpack',
    name: 'Zenith TechPack Pro',
    persianName: 'کوله‌پشتی اداری و لپ‌تاپ زنیت پرو ۱۶ اینچ',
    subtitle: 'ضدآب کامل، محفظه اختصاصی محافظ لپ‌تاپ و پورت شارژ سریع مخفی',
    category: 'backpacks',
    price: 3450000,
    discountPrice: 2950000,
    rating: 4.8,
    reviewsCount: 112,
    isFeatured: true,
    isNew: true,
    inStock: true,
    images: [ASSETS.backpack],
    material: 'نایلون بالستیک چگالی بالای ۱۶۸۰D ضد خش و ضد پارگی',
    weight: '۱.۱ کیلوگرم',
    dimensions: {
      height: 46,
      width: 31,
      depth: 16,
    },
    capacity: '۲۵ لیتر',
    colors: [
      { id: 'c1', name: 'خاکستری زغالی', hex: '#334155' },
      { id: 'c2', name: 'مشکی مات', hex: '#0F172A' },
      { id: 'c3', name: 'سبز سدری تیره', hex: '#374151' },
    ],
    cabinApproved: true,
    tsaLock: false,
    features: [
      'محفظه معلق اسفنجی ضددربه سازگار با لپ‌تاپ‌های تا ۱۶ اینچ (مک‌بوک پرو و سرفیس)',
      'زیپ‌های اصلی ضدنفوذ YKK ضد سرقت با گیره امنیتی',
      'پد پشتی طبی اسفنجی با کانال جریان هوای ۳D برای جلوگیری از تعریق کمر',
      'بند اتصال اختصاصی به دسته تلسکوپی چمدان در سفرهای پروازی',
      'جیب مخفی ضد سرقت در قسمت تکیه‌گاه پشتی برای پاسپورت و مدارک',
      'محفظه کابل شارژ Type-C ضد نفوذ رطوبت',
    ],
    airlineCompatibility: ['پذیرش به عنوان ساک دستی زیر صندلی در تمام خطوط هوایی'],
    description:
      'کوله‌پشتی زنیت پرو نماد طراحی مینیمال و عملکرد فوق‌العاده است. ساختار پارچه بالستیک با درجه مقاومت نظامی تضمین می‌کند لپ‌تاپ و ابزارهای الکترونیکی شما در هوای بارانی و رفت‌وآمدهای شلوغ شهری کاملاً مصون بمانند.',
    specifications: {
      'مناسب لپ‌تاپ': 'تا ۱۶.۲ اینچ',
      'جنس پارچه': 'Balistic Nylon 1680D ضد آب',
      'نوع زیپ': 'YKK ژاپن ضد نفوذ آب',
      'گارانتی': '۲۴ ماه ضمانت سلامت دوخت و یراق',
    },
  },
  {
    id: 'pm-103',
    slug: 'florence-artisan-leather-tote',
    name: 'Florence Heritage Tote',
    persianName: 'کیف دستی و دوشی چرم طبیعی فلورانس',
    subtitle: 'چرم گاوی درجه یک دباغی گیاهی با دوخت دست و بند متحرک ابریشمی',
    category: 'totes',
    price: 4900000,
    rating: 4.9,
    reviewsCount: 57,
    isFeatured: true,
    isNew: false,
    inStock: true,
    images: [ASSETS.tote],
    material: 'چرم طبیعی فول‌گرین دباغی گیاهی (ایتالیایی)',
    weight: '۸۵۰ گرم',
    dimensions: {
      height: 34,
      width: 40,
      depth: 14,
    },
    capacity: '۱۹ لیتر',
    colors: [
      { id: 'c1', name: 'عسلی کاراملی', hex: '#A16207' },
      { id: 'c2', name: 'قهوه‌ای اسپرسو', hex: '#451A03' },
      { id: 'c3', name: 'مشکی کلاسیک', hex: '#18181B' },
    ],
    cabinApproved: true,
    tsaLock: false,
    features: [
      'تولید شده از مرغوب‌ترین چرم طبیعی فول‌گرین با بافت طبیعی و عطر اصیل چرم',
      'آستر داخلی جیر مخملی ضد خش با دوخت تقویت‌شده گوشه‌ها',
      'دارای کیف آرایشی و مدارک کوچک جداشونده همرنگ با زنجیر برنجی',
      'یراق‌آلات تمام برنج مات با آبکاری ضداکسیداسیون ۳ لایه',
      'پایه‌های محافظ کف کیف از جنس برنجی جهت عدم تماس با زمین',
    ],
    airlineCompatibility: ['پذیرش به عنوان کیف شخصی (Personal Item) در تمامی پروازها'],
    description:
      'کیف فلورانس هریتیج تجسم اصالت و وقار است. چرم طبیعی با گذشت زمان پتینه‌ای منحصر‌به‌فرد پیدا کرده و روز‌به‌روز زیباتر می‌شود. برای جلسات کاری، قرارهای عصرگاهی یا استفاده روزمره شهری انتخابی بی‌همتاست.',
    specifications: {
      'جنس چرم': 'چرم گاوی طبیعی ۱۰۰٪ Full Grain',
      'جنس یراق': 'برنج ضد زنگ با پوشش مات ضد خط',
      'ابعاد داخلی': 'مناسب لپ‌تاپ ۱۳ اینچ، تبلت، نوت‌بوک و کیف پول',
      'خدمات': 'شامل بسته‌بندی نفیس هاردباکس و کاور پارچه‌ای اختصاصی',
    },
  },
  {
    id: 'pm-104',
    slug: 'grand-voyage-checkin-luggage',
    name: 'GrandVoyage Check-in L28',
    persianName: 'چمدان بار بزرگ گرندویج سایز ۲۸',
    subtitle: 'ظرفیت ۱۱۰ لیتر ویژه سفرهای بلندمدت خانوادگی و مهاجرتی',
    category: 'suitcases',
    price: 8900000,
    discountPrice: 7900000,
    rating: 5.0,
    reviewsCount: 63,
    isFeatured: true,
    isNew: false,
    inStock: true,
    images: [ASSETS.hero, ASSETS.suitcase],
    material: 'پلی‌کربنات ماکرولون با لبه‌های ضد ضربه آلومینیومی زاویه‌دار',
    weight: '۴.۵ کیلوگرم',
    dimensions: {
      height: 76,
      width: 52,
      depth: 31,
    },
    capacity: '۱۱۰ لیتر',
    colors: [
      { id: 'c1', name: 'خاکستری متالیک', hex: '#64748B' },
      { id: 'c2', name: 'مشکی کربن', hex: '#0F172A' },
      { id: 'c3', name: 'شامپاینی متالیک', hex: '#D4AF37' },
    ],
    cabinApproved: false,
    tsaLock: true,
    features: [
      'طراحی ویژه چمدان بار با تحمل تست پرتاب از ارتفاع ۲ متری با بار ۳۵ کیلوگرم',
      'سیستم تعلیق ضد شوک در محور چرخ‌ها برای حرکت نرم بر روی سنگ‌فرش و آسفالت',
      'دارای ترازوی دیجیتال داخلی روی دسته برای سنجش دقیق وزن بار قبل از فرودگاه',
      'پارتیشن‌های جداشونده با قلاب آویز البسه رسمی و کت و شلوار',
      'قفل توکار TSA008 با کلید مستر فرودگاهی',
    ],
    airlineCompatibility: ['پذیرش به عنوان چمدان بار (Checked Baggage) مجاز تا ۳۰-۳۲ کیلو'],
    description:
      'اگر قصد سفر طولانی، مهاجرت یا تعطیلات خانوادگی دارید، گرندویج ۲۸ با ظرفیت خیره‌کننده ۱۱۰ لیتر و ترازوی هوشمند تعبیه‌شده روی دسته، خیال شما را از اضافه‌بار در گیت فرودگاه راحت می‌کند.',
    specifications: {
      'حجم بار مجاز': 'تا ۳۲ کیلوگرم استاندارد پرواز',
      'سنسور وزن': 'ترازوی دیجیتال با باتری ساعتی ماندگار',
      'گارانتی': '۵ سال تعویض بی‌قید و شرط بدنه پتو متو',
    },
  },
  {
    id: 'pm-105',
    slug: 'executive-leather-briefcase',
    name: 'Executive Slim Briefcase',
    persianName: 'کیف اداری چرم طبیعی اگزمپلار',
    subtitle: 'ظرافت اداری، محفظه اختصاصی تبلت و لپ‌تاپ با قفل رمزدار ایتالیایی',
    category: 'business',
    price: 4200000,
    rating: 4.7,
    reviewsCount: 39,
    isFeatured: false,
    isNew: true,
    inStock: true,
    images: [ASSETS.tote],
    material: 'چرم گاوی فلوتر طبیعی ضد چروک',
    weight: '۱.۲ کیلوگرم',
    dimensions: {
      height: 30,
      width: 41,
      depth: 9,
    },
    capacity: '۱۲ لیتر',
    colors: [
      { id: 'c1', name: 'مشکی رسمی', hex: '#111827' },
      { id: 'c2', name: 'قهوه‌ای سوخته', hex: '#3B1F10' },
    ],
    cabinApproved: true,
    tsaLock: false,
    features: [
      'طراحی ارگونومیک اسلیم بدون حجیم شدن با ظرفیت کامل اسناد A4 و زونکن نازک',
      'بند دوشی پددار جداشونده از جنس برزنت و چرم هماهنگ',
      'پارتیشن مخصوص خودکار، کارت ویزیت و پاسپورت',
      'پوشش داخلی ساتن ضد لک و ضد بو',
    ],
    airlineCompatibility: ['مناسب ساک دستی پرواز'],
    description:
      'کیف اداری اگزمپلار برای مدیران، وکلا و اساتیدی تولید شده که به جزئیات استایل حرفه‌ای خود اهمیت می‌دهند.',
    specifications: {
      'گنجایش لپ‌تاپ': 'تا ۱۵.۶ اینچ',
      'جنس یراق': 'استیل ضد لک تیتانیومی',
      'گارانتی': '۲ سال گارانتی کامل چرم و اتصالات',
    },
  },
  {
    id: 'pm-106',
    slug: 'nomad-travel-packing-cubes-set',
    name: 'Nomad PackMaster 6-Piece',
    persianName: 'ست ۶ تکه ارگانایزر چمدان نومد پک‌مستر',
    subtitle: 'نظم‌دهنده فشرده‌ساز البسه، کفش و لوازم آرایشی بهداشتی ضد آب',
    category: 'accessories',
    price: 980000,
    discountPrice: 820000,
    rating: 4.9,
    reviewsCount: 145,
    isFeatured: false,
    isNew: true,
    inStock: true,
    images: [ASSETS.backpack],
    material: 'پارچه تنفس‌پذیر توری و نایلون ریپ‌استاپ ضد آب',
    weight: '۳۸۰ گرم',
    dimensions: {
      height: 40,
      width: 30,
      depth: 12,
    },
    capacity: 'ست کامل چمدان',
    colors: [
      { id: 'c1', name: 'طوسی فیلی', hex: '#64748B' },
      { id: 'c2', name: 'سرمه‌ای تیره', hex: '#1E293B' },
      { id: 'c3', name: 'بژ شنی', hex: '#D6C7A1' },
    ],
    cabinApproved: true,
    tsaLock: false,
    features: [
      'افزایش تا ۴۰٪ حجم مفید چمدان با زیپ‌های فشرده‌سازی دوطرفه',
      'شامل کیف کفش ایزوله، کیسه البسه چرک و کیف لوازم بهداشتی ضد نشتی',
      'توری مشبک بالایی برای دیدن البسه بدون نیاز به باز کردن زیپ',
      'قابل شستشو در ماشین لباسشویی با دور ملایم',
    ],
    airlineCompatibility: ['سازگار با انواع چمدان‌های ۲۰، ۲۴ و ۲۸ اینچ'],
    description:
      'با ست ۶ عددی پک‌مستر، چمدان شما شبیه به یک کمد لباس سیار و منظم می‌شود و پیدا کردن لباس‌ها در مقصد در کسری از ثانیه انجام می‌شود.',
    specifications: {
      'تعداد تکه': '۶ عدد کاربردی با سایزهای متنوع',
      'قابلیت شستشو': 'بله (ماشینی و دستی)',
      'گارانتی': 'یک سال ضمانت سلامت زیپ',
    },
  },
];

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}
