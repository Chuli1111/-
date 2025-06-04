const students = [];

const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");
const averageDiv = document.getElementById("average");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    let hasError = false;

    document.getElementById("errorName").textContent = "";
    document.getElementById("errorLastName").textContent = "";
    document.getElementById("errorGrade").textContent = "";

    if (!name) {
        document.getElementById("errorName").textContent = "El nombre es obligatorio.";
        hasError = true;
    }

    if (!lastName) {
        document.getElementById("errorLastName").textContent = "El apellido es obligatorio.";
        hasError = true;
    }

    if (isNaN(grade) || grade < 1 || grade > 7) {
        document.getElementById("errorGrade").textContent = "La nota debe estar entre 1 y 7.";
        hasError = true;
    }

    if (hasError) return;

    const student = { name, lastName, grade };
    students.push(student);
    refreshTable();
    calcularPromedio();
    this.reset();
});

function addStudentToTable(student, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td>
            <button onclick="editStudent(${index})">Editar</button>
            <button onclick="deleteStudent(${index})">Eliminar</button>
        </td>
    `;
    tableBody.appendChild(row);
}

function refreshTable() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => addStudentToTable(student, index));
}

function calcularPromedio() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso: N/A";
        return;
    }

    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const prom = total / students.length;
    averageDiv.textContent = "Promedio General del Curso: " + prom.toFixed(2);
}

function deleteStudent(index) {
    students.splice(index, 1);
    refreshTable();
    calcularPromedio();
}

function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;

    deleteStudent(index); // quita el antiguo para que el nuevo lo reemplace
}