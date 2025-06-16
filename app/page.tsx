import { Suspense } from "react"
import SimpleForm from "@/components/simple-form"
import SimpleNaturalInput from "@/components/simple-natural-input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, Brain, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25"></div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
              <Sparkles className="h-4 w-4" />
              Powered by AI
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent dark:from-slate-100 dark:via-blue-100 dark:to-purple-100 mb-6">
              Recomendador de
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tecnologías Web
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Encuentra el stack tecnológico perfecto para tu próximo proyecto. Nuestra IA analiza tus necesidades y te
              recomienda las mejores herramientas.
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <strong>Estado:</strong> Sistema inteligente activado
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 md:p-12">
            <Tabs defaultValue="natural" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-12 h-14 p-1 bg-slate-100 dark:bg-slate-700">
                <TabsTrigger value="form" className="flex items-center gap-2 text-base font-medium h-12">
                  <Code2 className="h-5 w-5" />
                  Selección guiada
                </TabsTrigger>
                <TabsTrigger value="natural" className="flex items-center gap-2 text-base font-medium h-12">
                  <Brain className="h-5 w-5" />
                  Descripción en texto
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="mt-0">
                <Suspense
                  fallback={
                    <div className="h-96 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  }
                >
                  <SimpleForm />
                </Suspense>
              </TabsContent>

              <TabsContent value="natural" className="mt-0">
                <Suspense
                  fallback={
                    <div className="h-96 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                  }
                >
                  <SimpleNaturalInput />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>

          <div className="text-center mt-16">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Creado por <span className="font-semibold text-slate-700 dark:text-slate-300">Cristian Parada</span> con ❤️
              para desarrolladores que buscan el stack perfecto
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
