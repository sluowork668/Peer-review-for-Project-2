import { fetchAlgorithms } from './api.js';

function initializeUser() {
    const usernameInput = document.getElementById('username-input');
    const messageDiv = document.getElementById('username-message');
    
    function setupEditButton() {
        document.getElementById('edit-username-btn')?.addEventListener('click', () => {
            localStorage.removeItem('algolearn_user');
            usernameInput.disabled = false;
            usernameInput.focus();
            usernameInput.select();
            usernameInput.style.borderColor = 'var(--pink-primary)';
            messageDiv.textContent = 'Enter new name and press Enter';
            messageDiv.style.color = 'var(--pink-primary)';
            
            setupEnterKey();
        });
    }
    
    function saveUsername() {
        const username = usernameInput.value.trim();
        if (!username) return;
        
        const previousUser = localStorage.getItem('algolearn_user');
        localStorage.setItem('algolearn_user', username);
        usernameInput.disabled = true;
        usernameInput.style.borderColor = 'var(--success)';
        
        const message = previousUser 
            ? `✅ Username updated to ${username}!`
            : `✨ ${username} is now learning algorithms!`;
        
        messageDiv.innerHTML = `
            ${message}
            <button id="edit-username-btn" style="margin-left: 12px; padding: 4px 12px; background: var(--pink-primary); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 600;">
                ${previousUser ? 'Change' : 'Edit'}
            </button>
        `;
        messageDiv.style.color = 'var(--success)';
        messageDiv.style.fontWeight = '600';
        
        setupEditButton();
    }
    
    function setupEnterKey() {
        const handleEnter = (e) => {
            if (e.key === 'Enter') {
                saveUsername();
            }
        };
        usernameInput.removeEventListener('keypress', handleEnter);
        usernameInput.addEventListener('keypress', handleEnter);
    }
    
    const userId = localStorage.getItem('algolearn_user');
    
    if (!userId) {
        setupEnterKey();
    } else {
        usernameInput.value = userId;
        usernameInput.disabled = true;
        usernameInput.style.borderColor = 'var(--success)';
        
        messageDiv.innerHTML = `
            👋 Welcome back, ${userId}! 
            <button id="edit-username-btn" style="margin-left: 12px; padding: 4px 12px; background: var(--pink-primary); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 600;">
                Change
            </button>
        `;
        messageDiv.style.color = 'var(--pink-primary)';
        messageDiv.style.fontWeight = '600';
        
        setupEditButton();
    }
}
async function loadAlgorithms() {
    const grid = document.getElementById('algorithmGrid');
    try {
        const algorithms = await fetchAlgorithms();
        grid.innerHTML = algorithms.map(algo => `
            <div class="algorithm-card">
                <div class="difficulty-badge ${algo.difficulty}">${algo.difficulty}</div>
                <h3>${algo.name}</h3>
                <p class="description">${algo.description}</p>
                <div class="complexity-info">
                    <span>⏱️ ${algo.timeComplexity.average}</span>
                </div>
                <a href="visualizer.html?id=${algo._id}" class="btn-primary">
                    Visualize ✨
                </a>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load algorithms:', error);
        grid.innerHTML = '<div class="error">Failed to load algorithms 💔</div>';
    }
}

initializeUser();
loadAlgorithms();