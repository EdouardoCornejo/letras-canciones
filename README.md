# Buscador de Letras de Canciones

Pequeña aplicación en **React 19 + Vite** para **buscar la letra de una canción por artista y título**, usando la API gratuita de [lyrics.ovh](https://lyrics.ovh). Usa **Context API** para el estado y **`fetch` nativo** para las peticiones: sin cliente HTTP, sin API keys y sin variables de entorno.

**Demo:** https://letras-canciones-snowy.vercel.app

![Tech](https://img.shields.io/badge/React-19-61DAFB)
![Tech](https://img.shields.io/badge/Vite-8-646CFF)
![Tech](https://img.shields.io/badge/CSS3-blueviolet)
![Tech](https://img.shields.io/badge/API-lyrics.ovh-lightgrey)

---

## Tabla de contenidos

- [Buscador de Letras de Canciones](#buscador-de-letras-de-canciones)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Qué hace el proyecto](#qué-hace-el-proyecto)
  - [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
    - [Despliegue](#despliegue)
  - [Uso](#uso)
  - [Cómo funciona](#cómo-funciona)
    - [1. `src/context/LetrasProvider.jsx`](#1-srccontextletrasproviderjsx)
    - [2. Componentes](#2-componentes)
    - [3. Estilos y `vercel.json`](#3-estilos-y-verceljson)
    - [Flujo de la aplicación](#flujo-de-la-aplicación)
  - [Tecnologías](#tecnologías)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Licencia](#licencia)

---

## Qué hace el proyecto

- **Búsqueda de letras** por nombre de artista y nombre de canción.
- **Validación**: ambos campos son obligatorios (no se aceptan solo espacios).
- **Estado de carga** mientras se consulta la API.
- **Mensaje de error** (_"Cancion no encontrada"_) si la API falla o no devuelve letra.
- La entrada del usuario se codifica con `encodeURIComponent` antes de construir la URL.
- Puede **incrustarse en un `<iframe>`** desde cualquier origen.

---

## Cómo ejecutar el proyecto

Requisitos: **Node.js 20.19+ o 22.12+** (requerido por Vite 8).

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`).

| Comando           | Descripción                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Servidor de desarrollo                   |
| `npm run build`   | Build de producción en `dist/`           |
| `npm run preview` | Previsualiza el build de producción      |

No necesita API keys ni variables de entorno.

### Despliegue

El proyecto está configurado para Vercel en `vercel.json` (framework `vite`, `npm run build`, salida en `dist`):

```bash
npx vercel deploy --prod
```

---

## Uso

1. Escribe el **Artista** y la **Canción**.
2. Pulsa **Buscar**.
3. Se muestra _"Cargando..."_ y después la letra completa, o la alerta correspondiente si falta un campo o la canción no se encuentra.

Para incrustarla en otra web:

```html
<iframe
  src="https://letras-canciones-snowy.vercel.app"
  title="Buscador de Letras"
  width="100%"
  height="700"
  style="border: 0"
  loading="lazy"
></iframe>
```

---

## Cómo funciona

### 1. `src/context/LetrasProvider.jsx`

Contexto global con tres estados: `alerta`, `letra` y `cargando`. Expone la función **`busquedaLetra({ artista, cancion })`**, que:

- Activa `cargando` y limpia la alerta.
- Construye `https://api.lyrics.ovh/v1/<artista>/<cancion>` aplicando `trim()` y `encodeURIComponent` a cada parte.
- Lanza un error si la respuesta no es `ok` o si `data.lyrics` no es un texto con contenido.
- En éxito guarda la letra con `setLetra`; en error vacía la letra y fija la alerta _"Cancion no encontrada"_.
- Desactiva `cargando` en el `finally`.

El hook **`useLetras`** (`src/hooks/useLetras.jsx`) da acceso al contexto.

### 2. Componentes

- **`AppLetras`**: cabecera, formulario y zona `<main>` que muestra, por orden de prioridad, la `Alerta`, la `Letra`, el texto de carga o un mensaje de bienvenida.
- **`Formulario`**: estado local `busqueda` (`artista`, `cancion`); `handleSubmit` valida y llama a `busquedaLetra`, o fija la alerta _"Coloca nombre de artista y cancion"_.
- **`Letra`**: muestra la letra dentro de un `div.letra`.
- **`Alerta`**: caja de mensaje que recibe `children`.

### 3. Estilos y `vercel.json`

Los estilos están en CSS plano (`src/index.css`), con [modern-normalize](https://github.com/sindresorhus/modern-normalize) y la fuente **Fredoka** de Google Fonts cargados desde `index.html`. `vercel.json` envía `frame-ancestors *`, `X-Content-Type-Options: nosniff` y `Referrer-Policy`.

### Flujo de la aplicación

```
main.jsx
  └─ <App>
       └─ <LetrasProvider>              → alerta, letra, cargando
            └─ <AppLetras>
                 ├─ <Formulario>
                 │     └─ handleSubmit()
                 │          ├─ campo vacío → setAlerta(...)
                 │          └─ busquedaLetra({ artista, cancion })
                 │                 ├─ fetch api.lyrics.ovh/v1/<artista>/<cancion>
                 │                 ├─ ok + lyrics → setLetra()
                 │                 └─ error       → setAlerta('Cancion no encontrada')
                 └─ <main>
                       alerta   ? <Alerta>
                     : letra    ? <Letra>
                     : cargando ? 'cargando...'
                     :            mensaje inicial
```

---

## Tecnologías

- **React 19** — componentes funcionales, hooks y Context API.
- **Vite 8** — servidor de desarrollo y build.
- **CSS3** — estilos propios, grid para el formulario.
- **`fetch` nativo** — sin dependencias HTTP.
- **lyrics.ovh API** — fuente de las letras.
- **Vercel** — despliegue y cabeceras.

---

## Estructura del proyecto

```
letras-canciones/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Alerta.jsx         # Mensaje de alerta
│   │   ├── AppLetras.jsx      # Layout y estado visible
│   │   ├── Formulario.jsx     # Búsqueda por artista y canción
│   │   └── Letra.jsx          # Letra encontrada
│   ├── context/
│   │   └── LetrasProvider.jsx # Estado y llamada a la API
│   ├── hooks/
│   │   └── useLetras.jsx      # Acceso al contexto
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vercel.json                # Config de Vercel y cabeceras
└── vite.config.js
```

---

## Licencia

Proyecto de uso libre con fines educativos y de práctica. Las letras las proporciona lyrics.ovh y pertenecen a sus respectivos autores.
