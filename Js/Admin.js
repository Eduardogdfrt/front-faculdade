document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var span = document.getElementsByClassName("close")[0];
    var clearAllBtn = document.getElementById("clearAllBtn");

    btn.onclick = function() {
        modal.style.display = "flex";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.getElementById('addRowForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var email = document.getElementById('email').value;
        var nome = document.getElementById('nome').value;
        var id = generateUniqueId();
        var data = new Date().toLocaleString();

        addDataToTable(id, email, nome, data);
        saveDataToLocalStorage(id, email, nome, data);
        document.getElementById('addRowForm').reset();
        modal.style.display = "none";
    });

    // Event listener for the clear button to reset the form fields
    document.getElementById('clearButton').addEventListener('click', function() {
        document.getElementById('addRowForm').reset();
    });

    // Function to load users from Local Storage and add to the table
    function loadUsersFromLocalStorage() {
        var storedData = JSON.parse(localStorage.getItem('admin')) || [];
        storedData.forEach(function(user) {
            addDataToTable(user.id, user.email, user.nome, user.data);
        });
    }

    // Function to add data to the table
    function addDataToTable(id, email, nome, data) {
        var table = document.getElementById('dynamicTable').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();
        
        var cell0 = newRow.insertCell(0);
        var cell1 = newRow.insertCell(1);
        var cell2 = newRow.insertCell(2);
        var cell3 = newRow.insertCell(3);
        var cell4 = newRow.insertCell(4);
        
        cell0.textContent = id;
        cell1.textContent = email;
        cell2.textContent = nome;
        cell3.textContent = data;
        cell4.innerHTML = '<button class="deleteBtn">Excluir</button>';

        // Add click event to delete button
        cell4.querySelector('.deleteBtn').addEventListener('click', function() {
            deleteUser(id, newRow);
        });
    }

    // Function to save data to Local Storage
    function saveDataToLocalStorage(id, email, nome, data) {
        var storedData = JSON.parse(localStorage.getItem('admin')) || [];
        var newUser = {
            id: id,
            email: email,
            nome: nome,
            data: data
        };
        storedData.push(newUser);
        localStorage.setItem('admin', JSON.stringify(storedData));
    }

    // Function to delete a user
    function deleteUser(id, row) {
        var storedData = JSON.parse(localStorage.getItem('admin')) || [];
        var updatedData = storedData.filter(function(user) {
            return user.id !== id;
        });
        localStorage.setItem('admin', JSON.stringify(updatedData));
        row.remove();
    }

    // Function to clear all users
    function clearAllUsers() {
        localStorage.removeItem('admin');
        var table = document.getElementById('dynamicTable').getElementsByTagName('tbody')[0];
        var rows = table.getElementsByTagName('tr');
        var rowCount = rows.length;

        // Remove all rows from the table except the header
        for (var i = rowCount - 1; i >= 0; i--) {
            table.deleteRow(i);
        }
    }

    // Function to generate a unique ID
    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 16);
    }

    // Function to filter the table
    function filterTable() {
        var input = document.getElementById('searchInput');
        var filter = input.value.toLowerCase();
        var table = document.getElementById('dynamicTable');
        var tr = table.getElementsByTagName('tr');

        for (var i = 1; i < tr.length; i++) {
            var td = tr[i].getElementsByTagName('td')[2]; // Column for name
            if (td) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    // Add input event to search field
    document.getElementById('searchInput').addEventListener('input', filterTable);

    // Add click event to clear all users button
    clearAllBtn.addEventListener('click', clearAllUsers);

    loadUsersFromLocalStorage();
  });