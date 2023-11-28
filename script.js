createDesks('gridContainer', 13);

function createDesks(containerId, count) {
    const gridContainer = document.getElementById(containerId);
    const createDesk = (parent, i) => {
        const desk = document.createElement('div');
        desk.classList.add('desk');

        for (let j = 0; j < 2; j++) {
            const student = document.createElement('div');
            student.classList.add('student');

            const studentName = document.createElement('div');
            studentName.classList.add('student-name', j === 0 ? 'top-name' : 'bottom-name');
            studentName.textContent = `Имя${i * 2 + j + 1}`;
            studentName.onclick = () => changeStudentName(studentName);

            desk.appendChild(student);
            desk.appendChild(studentName);
        }

        parent.appendChild(desk);
    };

    const leftDesks = document.createElement('div');
    leftDesks.classList.add('left-desks');
    gridContainer.appendChild(leftDesks);

    const rightDesks = document.createElement('div');
    rightDesks.classList.add('right-desks');
    gridContainer.appendChild(rightDesks);

    for (let i = 0; i < count; i++) {
        createDesk(i < 7 ? leftDesks : rightDesks, i);
    }

    loadNamesFromLocalStorage();
}

async function changeStudentName(clickedElement) {
    const currentName = clickedElement.textContent;
    clickedElement.textContent = '';

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = currentName;

    inputElement.addEventListener('blur', async () => {
        clickedElement.textContent = inputElement.value;
        saveNamesToLocalStorage();
        // await updateCountLabel();
    });

    clickedElement.appendChild(inputElement);
    inputElement.focus();
}

function saveNamesToLocalStorage() {
    const names = Array.from(document.querySelectorAll('.student-name')).map(element => element.textContent);
    localStorage.setItem('savedNames', JSON.stringify(names));
}

function loadNamesFromLocalStorage() {
    const savedNames = localStorage.getItem('savedNames');
    if (savedNames) {
        const names = JSON.parse(savedNames);
        document.querySelectorAll('.student-name').forEach((element, index) => {
            element.textContent = names[index];
        });
    }
}

async function randomizeStudents() {
    const studentNameElements = document.querySelectorAll('.student-name');
    const shuffledNames = shuffle(Array.from(studentNameElements).map(element => element.textContent));

    studentNameElements.forEach((element, index) => {
        element.textContent = shuffledNames[index];
    });

    saveNamesToLocalStorage();
    // await updateCountLabel();
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}
