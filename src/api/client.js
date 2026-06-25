const API = 'http://127.0.0.1:5000'

export async function getMoons() {
    const response = await fetch(`${API}/moons`)
    return response.json()
}

export async function getMoon(id) {
    const response = await fetch(`${API}/moons/${id}`)
    return response.json()
}

export async function getMonstersByMoon(moonName) {
    const response = await fetch(`${API}/monsters?moon=${encodeURIComponent(moonName)}`)
    return response.json()
}

export async function getMonster(id) {
    const response = await fetch(`${API}/monsters/${id}`)
    return response.json()
}

export async function addMonster(data) {
    const response = await fetch(`${API}/monsters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return response.json()
}

export async function updateMonster(id, data) {
    const response = await fetch(`${API}/monsters/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return response.json()
}

export async function deleteMonster(id) {
    const response = await fetch(`${API}/monsters/${id}`, {
        method: 'DELETE'
    })
    return response.json()
}