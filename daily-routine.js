
function displayDate() {
    const dateElement = document.getElementById('currentDate');
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('.routine-checkbox');
    const checkedBoxes = document.querySelectorAll('.routine-checkbox:checked');
    
    const total = checkboxes.length;
    const completed = checkedBoxes.length;
    const percentage = (completed / total) * 100;
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = `${completed}/${total}`;
    
    saveState();
}

function saveState() {
    const checkboxes = document.querySelectorAll('.routine-checkbox');
    const state = {};
    
    checkboxes.forEach(checkbox => {
        state[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('dailyRoutineState', JSON.stringify(state));
    localStorage.setItem('dailyRoutineDate', new Date().toDateString());
}


function loadState() {
    const savedDate = localStorage.getItem('dailyRoutineDate');
    const today = new Date().toDateString();
    
   
    if (savedDate !== today) {
        localStorage.removeItem('dailyRoutineState');
        localStorage.removeItem('dailyRoutineDate');
        return;
    }
    
    const savedState = localStorage.getItem('dailyRoutineState');
    if (savedState) {
        const state = JSON.parse(savedState);
        
        Object.keys(state).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = state[id];
            }
        });
    }
    
    updateProgress();
}

function resetAll() {
    if (confirm('Are you sure you want to reset all tasks?')) {
        const checkboxes = document.querySelectorAll('.routine-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        updateProgress();
    }
}


function init() {
    displayDate();
    loadState();
    
    const checkboxes = document.querySelectorAll('.routine-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', resetAll);
}

document.addEventListener('DOMContentLoaded', init);
