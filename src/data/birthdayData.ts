export const birthdayData = {
  // İlk hediye kutusu sayfasında görünecek isim / hitap:
  introName: 'Nisa',
  // Kutu açıldıktan sonra ana sayfada ve pastada görünecek isim:
  name: 'Birtanemmm',
  age: 22,
  date: '27 Ekim',
  message:
    'Hayatıma kattığın tüm güzellikler, kahkahalar ve sıcacık anılar için sana minnettarım. Bu özel günde tüm mutluluklar senin olsun.',
  candles: 3,
  memories: [
    {
      id: 1,
      // Buraya kendi fotoğraf dosyanızın yolunu (örn: '/foto1.jpg') veya linkini koyabilirsiniz:
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    },
  ],
  // Kartpostalın ön yüzünde yer alacak fotoğraf (public/images içindeki dosya):
  postcardImage: '/images/IMG-20261016-WA0041.jpg',

  // Sana Dileklerim kısmındaki kartpostalın arka yüzüne gelecek metin:
  wishMessage:
    'Tanıştığımız ilk gün nedense sana yardım etme isteği geldi içimden. O gün cidden düşünmüştüm hiç tanımadığım birine neden bu kadar can atarak yardım ettiğimi. Ama gün geçtikçe ve seni tanıdıkça anlıyorum ki bu tesadüf değilmiş. O günden sonra çevredeki insanlardan gerçekten farklı olduğun zaten çok belliydi. Karakterin, terbiyen, duruşun bana hep "İşte bu kız farklı" dedirtti. Bazen tartıştık bazen çok güldük eğlendik ama en önemlisi her zaman yan yanaydık ve birbirimize destek olduk. Umarım her anımız böyle devam ederrr...      \nNice senelere balımmmm! 💕✨',
  wishes: [],

  // Birlikte biriktirdiğimiz anılardan sonraki "Seni Hatırlatan Şarkılar" (5 Şarkı):
  songs: [
    {
      id: 1,
      title: 'Farkındayım',
      artist: 'Sezen Aksu',
      spotifyUrl: 'https://open.spotify.com/intl-tr/track/4d4lxr5TuaB4ftNeUFrpcL?si=c368f7480cf644f8',
      youtubeUrl: '',
      audioUrl: '/songs/farkindayim.mp3',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0211e476f123d038462c893b22',
    },
    {
      id: 2,
      title: 'Derdim',
      artist: 'Gökhan Türkmen',
      spotifyUrl: 'https://open.spotify.com/intl-tr/track/042d4sG2nYmuk0Rs9VZ5MJ?si=e4804e000c7b42b6',
      youtubeUrl: '',
      audioUrl: '/songs/derdim.mp3',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e023b219551a20e603b466e40a0',
    },
    {
      id: 3,
      title: 'Heder Oldum Aşkına',
      artist: 'Yusuf Güney',
      spotifyUrl: 'https://open.spotify.com/intl-tr/track/1hKyZluysEFo91nUYV0L4o?si=e6e7204ea5414129',
      youtubeUrl: '',
      audioUrl: '/songs/heder-oldum.mp3',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e028d0eb3e04b65aadb23190169',
    },
    {
      id: 4,
      title: 'Hangimiz',
      artist: 'Seksendört',
      spotifyUrl: 'https://open.spotify.com/intl-tr/track/4EhasEGtd1KQ3LxSlNTDA3?si=a8c2e443b31048c1',
      youtubeUrl: '',
      audioUrl: '/songs/hangimiz.mp3',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02f4e92406831e2b037aeab694',
    },
    {
      id: 5,
      title: 'Sana Değer',
      artist: 'Yıldız Tilbe',
      spotifyUrl: 'https://open.spotify.com/intl-tr/track/4eMwobkGjF1KlhGrMA3lGy?si=1c600988fddd4d7d',
      youtubeUrl: '',
      audioUrl: '/songs/sana-deger.mp3',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a54d37a6728bd00727b82dae',
    },
  ],
};

export interface SongItem {
  id: number;
  title: string;
  artist: string;
  note?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  audioUrl?: string;
  cover?: string;
}
