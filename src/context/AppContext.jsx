import { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

// Estado inicial
const initialState = {
  user: null,
  tasks: [
    {
      id: 1,
      title: "Revisar documentos de onboarding",
      description: "Verificar se todos os documentos estão corretos e completos",
      status: "pending",
      priority: "high",
      assignedTo: "Carlos Silva",
      createdAt: "10/08/2024",
      createdBy: "Gestor",
      completedAt: null
    },
    {
      id: 2,
      title: "Configurar acesso aos sistemas",
      description: "Liberar acesso ao CRM e sistemas internos",
      status: "completed",
      priority: "medium",
      assignedTo: "Ana Paula",
      createdAt: "08/08/2024",
      createdBy: "Buddy",
      completedAt: "09/08/2024"
    },
    {
      id: 3,
      title: "Realizar reunião de integração",
      description: "Primeira reunião de integração e apresentação da equipe",
      status: "pending",
      priority: "high",
      assignedTo: "João Santos",
      createdAt: "11/08/2024",
      createdBy: "Buddy",
      completedAt: null
    }
  ],
  collaborators: [
    {
      id: 1,
      name: "Carlos Silva",
      position: "Desenvolvedor Frontend",
      startDate: "01/08/2024",
      currentStep: 4,
      totalSteps: 10,
      buddy: "Pedro Costa",
      status: "active"
    },
    {
      id: 2,
      name: "Ana Paula",
      position: "Designer UX/UI",
      startDate: "28/07/2024",
      currentStep: 8,
      totalSteps: 10,
      buddy: "Juliana Alves",
      status: "active"
    },
    {
      id: 3,
      name: "João Santos",
      position: "Analista de TI",
      startDate: "05/08/2024",
      currentStep: 6,
      totalSteps: 10,
      buddy: "Maria Santos",
      status: "active"
    },
    {
      id: 4,
      name: "Fernanda Lima",
      position: "Analista de Marketing",
      startDate: "25/07/2024",
      currentStep: 10,
      totalSteps: 10,
      buddy: "Roberto Silva",
      status: "completed"
    }
  ],
  documents: [
    {
      id: 1,
      name: "Manual do Funcionário",
      type: "PDF",
      uploadedAt: "01/08/2024",
      uploadedBy: "RH",
      size: "2.5 MB"
    },
    {
      id: 2,
      name: "Política de Segurança",
      type: "PDF",
      uploadedAt: "01/08/2024",
      uploadedBy: "TI",
      size: "1.8 MB"
    }
  ],
  messages: [],
  notifications: []
}

// Reducer para gerenciar as ações
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }

    case 'ADD_TASK':
      const newTask = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toLocaleDateString('pt-BR'),
        status: action.payload.status || 'pending',
        completedAt: null
      }
      return {
        ...state,
        tasks: [...state.tasks, newTask]
      }

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { 
                ...task, 
                ...action.payload.updates,
                completedAt: action.payload.updates.status === 'completed' 
                  ? new Date().toLocaleDateString('pt-BR') 
                  : task.completedAt
              }
            : task
        )
      }

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }

    case 'UPDATE_COLLABORATOR_PROGRESS':
      return {
        ...state,
        collaborators: state.collaborators.map(collaborator =>
          collaborator.id === action.payload.id
            ? { 
                ...collaborator, 
                currentStep: action.payload.currentStep,
                status: action.payload.currentStep >= collaborator.totalSteps ? 'completed' : 'active'
              }
            : collaborator
        )
      }

    case 'ADD_DOCUMENT':
      const newDocument = {
        ...action.payload,
        id: Date.now(),
        uploadedAt: new Date().toLocaleDateString('pt-BR')
      }
      return {
        ...state,
        documents: [...state.documents, newDocument]
      }

    case 'DELETE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter(doc => doc.id !== action.payload)
      }

    case 'ADD_MESSAGE':
      const newMessage = {
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString()
      }
      return {
        ...state,
        messages: [...state.messages, newMessage]
      }

    case 'ADD_NOTIFICATION':
      const newNotification = {
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false
      }
      return {
        ...state,
        notifications: [...state.notifications, newNotification]
      }

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      }

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

// Provider do contexto
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem('vivoflow-data')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedData })
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error)
      }
    }
  }, [])

  // Salvar dados no localStorage sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem('vivoflow-data', JSON.stringify(state))
  }, [state])

  // Funções auxiliares
  const addTask = (taskData) => {
    dispatch({ type: 'ADD_TASK', payload: taskData })
  }

  const updateTask = (id, updates) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } })
  }

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }

  const updateCollaboratorProgress = (id, currentStep) => {
    dispatch({ type: 'UPDATE_COLLABORATOR_PROGRESS', payload: { id, currentStep } })
  }

  const addDocument = (documentData) => {
    dispatch({ type: 'ADD_DOCUMENT', payload: documentData })
  }

  const deleteDocument = (id) => {
    dispatch({ type: 'DELETE_DOCUMENT', payload: id })
  }

  const addMessage = (messageData) => {
    dispatch({ type: 'ADD_MESSAGE', payload: messageData })
  }

  const addNotification = (notificationData) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notificationData })
  }

  const markNotificationRead = (id) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id })
  }

  const setUser = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData })
  }

  // Funções de cálculo
  const getTasksByUser = (userName) => {
    return state.tasks.filter(task => task.assignedTo === userName)
  }

  const getTasksByCreator = (creatorType) => {
    return state.tasks.filter(task => task.createdBy === creatorType)
  }

  const getCollaboratorProgress = (collaboratorName) => {
    const collaborator = state.collaborators.find(c => c.name === collaboratorName)
    if (!collaborator) return 0
    return Math.round((collaborator.currentStep / collaborator.totalSteps) * 100)
  }

  const getTeamProgress = () => {
    if (state.collaborators.length === 0) return 0
    const totalProgress = state.collaborators.reduce((sum, collaborator) => {
      return sum + (collaborator.currentStep / collaborator.totalSteps) * 100
    }, 0)
    return Math.round(totalProgress / state.collaborators.length)
  }

  const getUnreadNotifications = () => {
    return state.notifications.filter(notification => !notification.read)
  }

  const value = {
    state,
    dispatch,
    // Funções de ação
    addTask,
    updateTask,
    deleteTask,
    updateCollaboratorProgress,
    addDocument,
    deleteDocument,
    addMessage,
    addNotification,
    markNotificationRead,
    setUser,
    // Funções de consulta
    getTasksByUser,
    getTasksByCreator,
    getCollaboratorProgress,
    getTeamProgress,
    getUnreadNotifications
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Hook para usar o contexto
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider')
  }
  return context
}

export default AppContext

