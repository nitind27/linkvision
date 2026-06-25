export const products = Array.from({ length: 100 }, (_, i) => {
  const categories = ['Laptops', 'Desktops', 'Gaming PC', 'Accessories', 'Components', 'Networking', 'Printers', 'CCTV', 'Repair Services'];
  const brands = ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus', 'Acer', 'MSI', 'Samsung', 'LG', 'Sony', 'Logitech', 'Corsair', 'Intel', 'AMD', 'Nvidia'];
  const statuses = ['Published', 'Draft', 'Archived'];
  const tags = [['featured', 'trending'], ['new arrival'], ['best seller'], ["today's deal"], ['featured'], ['trending', 'best seller']];

  const names = [
    'Dell XPS 15 Laptop', 'HP Pavilion Gaming', 'Lenovo ThinkPad X1 Carbon', 'Apple MacBook Pro 16"',
    'Asus ROG Strix G15', 'Acer Aspire 5', 'MSI Creator 17', 'Samsung Galaxy Book', 'LG Gram 14',
    'Dell OptiPlex 7090', 'HP EliteDesk 800', 'Lenovo IdeaCentre', 'Corsair K95 Keyboard',
    'Logitech MX Master 3', 'Samsung 27" Monitor', 'LG UltraWide 34"', 'Intel Core i9-13900K',
    'AMD Ryzen 9 7950X', 'Nvidia RTX 4090', 'Corsair Vengeance 32GB RAM', 'Samsung 980 Pro SSD 1TB',
    'WD Black SN850X 2TB', 'Cooler Master MasterLiquid 360', 'be quiet! Dark Base 900',
    'TP-Link Archer AX6000', 'Netgear Nighthawk X10', 'HP LaserJet Pro M404n',
    'Canon imageCLASS MF445dw', 'Hikvision 4K CCTV Kit', 'Dahua NVR CCTV System',
  ];

  const idx = i % names.length;
  const cat = categories[i % categories.length];
  const brand = brands[i % brands.length];
  const mrp = Math.floor(Math.random() * 150000) + 5000;
  const discount = Math.floor(Math.random() * 30) + 5;
  const selling = Math.floor(mrp * (1 - discount / 100));
  const stock = Math.floor(Math.random() * 200);

  return {
    id: `PRD-${1000 + i}`,
    name: `${names[idx]} ${i > 29 ? `v${Math.floor(i / 30) + 1}` : ''}`.trim(),
    sku: `LV-${cat.substring(0, 3).toUpperCase()}-${1000 + i}`,
    barcode: `8901234${String(i).padStart(6, '0')}`,
    category: cat,
    brand,
    mrp,
    sellingPrice: selling,
    discount,
    gst: [5, 12, 18, 28][i % 4],
    stock,
    minStock: 5,
    maxStock: 500,
    status: statuses[i % 3],
    featured: i % 7 === 0,
    trending: i % 5 === 0,
    bestSeller: i % 9 === 0,
    newArrival: i % 11 === 0,
    todaysDeal: i % 13 === 0,
    warranty: `${[1, 2, 3][i % 3]} Year`,
    tags: tags[i % tags.length],
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 500),
    sold: Math.floor(Math.random() * 1000),
    thumbnail: `https://picsum.photos/seed/prod${i}/400/300`,
    images: [
      `https://picsum.photos/seed/prod${i}a/800/600`,
      `https://picsum.photos/seed/prod${i}b/800/600`,
      `https://picsum.photos/seed/prod${i}c/800/600`,
    ],
    description: `Premium quality ${names[idx]} with cutting-edge technology. Designed for professionals and enthusiasts who demand the best performance.`,
    specifications: {
      Processor: 'Intel Core i7 / AMD Ryzen 7',
      RAM: '16GB DDR5',
      Storage: '512GB NVMe SSD',
      Display: '15.6" FHD IPS',
      OS: 'Windows 11 Pro',
    },
    highlights: ['Latest Generation Processor', 'Ultra-fast NVMe SSD', '1-Year Warranty', 'Free Delivery'],
    metaTitle: `${names[idx]} - Link Vision`,
    metaDescription: `Buy ${names[idx]} at best price. ${discount}% off. Free delivery.`,
    publishDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  };
});
