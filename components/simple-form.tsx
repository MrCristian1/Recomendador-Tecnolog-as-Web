"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRecommendation } from "@/lib/actions"
import RecommendationResult from "./recommendation-result"
import { BookOpen, ShoppingCart, User, BarChart3, Users, Zap, Sparkles, Rocket, Code2 } from "lucide-react"

const projectTypes = [
  { value: "blog", label: "Blog", description: "Sitio web para publicar contenido", icon: BookOpen },
  { value: "ecommerce", label: "Tienda online", description: "Plataforma de comercio electrónico", icon: ShoppingCart },
  { value: "portfolio", label: "Portafolio", description: "Sitio web personal", icon: User },
  { value: "dashboard", label: "Dashboard", description: "Panel de control con datos", icon: BarChart3 },
  { value: "social", label: "Red social", description: "Plataforma para usuarios", icon: Users },
  { value: "collaborative", label: "App colaborativa", description: "Herramienta para equipos", icon: Zap },
]

const experienceLevels = [
  { value: "beginner", label: "🌱 Principiante" },
  { value: "intermediate", label: "🚀 Intermedio" },
  { value: "advanced", label: "⭐ Avanzado" },
]

const features = [
  { id: "auth", label: "🔐 Autenticación" },
  { id: "database", label: "🗄️ Base de datos" },
  { id: "payments", label: "💳 Pagos" },
  { id: "realtime", label: "⚡ Tiempo real" },
  { id: "admin", label: "👨‍💼 Panel admin" },
  { id: "seo", label: "🔍 SEO" },
]

