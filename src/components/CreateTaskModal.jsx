import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { useApp } from '@/context/AppContext'

function CreateTaskModal({ userType = "gestor" }) {
  const { addTask, state } = useApp()
  const [isOpen, setIsOpen] = useState(false)
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: '',
    assignedTo: '',
    status: 'pending'
  })

  const collaborators = state.collaborators.map(c => c.name)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskData.title || !taskData.priority || !taskData.assignedTo) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const newTask = {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      assignedTo: taskData.assignedTo,
      status: taskData.status,
      createdBy: userType === 'gestor' ? 'Gestor' : 'Buddy'
    }

    addTask(newTask)
    setTaskData({
      title: '',
      description: '',
      priority: '',
      assignedTo: '',
      status: 'pending'
    })
    setIsOpen(false)
  }

  const handleInputChange = (field, value) => {
    setTaskData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título da Tarefa *</Label>
            <Input
              id="title"
              value={taskData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ex: Revisar documentos de onboarding"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={taskData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descreva os detalhes da tarefa..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="assignedTo">Atribuir para *</Label>
            <Select value={taskData.assignedTo} onValueChange={(value) => handleInputChange('assignedTo', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um colaborador" />
              </SelectTrigger>
              <SelectContent>
                {collaborators.map((collaborator) => (
                  <SelectItem key={collaborator} value={collaborator}>
                    {collaborator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priority">Prioridade *</Label>
            <Select value={taskData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Urgente</SelectItem>
                <SelectItem value="medium">Médio</SelectItem>
                <SelectItem value="low">Baixo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={taskData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="in_progress">Em Andamento</SelectItem>
                <SelectItem value="completed">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskModal

