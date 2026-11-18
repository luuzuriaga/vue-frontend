<script setup>
import { ref, onMounted } from 'vue';
import api from './api'; // Adjust the import path according to your project structure

const products = ref([])
const categories = ref([])
const loading = ref(false)
const error = ref('')
const form = ref({
  name: '',
  price: '',
  stock: 0,
  category_id: ''
})

async function loadProducts() {
  loading.value = true
  const res = await api.get('/products')
  products.value = res.data.data
  loading.value = false
}

onMounted(async () => {
  await loadProducts()
  const res = await api.get('/categories')
  categories.value = res.data.data
})

async function save(){
    error.value = ''
    if (!form.value.name) return(error.value = 'El nombre es requerido.')
    if (!form.value.price) return(error.value = 'El precio debe ser mayor a cero.')
    if (!form.value.id) await api.post('/products', form.value)
    form.value = { name: '', price: '', stock: 0, category_id: '' }
    load()
        
    }
async function remove(id){
    await api.delete(`/products/${id}`)
    load()
}

</script>

<template>
    <div class="max-w-3xl mx-auto p-6">
        <h1 class="text-3xl font-bold text-blue-600 mb-6">Productos</h1>
        <form @submit.prevent="save" class="bg-white shadow rounded-lg p-4 mb-6 grid  grid-cols-2 gap-3">
        <input v-model="form.name" placeholder="Nombre" class="border rounded px-3 py-2"/>
        <input v-model="form.price" type="number" placeholder="Precio" class="border rounded px-3 py-2"/>
        <input v-model="form.stock" type="number" placeholder="Stock" class="border rounded px-3 py-2"/>
        <select v-model="form.category_id" class="border rounded px-3 py-2">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Guardar</button>
        <p v-if="error" style="color: red;" class="col-span-2">{{ error }}</p>
        </form>
        <p v-if="loading" class="text-gray-500">Cargando productos...</p>
        <ul v-else class="bg-white shadow rounded-lg p-4">
            <li v-for="product in products" :key="product.id" class="flex justify-between items-center border-b py-2">
                {{ product.name }} - {{ product.price }} - {{ product.stock }} - {{ product.category?.name}}
                <button @click="form = { ...product }" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded">Editar</button>
                <button @click="remove(product.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Eliminar</button>
            </li>
        </ul>
       
       
    </div>
</template>
