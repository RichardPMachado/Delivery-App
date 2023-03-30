import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import { requestProducts } from '../services/request';

function Products() {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

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
          <button
            data-testid={ `${ROUTE}__${ELEMENT}-link-logout` }
            type="button"
            onClick={ logout }
          >
            Sair
          </button>
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
export default Products;
