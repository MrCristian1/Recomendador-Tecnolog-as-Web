"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getNaturalLanguageRecommendation } from "@/lib/actions"
import RecommendationResult from "./recommendation-result"
import { Brain, Lightbulb, MessageSquare, Sparkles } from "lucide-react"

const examples = [
  {
    text: "Quiero una app donde los usuarios se registren y escriban posts",
    category: "Red Social",
    icon: MessageSquare,
  },
  {
    text: "Necesito una tienda online para vender productos con pagos",
    category: "E-commerce",
    icon: Lightbulb,
  },
  {
    text: "Quiero crear un portafolio personal para mostrar proyectos",
    category: "Portafolio",
    icon: Brain,
  },
]

export default function SimpleNaturalInput() {
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recommendation, setRecommendation] = useState(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!description.trim()) {
      setError("Por favor, describe tu proyecto")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const result = await getNaturalLanguageRecommendation(description)
      setRecommendation(result)
    } catch (error) {
      console.error("Error:", error)
      setError("Error al procesar la solicitud")
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (text: string) => {
    setDescription(text)
    setError("")
  }

  if (recommendation) {
    return <RecommendationResult recommendation={recommendation} onReset={() => setRecommendation(null)} />
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Brain className="h-4 w-4" />
          Descripción en texto
        </div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900">Describe tu proyecto</h2>
        <p className="text-slate-600">Nuestra IA analizará tu descripción y te recomendará el stack perfecto</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
          <Sparkles className="h-5 w-5" />
          Ejemplos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((example, index) => {
            const Icon = example.icon
            return (
              <Card
                key={index}
                className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50/30 transform hover:scale-105 bg-white"
                onClick={() => handleExampleClick(example.text)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-purple-600 mt-1 transition-colors duration-200" />
                    <div>
                      <Badge
                        variant="outline"
                        className="mb-2 text-xs hover:bg-purple-100 transition-colors duration-200"
                      >
                        {example.category}
                      </Badge>
                      <p className="text-sm text-slate-700 leading-relaxed">"{example.text}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="description" className="text-lg font-semibold block text-slate-900">
            Describe tu proyecto
          </label>
          <Textarea
            id="description"
            placeholder="Ej: Quiero una app donde los usuarios se registren y escriban posts..."
            className="min-h-[150px] text-base transition-all duration-200 focus:ring-2 focus:ring-purple-500 hover:border-purple-300 bg-white text-slate-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">⚠️ {error}</p>}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="px-8 py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span className="text-white">Analizando...</span>
              </>
            ) : (
              <>
                <Brain className="mr-2 h-5 w-5 text-white" />
                <span className="text-white">Obtener recomendación</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
