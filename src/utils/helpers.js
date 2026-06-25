export const formatCurrency = (amount, currency = '₹') =>
  `${currency}${Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

export const formatDate = (date, options = {}) =>
  new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', ...options });

export const formatDateTime = (date) =>
  new Date(date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export const truncate = (str, len = 50) =>
  str?.length > len ? str.substring(0, len) + '...' : str;

export const getStatusColor = (status) => {
  const map = {
    Active: 'bg-emerald-100 text-emerald-700',
    Inactive: 'bg-gray-100 text-gray-600',
    Published: 'bg-emerald-100 text-emerald-700',
    Draft: 'bg-yellow-100 text-yellow-700',
    Archived: 'bg-gray-100 text-gray-600',
    Blocked: 'bg-red-100 text-red-700',
    Paid: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Failed: 'bg-red-100 text-red-700',
    Refunded: 'bg-purple-100 text-purple-700',
    Delivered: 'bg-emerald-100 text-emerald-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Processing: 'bg-indigo-100 text-indigo-700',
    Cancelled: 'bg-red-100 text-red-700',
    Completed: 'bg-emerald-100 text-emerald-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    Approved: 'bg-emerald-100 text-emerald-700',
    Rejected: 'bg-red-100 text-red-700',
    Expired: 'bg-gray-100 text-gray-600',
    Open: 'bg-blue-100 text-blue-700',
    Resolved: 'bg-emerald-100 text-emerald-700',
    Closed: 'bg-gray-100 text-gray-600',
    'Waiting for Parts': 'bg-orange-100 text-orange-700',
    'Approval Required': 'bg-purple-100 text-purple-700',
  };
  return map[status] || 'bg-gray-100 text-gray-600';
};

export const paginate = (data, page, perPage) => {
  const start = (page - 1) * perPage;
  return data.slice(start, start + perPage);
};

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
