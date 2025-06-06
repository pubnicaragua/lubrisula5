"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import {
  Users,
  ClipboardCheck,
  Calendar,
  DollarSign,
  ArrowRight,
  FileText,
  AlertCircle,
  CheckCircle,
  ChevronUp,
  ChevronDown,
  BarChart3,
  PieChartIcon,
  Activity,
  Plus,
} from "lucide-react"

export function TallerDashboard() {
  const [activeChart, setActiveChart] = useState<"bar" | "pie" | "line">("bar")

  // Datos de ejemplo para los gráficos
  const revenueData = [
    { name: "Ene", value: 12500 },
    { name: "Feb", value: 15000 },
    { name: "Mar", value: 18000 },
    { name: "Abr", value: 16000 },
    { name: "May", value: 21000 },
    { name: "Jun", value: 19500 },
  ]

  const serviceTypeData = [
    { name: "Mantenimiento", value: 35 },
    { name: "Reparación", value: 25 },
    { name: "Diagnóstico", value: 15 },
    { name: "Pintura", value: 15 },
    { name: "Otros", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const ordersData = [
    { name: "Lun", completadas: 5, pendientes: 3 },
    { name: "Mar", completadas: 7, pendientes: 4 },
    { name: "Mié", completadas: 6, pendientes: 2 },
    { name: "Jue", completadas: 8, pendientes: 5 },
    { name: "Vie", completadas: 10, pendientes: 3 },
    { name: "Sáb", completadas: 4, pendientes: 1 },
    { name: "Dom", completadas: 2, pendientes: 0 },
  ]

  // Datos de órdenes recientes
  const recentOrders = [
    {
      id: "ORD-1001",
      cliente: "Juan Pérez",
      vehiculo: "Toyota Corolla",
      fecha: "10/05/2024",
      estado: "En proceso",
      total: "$1,250",
    },
    {
      id: "ORD-1002",
      cliente: "María Rodríguez",
      vehiculo: "Honda Civic",
      fecha: "08/05/2024",
      estado: "Pendiente",
      total: "$850",
    },
    {
      id: "ORD-1003",
      cliente: "Carlos Gómez",
      vehiculo: "Nissan Sentra",
      fecha: "05/05/2024",
      estado: "Completada",
      total: "$2,100",
    },
  ]

  // Datos de citas pendientes
  const pendingAppointments = [
    {
      id: "CIT-1001",
      cliente: "Ana Martínez",
      vehiculo: "Volkswagen Golf",
      fecha: "15/05/2024",
      hora: "10:00 AM",
      servicio: "Mantenimiento",
    },
    {
      id: "CIT-1002",
      cliente: "Roberto Sánchez",
      vehiculo: "Ford Focus",
      fecha: "16/05/2024",
      hora: "11:30 AM",
      servicio: "Diagnóstico",
    },
    {
      id: "CIT-1003",
      cliente: "Laura Torres",
      vehiculo: "Chevrolet Spark",
      fecha: "16/05/2024",
      hora: "3:00 PM",
      servicio: "Cambio de aceite",
    },
    {
      id: "CIT-1004",
      cliente: "Pedro Ramírez",
      vehiculo: "Mazda 3",
      fecha: "17/05/2024",
      hora: "9:15 AM",
      servicio: "Revisión de frenos",
    },
    {
      id: "CIT-1005",
      cliente: "Sofía Vargas",
      vehiculo: "Kia Rio",
      fecha: "17/05/2024",
      hora: "2:45 PM",
      servicio: "Alineación y balanceo",
    },
  ]

  // Datos de técnicos
  const technicians = [
    {
      id: "TEC-001",
      nombre: "Miguel Ángel Pérez",
      especialidad: "Mecánica general",
      estado: "Disponible",
      ordenes_asignadas: 2,
    },
    {
      id: "TEC-002",
      nombre: "Fernando Gutiérrez",
      especialidad: "Electricidad",
      estado: "Ocupado",
      ordenes_asignadas: 3,
    },
    {
      id: "TEC-003",
      nombre: "Alejandro Morales",
      especialidad: "Pintura",
      estado: "Disponible",
      ordenes_asignadas: 1,
    },
    {
      id: "TEC-004",
      nombre: "Ricardo Vega",
      especialidad: "Enderezado",
      estado: "Disponible",
      ordenes_asignadas: 0,
    },
    {
      id: "TEC-005",
      nombre: "José Luis Mendoza",
      especialidad: "Mecánica general",
      estado: "Ocupado",
      ordenes_asignadas: 2,
    },
    {
      id: "TEC-006",
      nombre: "Eduardo Campos",
      especialidad: "Diagnóstico",
      estado: "Disponible",
      ordenes_asignadas: 1,
    },
    {
      id: "TEC-007",
      nombre: "Gabriel Rojas",
      especialidad: "Electricidad",
      estado: "Disponible",
      ordenes_asignadas: 1,
    },
    {
      id: "TEC-008",
      nombre: "Daniel Flores",
      especialidad: "Mecánica general",
      estado: "Ocupado",
      ordenes_asignadas: 2,
    },
  ]

  // Función para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "en proceso":
        return "bg-blue-100 text-blue-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "completada":
        return "bg-green-100 text-green-800"
      case "entregada":
        return "bg-purple-100 text-purple-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      case "disponible":
        return "bg-green-100 text-green-800"
      case "ocupado":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard del Taller</h1>
          <p className="text-muted-foreground">Bienvenido al panel de control de tu taller</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-full">
            <Calendar className="mr-2 h-4 w-4" />
            Mayo 2024
          </Button>
          <Button className="rounded-full">
            <FileText className="mr-2 h-4 w-4" /> Generar Reporte
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Órdenes Activas</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +12% <ChevronUp className="h-4 w-4 inline text-green-500" /> desde el mes pasado
            </p>
            <Progress value={75} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              +8% <ChevronUp className="h-4 w-4 inline text-green-500" /> desde el mes pasado
            </p>
            <Progress value={65} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Citas Pendientes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              -3% <ChevronDown className="h-4 w-4 inline text-red-500" /> desde el mes pasado
            </p>
            <Progress value={45} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Técnicos Disponibles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +5% <ChevronUp className="h-4 w-4 inline text-green-500" /> de capacidad
            </p>
            <Progress value={85} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="custom-tabs">
          <TabsTrigger value="general" className="custom-tab">
            General
          </TabsTrigger>
          <TabsTrigger value="ordenes" className="custom-tab">
            Órdenes
          </TabsTrigger>
          <TabsTrigger value="citas" className="custom-tab">
            Citas
          </TabsTrigger>
          <TabsTrigger value="tecnicos" className="custom-tab">
            Técnicos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="dashboard-card md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Ingresos Mensuales</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={activeChart === "bar" ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setActiveChart("bar")}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={activeChart === "line" ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setActiveChart("line")}
                    >
                      <Activity className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={activeChart === "pie" ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setActiveChart("pie")}
                    >
                      <PieChartIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>Ingresos de los últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  {activeChart === "bar" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, "Ingresos"]} />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                  {activeChart === "line" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, "Ingresos"]} />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                  {activeChart === "pie" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {serviceTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Estado de Órdenes</CardTitle>
                <CardDescription>Distribución actual de órdenes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Completadas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">42</span>
                      <span className="text-xs text-muted-foreground">(33%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>En Proceso</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">38</span>
                      <span className="text-xs text-muted-foreground">(30%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Pendientes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">25</span>
                      <span className="text-xs text-muted-foreground">(19%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>Entregadas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">18</span>
                      <span className="text-xs text-muted-foreground">(14%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Canceladas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">5</span>
                      <span className="text-xs text-muted-foreground">(4%)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-100 text-green-800">
                          Eficiencia
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-green-800">87%</span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                      <div
                        style={{ width: "87%" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="dashboard-card lg:col-span-2">
              <CardHeader>
                <CardTitle>Órdenes Recientes</CardTitle>
                <CardDescription>Últimas órdenes de servicio registradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.cliente}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm">{order.vehiculo}</p>
                          <p className="text-sm text-muted-foreground">{order.fecha}</p>
                        </div>
                        <Badge className={getStatusColor(order.estado)}>{order.estado}</Badge>
                        <div className="font-bold">{order.total}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/taller/ordenes" className="w-full">
                  <Button variant="outline" className="w-full">
                    Ver todas las órdenes <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Alertas y Notificaciones</CardTitle>
                <CardDescription>Información importante</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 border rounded-lg bg-yellow-50">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Inventario bajo</p>
                      <p className="text-sm text-muted-foreground">5 productos están por debajo del nivel mínimo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg bg-red-50">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Órdenes vencidas</p>
                      <p className="text-sm text-muted-foreground">3 órdenes han superado la fecha de entrega</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Mantenimiento completado</p>
                      <p className="text-sm text-muted-foreground">Equipo de diagnóstico actualizado correctamente</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver todas las alertas <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ordenes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="dashboard-card lg:col-span-2">
              <CardHeader>
                <CardTitle>Rendimiento Semanal</CardTitle>
                <CardDescription>Órdenes completadas vs pendientes</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ordersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completadas" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pendientes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Órdenes por Tipo</CardTitle>
                <CardDescription>Distribución por tipo de servicio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/taller/reportes" className="w-full">
                  <Button variant="outline" className="w-full">
                    Ver reportes detallados
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Todas las Órdenes Activas</CardTitle>
              <CardDescription>Listado de órdenes en proceso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted/50 p-3 font-medium">
                  <div>ID</div>
                  <div>Cliente</div>
                  <div>Vehículo</div>
                  <div>Fecha</div>
                  <div>Estado</div>
                  <div>Total</div>
                  <div className="text-right">Acciones</div>
                </div>
                <div className="divide-y">
                  {[...recentOrders, ...recentOrders.slice(0, 2)].map((order, i) => (
                    <div key={i} className="grid grid-cols-7 items-center p-3">
                      <div>{order.id}</div>
                      <div>{order.cliente}</div>
                      <div>{order.vehiculo}</div>
                      <div>{order.fecha}</div>
                      <div>
                        <Badge className={getStatusColor(order.estado)}>{order.estado}</Badge>
                      </div>
                      <div>{order.total}</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                        <Button size="sm">Editar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between">
                <Button variant="outline" size="sm">
                  Anterior
                </Button>
                <div className="flex items-center gap-1 text-sm">Página 1 de 3</div>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="citas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Citas Pendientes</CardTitle>
                <CardDescription>Próximas citas programadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-muted/50 p-3 font-medium">
                    <div>ID</div>
                    <div>Cliente</div>
                    <div>Vehículo</div>
                    <div>Fecha</div>
                    <div>Servicio</div>
                    <div className="text-right">Acciones</div>
                  </div>
                  <div className="divide-y">
                    {pendingAppointments.map((appointment, i) => (
                      <div key={i} className="grid grid-cols-6 items-center p-3">
                        <div>{appointment.id}</div>
                        <div>{appointment.cliente}</div>
                        <div>{appointment.vehiculo}</div>
                        <div>
                          {appointment.fecha}
                          <br />
                          <span className="text-xs text-muted-foreground">{appointment.hora}</span>
                        </div>
                        <div>{appointment.servicio}</div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                          <Button size="sm">Confirmar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/taller/citas" className="w-full">
                  <Button variant="outline" className="w-full">
                    Administrar todas las citas
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendario</CardTitle>
                <CardDescription>Vista rápida de citas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      &lt; Anterior
                    </Button>
                    <div className="font-medium">Mayo 2024</div>
                    <Button variant="outline" size="sm">
                      Siguiente &gt;
                    </Button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
                    <div>Dom</div>
                    <div>Lun</div>
                    <div>Mar</div>
                    <div>Mié</div>
                    <div>Jue</div>
                    <div>Vie</div>
                    <div>Sáb</div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                      // Simular días con citas
                      const hasCitas = [5, 8, 15, 16, 17, 22, 25].includes(day)
                      return (
                        <div
                          key={day}
                          className={`aspect-square flex items-center justify-center rounded-md text-sm ${
                            hasCitas ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50 cursor-pointer"
                          }`}
                        >
                          {day}
                          {hasCitas && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-primary inline-block"></span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Cita
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tecnicos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Técnicos Disponibles</CardTitle>
                <CardDescription>Estado actual del equipo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 bg-muted/50 p-3 font-medium">
                    <div>ID</div>
                    <div>Nombre</div>
                    <div>Especialidad</div>
                    <div>Estado</div>
                    <div>Órdenes Asignadas</div>
                  </div>
                  <div className="divide-y">
                    {technicians.map((tech, i) => (
                      <div key={i} className="grid grid-cols-5 items-center p-3">
                        <div>{tech.id}</div>
                        <div>{tech.nombre}</div>
                        <div>{tech.especialidad}</div>
                        <div>
                          <Badge className={getStatusColor(tech.estado)}>{tech.estado}</Badge>
                        </div>
                        <div>{tech.ordenes_asignadas}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/taller/tecnicos" className="w-full">
                  <Button variant="outline" className="w-full">
                    Administrar técnicos
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución de Especialidades</CardTitle>
                <CardDescription>Técnicos por área</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Mecánica general", value: 3 },
                          { name: "Electricidad", value: 2 },
                          { name: "Pintura", value: 1 },
                          { name: "Enderezado", value: 1 },
                          { name: "Diagnóstico", value: 1 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Técnico
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rendimiento de Técnicos</CardTitle>
              <CardDescription>Órdenes completadas por técnico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Miguel Ángel P.", completadas: 15, tiempo: 4.2 },
                      { name: "Fernando G.", completadas: 12, tiempo: 3.8 },
                      { name: "Alejandro M.", completadas: 10, tiempo: 5.1 },
                      { name: "Ricardo V.", completadas: 8, tiempo: 4.5 },
                      { name: "José Luis M.", completadas: 14, tiempo: 3.9 },
                      { name: "Eduardo C.", completadas: 9, tiempo: 4.7 },
                      { name: "Gabriel R.", completadas: 11, tiempo: 4.0 },
                      { name: "Daniel F.", completadas: 13, tiempo: 3.5 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="completadas" name="Órdenes Completadas" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="tiempo" name="Tiempo Promedio (horas)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
