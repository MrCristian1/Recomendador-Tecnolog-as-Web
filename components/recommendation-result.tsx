"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Copy, FileDown, RefreshCw } from "lucide-react"
import { generateReadme } from "@/lib/actions"

interface Technology {
  name: string
  description: string
}

interface RecommendationProps {
  recommendation: {
    frontend: Technology
    styling: Technology
    backend: Technology
    database: Technology
    additionalTools: Technology[]
    explanation: string
  }
  onReset: () => void
}

export default function RecommendationResult({ recommendation, onReset }: RecommendationProps) {
  const [copied, setCopied] = useState(false)
  const [isGeneratingReadme, setIsGeneratingReadme] = useState(false)

  const copyToClipboard = () => {
    const stack = `
Frontend: ${recommendation.frontend.name}
Estilos: ${recommendation.styling.name}
Backend: ${recommendation.backend.name}
Base de datos: ${recommendation.database.name}
Herramientas adicionales: ${recommendation.additionalTools.map((tool) => tool.name).join(", ")}
    `

    navigator.clipboard.writeText(stack.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerateReadme = async () => {
    setIsGeneratingReadme(true)
    try {
      // Always generate a README, regardless of OpenAI status
      const readme = await generateBasicReadme(recommendation)

      // Create a blob and download it
      const blob = new Blob([readme], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "STACK_RECOMENDADO.md"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating README:", error)
      // Fallback: generate a simple README client-side
      const fallbackReadme = generateClientSideReadme(recommendation)
      const blob = new Blob([fallbackReadme], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "STACK_RECOMENDADO.md"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } finally {
      setIsGeneratingReadme(false)
    }
  }

  // Client-side README generation as ultimate fallback
  const generateClientSideReadme = (rec: any) => {
    return `# Stack Tecnológico Recomendado

## 🚀 Descripción del Proyecto

Este proyecto utiliza un stack tecnológico moderno y optimizado para ofrecer la mejor experiencia de desarrollo y rendimiento.

## 🛠️ Tecnologías Seleccionadas

### Frontend
**${rec.frontend.name}**
${rec.frontend.description}

### Estilos
**${rec.styling.name}**
${rec.styling.description}

### Backend
**${rec.backend.name}**
${rec.backend.description}

### Base de datos
**${rec.database.name}**
${rec.database.description}

### Herramientas adicionales
${rec.additionalTools.map((tool: any) => `- **${tool.name}**: ${tool.description}`).join("\n")}

## 💡 ¿Por qué este stack?

${rec.explanation}

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Git

### Pasos de instalación

1. **Clona el repositorio**
   \`\`\`bash
   git clone <url-del-repositorio>
   cd <nombre-del-proyecto>
   \`\`\`

2. **Instala las dependencias**
   \`\`\`bash
   npm install
   # o
   yarn install
   \`\`\`

3. **Configura las variables de entorno**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edita el archivo \`.env.local\` con tus configuraciones.

4. **Ejecuta el proyecto en modo desarrollo**
   \`\`\`bash
   npm run dev
   # o
   yarn dev
   \`\`\`

5. **Abre tu navegador**
   Visita [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

\`\`\`
proyecto/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de la aplicación
│   ├── styles/        # Archivos de estilos
│   ├── utils/         # Utilidades y helpers
│   └── lib/           # Configuraciones y librerías
├── public/            # Archivos estáticos
├── .env.local         # Variables de entorno
└── package.json       # Dependencias del proyecto
\`\`\`

## 🔧 Scripts Disponibles

- \`npm run dev\` - Ejecuta el proyecto en modo desarrollo
- \`npm run build\` - Construye el proyecto para producción
- \`npm run start\` - Ejecuta el proyecto en modo producción
- \`npm run lint\` - Ejecuta el linter para revisar el código

## 📚 Recursos Útiles

### Documentación oficial
- [${rec.frontend.name}](https://nextjs.org/docs) - Framework frontend
- [${rec.styling.name}](https://tailwindcss.com/docs) - Framework de estilos
- [${rec.backend.name}](https://nodejs.org/docs) - Tecnología backend
- [${rec.database.name}](https://www.mongodb.com/docs) - Base de datos

### Tutoriales recomendados
- Guía completa de ${rec.frontend.name}
- Mejores prácticas con ${rec.styling.name}
- Configuración avanzada de ${rec.backend.name}

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

## 🆘 Soporte

Si tienes alguna pregunta o problema:
- Revisa la documentación oficial de cada tecnología
- Busca en Stack Overflow
- Abre un issue en el repositorio

---

*README generado por el Recomendador de Tecnologías Web*
*Fecha de generación: ${new Date().toLocaleDateString("es-ES")}*`
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Tu Stack Recomendado</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Basado en tus necesidades, te recomendamos las siguientes tecnologías
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Frontend</CardTitle>
            <CardDescription>Framework principal</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-2">{recommendation.frontend.name}</Badge>
            <p className="text-sm">{recommendation.frontend.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estilos</CardTitle>
            <CardDescription>Framework CSS</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-2">{recommendation.styling.name}</Badge>
            <p className="text-sm">{recommendation.styling.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backend</CardTitle>
            <CardDescription>Servidor y API</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-2">{recommendation.backend.name}</Badge>
            <p className="text-sm">{recommendation.backend.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Base de datos</CardTitle>
            <CardDescription>Almacenamiento de datos</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-2">{recommendation.database.name}</Badge>
            <p className="text-sm">{recommendation.database.description}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Herramientas adicionales</CardTitle>
          <CardDescription>Complementos recomendados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {recommendation.additionalTools.map((tool, index) => (
              <Badge key={index} variant="outline">
                {tool.name}
              </Badge>
            ))}
          </div>
          <div className="space-y-2">
            {recommendation.additionalTools.map((tool, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{tool.name}:</span> {tool.description}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Explicación</CardTitle>
          <CardDescription>Por qué este stack es adecuado para ti</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{recommendation.explanation}</p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1" variant="outline" onClick={copyToClipboard}>
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          {copied ? "¡Copiado!" : "Copiar stack"}
        </Button>

        <Button className="flex-1" variant="outline" onClick={handleGenerateReadme} disabled={isGeneratingReadme}>
          <FileDown className="mr-2 h-4 w-4" />
          {isGeneratingReadme ? "Generando..." : "Descargar README.md"}
        </Button>

        <Button className="flex-1" onClick={onReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Nueva consulta
        </Button>
      </div>
    </div>
  )
}

// Helper function to generate basic README
async function generateBasicReadme(recommendation: any) {
  // This will try the server action first, but if it fails, it will be handled by the catch block
  try {
    return await generateReadme(recommendation)
  } catch (error) {
    // If server action fails, generate client-side
    throw error
  }
}
