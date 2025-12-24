import { useEffect, useState } from 'react'
import { useProductsStore } from '../store/productsStore'
import { Package, Plus, Edit2, Trash2, TrendingUp, DollarSign } from 'lucide-react'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Toast from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'
import { clsx } from 'clsx'

interface ProductFormData {
  nome: string
  descricao: string
  preco: string
  custo: string
  estoque: string
  categoria_id: string
}

export default function Products() {
  const {
    products,
    topProducts,
    selectedProduct,
    loading,
    error,
    fetchProducts,
    fetchTopProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    setSelectedProduct,
    clearError
  } = useProductsStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null)
  
  const [formData, setFormData] = useState<ProductFormData>({
    nome: '',
    descricao: '',
    preco: '',
    custo: '',
    estoque: '',
    categoria_id: '1' // Padrão: Eletrônicos
  })

  // Carregar produtos ao montar
  useEffect(() => {
    fetchProducts()
    fetchTopProducts()
  }, [fetchProducts, fetchTopProducts])

  // Atualizar formulário quando selecionar produto
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        nome: selectedProduct.nome,
        descricao: selectedProduct.descricao,
        preco: selectedProduct.preco.toString(),
        custo: selectedProduct.custo.toString(),
        estoque: selectedProduct.estoque.toString(),
        categoria_id: (selectedProduct.categoria_id || 1).toString()
      })
      setIsModalOpen(true)
    }
  }, [selectedProduct])

  // Mostrar toast de erro
  useEffect(() => {
    if (error) {
      setToast({ message: error, type: 'error' })
      clearError()
    }
  }, [error, clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validações
    if (!formData.nome.trim()) {
      setToast({ message: 'Nome é obrigatório', type: 'warning' })
      return
    }

    const preco = parseFloat(formData.preco)
    const custo = parseFloat(formData.custo)
    const estoque = parseInt(formData.estoque)

    if (isNaN(preco) || preco <= 0) {
      setToast({ message: 'Preço inválido', type: 'warning' })
      return
    }

    if (isNaN(custo) || custo <= 0) {
      setToast({ message: 'Custo inválido', type: 'warning' })
      return
    }

    if (isNaN(estoque) || estoque < 0) {
      setToast({ message: 'Estoque inválido', type: 'warning' })
      return
    }

    if (custo >= preco) {
      setToast({ message: 'Custo deve ser menor que o preço', type: 'warning' })
      return
    }

    try {
      const data = {
        nome: formData.nome.trim(),
        descricao: formData.descricao.trim(),
        preco,
        custo,
        estoque,
        categoria_id: parseInt(formData.categoria_id),
        imagem: null
      }

      if (selectedProduct) {
        await updateProduct(selectedProduct.id, data)
        setToast({ message: 'Produto atualizado com sucesso!', type: 'success' })
      } else {
        await createProduct(data)
        setToast({ message: 'Produto cadastrado com sucesso!', type: 'success' })
      }

      handleCloseModal()
      await fetchProducts() // Recarregar lista de produtos
      fetchTopProducts() // Atualizar top produtos
    } catch (err) {
      console.error('Erro ao salvar produto:', err)
    }
  }

  const handleEdit = (product: typeof products[0]) => {
    setSelectedProduct(product)
  }

  const handleDeleteClick = (id: number) => {
    setProductToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete)
        setToast({ message: 'Produto excluído com sucesso!', type: 'success' })
        fetchTopProducts() // Atualizar top produtos
      } catch (err) {
        console.error('Erro ao deletar produto:', err)
      }
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    setFormData({
      nome: '',
      descricao: '',
      preco: '',
      custo: '',
      estoque: '',
      categoria_id: '1'
    })
  }

  const handleOpenModal = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const categorias = [
    { id: 1, nome: 'Eletrônicos' },
    { id: 2, nome: 'Acessórios' },
    { id: 3, nome: 'Móveis' },
    { id: 4, nome: 'Componentes' },
    { id: 5, nome: 'Periféricos' }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/50">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Produtos
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie seu catálogo de produtos
            </p>
          </div>
        </div>
        <Button onClick={handleOpenModal} icon={Plus}>
          Novo Produto
        </Button>
      </div>

      {/* Top 5 Produtos Mais Vendidos */}
      {topProducts.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Top 5 Produtos Mais Vendidos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topProducts.map((product, index) => (
              <div
                key={product.produto_id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    #{index + 1}
                  </span>
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {product.produto_nome}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vendido: {product.quantidade_total}x
                </p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">
                  R$ {product.total_vendido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabela de Produtos */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Todos os Produtos ({products.length})
          </h2>
        </div>

        {loading && products.length === 0 ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando produtos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Nenhum produto cadastrado</p>
            <Button onClick={handleOpenModal} icon={Plus} className="mt-4">
              Cadastrar Primeiro Produto
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Custo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Estoque
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {product.nome}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {product.descricao}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        {categorias.find(c => c.id === product.categoria_id)?.nome || 'Sem categoria'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">
                      R$ {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      R$ {product.custo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        'px-3 py-1 text-xs font-medium rounded-full',
                        product.estoque > 10
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : product.estoque > 0
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      )}>
                        {product.estoque} un.
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Cadastro/Edição */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedProduct ? 'Editar Produto' : 'Novo Produto'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome do Produto"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Ex: Notebook Dell Inspiron"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descrição do produto..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Preço de Venda"
              type="number"
              step="0.01"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
              placeholder="0.00"
              required
            />

            <Input
              label="Custo"
              type="number"
              step="0.01"
              value={formData.custo}
              onChange={(e) => setFormData({ ...formData, custo: e.target.value })}
              placeholder="0.00"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Estoque"
              type="number"
              value={formData.estoque}
              onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
              placeholder="0"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoria
              </label>
              <select
                value={formData.categoria_id}
                onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all"
              >
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={handleCloseModal} type="button">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : selectedProduct ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Dialog de Confirmação de Exclusão */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Excluir Produto"
        message="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteDialogOpen(false)
          setProductToDelete(null)
        }}
        variant="danger"
      />

      {/* Toast de Notificação */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
