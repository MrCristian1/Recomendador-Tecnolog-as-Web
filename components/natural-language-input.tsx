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

const examplePrompts = [
  {
    text: "Quiero una app donde los usuarios se registren y escriban posts con imágenes",
    category: "Red Social",
    icon: MessageSquare,
  },
  {
    text: "Necesito una tienda online para vender productos artesanales con pagos",
    category: "E-commerce",
    icon: Lightbulb,
  },
  {
    text: "Quiero crear un portafolio personal para mostrar mis proyectos de diseño",
    category: "Portafolio",
    icon: Brain,
  },
]

export default function NaturalLanguageInput() {
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recommendation, setRecommendation] = useState(null)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
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
      console.error("Error getting recommendation:", error)
      setError("Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  function handleExampleClick(exampleText: string) {
    setDescription(exampleText)
    setError("")
  }

  if (recommendation) {
    return <RecommendationResult recommendation={recommendation} onReset={() => setRecommendation(null)} />
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Brain className="h-4 w-4" />
          Descripción en texto
        </div>
        <h2 className="text-2xl font-bold mb-2">Describe tu proyecto con tus propias palabras</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Nuestra IA analizará tu descripción y te recomendará el stack perfecto
        </p>
      </div>

      {/* Example prompts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Ejemplos para inspirarte
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examplePrompts.map((example, index) => {
            const Icon = example.icon
            return (
              <Card
                key={index}
                className="cursor-pointer transition-all duration-200 hover:shadow-md border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400"
                onClick={() => handleExampleClick(example.text)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <Badge variant="outline" className="mb-2 text-xs">
                        {example.category}
                      </Badge>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">"{example.text}"</p>
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
          <label htmlFor="description" className="text-lg font-semibold block">
            Describe tu proyecto
          </label>
          <Textarea
            id="description"
            placeholder="Ej: Quiero una app donde los usuarios se registren y escriban posts con imágenes..."
            className="min-h-[150px] text-base resize-none border-2 focus:border-purple-500 transition-colors"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <p className="text-sm text-red-500 flex items-center gap-1">⚠️ {error}</p>}
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Brain className="h-4 w-4" />
            Describe tu proyecto en lenguaje natural y te recomendaremos un stack tecnológico adecuado.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analizando tu proyecto...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-5 w-5" />
                Obtener recomendación
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
