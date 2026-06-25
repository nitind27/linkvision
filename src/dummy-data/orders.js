// Self-contained orders data — no cross-file imports to avoid circular deps

const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vijay', 'Neha', 'Rajesh', 'Pooja', 'Suresh', 'Kavita'];
const lastNames = ['Sharma', 'Patel', 'Singh', 'Verma', 'Kumar', 'Gupta', 'Mehta', 'Joshi', 'Rao', 'Nair'];
const paymentStatuses = ['Paid', 'Pending', 'Failed', 'Refunded'];
const deliveryStatuses = ['Delivered', 'Shipped', 'Processing', 'Cancelled', 'Pending'];
const paymentMethods = ['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Cash on Delivery', 'Wallet'];

const productNames = [
  'Dell XPS 15 Laptop', 'HP Pavilion Gaming', 'Lenovo ThinkPad X1', 'Apple MacBook Pro',
  'Asus ROG Strix G15', 'Corsair K95 Keyboard', 'Samsung 27" Monitor', 'Logitech MX Master 3',
  'Intel Core i9-13900K', 'Nvidia RTX 4090', 'Samsung 980 Pro SSD', 'Corsair 32GB RAM',
];

export const orders = Array.from({ length: 50 }, (_, i) => {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  const name = `${fn} ${ln}`;
  const avatar = `https://i.pravatar.cc/150?img=${(i % 70) + 1}`;

  const itemCount = (i % 3) + 1;
  const items = Array.from({ length: itemCount }, (_, j) => {
    const pName = productNames[(i + j) % productNames.length];
    const price = Math.floor(Math.random() * 80000) + 3000;
    const qty = (j % 2) + 1;
    return {
      product: `PRD-${1000 + ((i + j) % 100)}`,
      name: pName,
      thumbnail: `https://picsum.photos/seed/prod${(i + j) % 100}/400/300`,
      price,
      qty,
      total: price * qty,
    };
  });

  const subtotal = items.reduce((s, it) => s + it.total, 0);
  const shipping = subtotal > 50000 ? 0 : 99;
  const tax = Math.floor(subtotal * 0.18);
  const discount = i % 4 === 0 ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + shipping + tax - discount;

  return {
    id: `ORD-${10000 + i}`,
    customer: {
      id: `CUS-${1000 + i}`,
      name,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@email.com`,
      phone: `+91 ${9000000000 + i}`,
      avatar,
    },
    items,
    subtotal,
    shipping,
    tax,
    discount,
    total,
    coupon: i % 4 === 0 ? 'SAVE10' : null,
    paymentMethod: paymentMethods[i % paymentMethods.length],
    paymentStatus: paymentStatuses[i % paymentStatuses.length],
    deliveryStatus: deliveryStatuses[i % deliveryStatuses.length],
    address: `${i + 1}, Main Street, Mumbai, Maharashtra`,
    notes: i % 5 === 0 ? 'Urgent delivery required.' : '',
    timeline: [
      { status: 'Order Placed', time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), done: true },
      { status: 'Payment Confirmed', time: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), done: i % 4 !== 0 },
      { status: 'Processing', time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), done: i % 5 < 3 },
      { status: 'Shipped', time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), done: i % 5 < 2 },
      { status: 'Delivered', time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), done: i % 5 === 0 },
    ],
    createdAt: new Date(Date.now() - (i * 14 * 60 * 60 * 1000)).toISOString(),
  };
});
