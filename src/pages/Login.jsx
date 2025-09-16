import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function Login() {
  const [selectedAccess, setSelectedAccess] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!selectedAccess) {
      alert('Por favor, selecione um tipo de acesso.')
      return
    }

    switch (selectedAccess) {
      case 'novo-colaborador':
        navigate('/colaborador')
        break
      case 'buddy':
        navigate('/buddy')
        break
      case 'gestor':
        navigate('/gestor')
        break
      default:
        break
    }
  }

  return (
    <div className="min-h-screen vivo-bg-gradient vivo-flex vivo-items-center vivo-justify-center p-4">
      <div className="vivo-container">
        <div className="vivo-card max-w-md mx-auto vivo-fade-in">
          {/* Header */}
          <div className="vivo-card-header text-center">
            <div className="mb-4">
              <span className="font-bold text-2xl">VivoFlow</span>
            </div>
            <h1 className="text-xl font-bold mb-2">
              Bem-vindo ao VivoFlow
            </h1>
            <p className="text-sm opacity-90">Simulação de Acesso</p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Entrar como:
              </label>
              <Select value={selectedAccess} onValueChange={setSelectedAccess}>
                <SelectTrigger className="vivo-input w-full">
                  <SelectValue placeholder="Selecione o tipo de acesso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="novo-colaborador">Novo Colaborador</SelectItem>
                  <SelectItem value="gestor">Gestor</SelectItem>
                  <SelectItem value="buddy">Buddy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleLogin}
              className="vivo-btn-primary w-full"
            >
              Entrar
            </Button>

            {/* Footer */}
            <div className="text-center mt-6 text-sm text-gray-500">
              <p>Desenvolvido por SISTECH • Sprint VIVO 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

