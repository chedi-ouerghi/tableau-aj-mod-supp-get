// index.js
class StudentManager {
    constructor() {
        this.students = [];
        this.loadStudents();
        this.generateTable();
    }

    loadStudents() {
        const storedStudents = JSON.parse(localStorage.getItem('students'));
        this.students = storedStudents ? storedStudents : [];
    }

    generateTable() {
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';
        this.students.forEach((student, index) => {
            const moyenneGenerale = (student.noteMoy1 + student.noteMoy2) / 2;
            const row = `
                <tr>
                    <td>${student.nom}</td>
                    <td>${student.prenom}</td>
                    <td>${student.noteMoy1}</td>
                    <td>${student.noteMoy2}</td>
                    <td>${moyenneGenerale}</td>
                    <td>
                        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editModal" onclick="studentManager.editStudent(${index})">Modifier</button>
                        <button class="btn btn-danger" onclick="studentManager.deleteStudent(${index})">Supprimer</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }
   ajoutStudent() {
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const noteMoy1 = parseFloat(document.getElementById('noteMoy1').value);
        const noteMoy2 = parseFloat(document.getElementById('noteMoy2').value);

        if (nom && prenom && !isNaN(noteMoy1) && !isNaN(noteMoy2)) {
            const student = {
                nom: nom,
                prenom: prenom,
                noteMoy1: noteMoy1,
                noteMoy2: noteMoy2,
            };
            this.students.push(student);
            localStorage.setItem('students', JSON.stringify(this.students));
            this.generateTable();
            $('#addModal').modal('hide');
        } else {
            alert('Veuillez remplir tous les champs avec des valeurs valides.');
        }

        this.resetForm();
    }

    resetForm() {
        document.getElementById('addForm').reset();
    }

    editStudent(index) {
        const selectedStudent = this.students[index];
        document.getElementById('edit-nom').value = selectedStudent.nom;
        document.getElementById('edit-prenom').value = selectedStudent.prenom;
        document.getElementById('edit-noteMoy1').value = selectedStudent.noteMoy1;
        document.getElementById('edit-noteMoy2').value = selectedStudent.noteMoy2;

        const editForm = document.getElementById('editForm');
        editForm.onsubmit = (e) => {
            e.preventDefault();
            const updatedStudent = {
                nom: document.getElementById('edit-nom').value,
                prenom: document.getElementById('edit-prenom').value,
                noteMoy1: parseFloat(document.getElementById('edit-noteMoy1').value),
                noteMoy2: parseFloat(document.getElementById('edit-noteMoy2').value),
            };
            this.students[index] = updatedStudent;
            localStorage.setItem('students', JSON.stringify(this.students));
            this.generateTable();
            $('#editModal').modal('hide');
        };
    }

    deleteStudent(index) {
        this.students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(this.students));
        this.generateTable();
        alert('L\'étudiant a été supprimé');
    }
}

const studentManager = new StudentManager();
