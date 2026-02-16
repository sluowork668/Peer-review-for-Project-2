const API_BASE = 'http://localhost:3000/api';

export async function fetchAlgorithms() {
    const response = await fetch(`${API_BASE}/algorithms`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
}

export async function fetchAlgorithmById(id) {
    const response = await fetch(`${API_BASE}/algorithms/${id}`);
    if (!response.ok) throw new Error('Not found');
    return await response.json();
}