// Mock recommendations for when OpenAI API is not available
export const getMockRecommendation = (formData: any) => {
  const recommendations = {
    blog: {
      frontend: { name: "Next.js", description: "Framework React con SSG perfecto para blogs con excelente SEO" },
      styling: {
        name: "Tailwind CSS",
        description: "Framework CSS utilitario que permite diseños rápidos y consistentes",
      },
      backend: { name: "Next.js API Routes", description: "Backend integrado que simplifica el desarrollo fullstack" },
      database: { name: "MongoDB", description: "Base de datos NoSQL flexible para contenido de blog" },
      additionalTools: [
        { name: "MDX", description: "Para escribir contenido en Markdown con componentes React" },
        { name: "Vercel", description: "Plataforma de deployment optimizada para Next.js" },
      ],
      explanation:
        "Este stack es ideal para un blog porque Next.js ofrece generación estática que mejora el SEO y la velocidad de carga. Tailwind CSS permite crear diseños atractivos rápidamente, y MongoDB es perfecto para almacenar posts y metadatos.",
    },
    ecommerce: {
      frontend: {
        name: "Next.js",
        description: "Framework React con SSR/SSG ideal para e-commerce con SEO optimizado",
      },
      styling: {
        name: "Tailwind CSS",
        description: "Framework CSS que permite crear interfaces de usuario atractivas y responsive",
      },
      backend: { name: "Next.js + Stripe", description: "Backend integrado con procesamiento de pagos seguro" },
      database: {
        name: "PostgreSQL",
        description: "Base de datos relacional robusta para productos, usuarios y pedidos",
      },
      additionalTools: [
        { name: "Stripe", description: "Procesamiento de pagos seguro y confiable" },
        { name: "NextAuth.js", description: "Autenticación completa para usuarios" },
        { name: "Prisma", description: "ORM moderno para manejo de base de datos" },
      ],
      explanation:
        "Este stack es perfecto para e-commerce porque combina el rendimiento de Next.js con la seguridad de Stripe para pagos. PostgreSQL garantiza la integridad de los datos de productos y pedidos, mientras que NextAuth.js maneja la autenticación de usuarios de forma segura.",
    },
    portfolio: {
      frontend: { name: "Next.js", description: "Framework React con SSG perfecto para portafolios con carga rápida" },
      styling: { name: "Tailwind CSS", description: "Framework CSS que permite crear diseños únicos y profesionales" },
      backend: { name: "Next.js API Routes", description: "Backend mínimo para formularios de contacto" },
      database: { name: "No necesaria", description: "Los portafolios estáticos no requieren base de datos" },
      additionalTools: [
        { name: "Framer Motion", description: "Animaciones fluidas para una experiencia visual atractiva" },
        { name: "EmailJS", description: "Envío de emails desde formularios de contacto" },
      ],
      explanation:
        "Para un portafolio, Next.js con generación estática es ideal porque ofrece carga ultra-rápida y excelente SEO. Tailwind CSS permite crear diseños únicos, y Framer Motion añade animaciones profesionales que destacan tu trabajo.",
    },
    dashboard: {
      frontend: { name: "React + Vite", description: "Configuración rápida y moderna para aplicaciones interactivas" },
      styling: {
        name: "Tailwind CSS + shadcn/ui",
        description: "Componentes pre-construidos para dashboards profesionales",
      },
      backend: { name: "Node.js + Express", description: "Backend robusto para APIs y manejo de datos en tiempo real" },
      database: { name: "PostgreSQL", description: "Base de datos relacional para datos estructurados y reportes" },
      additionalTools: [
        { name: "Chart.js", description: "Librería para gráficos y visualización de datos" },
        { name: "Socket.io", description: "Comunicación en tiempo real para actualizaciones live" },
        { name: "JWT", description: "Autenticación segura para usuarios administrativos" },
      ],
      explanation:
        "Este stack es perfecto para dashboards porque React ofrece interactividad fluida, shadcn/ui proporciona componentes profesionales, y PostgreSQL maneja eficientemente las consultas complejas necesarias para reportes y análisis.",
    },
    social: {
      frontend: { name: "Next.js", description: "Framework fullstack ideal para aplicaciones sociales complejas" },
      styling: { name: "Tailwind CSS", description: "Estilos flexibles para interfaces de usuario dinámicas" },
      backend: { name: "Next.js + Supabase", description: "Backend como servicio con autenticación y tiempo real" },
      database: { name: "PostgreSQL (Supabase)", description: "Base de datos relacional con funciones en tiempo real" },
      additionalTools: [
        { name: "Supabase Auth", description: "Sistema de autenticación completo con OAuth" },
        { name: "Supabase Realtime", description: "Actualizaciones en tiempo real para feeds y mensajes" },
        { name: "Cloudinary", description: "Gestión y optimización de imágenes de usuarios" },
      ],
      explanation:
        "Para una red social, este stack ofrece todo lo necesario: autenticación robusta, actualizaciones en tiempo real, y escalabilidad. Supabase simplifica el backend mientras proporciona todas las funciones avanzadas que necesita una aplicación social.",
    },
    collaborative: {
      frontend: { name: "React + TypeScript", description: "Tipado fuerte para aplicaciones colaborativas complejas" },
      styling: {
        name: "Tailwind CSS + Headless UI",
        description: "Componentes accesibles para interfaces colaborativas",
      },
      backend: { name: "Node.js + Socket.io", description: "Backend en tiempo real para colaboración simultánea" },
      database: { name: "MongoDB", description: "Flexibilidad para documentos colaborativos y estructuras dinámicas" },
      additionalTools: [
        { name: "Socket.io", description: "Comunicación bidireccional en tiempo real" },
        { name: "Yjs", description: "Algoritmos CRDT para edición colaborativa sin conflictos" },
        { name: "Auth0", description: "Gestión de usuarios y permisos granulares" },
      ],
      explanation:
        "Este stack está optimizado para colaboración en tiempo real. Yjs maneja la sincronización de datos sin conflictos, Socket.io permite comunicación instantánea, y MongoDB ofrece la flexibilidad necesaria para estructuras de datos colaborativas complejas.",
    },
  }

  const projectType = formData.projectType || "blog"
  return recommendations[projectType as keyof typeof recommendations] || recommendations.blog
}

