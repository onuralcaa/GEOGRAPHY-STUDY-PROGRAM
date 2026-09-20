export interface Category {
  id: string;
  name: string;
  icon: string;
  locked: boolean;
  color: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'sehirler',
    name: 'Şehirler',
    icon: '🏙️',
    locked: false,
    color: '#4CAF50',
    questions: [
      { id: 's1', question: 'Türkiye\'nin başkenti hangisidir?', options: ['İstanbul', 'Ankara', 'İzmir', 'Bursa'], correctIndex: 1 },
      { id: 's2', question: 'En kalabalık şehir hangisidir?', options: ['Ankara', 'İzmir', 'İstanbul', 'Antalya'], correctIndex: 2 },
      { id: 's3', question: 'Ege\'nin incisi olarak bilinen şehir?', options: ['İzmir', 'Muğla', 'Aydın', 'Manisa'], correctIndex: 0 },
      { id: 's4', question: 'Türkiye\'nin en doğusundaki il?', options: ['Ağrı', 'Van', 'Iğdır', 'Ardahan'], correctIndex: 2 },
      { id: 's5', question: 'İki kıta üzerinde kurulu tek şehir?', options: ['Ankara', 'İzmir', 'İstanbul', 'Bursa'], correctIndex: 2 },
    ],
  },
  {
    id: 'akarsular',
    name: 'Akarsular',
    icon: '🌊',
    locked: true,
    color: '#2196F3',
    questions: [
      { id: 'a1', question: 'Türkiye\'nin en uzun nehri hangisidir?', options: ['Fırat', 'Dicle', 'Kızılırmak', 'Sakarya'], correctIndex: 2 },
      { id: 'a2', question: 'Fırat nehri hangi denize dökülür?', options: ['Karadeniz', 'Akdeniz', 'Ege', 'Basra Körfezi'], correctIndex: 3 },
      { id: 'a3', question: 'Büyük Menderes hangi bölgededir?', options: ['Karadeniz', 'Ege', 'Marmara', 'Akdeniz'], correctIndex: 1 },
      { id: 'a4', question: 'Dicle nehrinin kaynağı hangi ildedir?', options: ['Elazığ', 'Diyarbakır', 'Muş', 'Bingöl'], correctIndex: 1 },
      { id: 'a5', question: 'Sakarya nehri hangi denize dökülür?', options: ['Ege', 'Akdeniz', 'Karadeniz', 'Marmara'], correctIndex: 2 },
    ],
  },
  {
    id: 'daglar',
    name: 'Kıvrım Dağlar',
    icon: '⛰️',
    locked: true,
    color: '#FF9800',
    questions: [
      { id: 'd1', question: 'Türkiye\'nin en yüksek dağı hangisidir?', options: ['Erciyes', 'Kaçkar', 'Ağrı', 'Süphan'], correctIndex: 2 },
      { id: 'd2', question: 'Karadeniz\'e paralel uzanan dağlar?', options: ['Toros Dağları', 'Kuzey Anadolu Dağları', 'Köroğlu Dağları', 'İlgaz Dağları'], correctIndex: 1 },
      { id: 'd3', question: 'Torosların en yüksek noktası?', options: ['Erciyes', 'Aladağlar-Demirkazık', 'Bolkar', 'Tahtalı'], correctIndex: 1 },
      { id: 'd4', question: 'Ağrı Dağı hangi ilde bulunur?', options: ['Van', 'Kars', 'Ağrı', 'Iğdır'], correctIndex: 2 },
      { id: 'd5', question: 'Pontik dağları başka ne ile bilinir?', options: ['İç Anadolu Dağları', 'Kuzey Anadolu Dağları', 'Toros Dağları', 'Doğu Anadolu Dağları'], correctIndex: 1 },
    ],
  },
  {
    id: 'platolar',
    name: 'Platolar',
    icon: '🗺️',
    locked: true,
    color: '#9C27B0',
    questions: [
      { id: 'p1', question: 'Türkiye\'nin en büyük platosu?', options: ['Obruk Platosu', 'Uzunyayla', 'Haymana Platosu', 'Cihanbeyli Platosu'], correctIndex: 2 },
      { id: 'p2', question: 'Karadeniz kıyısındaki ünlü plato?', options: ['Bolu Platosu', 'Yıldız Platosu', 'Taşeli Platosu', 'Uzunyayla'], correctIndex: 1 },
      { id: 'p3', question: 'Uzunyayla platosu hangi bölgededir?', options: ['Karadeniz', 'İç Anadolu', 'Doğu Anadolu', 'Akdeniz'], correctIndex: 2 },
      { id: 'p4', question: 'Taşeli platosu hangi bölgededir?', options: ['Ege', 'Marmara', 'Akdeniz', 'Karadeniz'], correctIndex: 2 },
      { id: 'p5', question: 'Obruk platosu hangi ilde yer alır?', options: ['Ankara', 'Konya', 'Eskişehir', 'Kayseri'], correctIndex: 1 },
    ],
  },
  {
    id: 'ovalar',
    name: 'Delta Ovalar',
    icon: '🌾',
    locked: true,
    color: '#F44336',
    questions: [
      { id: 'o1', question: 'Türkiye\'nin en büyük delta ovası?', options: ['Çukurova', 'Bafra Ovası', 'Gediz Ovası', 'Konya Ovası'], correctIndex: 0 },
      { id: 'o2', question: 'Kızılırmak deltası hangi ilde?', options: ['Samsun', 'Ordu', 'Sinop', 'Giresun'], correctIndex: 0 },
      { id: 'o3', question: 'Yeşilırmak deltasının bulunduğu il?', options: ['Samsun', 'Amasya', 'Tokat', 'Ordu'], correctIndex: 0 },
      { id: 'o4', question: 'Çukurova hangi nehirlerin deltasıdır?', options: ['Sakarya-Fırat', 'Seyhan-Ceyhan', 'Dicle-Fırat', 'Gediz-Büyük Menderes'], correctIndex: 1 },
      { id: 'o5', question: 'Gediz ovasının bulunduğu il?', options: ['İzmir', 'Manisa', 'Uşak', 'Afyon'], correctIndex: 1 },
    ],
  },
  {
    id: 'volkanik',
    name: 'Kırık ve Volkanik Dağlar',
    icon: '🌋',
    locked: true,
    color: '#795548',
    questions: [
      { id: 'v1', question: 'Türkiye\'nin en büyük volkanik dağı?', options: ['Erciyes', 'Ağrı', 'Nemrut', 'Hasan Dağı'], correctIndex: 1 },
      { id: 'v2', question: 'Erciyes Dağı hangi ildedir?', options: ['Sivas', 'Nevşehir', 'Kayseri', 'Niğde'], correctIndex: 2 },
      { id: 'v3', question: 'Kapadokya\'yı şekillendiren volkan?', options: ['Erciyes ve Hasan Dağı', 'Ağrı', 'Nemrut', 'Süphan'], correctIndex: 0 },
      { id: 'v4', question: 'Süphan Dağı hangi gölün kıyısındadır?', options: ['Tuz Gölü', 'Eğirdir', 'Van', 'Beyşehir'], correctIndex: 2 },
      { id: 'v5', question: 'Nemrut volkanı hangi ilde?', options: ['Adıyaman', 'Bitlis', 'Malatya', 'Elazığ'], correctIndex: 1 },
    ],
  },
];
