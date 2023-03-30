import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { requestProducts } from '../services/request';

export default function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const requestedProducts = await requestProducts();
    setProducts(requestedProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';

  console.log(products);

  const { name } = JSON.parse(localStorage.getItem('user')) || { name: 'Usuário' };

  return (
    <>
      <header>
        <nav>
          <span data-testid={ `${ROUTE}__${ELEMENT}-link-products` }>Produtos</span>
          <span data-testid={ `${ROUTE}__${ELEMENT}-link-orders` }>
            Meus Pedidos
          </span>
          <span data-testid={ `${ROUTE}__${ELEMENT}-user-full-name` }>
            { name }
          </span>
          <span data-testid={ `${ROUTE}__${ELEMENT}-link-logout` }>Sair</span>
        </nav>
      </header>
      <main>
        {
          products.map((product) => (
            <ProductCard
              key={ product.id }
              product={ product }
            />
          ))
        }
      </main>
    </>
  );
}
