import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { User, MessageCircle, CheckCircle, Clock, Users, Send, Plus, Star, ThumbsUp, Share2 } from 'lucide-react'
import CreateTaskModal from '../components/CreateTaskModal'
import Sidebar from '../components/Sidebar'
import ChatModal from '../components/ChatModal'
import BackToLoginButton from '../components/BackToLoginButton'

function Buddy() {
  const [newMessage, setNewMessage] = useState('')
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [activeChatModal, setActiveChatModal] = useState(null)
  const [newPractice, setNewPractice] = useState({ title: '', description: '', category: 'onboarding' })
  const [bestPractices, setBestPractices] = useState([
    {
      id: 1,
      title: "Primeira reunião de integração",
      description: "Sempre agendar uma reunião de 30 minutos no primeiro dia para apresentar a equipe e esclarecer dúvidas iniciais.",
      author: "Maria Santos",
      category: "onboarding",
      likes: 15,
      date: "12/08/2024",
      tags: ["integração", "primeiro dia", "equipe"]
    },
    {
      id: 2,
      title: "Checklist de acessos",
      description: "Criar um checklist personalizado para cada novo colaborador com todos os sistemas que ele precisará acessar.",
      author: "Pedro Costa",
      category: "sistemas",
      likes: 23,
      date: "10/08/2024",
      tags: ["acessos", "sistemas", "checklist"]
    },
    {
      id: 3,
      title: "Acompanhamento semanal",
      description: "Fazer reuniões semanais de 15 minutos nas primeiras 4 semanas para acompanhar o progresso e identificar dificuldades.",
      author: "Ana Santos",
      category: "acompanhamento",
      likes: 18,
      date: "08/08/2024",
      tags: ["acompanhamento", "reuniões", "progresso"]
    },
    {
      id: 4,
      title: "Documentação de processos",
      description: "Manter uma pasta compartilhada com documentos essenciais e tutoriais específicos da área do novo colaborador.",
      author: "Carlos Mendes",
      category: "documentação",
      likes: 12,
      date: "05/08/2024",
      tags: ["documentação", "processos", "tutoriais"]
    }
  ])
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

  const handleAddPractice = () => {
    if (newPractice.title.trim() && newPractice.description.trim()) {
      const practice = {
        id: bestPractices.length + 1,
        ...newPractice,
        author: "Nome do Buddy", // Em uma implementação real, viria do contexto de autenticação
        likes: 0,
        date: new Date().toLocaleDateString('pt-BR'),
        tags: newPractice.description.toLowerCase().split(' ').filter(word => word.length > 3).slice(0, 3)
      }
      setBestPractices(prev => [practice, ...prev])
      setNewPractice({ title: '', description: '', category: 'onboarding' })
    }
  }

  const handleLikePractice = (practiceId) => {
    setBestPractices(prev => prev.map(practice => 
      practice.id === practiceId 
        ? { ...practice, likes: practice.likes + 1 }
        : practice
    ))
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'onboarding': return 'bg-blue-100 text-blue-800'
      case 'sistemas': return 'bg-green-100 text-green-800'
      case 'acompanhamento': return 'bg-purple-100 text-purple-800'
      case 'documentação': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
      <header className="vivo-header border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-white">Dashboard Buddy</h1>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-white" />
              <span className="text-sm text-white font-medium">Nome do Buddy</span>
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
                        className="vivo-btn-primary"
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
                    className="vivo-card border border-blue-200 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => handleChatClick(employee.name)}
                  >
                    <div className="w-12 h-12 vivo-bg-secondary rounded-full mx-auto mb-2 flex items-center justify-center">
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
          <Card className="mb-6">
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
                    className="vivo-btn-primary"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comunidade de Boas Práticas */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Comunidade de Boas Práticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Formulário para adicionar nova prática */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Compartilhar uma nova boa prática</h4>
                <div className="space-y-3">
                  <Input
                    placeholder="Título da prática..."
                    value={newPractice.title}
                    onChange={(e) => setNewPractice(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Descreva a prática em detalhes..."
                    value={newPractice.description}
                    onChange={(e) => setNewPractice(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[80px]"
                  />
                  <div className="flex space-x-2">
                    <select
                      className="p-2 border border-gray-300 rounded-md"
                      value={newPractice.category}
                      onChange={(e) => setNewPractice(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="onboarding">Onboarding</option>
                      <option value="sistemas">Sistemas</option>
                      <option value="acompanhamento">Acompanhamento</option>
                      <option value="documentação">Documentação</option>
                    </select>
                    <Button 
                      onClick={handleAddPractice}
                      disabled={!newPractice.title.trim() || !newPractice.description.trim()}
                      className="vivo-btn-primary"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </div>

              {/* Lista de boas práticas */}
              <div className="space-y-4">
                {bestPractices.map((practice) => (
                  <div key={practice.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{practice.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{practice.description}</p>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getCategoryColor(practice.category)}>
                            {practice.category}
                          </Badge>
                          {practice.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Por {practice.author} • {practice.date}</span>
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => handleLikePractice(practice.id)}
                              className="flex items-center space-x-1 hover:text-purple-600 transition-colors vivo-text-primary"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>{practice.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-purple-600 transition-colors vivo-text-primary">
                              <Share2 className="h-4 w-4" />
                              <span>Compartilhar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

