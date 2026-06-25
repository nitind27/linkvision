export { products } from './products';
export { categories } from './categories';
export { brands } from './brands';
export { customers } from './customers';
export { orders } from './orders';
export { repairs } from './repairs';

// Banners
export const banners = Array.from({ length: 20 }, (_, i) => ({
  id: `BAN-${100 + i}`,
  title: ['Gaming Week Sale', 'Laptop Fest', 'Accessories Bonanza', 'Repair Offer', 'Festival Deals', 'New Arrivals'][i % 6],
  subtitle: 'Up to 40% Off on selected products',
  image: `https://picsum.photos/seed/banner${i}/1200/400`,
  buttonText: ['Shop Now', 'Explore', 'Grab Deal', 'Book Now'][i % 4],
  buttonLink: '/',
  type: ['Homepage', 'Festival', 'Offer', 'Gaming', 'Repair', 'Laptop', 'Accessories'][i % 7],
  status: i % 5 === 0 ? 'Inactive' : 'Active',
  sortOrder: i + 1,
  startDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
}));

// Offers
export const offers = Array.from({ length: 30 }, (_, i) => ({
  id: `OFF-${200 + i}`,
  title: `${['Summer Sale', 'Mega Discount', 'Flash Sale', 'Festival Offer', 'Clearance'][i % 5]} ${i + 1}`,
  description: 'Limited time offer on premium products.',
  discountType: i % 2 === 0 ? 'Percentage' : 'Flat',
  discountValue: i % 2 === 0 ? Math.floor(Math.random() * 40) + 5 : Math.floor(Math.random() * 2000) + 200,
  minOrder: Math.floor(Math.random() * 5000) + 1000,
  maxDiscount: Math.floor(Math.random() * 3000) + 500,
  category: ['All', 'Laptops', 'Desktops', 'Accessories', 'Repairs'][i % 5],
  status: i % 4 === 0 ? 'Expired' : 'Active',
  startDate: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date(Date.now() + Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString(),
  usageCount: Math.floor(Math.random() * 200),
  createdAt: new Date().toISOString(),
}));

// Coupons
export const coupons = Array.from({ length: 20 }, (_, i) => ({
  id: `CPN-${300 + i}`,
  code: ['SAVE10', 'FLAT500', 'GAMING20', 'REPAIR15', 'WELCOME200', 'LAPTOP25', 'NEWYEAR30', 'SALE40'][i % 8] + (i > 7 ? i : ''),
  discountType: i % 2 === 0 ? 'Percentage' : 'Flat',
  discountValue: i % 2 === 0 ? [5, 10, 15, 20, 25, 30][i % 6] : [200, 500, 1000, 1500][i % 4],
  minOrder: Math.floor(Math.random() * 3000) + 500,
  maxDiscount: Math.floor(Math.random() * 2000) + 500,
  usageLimit: Math.floor(Math.random() * 200) + 50,
  usedCount: Math.floor(Math.random() * 100),
  status: i % 5 === 0 ? 'Expired' : 'Active',
  expiryDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
}));

// Reviews
export const reviews = Array.from({ length: 30 }, (_, i) => ({
  id: `REV-${400 + i}`,
  customer: { name: ['Rahul S.', 'Priya P.', 'Amit K.', 'Sneha V.', 'Vijay R.'][i % 5], avatar: `https://i.pravatar.cc/150?img=${(i % 30) + 10}` },
  product: `PRD-${1000 + (i % 50)}`,
  productName: ['Dell XPS 15', 'HP Pavilion', 'Lenovo ThinkPad', 'Asus ROG', 'Corsair K95'][i % 5],
  rating: Math.floor(Math.random() * 2) + 4,
  title: ['Excellent product!', 'Great value', 'Highly recommend', 'Good but could be better', 'Amazing quality'][i % 5],
  comment: 'This product exceeded my expectations. Build quality is great and performance is top notch. Would definitely buy again!',
  images: i % 3 === 0 ? [`https://picsum.photos/seed/rev${i}/300/200`] : [],
  status: i % 4 === 0 ? 'Pending' : i % 7 === 0 ? 'Rejected' : 'Approved',
  reply: i % 5 === 0 ? 'Thank you for your kind review! We are glad you love our product.' : null,
  helpful: Math.floor(Math.random() * 50),
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
}));

// Notifications
export const notifications = Array.from({ length: 20 }, (_, i) => ({
  id: `NTF-${500 + i}`,
  title: ['New Order Received', 'Repair Request', 'Low Stock Alert', 'New Customer', 'Payment Failed', 'Review Pending', 'Offer Expiring'][i % 7],
  message: ['Order #ORD-10045 has been placed.', 'Repair request REP-5012 needs attention.', 'Product "Dell XPS 15" is low on stock.', 'New customer Rahul Sharma registered.', 'Payment for ORD-10023 failed.', 'New review awaiting approval.', 'Offer "SUMMER20" expires in 2 days.'][i % 7],
  type: ['order', 'repair', 'inventory', 'customer', 'payment', 'review', 'offer'][i % 7],
  read: i % 3 === 0,
  createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
}));

// Admins
export const admins = Array.from({ length: 10 }, (_, i) => ({
  id: `ADM-${600 + i}`,
  name: ['Super Admin', 'Ravi Kumar', 'Anita Singh', 'Suresh Patel', 'Kavita Sharma', 'Arjun Mehta', 'Deepika Rao', 'Rohit Gupta', 'Neha Nair', 'Vijay Mishra'][i],
  email: `admin${i}@linkvision.in`,
  role: ['Super Admin', 'Manager', 'Editor', 'Support', 'Analyst'][i % 5],
  avatar: `https://i.pravatar.cc/150?img=${(i + 50) % 70}`,
  status: i < 8 ? 'Active' : 'Inactive',
  lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  permissions: {
    products: i < 3 || i % 2 === 0,
    orders: i < 4 || i % 3 === 0,
    customers: i < 5,
    repairs: i < 4,
    reports: i < 3,
    settings: i === 0,
  },
}));

// Support tickets
export const supportTickets = Array.from({ length: 10 }, (_, i) => ({
  id: `TKT-${700 + i}`,
  subject: ['Order not received', 'Refund request', 'Repair status query', 'Product damaged', 'Wrong item delivered', 'Payment issue'][i % 6],
  customer: { name: ['Rahul S.', 'Priya P.', 'Amit K.', 'Sneha V.', 'Vijay R.'][i % 5], email: `customer${i}@email.com`, avatar: `https://i.pravatar.cc/150?img=${i + 20}` },
  category: ['Order', 'Payment', 'Repair', 'Product', 'Delivery'][i % 5],
  priority: ['Low', 'Medium', 'High', 'Urgent'][i % 4],
  status: ['Open', 'In Progress', 'Resolved', 'Closed'][i % 4],
  messages: [
    { from: 'customer', text: 'I have an issue with my order.', time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { from: 'admin', text: 'We have received your complaint and will resolve it shortly.', time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  ],
  createdAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
}));

// Gallery
export const gallery = Array.from({ length: 20 }, (_, i) => ({
  id: `GAL-${800 + i}`,
  title: `Gallery Image ${i + 1}`,
  url: `https://picsum.photos/seed/gal${i}/800/600`,
  thumbnail: `https://picsum.photos/seed/gal${i}/400/300`,
  type: ['Product', 'Store', 'Event', 'Team'][i % 4],
  createdAt: new Date().toISOString(),
}));

// Blog
export const blogs = Array.from({ length: 10 }, (_, i) => ({
  id: `BLG-${900 + i}`,
  title: ['Top 10 Laptops 2024', 'How to Choose the Right Gaming PC', 'PC Repair Tips', 'Best Computer Accessories', 'Why Choose Link Vision'][i % 5] + (i > 4 ? ' Part 2' : ''),
  slug: `blog-post-${i + 1}`,
  excerpt: 'Discover the best computers, laptops, and accessories for every need and budget.',
  content: 'Full blog content goes here. This is a rich text blog post with multiple sections...',
  category: ['Tech Tips', 'Reviews', 'News', 'Guides'][i % 4],
  author: ['Admin', 'Ravi Kumar', 'Anita Singh'][i % 3],
  thumbnail: `https://picsum.photos/seed/blog${i}/800/400`,
  status: i % 4 === 0 ? 'Draft' : 'Published',
  views: Math.floor(Math.random() * 5000),
  tags: ['laptop', 'gaming', 'repair', 'accessories'],
  createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
}));

// FAQs
export const faqs = Array.from({ length: 10 }, (_, i) => ({
  id: `FAQ-${i + 1}`,
  question: ['How do I track my order?', 'What is the return policy?', 'How to book a repair?', 'Do you offer home pickup?', 'What payment methods do you accept?', 'Is my data safe during repair?', 'How long does repair take?', 'Do you offer warranty on repairs?', 'Can I upgrade my laptop?', 'How to contact support?'][i],
  answer: 'You can easily manage this through our website or by calling our support line. Our team is available 24/7 to help you.',
  category: ['Orders', 'Returns', 'Repairs', 'Payments', 'General'][i % 5],
  status: 'Active',
  sortOrder: i + 1,
  createdAt: new Date().toISOString(),
}));

// Analytics data
export const analyticsData = {
  monthlySales: [
    { month: 'Jan', revenue: 450000, orders: 42 },
    { month: 'Feb', revenue: 520000, orders: 55 },
    { month: 'Mar', revenue: 480000, orders: 48 },
    { month: 'Apr', revenue: 610000, orders: 63 },
    { month: 'May', revenue: 580000, orders: 59 },
    { month: 'Jun', revenue: 720000, orders: 74 },
    { month: 'Jul', revenue: 660000, orders: 68 },
    { month: 'Aug', revenue: 790000, orders: 81 },
    { month: 'Sep', revenue: 830000, orders: 85 },
    { month: 'Oct', revenue: 920000, orders: 94 },
    { month: 'Nov', revenue: 1100000, orders: 112 },
    { month: 'Dec', revenue: 1250000, orders: 128 },
  ],
  categoryRevenue: [
    { name: 'Laptops', value: 3200000 },
    { name: 'Desktops', value: 1800000 },
    { name: 'Accessories', value: 950000 },
    { name: 'Components', value: 720000 },
    { name: 'Repairs', value: 580000 },
    { name: 'Networking', value: 340000 },
  ],
  dailyOrders: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    orders: Math.floor(Math.random() * 15) + 2,
    revenue: Math.floor(Math.random() * 80000) + 10000,
  })),
};
