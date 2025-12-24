import { useState } from 'react'
import { User, Mail, Calendar, MoreVertical, UserPlus, Ban, Trash2, CheckCircle } from 'lucide-react'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Input from '../components/Input'
import ConfirmDialog from '../components/ConfirmDialog'
import Toast from '../components/Toast'

interface UserData {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  joinDate: string
  avatar: string
}

const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2024-01-15',
    avatar: 'https://ui-avatars.com/api/?name=João+Silva&background=random'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    role: 'Editor',
    status: 'active',
    joinDate: '2024-02-20',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=random'
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    role: 'Viewer',
    status: 'inactive',
    joinDate: '2024-03-10',
    avatar: 'https://ui-avatars.com/api/?name=Pedro+Oliveira&background=random'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@email.com',
    role: 'Editor',
    status: 'active',
    joinDate: '2024-03-25',
    avatar: 'https://ui-avatars.com/api/?name=Ana+Costa&background=random'
  },
]

export default function Users() {
  const [users, setUsers] = useState<UserData[]>(mockUsers)
  const [showModal, setShowModal] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer' })
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: UserData = {
        id: String(users.length + 1),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name)}&background=random`
      }
      setUsers([...users, user])
      setShowModal(false)
      setNewUser({ name: '', email: '', role: 'Viewer' })
      setToast({ message: 'Usuário adicionado com sucesso!', type: 'success' })
    }
  }

  const handleDeleteUser = () => {
    if (selectedUserId) {
      setUsers(users.filter(u => u.id !== selectedUserId))
      setShowDeleteDialog(false)
      setSelectedUserId(null)
      setOpenMenuId(null)
      setToast({ message: 'Usuário excluído com sucesso!', type: 'success' })
    }
  }

  const handleToggleBlock = () => {
    if (selectedUserId) {
      setUsers(users.map(u => 
        u.id === selectedUserId 
          ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
          : u
      ))
      const user = users.find(u => u.id === selectedUserId)
      const action = user?.status === 'active' ? 'bloqueado' : 'desbloqueado'
      setShowBlockDialog(false)
      setSelectedUserId(null)
      setOpenMenuId(null)
      setToast({ message: `Usuário ${action} com sucesso!`, type: 'success' })
    }
  }

  const openDeleteDialog = (userId: string) => {
    setSelectedUserId(userId)
    setShowDeleteDialog(true)
    setOpenMenuId(null)
  }

  const openBlockDialog = (userId: string) => {
    setSelectedUserId(userId)
    setShowBlockDialog(true)
    setOpenMenuId(null)
  }

  const toggleMenu = (userId: string) => {
    setOpenMenuId(openMenuId === userId ? null : userId)
  }

  const selectedUser = users.find(u => u.id === selectedUserId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Usuários</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie os usuários da plataforma
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Adicionar Usuário
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <User className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ativos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <User className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inativos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {users.filter(u => u.status === 'inactive').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {users.filter(u => u.role === 'Admin').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div 
            key={user.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow animate-fade-in"
          >
            <div className="flex items-start justify-between mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="relative">
                <button 
                  onClick={() => toggleMenu(user.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                
                {openMenuId === user.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-10 animate-scale-in">
                    <div className="py-1">
                      <button
                        onClick={() => openBlockDialog(user.id)}
                        className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                      >
                        {user.status === 'active' ? (
                          <>
                            <Ban className="w-4 h-4 text-yellow-600" />
                            Bloquear Usuário
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Desbloquear Usuário
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => openDeleteDialog(user.id)}
                        className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir Usuário
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {user.name}
            </h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                Desde {new Date(user.joinDate).toLocaleDateString('pt-BR')}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {user.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-xs font-medium">
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Adicionar Novo Usuário"
      >
        <div className="space-y-4">
          <Input
            label="Nome"
            placeholder="Nome completo"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="email@exemplo.com"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Função
            </label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="Viewer">Viewer</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleAddUser}
              className="flex-1"
            >
              Adicionar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteUser}
        title="Excluir Usuário"
        message={`Tem certeza que deseja excluir o usuário ${selectedUser?.name}? Esta ação não pode ser desfeita.`}
        variant="danger"
      />

      {/* Block/Unblock Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showBlockDialog}
        onClose={() => setShowBlockDialog(false)}
        onConfirm={handleToggleBlock}
        title={selectedUser?.status === 'active' ? 'Bloquear Usuário' : 'Desbloquear Usuário'}
        message={
          selectedUser?.status === 'active'
            ? `Deseja bloquear o usuário ${selectedUser?.name}? Ele não poderá mais acessar o sistema.`
            : `Deseja desbloquear o usuário ${selectedUser?.name}? Ele poderá acessar o sistema novamente.`
        }
        variant={selectedUser?.status === 'active' ? 'warning' : 'info'}
      />

      {/* Toast Notification */}
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
