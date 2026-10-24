<script setup lang="js">
import { onMounted, ref } from 'vue'
import { createData, deleteData, getData, updateData } from '../firebase/firebase-helper.js'

const PATH = 'tasks'

const tasks = ref([])
const newTask = ref('')
const error = ref('')

async function run(action) {
    error.value = ''
    try {
        return await action()
    } catch (e) {
        console.error(e)
        error.value = 'Could not reach the database. Please try again.'
        throw e
    }
}

onMounted(async () => {
    tasks.value = await run(() => getData(PATH)).catch(() => [])
})

async function addTask() {
    const text = newTask.value.trim()
    if (!text) return
    const id = await run(() => createData(PATH, { text, createdAt: Date.now() })).catch(() => null)
    if (!id) return
    tasks.value.push({ id, text })
    newTask.value = ''
}

const editingId = ref(null)
const editText = ref('')

function startEdit(task) {
    editingId.value = task.id
    editText.value = task.text
}

async function saveEdit(task) {
    const text = editText.value.trim()
    if (!text) return
    const ok = await run(() => updateData(PATH, task.id, { text })).then(() => true, () => false)
    if (!ok) return
    task.text = text
    editingId.value = null
}

function cancelEdit() {
    editingId.value = null
}

async function deleteTask(id) {
    const ok = await run(() => deleteData(PATH, id)).then(() => true, () => false)
    if (!ok) return
    tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<template>
    <main class="dashboard">
        <h2 class="title">Dashboard</h2>
        <p class="subtitle">Manage your tasks efficiently.</p>

        <!-- <section class="task-actions">
            <v-button class="btn-primary">Add Task</v-button>
            <v-button class="btn-secondary">View Tasks</v-button>
        </section> -->



        <form class="task-form" @submit.prevent="addTask">
            <textarea v-model="newTask" placeholder="Enter your task here..." rows="3" aria-label="New task"
                @keydown.enter.exact.prevent="addTask"></textarea>
            <button type="submit" class="btn-primary" :disabled="!newTask.trim()">Add Task</button>
        </form>

        <p v-if="error" class="error" role="alert">{{ error }}</p>


        <ul v-else class="task-list">
            <li v-for="task in tasks" :key="task.id" class="task-item">
                <template v-if="editingId === task.id">
                    <textarea v-model="editText" class="edit-input" rows="2" aria-label="Edit task"
                        @keydown.enter.exact.prevent="saveEdit(task)" @keydown.esc="cancelEdit"></textarea>
                    <div class="item-actions">
                        <button type="button" class="btn-save" @click="saveEdit(task)"
                            :disabled="!editText.trim()">Save</button>
                        <button type="button" class="btn-cancel" @click="cancelEdit">Cancel</button>
                    </div>
                </template>
                <template v-else>
                    <span class="task-text">{{ task.text }}</span>
                    <div class="item-actions">
                        <button type="button" class="btn-edit" @click="startEdit(task)"
                            :aria-label="`Edit ${task.text}`">Edit</button>
                        <button type="button" class="btn-delete" @click="deleteTask(task.id)"
                            :aria-label="`Delete ${task.text}`">Delete</button>
                    </div>
                </template>
            </li>
        </ul>


    </main>
</template>


<style>
.task-form {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    background-color: #f3f4f6;
    padding: 20px;
    border-radius: 12px;
}

.task-form textarea {
    flex: 1;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font: inherit;
    resize: vertical;
}

.task-form textarea:focus {
    outline: 2px solid #2563eb;
    border-color: transparent;
}

.btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.task-count {
    color: #6b7280;
    margin: 1.5rem 0 0.5rem;
}

.error {
    color: #dc2626;
    margin: 1rem 0;
}

.empty {
    text-align: center;
    color: #9ca3af;
    padding: 2rem 0;
}

.task-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-bottom: 8px;
    margin-top: 12px;
}

.task-text {
    flex: 1;
    white-space: pre-wrap;
    word-break: break-word;
}

.item-actions {
    display: flex;
    gap: 8px;
}

.edit-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #2563eb;
    border-radius: 6px;
    font: inherit;
    resize: vertical;
}

.btn-edit,
.btn-cancel,
.btn-save {
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 6px 12px;
    background: #fff;
    color: #374151;
    cursor: pointer;
}

.btn-edit:hover,
.btn-cancel:hover {
    background: #f3f4f6;
}

.btn-save {
    border-color: #1e40af;
    background: #2563eb;
    color: #fff;
}

.btn-save:hover {
    background: #1e40af;
}

.btn-save:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-delete {
    border: 1px solid #fca5a5;
    border-radius: 6px;
    padding: 6px 12px;
    background: #fff;
    color: #dc2626;
    cursor: pointer;
}

.btn-delete:hover {
    background: #dc2626;
    color: #fff;
}


.task-actions {
    display: flex;
    gap: 10px;
}

.dashboard {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.btn-primary {
    border: 1px solid #1e40af;
    border-radius: 8px;
    padding: 12px 20px;
    background: #2563eb;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
}

.btn-primary:hover {
    background: #1e40af;
    color: #fff;
}

.btn-secondary {
    margin-top: 20px;
    border: 1px solid #2563eb;
    border-radius: 8px;
    padding: 12px 20px;
    background: #fff;
    color: #2563eb;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
}

.btn-secondary:hover {
    background: #2563eb;
    color: #fff;
}

.title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
}

.subtitle {
    font-size: 1.2rem;
    color: #6b7280;
    margin-bottom: 2rem;
}
</style>