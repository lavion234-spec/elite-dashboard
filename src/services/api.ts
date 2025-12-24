/**
 * Serviço de Integração com a API Backend
 * Conecta o Dashboard React com a API Node.js + MySQL
 */

const BASE_URL = 'http://localhost:3000/api';

interface Metrics {
  total_vendas: number;
  total_gastos: number;
  total_lucro: number;
  margem_lucro: number;
  vendas_mes_atual: number;
  vendas_mes_anterior: number;
  crescimento_percentual: number;
}

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  custo: number;
  estoque: number;
  categoria_id: number | null;
  imagem: string | null;
  created_at: string;
}

interface Seller {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  comissao_percentual: number;
  meta_mensal: number;
  ativo: boolean;
  created_at: string;
}

interface Order {
  id: number;
  vendedor_id: number;
  vendedor_nome?: string;
  cliente_nome: string;
  data_pedido: string;
  status: string;
  valor_total: number;
  observacoes?: string;
  items?: OrderItem[];
}

interface OrderItem {
  produto_id: number;
  produto_nome: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

interface TopProduct {
  produto_id: number;
  produto_nome: string;
  total_vendido: number;
  quantidade_total: number;
}

interface TopSeller {
  vendedor_id: number;
  vendedor_nome: string;
  total_vendas: number;
  numero_pedidos: number;
}

/**
 * Serviço de Dashboard - Métricas e KPIs
 */
export const dashboardService = {
  /**
   * Busca métricas gerais do dashboard
   */
  async getMetrics(): Promise<Metrics> {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/metricas`);
      if (!response.ok) throw new Error('Erro ao buscar métricas');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
      throw error;
    }
  },

  /**
   * Busca top 5 produtos mais vendidos
   */
  async getTopProducts(): Promise<TopProduct[]> {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/top-produtos`);
      if (!response.ok) throw new Error('Erro ao buscar top produtos');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar top produtos:', error);
      throw error;
    }
  },

  /**
   * Busca top 5 vendedores com melhor desempenho
   */
  async getTopSellers(): Promise<TopSeller[]> {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/top-vendedores`);
      if (!response.ok) throw new Error('Erro ao buscar top vendedores');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar top vendedores:', error);
      throw error;
    }
  },
};

/**
 * Serviço de Produtos
 */
export const productsService = {
  /**
   * Busca todos os produtos
   */
  async getAll(): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/produtos`);
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

  /**
   * Busca produto por ID
   */
  async getById(id: number): Promise<Product> {
    try {
      const response = await fetch(`${BASE_URL}/produtos/${id}`);
      if (!response.ok) throw new Error('Erro ao buscar produto');
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  },

  /**
   * Cria novo produto
   */
  async create(data: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    try {
      const response = await fetch(`${BASE_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao criar produto');
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },

  /**
   * Atualiza produto existente
   */
  async update(id: number, data: Partial<Product>): Promise<Product> {
    try {
      const response = await fetch(`${BASE_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao atualizar produto');
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  },

  /**
   * Deleta produto
   */
  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/produtos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar produto');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  },
};

/**
 * Serviço de Vendedores
 */
export const sellersService = {
  /**
   * Busca todos os vendedores
   */
  async getAll(): Promise<Seller[]> {
    try {
      const response = await fetch(`${BASE_URL}/vendedores`);
      if (!response.ok) throw new Error('Erro ao buscar vendedores');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar vendedores:', error);
      throw error;
    }
  },

  /**
   * Busca vendedor por ID
   */
  async getById(id: number): Promise<Seller> {
    try {
      const response = await fetch(`${BASE_URL}/vendedores/${id}`);
      if (!response.ok) throw new Error('Erro ao buscar vendedor');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar vendedor:', error);
      throw error;
    }
  },

  /**
   * Cria novo vendedor
   */
  async create(data: Omit<Seller, 'id' | 'created_at'>): Promise<Seller> {
    try {
      const response = await fetch(`${BASE_URL}/vendedores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao criar vendedor');
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar vendedor:', error);
      throw error;
    }
  },

  /**
   * Atualiza vendedor existente
   */
  async update(id: number, data: Partial<Seller>): Promise<Seller> {
    try {
      const response = await fetch(`${BASE_URL}/vendedores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao atualizar vendedor');
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar vendedor:', error);
      throw error;
    }
  },

  /**
   * Deleta vendedor
   */
  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/vendedores/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar vendedor');
    } catch (error) {
      console.error('Erro ao deletar vendedor:', error);
      throw error;
    }
  },
};

/**
 * Serviço de Pedidos
 */
export const ordersService = {
  /**
   * Busca todos os pedidos
   */
  async getAll(): Promise<Order[]> {
    try {
      const response = await fetch(`${BASE_URL}/pedidos`);
      if (!response.ok) throw new Error('Erro ao buscar pedidos');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw error;
    }
  },

  /**
   * Busca pedido por ID com itens
   */
  async getById(id: number): Promise<Order> {
    try {
      const response = await fetch(`${BASE_URL}/pedidos/${id}`);
      if (!response.ok) throw new Error('Erro ao buscar pedido');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      throw error;
    }
  },

  /**
   * Cria novo pedido
   */
  async create(data: {
    vendedor_id: number;
    cliente_nome: string;
    observacoes?: string;
    items: Array<{
      produto_id: number;
      quantidade: number;
      preco_unitario: number;
    }>;
  }): Promise<Order> {
    try {
      const response = await fetch(`${BASE_URL}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.erro || 'Erro ao criar pedido');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  },

  /**
   * Atualiza status do pedido
   */
  async updateStatus(id: number, status: string): Promise<Order> {
    try {
      const response = await fetch(`${BASE_URL}/pedidos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Erro ao atualizar pedido');
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw error;
    }
  },

  /**
   * Deleta pedido
   */
  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/pedidos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar pedido');
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      throw error;
    }
  },
};

/**
 * Função auxiliar para verificar se a API está online
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/dashboard/metricas`);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export default {
  dashboard: dashboardService,
  products: productsService,
  sellers: sellersService,
  orders: ordersService,
  checkHealth: checkApiHealth,
};
