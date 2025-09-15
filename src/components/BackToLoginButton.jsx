import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function BackToLoginButton() {
  const navigate = useNavigate()

  const handleBackToLogin = () => {
    navigate('/')
  }

  return (
    <Button
      onClick={handleBackToLogin}
      variant="outline"
      size="sm"
      className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-gray-50"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Voltar ao Login
    </Button>
  )
}

export default BackToLoginButton

