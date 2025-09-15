import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, FileText, MessageCircle, CheckCircle, Users, Calendar, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Sidebar({ userType, currentPage, onMenuClick }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Limpar dados de autenticação se necessário
    navigate('/login')
  }

  const getMenuItems = () => {
    switch (userType) {
      case 'colaborador':
        return [
          { id: 'fluxo', label: 'Fluxo', icon: CheckCircle, active: currentPage === 'fluxo' },
          { id: 'materiais', label: 'Materiais', icon: FileText, active: currentPage === 'materiais' },
          { id: 'chats', label: 'Chats', icon: MessageCircle, active: currentPage === 'chats' },
          { id: 'perguntas', label: 'Perguntas', icon: User, active: currentPage === 'perguntas' }
        ]
      case 'gestor':
        return [
          { id: 'painel', label: 'Painel Geral', icon: Users, active: currentPage === 'painel' },
          { id: 'mensagens', label: 'Mensagens', icon: MessageCircle, active: currentPage === 'mensagens' },
          { id: 'acompanhamento', label: 'Acompanhamento Individual', icon: User, active: currentPage === 'acompanhamento' },
          { id: 'detalhes', label: 'Detalhes do Colaborador', icon: Calendar, active: currentPage === 'detalhes' }
        ]
      case 'buddy':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Users, active: currentPage === 'dashboard' },
          { id: 'colaboradores', label: 'Meus Colaboradores', icon: User, active: currentPage === 'colaboradores' },
          { id: 'tarefas', label: 'Tarefas', icon: CheckCircle, active: currentPage === 'tarefas' },
          { id: 'mensagens', label: 'Mensagens', icon: MessageCircle, active: currentPage === 'mensagens' }
        ]
      default:
        return []
    }
  }

  const menuItems = getMenuItems()

  return (
    <div className="w-64 bg-purple-700 min-h-screen flex flex-col">
      <div className="p-4 flex-1">
        <h2 className="text-white font-bold text-lg mb-6">Onboarding</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.id}
                className={`px-3 py-2 rounded-md flex items-center cursor-pointer transition-colors ${
                  item.active
                    ? 'bg-green-600 text-white'
                    : 'text-purple-200 hover:bg-purple-600'
                }`}
                onClick={() => onMenuClick && onMenuClick(item.id)}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {item.label}
              </div>
            )
          })}
        </nav>
      </div>
      
      {/* Botão de Voltar para Login */}
      <div className="p-4 border-t border-purple-600">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full text-purple-200 border-purple-400 hover:bg-purple-600 hover:text-white"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Voltar ao Login
        </Button>
      </div>
    </div>
  )
}

export default Sidebar

