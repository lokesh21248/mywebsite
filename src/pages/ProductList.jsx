import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Grid, List as ListIcon, SlidersHorizontal } from 'lucide-react';
import { getProducts } from '../services/mockData';
import { Card, Badge, Button, Input, Select } from '../components/UiComponents';
import { format } from 'date-fns';

export default function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortBy, setSortBy] = useState('date'); // 'date' | 'name'

    // Load Data
    useEffect(() => {
        getProducts().then(data => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products
            .filter(p => {
                const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.producer.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
                const matchesStatus = statusFilter ? p.status === statusFilter : true;
                return matchesSearch && matchesCategory && matchesStatus;
            })
            .sort((a, b) => {
                if (sortBy === 'name') return a.name.localeCompare(b.name);
                return new Date(b.lastUpdated) - new Date(a.lastUpdated); // Date desc
            });
    }, [products, searchTerm, categoryFilter, statusFilter, sortBy]);

    // Unique Categories for Filter
    const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="h1">Product Disclosures</h1>
                    <p className="subtitle">Browse producer-declared product information.</p>
                </div>
                <Button onClick={() => { }} variant="primary">New Disclosure</Button>
            </div>

            {/* Controls Bar */}
            <div className="controls-bar">
                <div className="search-section">
                    <Input
                        icon={Search}
                        placeholder="Search products or producers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filters-section">
                    <Select
                        label="All Categories"
                        options={categories}
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    />
                    <Select
                        label="All Statuses"
                        options={['Draft', 'Submitted', 'Published']}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    />
                    <div className="divider"></div>
                    <span className="sort-label">Sort by:</span>
                    <Select
                        options={['Latest Update', 'Name A-Z']}
                        value={sortBy === 'date' ? 'Latest Update' : 'Name A-Z'}
                        onChange={(e) => setSortBy(e.target.value === 'Name A-Z' ? 'name' : 'date')}
                    />
                </div>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="loading-state">Loading registry data...</div>
            ) : filteredProducts.length > 0 ? (
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onClick={() => navigate(`/product/${product.id}`)} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon"><Search size={48} /></div>
                    <h3 className="h3">No products found</h3>
                    <p>Try adjusting your search or filters.</p>
                    <Button variant="secondary" onClick={() => { setSearchTerm(''); setCategoryFilter(''); setStatusFilter(''); }}>Clear Filters</Button>
                </div>
            )}

            <style>{`
        .page-container {
            max-width: 100%;
        }
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: var(--space-6);
        }
        .subtitle {
            color: var(--text-secondary);
            margin-top: var(--space-1);
        }
        
        .controls-bar {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-4);
            background: white;
            padding: var(--space-4);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-lg);
            margin-bottom: var(--space-6);
            align-items: center;
        }
        .search-section {
            flex: 1;
            min-width: 300px;
        }
        .filters-section {
            display: flex;
            gap: var(--space-3);
            align-items: center;
        }
        .divider {
            width: 1px;
            height: 24px;
            background: var(--border-subtle);
            margin: 0 var(--space-2);
        }
        .sort-label {
            font-size: 13px;
            color: var(--text-secondary);
            font-weight: 500;
        }
        
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: var(--space-4);
        }
        
        .loading-state, .empty-state {
            text-align: center;
            padding: 60px;
            color: var(--text-secondary);
        }
        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-4);
        }
        .empty-icon {
            color: var(--text-tertiary);
        }
      `}</style>
        </div>
    );
}

function ProductCard({ product, onClick }) {
    return (
        <Card className="product-card" onClick={onClick}>
            <div className="card-header">
                <div>
                    <div className="card-category">{product.category}</div>
                    <h3 className="card-title">{product.name}</h3>
                </div>
                <Badge status={product.status} />
            </div>

            <div className="card-body">
                <div className="meta-row">
                    <span className="label">Producer</span>
                    <span className="value">{product.producer}</span>
                </div>
                <div className="meta-row">
                    <span className="label">Last Updated</span>
                    <span className="value">{format(new Date(product.lastUpdated), 'MMM d, yyyy')}</span>
                </div>
            </div>

            <style>{`
                .product-card {
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .product-card:hover {
                    box-shadow: var(--shadow-md);
                    transform: translateY(-2px);
                }
                .card-header {
                    padding: var(--space-4);
                    border-bottom: 1px solid var(--bg-app);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    background: #fcfcfc;
                }
                .card-category {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--text-tertiary);
                    font-weight: 600;
                    margin-bottom: 4px;
                }
                .card-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--text-primary);
                    line-height: 1.4;
                }
                .card-body {
                    padding: var(--space-4);
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-2);
                }
                .meta-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
                .meta-row .label {
                    color: var(--text-tertiary);
                }
                .meta-row .value {
                    color: var(--text-secondary);
                    font-weight: 500;
                }
            `}</style>
        </Card>
    );
}
