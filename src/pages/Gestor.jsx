import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  MessageCircle,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Download,
} from "lucide-react";
import CreateTaskModal from "../components/CreateTaskModal";
import Sidebar from "../components/Sidebar";
import ChatModal from "../components/ChatModal";
import BackToLoginButton from "../components/BackToLoginButton";

function Gestor() {
  const [selectedEmployee, setSelectedEmployee] = useState("João Silva");
  const [currentPage, setCurrentPage] = useState("painel");
  const [activeChatModal, setActiveChatModal] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Revisar documentos de onboarding para Carlos Silva",
      description:
        "Verificar se todos os documentos estão corretos e completos",
      priority: "high",
      assignedTo: "Carlos Silva",
      status: "pending",
      createdAt: "10/08/2024",
      createdBy: "Gestor",
    },
    {
      id: 2,
      title: "Configurar acesso aos sistemas para Ana Paula",
      description: "Liberar acesso ao CRM e sistemas internos",
      priority: "medium",
      assignedTo: "Ana Paula",
      status: "completed",
      createdAt: "08/08/2024",
      createdBy: "Gestor",
    },
  ]);

  const teamData = {
    totalEmployees: 15,
    inOnboarding: 7,
    completed: 8,
  };

  const collaboratorsData = [
    {
      name: "João Silva",
      position: "Analista de TI",
      startDate: "05/08/2024",
      currentStep: 6,
      totalSteps: 10,
      progress: 75,
      timeInCurrentStep: 3,
      status: "Em andamento",
      buddy: "Maria Santos",
    },
    {
      name: "Carlos Silva",
      position: "Desenvolvedor Frontend",
      startDate: "01/08/2024",
      currentStep: 4,
      totalSteps: 10,
      progress: 45,
      timeInCurrentStep: 5,
      status: "Em andamento",
      buddy: "Pedro Costa",
    },
    {
      name: "Ana Paula",
      position: "Designer UX/UI",
      startDate: "28/07/2024",
      currentStep: 8,
      totalSteps: 10,
      progress: 90,
      timeInCurrentStep: 2,
      status: "Em andamento",
      buddy: "Juliana Alves",
    },
    {
      name: "Fernanda Lima",
      position: "Analista de Marketing",
      startDate: "25/07/2024",
      currentStep: 10,
      totalSteps: 10,
      progress: 100,
      timeInCurrentStep: 0,
      status: "Concluído",
      buddy: "Roberto Silva",
    },
    {
      name: "Maria Oliveira",
      position: "Analista de Dados",
      startDate: "15/08/2024",
      currentStep: 2,
      totalSteps: 10,
      progress: 25,
      timeInCurrentStep: 1,
      status: "Em andamento",
      buddy: "Carlos Mendes",
    },
    {
      name: "Pedro Costa",
      position: "Desenvolvedor Backend",
      startDate: "12/08/2024",
      currentStep: 3,
      totalSteps: 10,
      progress: 35,
      timeInCurrentStep: 2,
      status: "Em andamento",
      buddy: "Ana Santos",
    },
    {
      name: "Juliana Alves",
      position: "Product Manager",
      startDate: "20/07/2024",
      currentStep: 10,
      totalSteps: 10,
      progress: 100,
      timeInCurrentStep: 0,
      status: "Concluído",
      buddy: "Felipe Rocha",
    },
  ];

  const messages = [
    {
      type: "Lembrete",
      content: "Novo colaborador chegou à equipe hoje",
      status: "new",
    },
    {
      type: "Atualização",
      content: "João Silva completou 80% do onboarding",
      status: "info",
    },
    {
      type: "Pendência",
      content: "Ana Paula precisa de aprovação para próxima etapa",
      status: "pending",
    },
    {
      type: "Alerta",
      content: "Carlos Silva está há 5 dias na mesma etapa",
      status: "warning",
    },
  ];

  const selectedEmployeeData =
    collaboratorsData.find((emp) => emp.name === selectedEmployee) ||
    collaboratorsData[0];

  const handleCreateTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleMenuClick = (menuId) => {
    setCurrentPage(menuId);
  };

  const handleChatClick = (chatType, title, collaboratorInfo = null) => {
    setActiveChatModal({ type: chatType, title, collaboratorInfo });
  };

  const closeChatModal = () => {
    setActiveChatModal(null);
  };

  const handleSaveNote = () => {
    if (currentNote.trim()) {
      const noteId = Date.now();
      setNotes((prev) => ({
        ...prev,
        [selectedEmployee]: [
          ...(prev[selectedEmployee] || []),
          {
            id: noteId,
            content: currentNote,
            timestamp: new Date().toLocaleString("pt-BR"),
            employee: selectedEmployee,
          },
        ],
      }));
      setCurrentNote("");
    }
  };

  const generatePDFReport = () => {
    const selectedEmployeeData = collaboratorsData.find(
      (emp) => emp.name === selectedEmployee
    );
    const employeeNotes = notes[selectedEmployee] || [];

    // Simular geração de PDF (em uma implementação real, usaria uma biblioteca como jsPDF)
    const reportContent = `
RELATÓRIO DE ACOMPANHAMENTO - ${selectedEmployee}

INFORMAÇÕES GERAIS:
- Nome: ${selectedEmployeeData?.name}
- Cargo: ${selectedEmployeeData?.position}
- Data de início: ${selectedEmployeeData?.startDate}
- Buddy designado: ${selectedEmployeeData?.buddy}
- Etapa atual: ${selectedEmployeeData?.currentStep}/${
      selectedEmployeeData?.totalSteps
    }
- Progresso: ${selectedEmployeeData?.progress}%
- Status: ${selectedEmployeeData?.status}

OBSERVAÇÕES DO GESTOR:
${employeeNotes
  .map(
    (note) => `
[${note.timestamp}] ${note.content}
`
  )
  .join("")}

Relatório gerado em: ${new Date().toLocaleString("pt-BR")}
    `;

    // Criar um blob e fazer download
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio_${selectedEmployee.replace(" ", "_")}_${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in_progress":
        return "text-blue-600";
      case "pending":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800";
      case "Em andamento":
        return "bg-blue-100 text-blue-800";
      case "Atrasado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Painel do Gestor
            </h1>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600 font-medium">
                Nome do Gestor
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          userType="gestor"
          currentPage={currentPage}
          onMenuClick={handleMenuClick}
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header com botão de criar tarefa */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Dashboard do Gestor
            </h2>
            <CreateTaskModal
              onCreateTask={handleCreateTask}
              userType="gestor"
            />
          </div>

          {/* Status Geral da Equipe */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Status Geral da Equipe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-700">
                    {teamData.totalEmployees}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total de Colaboradores
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {teamData.inOnboarding}
                  </div>
                  <div className="text-sm text-gray-600">Em Onboarding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {teamData.completed}
                  </div>
                  <div className="text-sm text-gray-600">
                    Onboarding Concluído
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Status dos Colaboradores */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Status Detalhado dos Colaboradores</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Nome</th>
                    <th className="px-4 py-2 text-left">Cargo</th>
                    <th className="px-4 py-2 text-left">Início</th>
                    <th className="px-4 py-2 text-left">Etapa Atual</th>
                    <th className="px-4 py-2 text-left">Progresso</th>
                    <th className="px-4 py-2 text-left">Tempo na Etapa</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Buddy</th>
                  </tr>
                </thead>
                <tbody>
                  {collaboratorsData.map((collaborator, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 font-medium">
                        {collaborator.name}
                      </td>
                      <td className="px-4 py-2">{collaborator.position}</td>
                      <td className="px-4 py-2">{collaborator.startDate}</td>
                      <td className="px-4 py-2">
                        {collaborator.currentStep}/{collaborator.totalSteps}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={collaborator.progress}
                            className="w-16 h-2"
                          />
                          <span className="text-sm">
                            {collaborator.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center space-x-1">
                          {collaborator.timeInCurrentStep > 4 && (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span
                            className={
                              collaborator.timeInCurrentStep > 4
                                ? "text-red-600"
                                : ""
                            }
                          >
                            {collaborator.timeInCurrentStep} dias
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <Badge
                          className={getStatusBadgeColor(collaborator.status)}
                        >
                          {collaborator.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">{collaborator.buddy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Tarefas Criadas */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tarefas Criadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-sm text-gray-600 mb-2">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-3 text-sm">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority === "high"
                            ? "Urgente"
                            : task.priority === "medium"
                            ? "Médio"
                            : "Baixo"}
                        </Badge>
                        <span className="text-gray-500">
                          Para: {task.assignedTo}
                        </span>
                        <span className="text-gray-500">
                          Criado em: {task.createdAt}
                        </span>
                        <div className="flex items-center space-x-1">
                          {task.status === "completed" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : task.status === "in_progress" ? (
                            <Clock className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-orange-600" />
                          )}
                          <span
                            className={`text-sm ${getStatusColor(task.status)}`}
                          >
                            {task.status === "completed"
                              ? "Concluída"
                              : task.status === "in_progress"
                              ? "Em Andamento"
                              : "Pendente"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Mensagens */}
          <Card className="mb-6">
            <CardHeader className="bg-purple-700 text-white">
              <CardTitle>Mensagens e Alertas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 border-b last:border-b-0 ${
                    message.status === "new"
                      ? "bg-green-50"
                      : message.status === "pending"
                      ? "bg-orange-50"
                      : message.status === "warning"
                      ? "bg-red-50"
                      : "bg-blue-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge
                        variant={
                          message.status === "new"
                            ? "default"
                            : message.status === "pending"
                            ? "destructive"
                            : message.status === "warning"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {message.type}
                      </Badge>
                      <p className="mt-1 text-sm text-gray-700">
                        {message.content}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        // Encontrar colaborador relacionado à mensagem
                        const collaboratorName = message.content.includes(
                          "João Silva"
                        )
                          ? "João Silva"
                          : message.content.includes("Ana Paula")
                          ? "Ana Paula"
                          : message.content.includes("Carlos Silva")
                          ? "Carlos Silva"
                          : "Colaborador";
                        const collaborator =
                          collaboratorsData.find(
                            (c) => c.name === collaboratorName
                          ) || collaboratorsData[0];
                        handleChatClick(
                          "colaborador_details",
                          `Detalhes - ${collaborator.name}`,
                          collaborator
                        );
                      }}
                    >
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              ))}

              <div className="p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    className="flex-1 border rounded-md px-3 py-2"
                  />
                  <Button className="bg-green-600 hover:bg-green-700">
                    Enviar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acompanhamento Individual */}
          <Card>
            <CardHeader>
              <CardTitle>Acompanhamento Individual Detalhado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecionar Colaborador:
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  {collaboratorsData.map((collaborator) => (
                    <option key={collaborator.name} value={collaborator.name}>
                      {collaborator.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Informações Gerais</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Nome:</strong> {selectedEmployeeData.name}
                    </div>
                    <div>
                      <strong>Cargo:</strong> {selectedEmployeeData.position}
                    </div>
                    <div>
                      <strong>Data de início:</strong>{" "}
                      {selectedEmployeeData.startDate}
                    </div>
                    <div>
                      <strong>Buddy designado:</strong>{" "}
                      {selectedEmployeeData.buddy}
                    </div>
                    <div>
                      <strong>Etapa atual:</strong>{" "}
                      {selectedEmployeeData.currentStep}/
                      {selectedEmployeeData.totalSteps}
                    </div>
                    <div>
                      <strong>Tempo na etapa atual:</strong>{" "}
                      {selectedEmployeeData.timeInCurrentStep} dias
                    </div>
                    <div>
                      <strong>Progresso geral:</strong>{" "}
                      {selectedEmployeeData.progress}%
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Observações do Gestor</h4>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Adicionar nova observação..."
                      value={currentNote}
                      onChange={(e) => setCurrentNote(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSaveNote}
                        disabled={!currentNote.trim()}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Salvar Observação
                      </Button>
                      <Button
                        onClick={generatePDFReport}
                        variant="outline"
                        className="border-purple-600 text-purple-600 hover:bg-purple-50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Gerar Relatório
                      </Button>
                    </div>
                  </div>

                  {/* Lista de observações salvas */}
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Observações Salvas:</h5>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {(notes[selectedEmployee] || []).map((note) => (
                        <div
                          key={note.id}
                          className="bg-gray-50 p-3 rounded-lg"
                        >
                          <p className="text-sm text-gray-700">
                            {note.content}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {note.timestamp}
                          </p>
                        </div>
                      ))}
                      {(!notes[selectedEmployee] ||
                        notes[selectedEmployee].length === 0) && (
                        <p className="text-sm text-gray-500 italic">
                          Nenhuma observação salva ainda.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Modal */}
      {activeChatModal && (
        <ChatModal
          isOpen={true}
          onClose={closeChatModal}
          title={activeChatModal.title}
          chatType={activeChatModal.type}
          collaboratorInfo={activeChatModal.collaboratorInfo}
        />
      )}

      {/* Back to Login Button */}
      <BackToLoginButton />
    </div>
  );
}

export default Gestor;
