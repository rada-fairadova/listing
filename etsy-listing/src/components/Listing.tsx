import React from 'react';

export interface Item {
  listing_id: number;
  url: string;
  MainImage: {
    url_570xN: string;
  };
  title: string;
  currency_code: string;
  price: string;
  quantity: number;
}

interface ListingProps {
  items: Item[];
}

const Listing: React.FC<ListingProps> = ({ items = [] }) => {
  const formatTitle = (title: string): string => {
    if (title.length <= 50) return title;
    return `${title.substring(0, 50)}…`;
  };

  const formatPrice = (currencyCode: string, price: string): string => {
    const numericPrice = parseFloat(price);
    const formattedPrice = numericPrice.toFixed(2);

    switch (currencyCode) {
      case 'USD':
        return `$${formattedPrice}`;
      case 'EUR':
        return `€${formattedPrice}`;
      case 'GBP':
        return `£${formattedPrice}`;
      default:
        return `${currencyCode} ${formattedPrice}`;
    }
  };

  const getStockClass = (quantity: number): string => {
    if (quantity <= 10) return 'stock-low';
    if (quantity <= 20) return 'stock-medium';
    return 'stock-high';
  };

  const getStockText = (quantity: number): string => {
    return `${quantity} left`;
  };

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.listing_id} className="product-card">
          <div className="item-image">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img 
                src={item.MainImage?.url_570xN || ''} 
                alt={formatTitle(item.title)}
                className="product-image"
              />
            </a>
          </div>
          <div className="product-info">
            <h3 className="product-title">{formatTitle(item.title)}</h3>
            <div className="price-container">
              <div className="product-price">
                {formatPrice(item.currency_code, item.price)}
              </div>
              <span className={`stock-badge ${getStockClass(item.quantity)}`}>
                {getStockText(item.quantity)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listing;
