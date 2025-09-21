// Código para colar no GitHub
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function MateriaPrimaManager() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nome_produto: '', numero_lote: '', data_validade: '', fornecedor: '',
    data_recebimento: '', temperatura_recebimento: '', responsavel_recebimento: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      const productToEdit = {
        ...editingProduct,
        data_validade: editingProduct.data_validade ? editingProduct.data_validade.split('T')[0] : '',
        data_recebimento: editingProduct.data_recebimento ? editingProduct.data_recebimento.split('T')[0] : '',
      };
      setNewProduct(productToEdit);
    } else {
      setNewProduct({
        nome_produto: '', numero_lote: '', data_validade: '', fornecedor: '',
        data_recebimento: '', temperatura_recebimento: '', responsavel_recebimento: '',
      });
    }
  }, [editingProduct]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('produtos').select('*').order('created_at', { ascending: false });
    if (error) {
      setMessage('Erro ao buscar matérias-primas: ' + error.message);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (editingProduct) {
      const { error } = await supabase.from('produtos').update(newProduct).eq('id', editingProduct.id);
      if (error) {
        setMessage('Erro ao atualizar: ' + error.message);
      } else {
        setMessage('Matéria-Prima atualizada com sucesso!');
        setEditingProduct(null);
        fetchProducts();
      }
    } else {
      const { error } = await supabase.from('produtos').insert([newProduct]);
      if (error) {
        setMessage('Erro ao cadastrar: ' + error.message);
      } else {
        setMessage('Matéria-Prima cadastrada com sucesso!');
        setNewProduct({
            nome_produto: '', numero_lote: '', data_validade: '', fornecedor: '',
            data_recebimento: '', temperatura_recebimento: '', responsavel_recebimento: '',
        });
        fetchProducts();
      }
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Tem certeza de que deseja excluir esta matéria-prima?')) {
      const { error } = await supabase.from('produtos').delete().eq('id', productId);
      if (error) {
        setMessage('Erro ao excluir: ' + error.message);
      } else {
        setProducts(products.filter(product => product.id !== productId));
        setMessage('Matéria-Prima excluída com sucesso.');
      }
    }
  };

  return (
    <div className="product-manager">
      <div className="form-section">
        <h3>{editingProduct ? 'Editando Matéria-Prima' : 'Cadastrar Nova Matéria-Prima'}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nome_produto" placeholder="Nome da Matéria-Prima*" value={newProduct.nome_produto} onChange={handleInputChange} required />
          <input type="text" name="numero_lote" placeholder="Número do Lote" value={newProduct.numero_lote} onChange={handleInputChange} />
          <input type="date" name="data_validade" placeholder="Data de Validade" value={newProduct.data_validade} onChange={handleInputChange} />
          <input type="text" name="fornecedor" placeholder="Fornecedor" value={newProduct.fornecedor} onChange={handleInputChange} />
          <input type="date" name="data_recebimento" placeholder="Data de Recebimento" value={newProduct.data_recebimento} onChange={handleInputChange} />
          <input type="text" name="temperatura_recebimento" placeholder="Temperatura de Recebimento" value={newProduct.temperatura_recebimento} onChange={handleInputChange} />
          <input type="text" name="responsavel_recebimento" placeholder="Responsável pelo Recebimento" value={newProduct.responsavel_recebimento} onChange={handleInputChange} />
          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : (editingProduct ? 'Salvar Alterações' : 'Salvar Matéria-Prima')}
            </button>
            {editingProduct && (
              <button type="button" className="cancel-button" onClick={() => setEditingProduct(null)}>
                Cancelar Edição
              </button>
            )}
          </div>
        </form>
        {message && <p className="feedback-message">{message}</p>}
      </div>

      <hr className="divider" />

      <div className="list-section">
        <h3>Matérias-Primas Cadastradas</h3>
        {loading && <p>Carregando...</p>}
        <ul className="product-list">
          {products.length === 0 && !loading ? (
            <li>Nenhuma matéria-prima cadastrada ainda.</li>
          ) : (
            products.map((product) => (
              <li key={product.id} className="product-item">
                <div className="product-item-info">
                  <div className="product-item-main">
                    <strong>{product.nome_produto}</strong>
                    <span>Lote: {product.numero_lote || 'N/A'}</span>
                    <span>Validade: {product.data_validade || 'N/A'}</span>
                  </div>
                  <div className="product-item-details">
                    <span>Recebimento: {product.data_recebimento || 'N/A'}</span>
                    <span>Temp.: {product.temperatura_recebimento || 'N/A'}</span>
                    <span>Resp.: {product.responsavel_recebimento || 'N/A'}</span>
                    <span>Fornecedor: {product.fornecedor || 'N/A'}</span>
                  </div>
                </div>
                <div className="product-item-actions">
                  <button className="edit-button" onClick={() => setEditingProduct(product)}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">
                    Excluir
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default MateriaPrimaManager;
