"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"
import { google } from "@ai-sdk/google"
import { getMockRecommendation, getMockNaturalLanguageRecommendation } from "./mock-recommendations"

// Configuration for different AI providers
const getAIModel = () => {
  // Priority order: Anthropic (Claude) -> Google (Gemini) -> OpenAI -> Mock
  if (process.env.ANTHROPIC_API_KEY) {
    console.log("Using Anthropic Claude")
    return {
      model: anthropic("claude-3-haiku-20240307"),
      provider: "anthropic",
      apiKey: process.env.ANTHROPIC_API_KEY,
    }
  } else if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.log("Using Google Gemini")
    return {
      model: google("gemini-1.5-flash"),
      provider: "google",
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    }
  } else if (process.env.OPENAI_API_KEY) {
    console.log("Using OpenAI GPT")
    return {
      model: openai("gpt-4o-mini"), // Using mini version which is cheaper
      provider: "openai",
      apiKey: process.env.OPENAI_API_KEY,
    }
  } else {
    console.log("No AI API key found, using mock recommendations")
    return null
  }
}

export async function getRecommendation(formData: any) {
  const aiConfig = getAIModel()

  if (!aiConfig) {
    console.warn("No AI API key found, using mock recommendation")
    return getMockRecommendation(formData)
  }

  try {
    const prompt = `
      Actúa como un experto en desarrollo web que recomienda stacks tecnológicos.
      
      Necesito una recomendación de stack tecnológico para un proyecto con las siguientes características:
      - Tipo de proyecto: ${formData.projectType}
      - Nivel de experiencia del desarrollador: ${formData.experienceLevel}
      - Funcionalidades necesarias: ${formData.features?.join(", ") || "No especificadas"}
      - Preferencia de backend: ${formData.backendPreference}
      - Preferencia de tecnologías: ${formData.technologyPreference}
      
      Por favor, proporciona una recomendación en formato JSON con la siguiente estructura:
      {
        "frontend": { "name": "nombre de la tecnología", "description": "breve descripción de por qué es adecuada" },
        "styling": { "name": "nombre de la tecnología", "description": "breve descripción de por qué es adecuada" },
        "backend": { "name": "nombre de la tecnología", "description": "breve descripción de por qué es adecuada" },
        "database": { "name": "nombre de la tecnología", "description": "breve descripción de por qué es adecuada" },
        "additionalTools": [
          { "name": "nombre de la herramienta", "description": "breve descripción de por qué es adecuada" }
        ],
        "explanation": "explicación general de por qué este stack es adecuado para el proyecto"
      }
    `

    const generateOptions: any = {
      model: aiConfig.model,
      prompt,
    }

    // Add provider-specific options
    if (aiConfig.provider === "openai") {
      generateOptions.providerOptions = {
        openai: { apiKey: aiConfig.apiKey },
      }
    } else if (aiConfig.provider === "anthropic") {
      generateOptions.providerOptions = {
        anthropic: { apiKey: aiConfig.apiKey },
      }
    } else if (aiConfig.provider === "google") {
      generateOptions.providerOptions = {
        google: { apiKey: aiConfig.apiKey },
      }
    }

    const { text } = await generateText(generateOptions)

    // Extract the JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No se pudo extraer la recomendación en formato JSON")
    }

    return JSON.parse(jsonMatch[0])
  } catch (error: any) {
    console.error(`Error with ${aiConfig.provider}:`, error)

    // Check for specific errors
    if (error.message?.includes("quota") || error.message?.includes("exceeded")) {
      console.warn(`${aiConfig.provider} quota exceeded, falling back to mock recommendation`)
    } else if (error.message?.includes("API key")) {
      console.warn(`${aiConfig.provider} API key issue, falling back to mock recommendation`)
    } else {
      console.warn(`${aiConfig.provider} API error, falling back to mock recommendation`)
    }

    return getMockRecommendation(formData)
  }
}

