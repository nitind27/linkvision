// Self-contained repairs data — no cross-file imports

const firstNames = ['Rohit', 'Deepa', 'Manoj', 'Sunita', 'Aakash', 'Kavita', 'Arjun', 'Divya', 'Sanjay', 'Priya'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Mehta', 'Singh', 'Patel', 'Kumar', 'Joshi', 'Rao', 'Nair'];
const deviceTypes = ['Laptop', 'Desktop', 'Gaming PC', 'Printer', 'Monitor', 'Keyboard', 'UPS'];
const issues = [
  'Screen Not Working', 'Battery Replacement', 'Keyboard Issue', 'Charging Port Problem',
  'Blue Screen of Death', 'Virus Removal', 'Data Recovery', 'RAM Upgrade',
  'SSD Installation', 'Fan Replacement', 'Water Damage', 'Motherboard Repair',
  'Power Supply Issue', 'Graphics Card Problem', 'OS Installation',
];
const statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled', 'Rejected', 'Waiting for Parts', 'Approval Required'];
const engineers = ['Rohit Sharma', 'Amit Patel', 'Vijay Kumar', 'Suresh Singh', 'Rajesh Yadav'];
const priorities = ['Low', 'Medium', 'High', 'Urgent'];
const deviceBrands = ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus'];

export const repairs = Array.from({ length: 25 }, (_, i) => {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  const estimatedCost = Math.floor(Math.random() * 8000) + 500;

  return {
    id: `REP-${5000 + i}`,
    customer: {
      id: `CUS-${1000 + i}`,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}${i}@email.com`,
      phone: `+91 ${9000000000 + i}`,
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    },
    deviceType: deviceTypes[i % deviceTypes.length],
    deviceBrand: deviceBrands[i % deviceBrands.length],
    deviceModel: `Model ${String.fromCharCode(65 + (i % 26))}-${1000 + i}`,
    serialNumber: `SN${String(i).padStart(8, '0')}`,
    issue: issues[i % issues.length],
    description: `Customer reported ${issues[i % issues.length].toLowerCase()}. Device needs thorough inspection.`,
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    engineer: engineers[i % engineers.length],
    estimatedCost,
    finalCost: i % 3 === 0 ? Math.floor(estimatedCost * 1.05) : null,
    paymentStatus: i % 3 === 0 ? 'Paid' : i % 3 === 1 ? 'Pending' : 'Unpaid',
    pickupType: i % 2 === 0 ? 'Walk-in' : 'Pickup',
    warrantyRepair: i % 6 === 0,
    beforeImages: [
      `https://picsum.photos/seed/rep${i}a/400/300`,
      `https://picsum.photos/seed/rep${i}b/400/300`,
    ],
    afterImages: i % 3 === 0 ? [`https://picsum.photos/seed/rep${i}c/400/300`] : [],
    pendingParts: i % 4 === 3 ? ['RAM Module', 'Cooling Fan'] : [],
    timeline: [
      { event: 'Request Received', time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), by: 'System' },
      { event: 'Engineer Assigned', time: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), by: engineers[i % engineers.length] },
      { event: 'Diagnosis Started', time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), by: engineers[i % engineers.length] },
      ...(i % 2 === 0 ? [{ event: 'Parts Ordered', time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), by: 'Admin' }] : []),
      ...(i % 3 === 0 ? [{ event: 'Repair Completed', time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), by: engineers[i % engineers.length] }] : []),
    ],
    notes: i % 3 === 0 ? 'Customer wants to be called before any costly repair.' : '',
    customerNotes: '',
    createdAt: new Date(Date.now() - (i * 12 * 60 * 60 * 1000)).toISOString(),
    estimatedCompletion: new Date(Date.now() + (i % 7) * 24 * 60 * 60 * 1000).toISOString(),
  };
});
