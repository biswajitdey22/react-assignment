import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../productsData';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { products } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Pagination state (default 12 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy, maxPrice, itemsPerPage]);

  // Count items per category dynamically
  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    products.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery.trim() !== '' ||
    maxPrice < 15000;

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(15000);
    setSortBy('featured');
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Max Price filter
    if (maxPrice < 15000) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'featured'
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy, maxPrice]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const catalogEl = document.getElementById('products-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="catalog-section" id="products-catalog">
      {/* Catalog Toolbar */}
      <div className="catalog-toolbar">
        {/* Top search & sorting row */}
        <div className="toolbar-top-row">
          <div className="catalog-search-wrap">
            <span className="search-icon-svg">🔍</span>
            <input
              type="text"
              className="catalog-search-input"
              placeholder="Search football boots, match balls, kits, gloves, gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="catalog-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                ✕
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <label htmlFor="catalog-sort" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Sort:
              </label>
              <select
                id="catalog-sort"
                className="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                ▦
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="Compact List View"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Filter Bar: Price Slider & Quick Toggles */}
        <div className="filter-controls-row">
          <div className="price-slider-group">
            <span className="filter-label">Max Price: ₹{maxPrice.toLocaleString('en-IN')}</span>
            <input
              type="range"
              min="200"
              max="15000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-range-slider"
            />
          </div>

          <div className="filter-toggles-group">
            {hasActiveFilters && (
              <button
                type="button"
                className="filter-reset-link"
                onClick={resetAllFilters}
                title="Reset all filters"
              >
                ✕ Reset All
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="category-tabs" role="tablist">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              className={`category-chip-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span>{category}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  opacity: 0.75,
                  marginLeft: '0.35rem',
                  background:
                    selectedCategory === category ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0,0,0,0.3)',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '999px'
                }}
              >
                {categoryCounts[category] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Active Filter Dismissible Chips Bar */}
        {hasActiveFilters && (
          <div className="active-filters-bar">
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Active Filters:</span>
            {selectedCategory !== 'All' && (
              <button
                type="button"
                className="active-filter-badge"
                onClick={() => setSelectedCategory('All')}
                title="Remove category filter"
              >
                <span>Category: {selectedCategory}</span>
                <span>✕</span>
              </button>
            )}
            {searchQuery.trim() !== '' && (
              <button
                type="button"
                className="active-filter-badge"
                onClick={() => setSearchQuery('')}
                title="Clear search keyword"
              >
                <span>Search: "{searchQuery}"</span>
                <span>✕</span>
              </button>
            )}
            {maxPrice < 15000 && (
              <button
                type="button"
                className="active-filter-badge"
                onClick={() => setMaxPrice(15000)}
                title="Reset max price"
              >
                <span>≤ ₹{maxPrice.toLocaleString('en-IN')}</span>
                <span>✕</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Header with View Mode and Items Per Page */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
          padding: '0 0.25rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <span style={{ fontSize: '0.88rem', color: '#94a3b8', fontWeight: 500 }}>
          Showing{' '}
          <strong style={{ color: '#f8fafc' }}>
            {filteredAndSortedProducts.length === 0 ? 0 : startIndex + 1} -{' '}
            {Math.min(startIndex + itemsPerPage, filteredAndSortedProducts.length)}
          </strong>{' '}
          of <strong style={{ color: '#38bdf8' }}>{filteredAndSortedProducts.length}</strong> items
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          {searchQuery ? ` matching "${searchQuery}"` : ''}
          {maxPrice < 15000 ? ` (≤ ₹${maxPrice.toLocaleString('en-IN')})` : ''}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Per page:</span>
          {[12, 24, 48, 100].map((size) => (
            <button
              key={size}
              type="button"
              className={`category-chip-btn ${itemsPerPage === size ? 'active' : ''}`}
              onClick={() => setItemsPerPage(size)}
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
            >
              {size === 100 ? 'All' : size}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid or Empty Search State */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="cart-empty-message" style={{ margin: '2rem 0' }}>
          <span className="empty-icon">🔎</span>
          <p>No matching football gear found</p>
          <span>Try adjusting your price slider, search keywords, or selecting another category</span>
          <div style={{ marginTop: '1rem' }}>
            <button
              type="button"
              className="category-chip-btn active"
              onClick={resetAllFilters}
            >
              Reset All Filters
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={viewMode === 'list' ? 'product-list-view' : 'product-grid'}>
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>

          {/* Modern Pagination Controls */}
          {totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '2.5rem',
                flexWrap: 'wrap'
              }}
            >
              <button
                type="button"
                className="category-chip-btn"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{
                  opacity: currentPage === 1 ? 0.4 : 1,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                ← Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={page}
                      type="button"
                      className={`category-chip-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                      style={{ minWidth: '2.2rem', padding: '0.35rem 0.6rem' }}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 3 || page === currentPage + 3) {
                  return (
                    <span key={page} style={{ color: '#64748b', padding: '0 0.2rem' }}>
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                type="button"
                className="category-chip-btn"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                style={{
                  opacity: currentPage === totalPages ? 0.4 : 1,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductList;
