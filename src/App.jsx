import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
// Pages will be imported here once created
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

// Placeholder components until we build the real ones
const PlaceholderList = () => <div className="h1">Product List Loading...</div>;
const PlaceholderDetail = () => <div className="h1">Product Detail Loading...</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
