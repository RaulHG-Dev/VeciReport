# GitHub Copilot System Instructions for React

## Contexto y Arquitectura del Proyecto
Sigue estrictamente la siguiente estructura de carpetas para el proyecto de React (Vite + TypeScript + Tailwind CSS):

```text
src/
├── assets/          # Imágenes, iconos, fuentes estáticas
├── components/      # Componentes UI globales y reutilizables
│   ├── ui/          # Elementos atómicos (Button, Input, Card)
│   └── common/      # Componentes compartidos complejos (Navbar, Sidebar)
├── context/         # Contextos globales de React (si aplica)
├── hooks/           # Custom Hooks globales y reutilizables
├── layouts/         # Layouts de la aplicación (MainLayout, AuthLayout)
├── pages/           # Componentes de página (vistas principales de rutas)
│   └── dashboard/   # Subcarpetas por módulo/ruta si es complejo
├── services/        # Clientes de API, peticiones Axios/Fetch y lógica de datos
├── types/           # Definiciones de tipos globales de TypeScript (.d.ts o .ts)
├── utils/           # Funciones utilitarias y helpers puros
├── App.tsx          # Componente raíz
└── main.tsx         # Punto de entrada de la aplicación
```

## Reglas Generales de Código

### 1. Estructura de Componentes
- Usa **componentes funcionales** con la sintaxis `export const ComponentName = () => {}`.
- Ubica cada componente en su propio archivo o carpeta (`components/ui/Button/Button.tsx`).
- No definas múltiples componentes en un mismo archivo a menos que sean sub-elementos internos muy pequeños.

### 2. TypeScript Estricto
- Prohibido el uso de `any`. Usa tipos explícitos para props, retornos y estados complejos.
- Define interfaces para las props de cada componente: `interface ComponentNameProps {}`.
- Usa tipos nativos de React como `React.ReactNode` para la propiedad `children`.

### 3. Separación de Responsabilidades
- Mantén los componentes UI limpios de lógica pesada de negocio.
- Extrae la lógica de efectos (`useEffect`), estados complejos o llamadas a APIs hacia **Custom Hooks** dentro de `src/hooks/`.
- Las peticiones HTTP deben vivir exclusivamente en `src/services/`.

### 4. Estilos con Tailwind CSS
- Usa nombres de clases de Tailwind nativos.
- Utiliza la librería `clsx` o `tailwind-merge` (`cn` helper) cuando manejes clases condicionales.
- Evita escribir estilos CSS tradicionales a menos que sea estrictamente necesario.

### 5. Rendimiento y Buenas Prácticas
- Asegúrate de incluir los arreglos de dependencias correctos en `useEffect`, `useMemo` y `useCallback`.
- Prefiere la composición de componentes antes de abusar de props de configuración gigantes.
