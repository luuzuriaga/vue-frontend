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
    <div>
        <h1>Productos</h1>
        <form @submit.prevent="save">
        <input v-model="form.name" placeholder="Nombre" />
        <input v-model="form.price" type="number" placeholder="Precio" />
        <input v-model="form.stock" type="number" placeholder="Stock" />
        <select v-model="form.category_id">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <button type="submit">Guardar</button>
        <p v-if="error" style="color: red;">{{ error }}</p>
        </form>
        <p v-if="loading">Cargando productos...</p>
        <ul v-else>
            <li v-for="product in products" :key="product.id">
                {{ product.name }} - {{ product.price }} - {{ product.stock }} - {{ product.category?.name}}
                <button @click="form = { ...product }">Editar</button>
                <button @click="remove(product.id)">Eliminar</button>
            </li>
        </ul>
       
       
    </div>
</template>
