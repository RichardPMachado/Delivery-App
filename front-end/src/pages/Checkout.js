function Checkout() {
  return (
    <>
      <table border="1">
        {' '}
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitario</th>
            <th>Sub-Total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        {/*       <tbody>
        {products.map((product, i) => (
          <tr key={ i }>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.quantify}</td>
            <td>{product.valorUnity}</td>
            <td>{product.totalValor}</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => { } }
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody> */}
        <tbody>

          <td
            data-testid="customer_checkout__element-order-table-item-number-<index>"
          >
            teste1

          </td>
          <td data-testid="customer_checkout__element-order-table-name-<index>">
            teste1
          </td>
          <td data-testid="customer_checkout__element-order-table-quantity-<index>">
            teste1
          </td>
          <td data-testid="customer_checkout__element-order-table-unit-price-<index>">
            teste1
          </td>
          <td data-testid="customer_checkout__element-order-table-sub-total-<index>">
            teste1
          </td>
          <td>
            <button
              type="button"
              onClick={ () => { } }
              data-testid="customer_checkout__element-order-table-sub-total-<index>"
            >
              Remover
            </button>
          </td>

        </tbody>
      </table>
      <div data-testid="customer_checkout__element-order-total-price">Total</div>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
      <input
        type="text"
        data-testid="customer_checkout__input-address"
      />
      <input
        type="number"
        data-testid="customer_checkout__input-address-number"
      />
      <select
        data-testid="customer_checkout__select-seller"
      >
        <option value="id">Alimentação</option>
        <option value="id">Lazer</option>
        <option value="id">Trabalho</option>
        <option value="id">Transporte</option>
        <option value="id">Saúde</option>
      </select>
    </>
  );
}

export default Checkout;
