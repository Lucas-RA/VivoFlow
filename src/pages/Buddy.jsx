import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { User, MessageCircle, CheckCircle, Clock, Users, Send, Plus } from 'lucide-react'
import CreateTaskModal from '../components/CreateTaskModal'
import Sidebar from '../components/Sidebar'
import ChatModal from '../components/ChatModal'
import BackToLoginButton from '../components/BackToLoginButton'

function Buddy() {
  const [newMessage, setNewMessage] = useState('')
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [activeChatModal, setActiveChatModal] = useState(null)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Revisar documentos de onboarding para Carlos Silva",
      description: "Verificar se todos os documentos estão corretos e completos",
      status: "pending",
      priority: "high",
      assignedTo: "Carlos Silva",
      createdAt: "10/08/2024",
      createdBy: "Buddy"
    },
    {
      id: 2,
      title: "Agendar na configuração do e-mail corporativo para Ana Paula",
      description: "Auxiliar na configuração do e-mail corporativo",
      status: "completed",
      priority: "medium",
      assignedTo: "Ana Paula",
      createdAt: "08/08/2024",
      createdBy: "Buddy"
    },
    {
      id: 3,
      title: "Realizar reunião de integração inicial para João Santos",
      description: "Primeira reunião de integração e apresentação da equipe",
      status: "pending",
      priority: "high",
      assignedTo: "João Santos",
      createdAt: "11/08/2024",
      createdBy: "Buddy"
    },
    {
      id: 4,
      title: "Auxiliar no acesso às plataformas de TI para Fernanda Lima",
      description: "Ajudar com acesso aos sistemas internos",
      status: "pending",
      priority: "high",
      assignedTo: "Fernanda Lima",
      createdAt: "11/08/2024",
      createdBy: "Buddy"
    }
  ])

  const handleCreateTask = (newTask) => {
    setTasks(prev => [...prev, newTask])
  }

  const handleMenuClick = (menuId) => {
    setCurrentPage(menuId)
  }

  const handleChatClick = (collaboratorName) => {
    setActiveChatModal({ 
      type: 'buddy', 
      title: `Chat com ${collaboratorName}`,
      collaboratorInfo: { name: collaboratorName }
    })
  }

  const closeChatModal = () => {
    setActiveChatModal(null)
  }

  const handleCompleteTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'completed' }
        : task
    ))
  }

  const assignedEmployees = [
    { name: "Carlos Silva", status: "active" },
    { name: "Ana Paula", status: "active" },
    { name: "João Santos", status: "active" },
    { name: "Fernanda Lima", status: "active" }
  ]

  const messages = [
    {
      sender: "Carlos Silva",
      content: "Oi! Preciso de ajuda para acessar o sistema interno - não consigo entrar!",
      time: "10:30",
      type: "received"
    },
    {
      sender: "Você",
      content: "Olá Carlos! Vou te ajudar agora mesmo. Você já tentou resetar a senha?",
      time: "10:32",
      type: "sent"
    },
    {
      sender: "Ana Paula",
      content: "Buddy, consegui acessar todos os sistemas. Muito obrigada pela ajuda!",
      time: "09:15",
      type: "received"
    }
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Aqui seria implementada a lógica de envio de mensagem
      setNewMessage('')
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    return status === 'completed' ? 'text-green-600' : 'text-orange-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard Buddy</h1>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Nome do Buddy</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          userType="buddy" 
          currentPage={currentPage} 
          onMenuClick={handleMenuClick}
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header com botão de criar tarefa */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Buddy</h2>
            <CreateTaskModal onCreateTask={handleCreateTask} userType="buddy" />
          </div>

          {/* Tarefas para Ajudar os Novos Colaboradores */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Tarefas para Ajudar os Novos Colaboradores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task, index) => (
                <div key={task.id || index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">{task.title}</p>
                      {task.description && (
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      )}
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority === 'high' ? 'Urgente' : 
                           task.priority === 'medium' ? 'Médio' : 'Baixo'}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {task.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-orange-600" />
                          )}
                          <span className={`text-sm ${getStatusColor(task.status)}`}>
                            {task.status === 'completed' ? 'Concluída' : 'Pendente'}
                          </span>
                        </div>
                      </div>
                      {task.assignedTo && (
                        <p className="text-sm text-gray-500">Para: {task.assignedTo}</p>
                      )}
                      {task.createdAt && (
                        <p className="text-sm text-gray-500">Criado em: {task.createdAt}</p>
                      )}
                    </div>
                    {task.status === 'pending' && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        Marcar como Concluída
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Colaboradores Designados */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Colaboradores Designados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {assignedEmployees.map((employee, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => handleChatClick(employee.name)}
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900">{employee.name}</h4>
                    <div className="flex items-center justify-center mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      <span className="text-xs text-green-600">Ativo</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Clique para conversar</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mensagens com Colaboradores Designados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Mensagens com Colaboradores Designados
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Chat Messages */}
              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'sent' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-green-100 text-gray-900'
                    }`}>
                      <div className="font-medium text-sm mb-1">
                        {message.sender}
                      </div>
                      <div className="text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 ${
                        message.type === 'sent' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t pt-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Modal */}
      {activeChatModal && (
        <ChatModal
          isOpen={true}
          onClose={closeChatModal}
          title={activeChatModal.title}
          chatType={activeChatModal.type}
          collaboratorInfo={activeChatModal.collaboratorInfo}
        />
      )}

      {/* Back to Login Button */}
      <BackToLoginButton />
    </div>
  )
}

export default Buddy