export async function getNaturalLanguageRecommendation(description: string) {
  const aiConfig = getAIModel()

  if (!aiConfig) {
    console.warn("No AI API key found, using mock recommendation")
    return getMockNaturalLanguageRecommendation(description)
  }

  try {
    const prompt = `
      Actúa como un experto en desarrollo web que recomienda stacks tecnológicos.
      
      Un usuario ha descrito su proyecto de la siguiente manera:
      "${description}"
      
      Analiza esta descripción e infiere:
      - Qué tipo de proyecto es
      - Qué funcionalidades necesitará
      - Cuál sería el nivel de complejidad
      
      Luego, proporciona una recomendación de stack tecnológico en formato JSON con la siguiente estructura:
      {
        "frontend": { "name": "nombre de la tecnología", "description": "breve descripción de por qué es adecuada" },
        "styling": { "name": "nombre de la tecnología", "description": "breve descripción de por qué es adecuada" },
        "backend": { "name": "nombre de la tecnología", "description": "breve descripción de por qué es adecuada" },
        "database": { "name": "nombre de la tecnología", "description": "breve descripción de por qué es adecuada" },
        "additionalTools": [
          { "name": "nombre de la herramienta", "description": "breve descripción de por qué es adecuada" }
        ],
        "explanation": "explicación general de por qué este stack es adecuado para el proyecto, mencionando específicamente cómo se adapta a la descripción proporcionada"
      }
    `

    const generateOptions: any = {
      model: aiConfig.model,
      prompt,
    }

    // Add provider-specific options
    if (aiConfig.provider === "openai") {
      generateOptions.providerOptions = {
        openai: { apiKey: aiConfig.apiKey },
      }
    } else if (aiConfig.provider === "anthropic") {
      generateOptions.providerOptions = {
        anthropic: { apiKey: aiConfig.apiKey },
      }
    } else if (aiConfig.provider === "google") {
      generateOptions.providerOptions = {
        google: { apiKey: aiConfig.apiKey },
      }
    }

    const { text } = await generateText(generateOptions)

    // Extract the JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No se pudo extraer la recomendación en formato JSON")
    }

    return JSON.parse(jsonMatch[0])
  } catch (error: any) {
    console.error(`Error with ${aiConfig.provider}:`, error)

    // Check for specific errors
    if (error.message?.includes("quota") || error.message?.includes("exceeded")) {
      console.warn(`${aiConfig.provider} quota exceeded, falling back to mock recommendation`)
    } else if (error.message?.includes("API key")) {
      console.warn(`${aiConfig.provider} API key issue, falling back to mock recommendation`)
    } else {
      console.warn(`${aiConfig.provider} API error, falling back to mock recommendation`)
    }

    return getMockNaturalLanguageRecommendation(description)
  }
}

export async function generateReadme(recommendation: any) {
  // Always generate a comprehensive README without relying on AI
  const readme = `# Stack Tecnológico Recomendado

## 🚀 Descripción del Proyecto

Este proyecto utiliza un stack tecnológico moderno y optimizado para ofrecer la mejor experiencia de desarrollo y rendimiento.

## 🛠️ Tecnologías Seleccionadas

### Frontend
**${recommendation.frontend.name}**
${recommendation.frontend.description}

### Estilos
**${recommendation.styling.name}**
${recommendation.styling.description}

### Backend
**${recommendation.backend.name}**
${recommendation.backend.description}

### Base de datos
**${recommendation.database.name}**
${recommendation.database.description}

### Herramientas adicionales
${recommendation.additionalTools.map((tool: any) => `- **${tool.name}**: ${tool.description}`).join("\n")}

## 💡 ¿Por qué este stack?

${recommendation.explanation}

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
- [${recommendation.frontend.name}](https://nextjs.org/docs) - Framework frontend
- [${recommendation.styling.name}](https://tailwindcss.com/docs) - Framework de estilos
- [${recommendation.backend.name}](https://nodejs.org/docs) - Tecnología backend
- [${recommendation.database.name}](https://www.mongodb.com/docs) - Base de datos

### Tutoriales recomendados
- Guía completa de ${recommendation.frontend.name}
- Mejores prácticas con ${recommendation.styling.name}
- Configuración avanzada de ${recommendation.backend.name}

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

## 🔗 Enlaces Útiles

### Herramientas de desarrollo
- [VS Code](https://code.visualstudio.com/) - Editor recomendado
- [Postman](https://www.postman.com/) - Para testing de APIs
- [Git](https://git-scm.com/) - Control de versiones

### Recursos de aprendizaje
- [MDN Web Docs](https://developer.mozilla.org/) - Documentación web
- [Stack Overflow](https://stackoverflow.com/) - Comunidad de desarrolladores
- [GitHub](https://github.com/) - Repositorios y código abierto

---

*README generado por el Recomendador de Tecnologías Web*
*Fecha de generación: ${new Date().toLocaleDateString("es-ES")}*`

  return readme
}
