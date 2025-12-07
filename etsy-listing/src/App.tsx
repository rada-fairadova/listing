import React from 'react';
import Listing, { Item } from './components/Listing';
import { items } from './data/etsy';
import './App.css';

const App: React.FC = () => {
  const filteredItems: Item[] = items
    .filter(item => item.state === 'active' && item.MainImage)
    .map(item => ({
      listing_id: item.listing_id,
      url: item.url as string,
      MainImage: {
        url_570xN: item.MainImage!.url_570xN
      },
      title: item.title as string,
      currency_code: item.currency_code as string,
      price: item.price as string,
      quantity: item.quantity as number
    }));

  return (
    <div className="App">
      <h1 className="page-title">Список предложений</h1>
      <Listing items={filteredItems} />
    </div>
  );
};

export default App;
