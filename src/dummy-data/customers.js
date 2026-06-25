const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vijay', 'Neha', 'Rajesh', 'Pooja', 'Suresh', 'Kavita', 'Arjun', 'Divya', 'Manoj', 'Sunita', 'Aakash', 'Deepika', 'Rohit', 'Anita', 'Kiran', 'Sanjay'];
const lastNames = ['Sharma', 'Patel', 'Singh', 'Verma', 'Kumar', 'Gupta', 'Mehta', 'Joshi', 'Rao', 'Nair', 'Mishra', 'Yadav', 'Shah', 'Reddy', 'Pillai', 'Tiwari', 'Pandey', 'Chaudhary', 'Srivastava', 'Iyer'];
const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Surat'];
const statuses = ['Active', 'Blocked', 'Inactive'];

export const customers = Array.from({ length: 100 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  const city = cities[i % cities.length];

  return {
    id: `CUS-${1000 + i}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`,
    phone: `+91 ${9000000000 + i}`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    city,
    state: 'Maharashtra',
    pincode: `4${String(i % 10)}000${i % 10}`,
    address: `${i + 1}, ${city} Street, ${city}`,
    status: statuses[i % statuses.length],
    orders: Math.floor(Math.random() * 20),
    totalSpent: Math.floor(Math.random() * 200000) + 5000,
    walletBalance: Math.floor(Math.random() * 5000),
    rewardPoints: Math.floor(Math.random() * 1000),
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastOrder: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    repairHistory: Math.floor(Math.random() * 5),
    notes: i % 5 === 0 ? 'VIP customer, handle with care.' : '',
    verified: i % 3 !== 0,
  };
});
