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

function OnboardingFlow({ currentStep = 1, completedTasks = 0, totalTasks = 30, onStepClick }) {
  const [selectedStep, setSelectedStep] = useState(currentStep)
  
  const handleStepClick = (stepId) => {
    setSelectedStep(stepId)
    if (onStepClick) {
      onStepClick(stepId)
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
    
    let baseClass = "w-6 h-6 rounded-full cursor-pointer transition-all duration-200 relative z-10 "
    
    if (status === 'completed') {
      baseClass += "bg-pink-500"
    } else if (status === 'current') {
      baseClass += "bg-pink-400"
    } else {
      baseClass += "bg-gray-400"
    }
    
    if (isSelected) {
      baseClass += " ring-4 ring-pink-200"
    }
    
    return baseClass
  }

  const selectedStepData = onboardingSteps.find(step => step.id === selectedStep)
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100)

  return (
    <Card className="mb-6">
      <CardHeader className="bg-purple-700 text-white">
        <CardTitle>Jornada novo colaborador Vivo</CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-gradient-to-r from-purple-800 to-purple-600">
        {/* Barra de Progresso Geral */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Etapa {currentStep} de {onboardingSteps.length}</span>
            <span className="text-sm text-purple-200">{progressPercentage}% concluído</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-purple-200 mt-1">
            <span>{completedTasks} tarefas concluídas</span>
            <span>{totalTasks} tarefas totais</span>
          </div>
        </div>

        {/* Fluxo de Etapas - Linha do Tempo */}
        <div className="relative">
          {/* Linha conectora */}
          <div className="absolute top-3 left-3 right-3 h-0.5 bg-pink-300 z-0"></div>
          
          {/* Grid de etapas */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            {onboardingSteps.slice(0, 5).map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={getStepClass(step.id)}
                  onClick={() => handleStepClick(step.id)}
                  title={`Etapa ${step.id}: ${step.title}`}
                />
                <div className="mt-4 text-center">
                  <div className="bg-purple-600 rounded-lg p-3 mb-2 min-h-[120px] flex flex-col justify-center">
                    <h4 className="text-white font-semibold text-sm mb-1">{step.title}</h4>
                    <p className="text-purple-200 text-xs leading-tight">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Segunda linha */}
          <div className="relative">
            <div className="absolute top-3 left-3 right-3 h-0.5 bg-pink-300 z-0"></div>
            <div className="grid grid-cols-5 gap-4">
              {onboardingSteps.slice(5, 10).map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className="mt-4 text-center">
                    <div className="bg-purple-600 rounded-lg p-3 mb-2 min-h-[120px] flex flex-col justify-center">
                      <h4 className="text-white font-semibold text-sm mb-1">{step.title}</h4>
                      <p className="text-purple-200 text-xs leading-tight">{step.description}</p>
                    </div>
                  </div>
                  <div
                    className={getStepClass(step.id)}
                    onClick={() => handleStepClick(step.id)}
                    title={`Etapa ${step.id}: ${step.title}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detalhes da Etapa Selecionada */}
        {selectedStepData && (
          <div className="bg-white rounded-lg p-6 mt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-xl mb-2 text-purple-700">
                  {selectedStepData.id}. {selectedStepData.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {selectedStepData.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Tempo previsto: {selectedStepData.timeEstimate}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {getStepStatus(selectedStepData.id) === 'completed' ? 'Concluída' :
                     getStepStatus(selectedStepData.id) === 'current' ? 'Em andamento' : 'Pendente'}
                  </span>
                </div>
              </div>
            </div>

            {/* Lista de Tarefas da Etapa */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Tarefas desta etapa:</h4>
              <ul className="space-y-2">
                {selectedStepData.tasks.map((task, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      getStepStatus(selectedStepData.id) === 'completed' 
                        ? 'bg-green-100' 
                        : 'bg-gray-100'
                    }`}>
                      {getStepStatus(selectedStepData.id) === 'completed' && (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      )}
                    </div>
                    <span className={`text-sm ${
                      getStepStatus(selectedStepData.id) === 'completed' 
                        ? 'text-green-700 line-through' 
                        : 'text-gray-700'
                    }`}>
                      {task}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default OnboardingFlow

