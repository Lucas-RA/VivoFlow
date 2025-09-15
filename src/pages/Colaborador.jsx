import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { User, FileText, MessageCircle, CheckCircle } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import ChatIA from '@/components/ChatIA'
import OnboardingFlow from '@/components/OnboardingFlow'
import Sidebar from '@/components/Sidebar'
import ChatModal from '@/components/ChatModal'
import BackToLoginButton from '@/components/BackToLoginButton'

function Colaborador() {
  const { state, getTasksByUser, getCollaboratorProgress, updateTask } = useApp()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('fluxo')
  const [activeChatModal, setActiveChatModal] = useState(null)
  
  // Simulando usuário logado (em uma implementação real, viria do contexto de autenticação)
  const currentUser = "Carlos Silva"
  const userTasks = getTasksByUser(currentUser)
  const userProgress = getCollaboratorProgress(currentUser)
  
  const completedTasks = userTasks.filter(task => task.status === 'completed').length
  const totalTasks = userTasks.length
  const currentStep = Math.ceil((completedTasks / totalTasks) * 10) || 1
  const totalSteps = 10

  const materials = [
    { title: "Treinamento Inicial - PDF", description: "Manual completo para integração inicial com políticas e normas.", completed: true },
    { title: "Vídeo - Apresentação da Vivo", description: "Vídeo institucional sobre valores corporativos da Vivo.", completed: userProgress > 30 },
    { title: "Guia do Funcionário", description: "Documento detalhado com processos e procedimentos essenciais.", completed: userProgress > 60 }
  ]

  const chats = [
    { title: "Chat de Dúvidas (24/7)", description: "Tire dúvidas que sobre as atividades de onboarding.", status: "available" },
    { title: "Chat com Gestor", description: "Fale à vontade com seu novo Gestor sobre dúvidas.", status: "available" },
    { title: "Chat com Buddy", description: "Converse sobre qualquer assunto sobre o 'novo job'.", status: "available" }
  ]

  const progressData = [
    { label: "Etapas Concluídas", value: completedTasks.toString(), color: "bg-green-500" },
    { label: "Porcentagem de Progresso", value: `${userProgress}%`, color: "bg-blue-500" },
    { label: "Dúvidas Respondidas", value: "23", color: "bg-purple-500" },
    { label: "Tempo Atual (dias)", value: "25", color: "bg-orange-500" }
  ]

  const handleCompleteTask = (taskId) => {
    updateTask(taskId, { status: 'completed' })
  }

  const handleMenuClick = (menuId) => {
    setCurrentPage(menuId)
  }

  const handleChatClick = (chatType, title) => {
    // Fechar qualquer chat aberto e abrir o novo
    setActiveChatModal({ type: chatType, title })
  }

  const closeChatModal = () => {
    setActiveChatModal(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Bem-vindo, Novo Colaborador</h1>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600 font-medium">{currentUser}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          userType="colaborador" 
          currentPage={currentPage} 
          onMenuClick={handleMenuClick}
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Fluxo do Onboarding */}
          <OnboardingFlow 
            currentStep={currentStep}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            onStepClick={(stepId) => {
              console.log(`Navegando para etapa ${stepId}`)
              // Aqui você pode adicionar lógica para navegar entre etapas
            }}
          />

          {/* Minhas Tarefas */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Minhas Tarefas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {userTasks.length > 0 ? (
                userTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                        {task.description && (
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        )}
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            task.priority === 'high' ? 'bg-red-100 text-red-800' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {task.priority === 'high' ? 'Urgente' : 
                             task.priority === 'medium' ? 'Médio' : 'Baixo'}
                          </Badge>
                          <span className="text-sm text-gray-500">Criado por: {task.createdBy}</span>
                        </div>
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
                      {task.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Nenhuma tarefa atribuída no momento.</p>
              )}
            </CardContent>
          </Card>

          {/* Materiais de Aprendizado */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Materiais de Aprendizado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {materials.map((material, index) => (
                <div key={index} className="bg-purple-700 text-white p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{material.title}</h4>
                      <p className="text-purple-200 text-sm">{material.description}</p>
                    </div>
                    {material.completed && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chats de Dúvida */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Chats de Dúvida</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {chats.map((chat, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple-700">{chat.title}</h4>
                      <p className="text-gray-600 text-sm">{chat.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleChatClick(
                          index === 0 ? 'duvidas' : index === 1 ? 'gestor' : 'buddy',
                          chat.title
                        )}
                      >
                        Conversar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Progresso do Onboarding */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso do Onboarding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {progressData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`${item.color} text-white rounded-lg p-4 mb-2`}>
                      <div className="text-2xl font-bold">{item.value}</div>
                    </div>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat IA */}
      <ChatIA 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)}
        userType="colaborador"
      />

      {/* Chat Modal */}
      {activeChatModal && (
        <ChatModal
          isOpen={true}
          onClose={closeChatModal}
          title={activeChatModal.title}
          chatType={activeChatModal.type}
        />
      )}

      {/* Back to Login Button */}
      <BackToLoginButton />
    </div>
  )
}

export default Colaborador

