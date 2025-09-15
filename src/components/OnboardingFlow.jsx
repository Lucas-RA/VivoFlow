import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Circle, Clock, Users, Award, Shield } from 'lucide-react'

const onboardingSteps = [
  {
    id: 1,
    title: "Tô na Vivo",
    description: "Orientações iniciais do RH e recomendação de primeiros acessos.",
    timeEstimate: "1 dia",
    icon: Users,
    tasks: ["Orientação inicial RH", "Primeiros acessos", "Boas-vindas"]
  },
  {
    id: 2,
    title: "Treinamentos iniciais",
    description: "Treinamentos obrigatórios, normas e políticas gerais.",
    timeEstimate: "2 dias",
    icon: Award,
    tasks: ["Treinamentos obrigatórios", "Normas e políticas", "Certificações"]
  },
  {
    id: 3,
    title: "Vibe",
    description: "Escolha dos benefícios corporativos na plataforma.",
    timeEstimate: "1 dia",
    icon: Users,
    tasks: ["Escolha de benefícios", "Cadastro na plataforma", "Configurações"]
  },
  {
    id: 4,
    title: "Acessos iniciais",
    description: "Início da solicitação de acesso às plataformas da TI.",
    timeEstimate: "2 dias",
    icon: Shield,
    tasks: ["Solicitação de acessos", "Configuração de sistemas", "Validação"]
  },
  {
    id: 5,
    title: "Buddy e CSL",
    description: "Indicação de Buddy e Controle de Acesso, que apoiam no onboarding e credenciais.",
    timeEstimate: "1 dia",
    icon: Users,
    tasks: ["Apresentação do Buddy", "Controle de acesso", "Credenciais"]
  },
  {
    id: 6,
    title: "Tô na TI",
    description: "Apresentação da estrutura, áreas, papéis e principais plataformas da TI.",
    timeEstimate: "3 dias",
    icon: Users,
    tasks: ["Estrutura da TI", "Papéis e responsabilidades", "Plataformas principais"]
  },
  {
    id: 7,
    title: "Acessos áreas",
    description: "Solicitação de acessos às plataformas específicas de trabalho.",
    timeEstimate: "2 dias",
    icon: Shield,
    tasks: ["Acessos específicos", "Plataformas de trabalho", "Permissões"]
  },
  {
    id: 8,
    title: "Voz do Colaborador 30d",
    description: "Pesquisa de mapeamento de satisfação e progresso.",
    timeEstimate: "1 dia",
    icon: Users,
    tasks: ["Pesquisa de satisfação", "Mapeamento de progresso", "Feedback"]
  },
  {
    id: 9,
    title: "Trilhas técnicas",
    description: "Trilhas específicas das áreas de conhecimento na TI.",
    timeEstimate: "5 dias",
    icon: Award,
    tasks: ["Trilhas específicas", "Conhecimento técnico", "Especialização"]
  },
  {
    id: 10,
    title: "Voz do Colaborador 90d",
    description: "Pesquisa de mapeamento de satisfação e progresso.",
    timeEstimate: "1 dia",
    icon: Users,
    tasks: ["Pesquisa final", "Avaliação de progresso", "Conclusão"]
  }
]

