import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, X, Bot, User } from 'lucide-react'

function ChatModal({ isOpen, onClose, title, chatType = 'general', collaboratorInfo = null }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      // Carregar mensagens iniciais baseadas no tipo de chat
      loadInitialMessages()
    }
  }, [isOpen, chatType])

  const loadInitialMessages = () => {
    let initialMessages = []
    
    switch (chatType) {
      case 'duvidas':
        initialMessages = [
          {
            id: 1,
            sender: 'bot',
            content: 'Olá! Sou seu assistente virtual. Como posso ajudá-lo com suas dúvidas sobre o onboarding?',
            timestamp: new Date().toLocaleTimeString()
          }
        ]
        break
      case 'gestor':
        initialMessages = [
          {
            id: 1,
            sender: 'gestor',
            content: 'Olá! Estou aqui para ajudá-lo em sua integração. Como está se sentindo até agora?',
            timestamp: new Date().toLocaleTimeString()
          }
        ]
        break
      case 'buddy':
        initialMessages = [
          {
            id: 1,
            sender: 'buddy',
            content: 'Oi! Sou seu buddy e estou aqui para te apoiar. Qualquer dúvida, pode me chamar!',
            timestamp: new Date().toLocaleTimeString()
          }
        ]
        break
      case 'colaborador_details':
        if (collaboratorInfo) {
          initialMessages = [
            {
              id: 1,
              sender: 'system',
              content: `Informações do colaborador: ${collaboratorInfo.name}`,
              timestamp: new Date().toLocaleTimeString()
            },
            {
              id: 2,
              sender: 'system',
              content: `Etapa atual: ${collaboratorInfo.currentStep}/${collaboratorInfo.totalSteps} (${collaboratorInfo.progress}% concluído)`,
              timestamp: new Date().toLocaleTimeString()
            },
            {
              id: 3,
              sender: 'system',
              content: `Status: ${collaboratorInfo.status}`,
              timestamp: new Date().toLocaleTimeString()
            },
            {
              id: 4,
              sender: 'system',
              content: `Buddy designado: ${collaboratorInfo.buddy}`,
              timestamp: new Date().toLocaleTimeString()
            }
          ]
        }
        break
      default:
        initialMessages = [
          {
            id: 1,
            sender: 'system',
            content: 'Chat iniciado. Como posso ajudá-lo?',
            timestamp: new Date().toLocaleTimeString()
          }
        ]
    }
    
    setMessages(initialMessages)
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsLoading(true)

    // Simular resposta (em uma implementação real, seria uma chamada para API)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: chatType === 'duvidas' ? 'bot' : chatType,
        content: generateResponse(newMessage, chatType),
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1000)
  }

  const generateResponse = (message, type) => {
    const responses = {
      duvidas: [
        'Entendo sua dúvida. Vou te ajudar com isso.',
        'Essa é uma ótima pergunta! Deixe-me explicar...',
        'Posso esclarecer isso para você.',
        'Vou buscar essas informações para você.'
      ],
      gestor: [
        'Obrigado por compartilhar isso comigo.',
        'Vou acompanhar seu progresso de perto.',
        'Estou aqui para apoiá-lo nessa jornada.',
        'Que bom saber disso! Continue assim.'
      ],
      buddy: [
        'Fico feliz em ajudar!',
        'Estamos juntos nessa!',
        'Pode contar comigo sempre.',
        'Vamos resolver isso juntos!'
      ]
    }

    const typeResponses = responses[type] || responses.duvidas
    return typeResponses[Math.floor(Math.random() * typeResponses.length)]
  }

  const getSenderIcon = (sender) => {
    switch (sender) {
      case 'bot':
        return <Bot className="h-4 w-4" />
      case 'user':
        return <User className="h-4 w-4" />
      case 'system':
        return <Bot className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getSenderName = (sender) => {
    switch (sender) {
      case 'bot':
        return 'Assistente IA'
      case 'user':
        return 'Você'
      case 'gestor':
        return 'Gestor'
      case 'buddy':
        return 'Buddy'
      case 'system':
        return 'Sistema'
      default:
        return sender
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {title}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : message.sender === 'system'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {getSenderIcon(message.sender)}
                    <span className="text-xs font-medium">
                      {getSenderName(message.sender)}
                    </span>
                    <span className="text-xs opacity-70">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    <span className="text-sm">Digitando...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !newMessage.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChatModal

