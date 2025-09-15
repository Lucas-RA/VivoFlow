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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-purple-700 text-white px-4 py-2 rounded-md inline-block mb-4">
            <span className="font-bold text-lg">VivoFlow</span>
          </div>
          <h1 className="text-2xl font-bold text-purple-700 mb-2">
            Bem-vindo ao VivoFlow
          </h1>
          <p className="text-gray-600">Simulação de Acesso</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entrar como:
            </label>
            <Select value={selectedAccess} onValueChange={setSelectedAccess}>
              <SelectTrigger className="w-full">
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
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 text-lg"
          >
            Entrar
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Ajuda • Termos de Uso</p>
        </div>
      </div>
    </div>
  )
}

export default Login

