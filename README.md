# ASOBICA - Plataforma de Billar

Aplicación web moderna y profesional para gestionar y visualizar resultados de competencias de billar.

## 🎯 Características Principales

- ✅ **Página Pública**: Tabla de posiciones con estadísticas en tiempo real
- ✅ **Panel Administrativo**: Registro y edición de juegos
- ✅ **Autenticación Segura**: Con Supabase Auth y Row Level Security
- ✅ **Actualización en Tiempo Real**: Usando Realtime de Supabase
- ✅ **Diseño Responsive**: Optimizado para desktop, tablet y móvil
- ✅ **UI/UX Profesional**: Identidad visual elegante y moderna

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Estilos**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Build**: Vite
- **Iconos**: Lucide React

## 📋 Requisitos Previos

- Node.js 18+ y npm/yarn
- Cuenta en [Supabase](https://supabase.com)
- Variables de entorno configuradas

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/asobica-billar.git
cd asobica-billar
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

### 4. Configurar Supabase

Consulta la sección **Configuración de Supabase** en este documento.

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación abrirá en `http://localhost:3000`.

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── common/          # Componentes reutilizables
│   ├── layout/          # Layout principal
│   ├── public/          # Componentes de página pública
│   └── admin/           # Componentes del panel administrativo
├── pages/               # Páginas principales
├── services/            # Servicios de Supabase
├── types/               # Tipos TypeScript
├── utils/               # Funciones utilitarias
├── hooks/               # Custom hooks
└── index.css            # Estilos globales
```

## 🗄️ Configuración de Supabase

### Paso 1: Crear un Proyecto Supabase

1. Ve a [https://app.supabase.com](https://app.supabase.com)
2. Crea un nuevo proyecto
3. Espera a que se inicialice (5-10 minutos)
4. Ve a Project Settings → API Keys
5. Copia la URL y anon key

### Paso 2: Crear las Tablas

En el Editor SQL de Supabase, ejecuta los scripts en `supabase/migrations/`:

```bash
# Este paso se hace manualmente en la UI de Supabase
# O usando Supabase CLI si está configurada
```

Ver archivo: `supabase/migrations/001_create_tables.sql`

### Paso 3: Configurar Row Level Security (RLS)

Ejecuta los scripts de seguridad en `supabase/migrations/002_setup_rls.sql`

### Paso 4: Crear Usuario Admin

Usa el script `supabase/scripts/create_admin.sql`

O manualmente:
1. Ve a Authentication → Users
2. Crea un nuevo usuario
3. Ve a SQL Editor y ejecuta:

```sql
INSERT INTO profiles (id, email, role)
VALUES ('[USER_ID]', '[EMAIL]', 'admin');
```

## 🔐 Autenticación

### Acceso Público
- Ver tabla de posiciones
- Ver resultados
- Ver equipos

### Acceso Administrativo
- Email: `admin@asobica.com`
- Contraseña: (ver instrucciones de setup)

**Para cambiar contraseña**:
1. Inicia sesión en el panel admin
2. Ve a Configuración
3. Usa "Cambiar contraseña"

## 📊 Uso

### Para Visitantes

1. Abre `http://localhost:3000`
2. Visualiza la tabla de posiciones
3. Haz clic en un equipo para ver más detalles

### Para Administradores

1. Abre `http://localhost:3000/admin`
2. Inicia sesión
3. Usa el formulario para registrar juegos
4. Los cambios se reflejan automáticamente en la página pública

## 🧪 Pruebas

### Pruebas Funcionales

```bash
# Registro de juego
npm run test -- registro

# Edición de juego
npm run test -- edicion

# Seguridad
npm run test -- seguridad
```

### Validación Manual

- [ ] Página pública accesible sin login
- [ ] Panel admin requiere autenticación
- [ ] Registro de juego actualiza posiciones
- [ ] Edición recalcula estadísticas
- [ ] Tabla responsive en móvil

## 📈 Estadísticas y Cálculos

### Fórmulas de Puntuación

- **Juegos Ganados**: Por cada juego completo ganado
- **Mesas Jugadas**: Suma de todas las partidas de jugadores
- **Puntos**: Sistema de puntos (15 para ganador, 10 para perdedor)

### Criterios de Desempate

1. Juegos ganados
2. Promedio de juegos
3. Mesas ganadas
4. Promedio de mesas
5. Puntos totales

## 🌐 Publicación

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

1. Conecta tu repositorio
2. Deploy automático en push

### Variables de Entorno en Producción

En tu plataforma de hosting, configura:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## 📝 Notas de Desarrollo

- Las claves secretas de Supabase **NUNCA** deben estar en el código
- Usar solo la clave pública (anon key)
- Las políticas de seguridad se aplican en Supabase, no en el frontend
- Los datos se persisten en Supabase, no en localStorage

## 🤝 Contribuir

1. Crea un fork del proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 📧 Contacto

Para dudas o reportar bugs, crea un issue en GitHub.

---

**Última actualización**: 2026
**Versión**: 1.0.0