export default function SimpleForm() {
  const [formData, setFormData] = useState({
    projectType: "",
    experienceLevel: "",
    features: [] as string[],
    backendPreference: "",
    technologyPreference: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [recommendation, setRecommendation] = useState(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleProjectTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, projectType: value }))
    setErrors((prev) => ({ ...prev, projectType: "" }))
  }

  const handleExperienceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, experienceLevel: value }))
    setErrors((prev) => ({ ...prev, experienceLevel: "" }))
  }

  const handleFeatureToggle = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((f) => f !== featureId)
        : [...prev.features, featureId],
    }))
  }

  const handleBackendChange = (value: string) => {
    setFormData((prev) => ({ ...prev, backendPreference: value }))
    setErrors((prev) => ({ ...prev, backendPreference: "" }))
  }

  const handleTechnologyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, technologyPreference: value }))
    setErrors((prev) => ({ ...prev, technologyPreference: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.projectType) newErrors.projectType = "Selecciona un tipo de proyecto"
    if (!formData.experienceLevel) newErrors.experienceLevel = "Selecciona tu nivel de experiencia"
    if (!formData.backendPreference) newErrors.backendPreference = "Selecciona tu preferencia de backend"
    if (!formData.technologyPreference) newErrors.technologyPreference = "Selecciona tu preferencia de tecnología"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await getRecommendation(formData)
      setRecommendation(result)
    } catch (error) {
      console.error("Error:", error)
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
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Selección guiada
        </div>
        <h2 className="text-2xl font-bold mb-2">Cuéntanos sobre tu proyecto</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Responde algunas preguntas y te recomendaremos el stack perfecto
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Type */}
        <div className="space-y-4">
          <label className="text-lg font-semibold flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            ¿Qué tipo de proyecto quieres construir?
          </label>
          {errors.projectType && <p className="text-red-500 text-sm">{errors.projectType}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectTypes.map((type) => {
              const Icon = type.icon
              const isSelected = formData.projectType === type.value
              return (
                <Card
                  key={type.value}
                  className={`cursor-pointer transition-all duration-300 border-2 transform hover:scale-105 hover:shadow-lg ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-md scale-105"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/30"
                  }`}
                  onClick={() => handleProjectTypeChange(type.value)}
                >
                  <CardContent className="p-4 text-center">
                    <Icon
                      className={`h-8 w-8 mx-auto mb-2 transition-colors duration-200 ${
                        isSelected ? "text-blue-600" : "text-slate-600 group-hover:text-blue-500"
                      }`}
                    />
                    <h3 className="font-semibold mb-1">{type.label}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{type.description}</p>
                    {isSelected && <Badge className="mt-2 bg-blue-600">Seleccionado</Badge>}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-4">
          <label className="text-lg font-semibold">Nivel de experiencia</label>
          {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {experienceLevels.map((level) => {
              const isSelected = formData.experienceLevel === level.value
              return (
                <Card
                  key={level.value}
                  className={`cursor-pointer transition-all duration-300 border-2 transform hover:scale-105 hover:shadow-lg ${
                    isSelected
                      ? "border-green-500 bg-green-50 dark:bg-green-950 shadow-md scale-105"
                      : "border-gray-200 dark:border-gray-700 hover:border-green-300 hover:bg-green-50/50 dark:hover:bg-green-950/30"
                  }`}
                  onClick={() => handleExperienceChange(level.value)}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold">{level.label}</h3>
                    {isSelected && <Badge className="mt-2 bg-green-600">Seleccionado</Badge>}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <label className="text-lg font-semibold">Funcionalidades necesarias (opcional)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature) => {
              const isSelected = formData.features.includes(feature.id)
              return (
                <Card
                  key={feature.id}
                  className={`cursor-pointer transition-all duration-300 border-2 transform hover:scale-105 hover:shadow-md ${
                    isSelected
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950 shadow-md scale-105"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:bg-purple-50/50 dark:hover:bg-purple-950/30"
                  }`}
                  onClick={() => handleFeatureToggle(feature.id)}
                >
                  <CardContent className="p-3 text-center">
                    <p className="text-sm font-medium">{feature.label}</p>
                    {isSelected && <Badge className="mt-1 text-xs bg-purple-600">✓</Badge>}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Backend Preference */}
        <div className="space-y-4">
          <label className="text-lg font-semibold">Preferencia de backend</label>
          {errors.backendPreference && <p className="text-red-500 text-sm">{errors.backendPreference}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { value: "integrated", label: "🔗 Backend integrado", desc: "Fullstack (Next.js)" },
              { value: "separate", label: "🔀 Backend separado", desc: "API independiente" },
            ].map((pref) => {
              const isSelected = formData.backendPreference === pref.value
              return (
                <Card
                  key={pref.value}
                  className={`cursor-pointer transition-all duration-300 border-2 transform hover:scale-105 hover:shadow-lg ${
                    isSelected
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-950 shadow-md scale-105"
                      : "border-gray-200 dark:border-gray-700 hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-950/30"
                  }`}
                  onClick={() => handleBackendChange(pref.value)}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold mb-1">{pref.label}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{pref.desc}</p>
                    {isSelected && <Badge className="mt-2 bg-orange-600">Seleccionado</Badge>}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Technology Preference */}
        <div className="space-y-4">
          <label className="text-lg font-semibold">Preferencia de tecnologías</label>
          {errors.technologyPreference && <p className="text-red-500 text-sm">{errors.technologyPreference}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: "modern", label: "✨ Modernas", desc: "Últimas tendencias" },
              { value: "traditional", label: "🏛️ Tradicionales", desc: "Probadas y estables" },
              { value: "mixed", label: "🎯 Combinación", desc: "Lo mejor de ambos" },
            ].map((pref) => {
              const isSelected = formData.technologyPreference === pref.value
              return (
                <Card
                  key={pref.value}
                  className={`cursor-pointer transition-all duration-300 border-2 transform hover:scale-105 hover:shadow-lg ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950 shadow-md scale-105"
                      : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30"
                  }`}
                  onClick={() => handleTechnologyChange(pref.value)}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold mb-1">{pref.label}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{pref.desc}</p>
                    {isSelected && <Badge className="mt-2 bg-indigo-600">Seleccionado</Badge>}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            className="px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span className="text-white">Generando recomendación...</span>
              </>
            ) : (
              <>
                <Rocket className="mr-2 h-5 w-5 text-white" />
                <span className="text-white">Obtener recomendación</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