function OnboardingFlow({ currentStep = 1, completedTasks = 0, totalTasks = 30, onStepClick, onCompleteStep, canAdvance = true }) {
  const [selectedStep, setSelectedStep] = useState(currentStep)
  
  const handleStepClick = (stepId) => {
    // Bloquear avanço de etapas - só permite clicar na etapa atual ou anteriores
    if (stepId <= currentStep) {
      setSelectedStep(stepId)
      if (onStepClick) {
        onStepClick(stepId)
      }
    }
  }

  const handleCompleteCurrentStep = () => {
    if (onCompleteStep && canAdvance) {
      onCompleteStep()
    }
  }

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed'
    if (stepId === currentStep) return 'current'
    return 'pending'
  }

  const getStepClass = (stepId) => {
    const status = getStepStatus(stepId)
    const isSelected = stepId === selectedStep
    const isClickable = stepId <= currentStep
    
    let baseClass = "w-8 h-8 rounded-full transition-all duration-200 relative z-10 flex items-center justify-center text-white font-semibold text-sm "
    
    if (!isClickable) {
      baseClass += "cursor-not-allowed opacity-50 "
    } else {
      baseClass += "cursor-pointer hover:scale-110 "
    }
    
    if (status === 'completed') {
      baseClass += "bg-green-500 shadow-lg"
    } else if (status === 'current') {
      baseClass += "bg-purple-500 shadow-lg vivo-pulse"
    } else {
      baseClass += "bg-gray-400"
    }
    
    if (isSelected) {
      baseClass += " ring-4 ring-purple-200"
    }
    
    return baseClass
  }

  const selectedStepData = onboardingSteps.find(step => step.id === selectedStep)
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="vivo-card mb-6 vivo-fade-in">
      <div className="vivo-card-header">
        <h2 className="text-xl font-bold">Jornada novo colaborador Vivo</h2>
        <p className="text-sm opacity-90 mt-1">Acompanhe seu progresso no onboarding</p>
      </div>
      
      <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
        {/* Barra de Progresso Geral */}
        <div className="mb-8">
          <div className="vivo-flex vivo-justify-between vivo-items-center mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Etapa {currentStep} de {onboardingSteps.length}
            </span>
            <span className="vivo-badge-primary">
              {progressPercentage}% concluído
            </span>
          </div>
          <div className="vivo-progress">
            <div 
              className="vivo-progress-bar" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="vivo-flex vivo-justify-between text-xs text-gray-500 mt-2">
            <span>{completedTasks} tarefas concluídas</span>
            <span>{totalTasks} tarefas totais</span>
          </div>
        </div>

        {/* Fluxo de Etapas - Responsivo */}
        <div className="space-y-8">
          {/* Primeira linha de etapas */}
          <div className="relative">
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-purple-200 z-0 hidden md:block"></div>
            <div className="vivo-grid vivo-grid-cols-1 md:vivo-grid-cols-5 gap-4">
              {onboardingSteps.slice(0, 5).map((step) => (
                <div key={step.id} className="vivo-flex vivo-flex-col vivo-items-center">
                  <div
                    className={getStepClass(step.id)}
                    onClick={() => handleStepClick(step.id)}
                    title={`Etapa ${step.id}: ${step.title}`}
                  >
                    {step.id}
                  </div>
                  <div className="mt-4 text-center w-full">
                    <div className="vivo-card bg-white p-4 min-h-[140px] vivo-flex vivo-flex-col vivo-justify-center hover:shadow-lg transition-shadow">
                      <h4 className="vivo-text-primary font-semibold text-sm mb-2">{step.title}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{step.description}</p>
                      <div className="mt-3 vivo-flex vivo-items-center vivo-justify-center">
                        <Clock className="h-3 w-3 mr-1 text-gray-400" />
                        <span className="text-xs text-gray-500">{step.timeEstimate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Segunda linha de etapas */}
          <div className="relative">
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-purple-200 z-0 hidden md:block"></div>
            <div className="vivo-grid vivo-grid-cols-1 md:vivo-grid-cols-5 gap-4">
              {onboardingSteps.slice(5, 10).map((step) => (
                <div key={step.id} className="vivo-flex vivo-flex-col vivo-items-center">
                  <div className="text-center w-full mb-4">
                    <div className="vivo-card bg-white p-4 min-h-[140px] vivo-flex vivo-flex-col vivo-justify-center hover:shadow-lg transition-shadow">
                      <h4 className="vivo-text-primary font-semibold text-sm mb-2">{step.title}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{step.description}</p>
                      <div className="mt-3 vivo-flex vivo-items-center vivo-justify-center">
                        <Clock className="h-3 w-3 mr-1 text-gray-400" />
                        <span className="text-xs text-gray-500">{step.timeEstimate}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={getStepClass(step.id)}
                    onClick={() => handleStepClick(step.id)}
                    title={`Etapa ${step.id}: ${step.title}`}
                  >
                    {step.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detalhes da Etapa Selecionada */}
        {selectedStepData && (
          <div className="vivo-card bg-white mt-8 vivo-fade-in">
            <div className="p-6">
              <div className="vivo-flex vivo-items-start vivo-justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2 vivo-text-primary">
                    {selectedStepData.id}. {selectedStepData.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {selectedStepData.description}
                  </p>
                  <div className="vivo-flex vivo-items-center space-x-4 text-sm">
                    <span className="vivo-flex vivo-items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      Tempo previsto: {selectedStepData.timeEstimate}
                    </span>
                    <span className={`vivo-badge-${
                      getStepStatus(selectedStepData.id) === 'completed' ? 'success' :
                      getStepStatus(selectedStepData.id) === 'current' ? 'primary' : 'secondary'
                    }`}>
                      {getStepStatus(selectedStepData.id) === 'completed' ? 'Concluída' :
                       getStepStatus(selectedStepData.id) === 'current' ? 'Em andamento' : 'Pendente'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lista de Tarefas da Etapa */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Tarefas desta etapa:</h4>
                <div className="space-y-3">
                  {selectedStepData.tasks.map((task, index) => (
                    <div key={index} className="vivo-flex vivo-items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className={`w-6 h-6 rounded-full vivo-flex vivo-items-center vivo-justify-center ${
                        getStepStatus(selectedStepData.id) === 'completed' 
                          ? 'bg-green-100' 
                          : 'bg-gray-200'
                      }`}>
                        {getStepStatus(selectedStepData.id) === 'completed' && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        getStepStatus(selectedStepData.id) === 'completed' 
                          ? 'text-green-700 line-through' 
                          : 'text-gray-700'
                      }`}>
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Botão de Concluir Etapa */}
                {selectedStepData.id === currentStep && canAdvance && getStepStatus(selectedStepData.id) === 'current' && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="vivo-flex vivo-justify-between vivo-items-center">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Pronto para avançar para a próxima etapa?
                        </p>
                        <p className="text-xs text-gray-500">
                          Certifique-se de que todas as tarefas desta etapa foram concluídas.
                        </p>
                      </div>
                      <button
                        onClick={handleCompleteCurrentStep}
                        className="vivo-btn-primary px-6 py-2 text-sm font-medium"
                      >
                        Concluir Etapa {currentStep}
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Mensagem para etapa já concluída */}
                {getStepStatus(selectedStepData.id) === 'completed' && (
                  <div className="mt-6 pt-4 border-t border-green-200 bg-green-50 p-4 rounded-lg">
                    <div className="vivo-flex vivo-items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        Etapa concluída com sucesso!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnboardingFlow

