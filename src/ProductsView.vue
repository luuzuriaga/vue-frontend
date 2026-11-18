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
    <div class="page">
        <header class="page-header">
            <h1>Productos</h1>
            <p class="subtitle">Administra tu inventario</p>
        </header>

        <form @submit.prevent="save" class="card form">
            <input v-model="form.name" placeholder="Nombre" class="field"/>
            <input v-model="form.price" type="number" placeholder="Precio" class="field"/>
            <input v-model="form.stock" type="number" placeholder="Stock" class="field"/>
            <select v-model="form.category_id" class="field">
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <button class="btn btn-primary" type="submit">Guardar</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>

        <p v-if="loading" class="loading">Cargando productos...</p>
        <ul v-else class="card list">
            <li v-for="product in products" :key="product.id" class="item">
                <div class="item-info">
                    <span class="item-name">{{ product.name }}</span>
                    <span class="item-meta">
                        <span class="price">S/ {{ product.price }}</span>
                        <span class="stock">Stock: {{ product.stock }}</span>
                        <span v-if="product.category?.name" class="badge">{{ product.category?.name }}</span>
                    </span>
                </div>
                <div class="item-actions">
                    <button @click="form = { ...product }" class="btn btn-edit">Editar</button>
                    <button @click="remove(product.id)" class="btn btn-delete">Eliminar</button>
                </div>
            </li>
        </ul>
    </div>
</template>
