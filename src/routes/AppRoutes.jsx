import { Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import MainLayout from '../components/layouts/MainLayout';
import Login from '../pages/authentication/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Products from '../pages/products/Products';
import AddProduct from '../pages/products/AddProduct';
import Categories from '../pages/categories/Categories';
import Brands from '../pages/brands/Brands';
import Orders from '../pages/orders/Orders';
import Customers from '../pages/customers/Customers';
import Repairs from '../pages/repairs/Repairs';
import Inventory from '../pages/inventory/Inventory';
import Reviews from '../pages/reviews/Reviews';
import Banners from '../pages/banners/Banners';
import Offers from '../pages/offers/Offers';
import Analytics from '../pages/analytics/Analytics';
import Payments from '../pages/payments/Payments';
import Notifications from '../pages/notifications/Notifications';
import Support from '../pages/support/Support';
import Gallery from '../pages/gallery/Gallery';
import Blog from '../pages/blog/Blog';
import FAQs from '../pages/faqs/FAQs';
import Admins from '../pages/admins/Admins';
import Settings from '../pages/settings/Settings';
import NotFound from '../pages/NotFound';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<AddProduct />} />
        <Route path="categories" element={<Categories />} />
        <Route path="brands" element={<Brands />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/invoices" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="repairs" element={<Repairs />} />
        <Route path="repairs/list" element={<Repairs />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="inventory/low-stock" element={<Inventory lowStockOnly />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="banners" element={<Banners />} />
        <Route path="offers" element={<Offers />} />
        <Route path="coupons" element={<Offers />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports/sales" element={<Analytics />} />
        <Route path="payments" element={<Payments />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="support" element={<Support />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blog" element={<Blog />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="admins" element={<Admins />} />
        <Route path="roles" element={<Admins />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