export const getMockNaturalLanguageRecommendation = (description: string) => {
  // Enhanced keyword matching for demo purposes
  const lowerDesc = description.toLowerCase()

  // E-commerce keywords
  if (
    lowerDesc.includes("tienda") ||
    lowerDesc.includes("venta") ||
    lowerDesc.includes("pago") ||
    lowerDesc.includes("producto") ||
    lowerDesc.includes("carrito") ||
    lowerDesc.includes("compra")
  ) {
    return getMockRecommendation({ projectType: "ecommerce" })
  }

  // Portfolio keywords
  else if (
    lowerDesc.includes("portafolio") ||
    lowerDesc.includes("portfolio") ||
    lowerDesc.includes("trabajo") ||
    lowerDesc.includes("cv") ||
    lowerDesc.includes("curriculum") ||
    lowerDesc.includes("personal")
  ) {
    return getMockRecommendation({ projectType: "portfolio" })
  }

  // Dashboard keywords
  else if (
    lowerDesc.includes("dashboard") ||
    lowerDesc.includes("panel") ||
    lowerDesc.includes("admin") ||
    lowerDesc.includes("gráfico") ||
    lowerDesc.includes("reporte") ||
    lowerDesc.includes("analítica")
  ) {
    return getMockRecommendation({ projectType: "dashboard" })
  }

  // Social media keywords
  else if (
    lowerDesc.includes("social") ||
    lowerDesc.includes("usuario") ||
    lowerDesc.includes("post") ||
    lowerDesc.includes("comentario") ||
    lowerDesc.includes("seguir") ||
    lowerDesc.includes("feed") ||
    lowerDesc.includes("mensaje") ||
    lowerDesc.includes("chat")
  ) {
    return getMockRecommendation({ projectType: "social" })
  }

  // Collaborative keywords
  else if (
    lowerDesc.includes("colabor") ||
    lowerDesc.includes("equipo") ||
    lowerDesc.includes("compartir") ||
    lowerDesc.includes("editar") ||
    lowerDesc.includes("tiempo real") ||
    lowerDesc.includes("simultáneo")
  ) {
    return getMockRecommendation({ projectType: "collaborative" })
  }

  // Default to blog
  else {
    return getMockRecommendation({ projectType: "blog" })
  }
}
