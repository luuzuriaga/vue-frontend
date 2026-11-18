# Vue Frontend – Gestión de Productos

Aplicación frontend desarrollada con **Vue 3** y **Vite** para administrar productos. Consume una API REST construida en Laravel (`../laravel-api`) y permite listar, crear y eliminar productos, asignándoles una categoría.

## Tecnologías

| Herramienta | Uso |
| --- | --- |
| [Vue 3](https://vuejs.org/) | Framework principal (Composition API con `<script setup>`) |
| [Vite](https://vite.dev/) | Servidor de desarrollo y empaquetado |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos |
| [Axios](https://axios-http.com/) | Peticiones HTTP a la API |
| [Pinia](https://pinia.vuejs.org/) | Manejo de estado |
| [Vue Router](https://router.vuejs.org/) | Enrutamiento |

## Funcionalidades

- Listado de productos con nombre, precio, stock y categoría.
- Formulario para registrar nuevos productos.
- Selección de categoría obtenida desde la API.
- Eliminación de productos.
- Validaciones básicas en el formulario (nombre requerido y precio mayor a cero).
- Mensajes de error centralizados mediante un interceptor de Axios.

## Requisitos previos

- **Node.js** `^22.18.0` o `>=24.12.0`
- **npm**
- La API de Laravel corriendo en `http://localhost:8088`

## Instalación

```sh
# Clonar el repositorio y entrar a la carpeta
cd vue-frontend

# Instalar dependencias
npm install
```

## Uso

### Entorno de desarrollo

```sh
npm run dev
```

La aplicación quedará disponible en la URL que indique Vite (por defecto `http://localhost:5173`).

### Compilar para producción

```sh
npm run build
```

### Previsualizar la versión de producción

```sh
npm run preview
```

## Configuración de la API

La URL base de la API se define en `src/api.js`:

```js
const api = axios.create({
  baseURL: 'http://localhost:8088/api',
})
```

Si el backend corre en otro puerto o dominio, modifica este valor.

### Endpoints utilizados

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `GET` | `/products` | Obtener todos los productos |
| `POST` | `/products` | Crear un producto |
| `DELETE` | `/products/{id}` | Eliminar un producto |
| `GET` | `/categories` | Obtener todas las categorías |

## Estructura del proyecto

```
vue-frontend/
├── public/               # Archivos estáticos
├── src/
│   ├── router/           # Configuración de Vue Router
│   ├── stores/           # Stores de Pinia
│   ├── api.js            # Cliente Axios configurado
│   ├── App.vue           # Componente raíz
│   ├── ProductsView.vue  # Vista principal de productos
│   ├── main.js           # Punto de entrada
│   └── style.css         # Estilos globales (Tailwind)
├── index.html
├── package.json
└── vite.config.js
```

## Autora

**Lucero Uzuriaga**
