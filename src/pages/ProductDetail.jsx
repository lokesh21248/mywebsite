import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileCheck, Clock, ShieldAlert, History } from 'lucide-react';
import { getProductById } from '../services/mockData';
import { Card, Badge, Button } from '../components/UiComponents';
import { format } from 'date-fns';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProductById(id).then(data => {
            setProduct(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="loading-screen">Loading disclosure...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="detail-container">
            <Link to="/" className="back-link">
                <ArrowLeft size={16} /> Back to Registry
            </Link>

            <div className="header-region">
                <div className="title-block">
                    <div className="category-tag">{product.category}</div>
                    <h1 className="product-title">{product.name}</h1>
                    <div className="producer-line">
                        Declared by <span className="producer-name">{product.producer}</span>
                    </div>
                </div>
                <div className="status-block">
                    <Badge status={product.status} />
                    <div className="last-updated">Updated {format(new Date(product.lastUpdated), 'MMM d, yyyy')}</div>
                </div>
            </div>

            <div className="content-grid">
                {/* Main Disclosure Column */}
                <div className="main-col">
                    <Card className="section-card">
                        <h3 className="section-title">Producer Disclosure</h3>
                        <div className="disclosure-grid">
                            {product.disclosure.attributes.map((attr, idx) => (
                                <div key={idx} className="attr-item">
                                    <div className="attr-label">{attr.label}</div>
                                    <div className="attr-value">{attr.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="evidence-box">
                            <div className="evidence-header">
                                <FileCheck size={18} />
                                <span>Supporting Evidence</span>
                            </div>
                            <p className="evidence-text">
                                {product.evidenceCount > 0
                                    ? `${product.evidenceCount} documents attached by producer.`
                                    : "No supporting evidence attached."}
                            </p>
                            {product.evidenceCount > 0 && (
                                <Button variant="secondary" className="view-evidence-btn">View Attachments</Button>
                            )}
                        </div>
                    </Card>

                    <div className="disclaimer-box">
                        <ShieldAlert size={20} className="disclaimer-icon" />
                        <div className="disclaimer-content">
                            <strong>Disclosure Notice:</strong>
                            <p>This information is self-declared by <strong>{product.producer}</strong>. Hedamo has not verified these claims. Users should conduct their own due diligence.</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar / History */}
                <div className="sidebar-col">
                    <Card className="section-card history-card">
                        <h3 className="section-title"><History size={16} /> Version History</h3>
                        <div className="timeline">
                            {product.history.map((item, idx) => (
                                <div key={idx} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-date">{format(new Date(item.date), 'MMM d, yyyy')}</div>
                                        <div className="timeline-action">{item.action}</div>
                                        <div className="timeline-user">User: {item.user}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            <style>{`
          .detail-container {
             max-width: 900px;
             margin: 0 auto;
          }
          .back-link {
             display: inline-flex;
             align-items: center;
             gap: 8px;
             color: var(--text-secondary);
             font-size: 14px;
             margin-bottom: var(--space-6);
             font-weight: 500;
          }
          .back-link:hover { color: var(--primary); }
          
          .header-region {
             display: flex;
             justify-content: space-between;
             align-items: flex-start;
             margin-bottom: var(--space-8);
             border-bottom: 1px solid var(--border-subtle);
             padding-bottom: var(--space-6);
          }
          .category-tag {
             font-size: 12px;
             text-transform: uppercase;
             color: var(--text-tertiary);
             font-weight: 600;
             margin-bottom: var(--space-2);
          }
          .product-title {
             font-size: 32px;
             font-weight: 700;
             color: var(--text-primary);
             margin-bottom: var(--space-2);
             line-height: 1.2;
          }
          .producer-line {
             color: var(--text-secondary);
             font-size: 15px;
          }
          .producer-name {
             font-weight: 600;
             color: var(--text-primary);
          }
          
          .status-block {
             text-align: right;
          }
          .last-updated {
             font-size: 12px;
             color: var(--text-tertiary);
             margin-top: 8px;
          }

          .content-grid {
             display: grid;
             grid-template-columns: 2fr 1fr;
             gap: var(--space-6);
          }
          @media (max-width: 768px) {
             .content-grid { grid-template-columns: 1fr; }
          }
          
          .section-card {
             padding: var(--space-6);
             margin-bottom: var(--space-4);
          }
          .section-title {
             font-size: 16px;
             font-weight: 600;
             margin-bottom: var(--space-4);
             padding-bottom: var(--space-2);
             border-bottom: 1px solid var(--border-subtle);
             display: flex;
             align-items: center;
             gap: 8px;
          }
          
          .disclosure-grid {
             display: grid;
             grid-template-columns: 1fr 1fr;
             gap: var(--space-6) var(--space-4);
             margin-bottom: var(--space-8);
          }
          .attr-label {
             font-size: 12px;
             text-transform: uppercase;
             color: var(--text-tertiary);
             margin-bottom: 4px;
             font-weight: 600;
          }
          .attr-value {
             font-size: 15px;
             color: var(--text-primary);
             font-weight: 500;
          }
          
          .evidence-box {
             background: #f8fafc;
             border: 1px solid var(--border-subtle);
             padding: var(--space-4);
             border-radius: var(--radius-md);
          }
          .evidence-header {
             display: flex;
             align-items: center;
             gap: 8px;
             font-weight: 600;
             margin-bottom: 8px;
             font-size: 14px;
          }
          .evidence-text {
             font-size: 13px;
             color: var(--text-secondary);
             margin-bottom: 12px;
          }
          
          .disclaimer-box {
             display: flex;
             gap: 12px;
             background: #fffbeb;
             border: 1px solid #fcd34d;
             padding: var(--space-4);
             border-radius: var(--radius-md);
             color: #92400e;
             font-size: 13px;
             line-height: 1.5;
          }
          .disclaimer-icon {
             flex-shrink: 0;
          }
          
          /* Timeline */
          .timeline {
             position: relative;
             padding-left: 12px;
          }
          .timeline-item {
             position: relative;
             padding-left: 20px;
             padding-bottom: 24px;
             border-left: 2px solid var(--border-subtle);
          }
          .timeline-item:last-child {
             border-left: 2px solid transparent;
          }
          .timeline-dot {
             position: absolute;
             left: -7px;
             top: 0;
             width: 12px;
             height: 12px;
             border-radius: 50%;
             background: var(--bg-card);
             border: 2px solid var(--text-tertiary);
          }
          .timeline-content {
             margin-top: -4px;
          }
          .timeline-date {
             font-size: 12px;
             color: var(--text-tertiary);
             font-weight: 500;
             margin-bottom: 2px;
          }
          .timeline-action {
             font-size: 14px;
             font-weight: 600;
             color: var(--text-primary);
          }
          .timeline-user {
             font-size: 12px;
             color: var(--text-secondary);
          }
       `}</style>
        </div>
    );
}
