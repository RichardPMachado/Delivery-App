function Products() {
  const logout = () => { localStorage.removeItem('user'); };
  return (
    <div>
      <h1>Products</h1>
      <button type="button" onClick={ logout }>Logout</button>
    </div>
  );
}
export default Products;
