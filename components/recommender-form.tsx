"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRecommendation } from "@/lib/actions"
import RecommendationResult from "./recommendation-result"
import { BookOpen, ShoppingCart, User, BarChart3, Users, Zap, Sparkles, Rocket, Code2 } from "lucide-react"

const formSchema = z.object({
  projectType: z.string({
    required_error: "Por favor selecciona un tipo de proyecto",
  }),
  experienceLevel: z.string({
    required_error: "Por favor selecciona tu nivel de experiencia",
  }),
  features: z.array(z.string()).optional(),
  backendPreference: z.string({
    required_error: "Por favor selecciona tu preferencia de backend",
  }),
  technologyPreference: z.string({
    required_error: "Por favor selecciona tu preferencia de tecnología",
  }),
})

const projectTypes = [
  {
    value: "blog",
    label: "Blog",
    description: "Sitio web para publicar contenido y artículos",
    icon: BookOpen,
  },
  {
    value: "ecommerce",
    label: "Tienda online",
    description: "Plataforma de comercio electrónico",
    icon: ShoppingCart,
  },
  {
    value: "portfolio",
    label: "Portafolio",
    description: "Sitio web personal para mostrar trabajos",
    icon: User,
  },
  {
    value: "dashboard",
    label: "Dashboard",
    description: "Panel de control con gráficos y datos",
    icon: BarChart3,
  },
  {
    value: "social",
    label: "Red social",
    description: "Plataforma para interacción entre usuarios",
    icon: Users,
  },
  {
    value: "collaborative",
    label: "App colaborativa",
    description: "Herramienta para trabajo en equipo",
    icon: Zap,
  },
]

const experienceLevels = [
  { value: "beginner", label: "🌱 Principiante", description: "Nuevo en desarrollo web" },
  { value: "intermediate", label: "🚀 Intermedio", description: "Experiencia básica-media" },
  { value: "advanced", label: "⭐ Avanzado", description: "Experiencia sólida" },
]

const features = [
  { id: "auth", label: "🔐 Autenticación de usuarios", description: "Login, registro, perfiles" },
  { id: "database", label: "🗄️ Base de datos", description: "Almacenamiento persistente" },
  { id: "payments", label: "💳 Procesamiento de pagos", description: "Stripe, PayPal, etc." },
  { id: "realtime", label: "⚡ Tiempo real", description: "Chat, notificaciones live" },
  { id: "admin", label: "👨‍💼 Panel administrativo", description: "Gestión de contenido" },
  { id: "file-upload", label: "📁 Subida de archivos", description: "Imágenes, documentos" },
  { id: "seo", label: "🔍 Optimización SEO", description: "Posicionamiento web" },
]

const backendPreferences = [
  { value: "integrated", label: "🔗 Backend integrado", description: "Fullstack (Next.js, SvelteKit)" },
  { value: "separate", label: "🔀 Backend separado", description: "API independiente" },
]

const technologyPreferences = [
  { value: "modern", label: "✨ Tecnologías modernas", description: "Últimas tendencias" },
  { value: "traditional", label: "🏛️ Tecnologías tradicionales", description: "Probadas y estables" },
  { value: "mixed", label: "🎯 Combinación", description: "Lo mejor de ambos mundos" },
]

export default function RecommenderForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [recommendation, setRecommendation] = useState(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      features: [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const result = await getRecommendation(values)
      setRecommendation(result)
    } catch (error) {
      console.error("Error getting recommendation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (recommendation) {
    return <RecommendationResult recommendation={recommendation} onReset={() => setRecommendation(null)} />
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Selección guiada
        </div>
        <h2 className="text-2xl font-bold mb-2">Cuéntanos sobre tu proyecto</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Responde algunas preguntas y te recomendaremos el stack perfecto
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Project Type Selection */}
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  ¿Qué tipo de proyecto quieres construir?
                </FormLabel>
                <FormDescription>Selecciona el tipo que mejor describa tu proyecto</FormDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {projectTypes.map((type) => {
                    const Icon = type.icon
                    const isSelected = field.value === type.value
                    return (
                      <Card
                        key={type.value}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-lg"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => field.onChange(type.value)}
                      >
                        <CardContent className="p-4 text-center">
                          <Icon className={`h-8 w-8 mx-auto mb-2 ${isSelected ? "text-blue-600" : "text-slate-600"}`} />
                          <h3 className="font-semibold mb-1">{type.label}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{type.description}</p>
                          {isSelected && <Badge className="mt-2 bg-blue-600">Seleccionado</Badge>}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Experience Level */}
          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Nivel de experiencia</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {experienceLevels.map((level) => {
                    const isSelected = field.value === level.value
                    return (
                      <Card
                        key={level.value}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                          isSelected
                            ? "border-green-500 bg-green-50 dark:bg-green-950 shadow-lg"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => field.onChange(level.value)}
                      >
                        <CardContent className="p-4 text-center">
                          <h3 className="font-semibold mb-1">{level.label}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{level.description}</p>
                          {isSelected && <Badge className="mt-2 bg-green-600">Seleccionado</Badge>}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Features */}
          <FormField
            control={form.control}
            name="features"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-lg font-semibold">Funcionalidades necesarias</FormLabel>
                  <FormDescription>Selecciona todas las funcionalidades que necesitas</FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature) => (
                    <FormField
                      key={feature.id}
                      control={form.control}
                      name="features"
                      render={({ field }) => {
                        const isChecked = field.value?.includes(feature.id) || false
                        return (
                          <Card
                            className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                              isChecked
                                ? "border-purple-500 bg-purple-50 dark:bg-purple-950 shadow-lg"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                            }`}
                            onClick={() => {
                              const currentFeatures = field.value || []
                              if (isChecked) {
                                field.onChange(currentFeatures.filter((f) => f !== feature.id))
                              } else {
                                field.onChange([...currentFeatures, feature.id])
                              }
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <Checkbox checked={isChecked} readOnly />
                                <div className="flex-1">
                                  <FormLabel className="font-medium cursor-pointer">{feature.label}</FormLabel>
                                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                    {feature.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Backend Preference */}
          <FormField
            control={form.control}
            name="backendPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Preferencia de backend</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {backendPreferences.map((pref) => {
                    const isSelected = field.value === pref.value
                    return (
                      <Card
                        key={pref.value}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                          isSelected
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-950 shadow-lg"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => field.onChange(pref.value)}
                      >
                        <CardContent className="p-4 text-center">
                          <h3 className="font-semibold mb-1">{pref.label}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{pref.description}</p>
                          {isSelected && <Badge className="mt-2 bg-orange-600">Seleccionado</Badge>}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Technology Preference */}
          <FormField
            control={form.control}
            name="technologyPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Preferencia de tecnologías</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {technologyPreferences.map((pref) => {
                    const isSelected = field.value === pref.value
                    return (
                      <Card
                        key={pref.value}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                          isSelected
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950 shadow-lg"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => field.onChange(pref.value)}
                      >
                        <CardContent className="p-4 text-center">
                          <h3 className="font-semibold mb-1">{pref.label}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{pref.description}</p>
                          {isSelected && <Badge className="mt-2 bg-indigo-600">Seleccionado</Badge>}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generando recomendación...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-5 w-5" />
                  Obtener recomendación
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
