/**
 * destinations.js
 * 所有目的地的配置文件
 * 新增国家只需在这里添加一个配置项
 */

const DESTINATIONS = [
  {
    id: 'bali',
    name: '巴厘岛',
    nameEn: 'Bali',
    emoji: '🏯',
    lat: -8.34,
    lon: 115.09,
    status: 'active',
    page: 'bali/index.html',
    color: '#4caf50',
    regions: [
      { id: 'uluwatu', name: '乌鲁瓦图', nameEn: 'Uluwatu', page: 'bali/uluwatu.html' },
      { id: 'mount-batur', name: '巴杜尔火山', nameEn: 'Mount Batur', page: 'bali/mount-batur.html' },
      { id: 'ubud', name: '乌布', nameEn: 'Ubud', page: 'bali/ubud.html' },
      { id: 'tanah-lot', name: '海神庙', nameEn: 'Tanah Lot', page: 'bali/tanah-lot.html' },
      { id: 'nusa-penida', name: '努沙佩尼达', nameEn: 'Nusa Penida', page: 'bali/nusa-penida.html' },
      { id: 'tegallalang', name: '德格拉朗梯田', nameEn: 'Tegallalang', page: 'bali/tegallalang.html' },
    ]
  },
  {
    id: 'maldives',
    name: '马尔代夫',
    nameEn: 'Maldives',
    emoji: '🏝',
    lat: 3.20,
    lon: 73.22,
    status: 'active',
    page: 'maldives/index.html',
    color: '#00d4e8',
    regions: [
      { id: 'kihavah', name: '安纳塔拉吉哈瓦', nameEn: 'Anantara Kihavah', page: 'maldives/kihavah.html' },
      { id: 'niyama', name: '尼亚玛', nameEn: 'Niyama Private Islands', page: 'maldives/niyama.html' },
      { id: 'nh-kuda-rah', name: 'NH Kuda Rah', nameEn: 'NH Collection Kuda Rah', page: 'maldives/nh-kuda-rah.html' },
      { id: 'avani-fares', name: 'Avani+ Fares', nameEn: 'Avani+ Fares Maldives', page: 'maldives/avani-fares.html' },
      { id: 'dhigu', name: '安纳塔拉迪古', nameEn: 'Anantara Dhigu', page: 'maldives/dhigu.html' },
      { id: 'veli', name: '安纳塔拉维利', nameEn: 'Anantara Veli', page: 'maldives/veli.html' },
      { id: 'naladhu', name: '纳拉杜', nameEn: 'Naladhu Private Island', page: 'maldives/naladhu.html' },
    ]
  },
  {
    id: 'thailand',
    name: '泰国',
    nameEn: 'Thailand',
    emoji: '🇹🇭',
    lat: 13.75,
    lon: 100.50,
    status: 'active',
    page: 'thailand/index.html',
    color: '#f0c060',
    regions: [
      { id: 'bangkok', name: '曼谷', nameEn: 'Bangkok', page: 'thailand/bangkok.html' },
      { id: 'hua-hin', name: '华欣', nameEn: 'Hua Hin', page: 'thailand/hua-hin.html' },
      { id: 'chiang-mai', name: '清迈', nameEn: 'Chiang Mai', page: 'thailand/chiang-mai.html' },
      { id: 'chiang-rai', name: '清莱', nameEn: 'Chiang Rai', page: 'thailand/chiang-rai.html' },
      { id: 'krabi', name: '甲米', nameEn: 'Krabi', page: 'thailand/krabi.html' },
      { id: 'khao-sok', name: '考索', nameEn: 'Khao Sok', page: 'thailand/khao-sok.html' },
      { id: 'koh-samui', name: '苏梅岛', nameEn: 'Koh Samui', page: 'thailand/koh-samui.html' },
      { id: 'phuket', name: '普吉岛', nameEn: 'Phuket', page: 'thailand/phuket.html' },
    ]
  },
  {
    id: 'uae',
    name: '阿联酋',
    nameEn: 'UAE',
    emoji: '🇦🇪',
    lat: 24.45,
    lon: 54.37,
    status: 'active',
    page: 'uae/index.html',
    color: '#c8a84c',
    regions: [
      { id: 'dubai', name: '迪拜', nameEn: 'Dubai', page: 'uae/dubai.html' },
      { id: 'abu-dhabi', name: '阿布扎比', nameEn: 'Abu Dhabi', page: 'uae/abu-dhabi.html' },
    ]
  },
  {
    id: 'africa',
    name: '非洲',
    nameEn: 'Africa',
    emoji: '🦁',
    lat: -2.0,
    lon: 34.0,
    status: 'active',
    page: 'africa/index.html',
    color: '#e8826a',
    regions: [
      { id: 'great-migration', name: '动物大迁徙', nameEn: 'Great Migration', page: 'africa/great-migration.html' },
      { id: 'victoria-falls', name: '维多利亚瀑布', nameEn: 'Victoria Falls', page: 'africa/victoria-falls.html' },
    ]
  },
  {
    id: 'oceania',
    name: '大洋洲',
    nameEn: 'Oceania',
    emoji: '🌏',
    lat: -25.0,
    lon: 140.0,
    status: 'coming',
    page: 'oceania/index.html',
    color: '#5bc8dc',
    regions: [
      { id: 'australia', name: '澳大利亚', nameEn: 'Australia', page: 'oceania/australia.html' },
      { id: 'new-zealand', name: '新西兰', nameEn: 'New Zealand', page: 'oceania/new-zealand.html' },
    ]
  },
  {
    id: 'vietnam',
    name: '越南',
    nameEn: 'Vietnam',
    emoji: '🇻🇳',
    lat: 16.0,
    lon: 108.0,
    status: 'coming',
    page: 'vietnam/index.html',
    color: '#e8524a',
    regions: []
  },
  {
    id: 'japan',
    name: '日本',
    nameEn: 'Japan',
    emoji: '🇯🇵',
    lat: 35.68,
    lon: 139.69,
    status: 'coming',
    page: 'japan/index.html',
    color: '#e8826a',
    regions: []
  },
  {
    id: 'europe',
    name: '欧洲',
    nameEn: 'Europe',
    emoji: '🏰',
    lat: 48.0,
    lon: 10.0,
    status: 'coming',
    page: 'europe/index.html',
    color: '#9a8aff',
    regions: []
  },
];
