import React, { useEffect, useState } from 'react';
import { listProductBy } from '../../api/product';
import ProductCard from '../card/ProductCard';

const NewProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy('updateAt', 'desc', 8)
      .then((res) => {
        
        
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 ">
      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-6">
        🔥 สินค้าใหม่
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {data?.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NewProduct;
