import { get, push, ref, remove, set, update } from 'firebase/database'
import { database } from './firebase.js'

export async function getData(path) {
    const snapshot = await get(ref(database, path))
    const data = snapshot.val() ?? {}


    console.log({ data })


    return Object.entries(data).map(([id, value]) => ({
        ...value,
        id
    }))
}

export async function createData(path, data) {
    const dataReference = push(ref(database, path))
    var response = await set(dataReference, data)
    console.log({ response })
    return dataReference.key
}
export async function updateData(path, id, changes) {
    var response = await update(ref(database, `${path}/${id}`), changes)
    console.log({ response })
    return response
}
export async function deleteData(path, id) {
    var response = await remove(ref(database, `${path}/${id}`))
    console.log({ response })
    return response
}
