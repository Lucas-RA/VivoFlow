import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, Send, Bot, User, Loader2 } from 'lucide-react'

function ChatIA({ isOpen, onToggle, userType = "colaborador" }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Olá! Sou o assistente virtual do VivoFlow. Como posso ajudá-lo hoje?`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsLoading(true)

    try {
      // Simular resposta da IA (aqui seria integrado com OpenAI)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: getBotResponse(newMessage, userType),
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getBotResponse = (message, userType) => {
    const lowerMessage = message.toLowerCase()
    
    // Respostas específicas por tipo de usuário
    if (userType === 'colaborador') {
      if (lowerMessage.includes('onboarding') || lowerMessage.includes('integração')) {
        return 'O processo de onboarding é dividido em 10 etapas principais. Você pode acompanhar seu progresso no dashboard. Precisa de ajuda com alguma etapa específica?'
      }
      if (lowerMessage.includes('sistema') || lowerMessage.includes('acesso')) {
        return 'Para problemas de acesso aos sistemas, recomendo entrar em contato com seu Buddy ou o suporte de TI. Eles podem ajudar com credenciais e permissões.'
      }
      if (lowerMessage.includes('buddy')) {
        return 'Seu Buddy é seu mentor durante o onboarding. Você pode conversar com ele através do chat dedicado na plataforma. Ele está lá para esclarecer dúvidas e te apoiar!'
      }
    } else if (userType === 'buddy') {
      if (lowerMessage.includes('colaborador') || lowerMessage.includes('novo')) {
        return 'Como Buddy, você pode acompanhar o progresso dos seus colaboradores designados, criar tarefas e oferecer suporte. Precisa de dicas sobre como ajudar alguém específico?'
      }
      if (lowerMessage.includes('tarefa')) {
        return 'Você pode criar novas tarefas clicando no botão "Nova Tarefa". Lembre-se de definir prioridades claras e prazos realistas para seus colaboradores.'
      }
    } else if (userType === 'gestor') {
      if (lowerMessage.includes('equipe') || lowerMessage.includes('progresso')) {
        return 'No painel do gestor, você pode acompanhar o progresso de toda a equipe, identificar gargalos e colaboradores que precisam de atenção especial. Posso ajudar com análises específicas?'
      }
      if (lowerMessage.includes('relatório')) {
        return 'Os relatórios de progresso mostram métricas detalhadas de cada colaborador. Você pode exportar dados ou solicitar relatórios personalizados.'
      }
    }

    // Respostas gerais
    if (lowerMessage.includes('ajuda') || lowerMessage.includes('help')) {
      return 'Estou aqui para ajudar! Posso responder dúvidas sobre o processo de onboarding, funcionalidades da plataforma, ou qualquer questão relacionada ao VivoFlow.'
    }
    
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('obrigada')) {
      return 'De nada! Fico feliz em ajudar. Se tiver mais dúvidas, estarei aqui!'
    }

    // Resposta padrão
    return 'Entendi sua pergunta. Posso ajudar com informações sobre o processo de onboarding, funcionalidades da plataforma, ou conectá-lo com a pessoa certa para resolver sua questão. Pode me dar mais detalhes?'
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggle}
          className="bg-purple-700 hover:bg-purple-800 rounded-full w-14 h-14 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[500px]">
      <Card className="h-full flex flex-col shadow-xl">
        <CardHeader className="bg-purple-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <Bot className="h-5 w-5 mr-2" />
              Assistente VivoFlow
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-white hover:bg-purple-600"
            >
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-purple-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && (
                      <Bot className="h-4 w-4 mt-0.5 text-purple-700" />
                    )}
                    {message.type === 'user' && (
                      <User className="h-4 w-4 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-purple-700" />
                    <Loader2 className="h-4 w-4 animate-spin text-purple-700" />
                    <span className="text-sm text-gray-600">Digitando...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isLoading}
                className="bg-purple-700 hover:bg-purple-800"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatIA

