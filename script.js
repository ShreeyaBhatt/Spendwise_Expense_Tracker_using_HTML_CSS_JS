// Fetch expenses and debts from localStorage 
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let debts = JSON.parse(localStorage.getItem("debts")) || [];

// Save expenses and debts to localStorage
function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("debts", JSON.stringify(debts));
}

// Update total expenses and debts
function updateTotals() {
    let totalExpense = expenses.reduce((sum, item) => item ? sum + Number(item.amount) : sum, 0);
    let totalDebt = debts.reduce((sum, item) => item ? sum + Number(item.amount) : sum, 0);

    document.getElementById("totalExpense").innerText = "₹" + totalExpense;
    document.getElementById("totalDebt").innerText = "₹" + totalDebt;
}

// Display all expenses
function displayExpenses() {
    let table = document.getElementById("expenseTable");
    table.innerHTML = "";

    expenses.forEach((item, index) => {
        if (item) {
            table.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>₹${item.amount}</td>
                    <td>${item.date}</td>
                    <td>${item.category ? item.category : "-"}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button></td>
                </tr>
            `;
        }
    });

    updateTotals();
}

// Display all debts
function displayDebts() {
    let table = document.getElementById("debtTable");
    table.innerHTML = "";

    debts.forEach((item, index) => {
        if (item) {
            table.innerHTML += `
                <tr>
                    <td>${item.person}</td>
                    <td>₹${item.amount}</td>
                    <td>${item.date ? item.date : "-"}</td>
                    <td>${item.type ? item.type : "-"}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="deleteDebt(${index})">Delete</button></td>
                </tr>
            `;
        }
    });

    updateTotals();
}

// Add new expense
function addExpense() {
    let name = document.getElementById("expenseName").value;
    let amount = document.getElementById("expenseAmount").value;
    let date = document.getElementById("expenseDate").value;
    let category = document.getElementById("expenseCategory").value;

    if (!name || !amount || !date || !category) {
        alert("Please fill all fields");
        return;
    }

    let selectedDate = new Date(date);
    let today = new Date();
    today.setHours(0,0,0,0);

    if (selectedDate > today) {
        alert("Future date not allowed");
        return;
    }

    expenses.push({ name, amount, date, category });
    saveData();
    displayExpenses();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseDate").value = "";
    document.getElementById("expenseCategory").value = "";
}

// Add new debt
function addDebt() {
    let person = document.getElementById("debtPerson").value;
    let amount = document.getElementById("debtAmount").value;
    let date = document.getElementById("debtDate").value;
    let type = document.getElementById("debtType").value;

    if (!person || !amount || !date || !type) {
        alert("Please fill all fields");
        return;
    }

    let selectedDate = new Date(date);
    let today = new Date();
    today.setHours(0,0,0,0);

    if (selectedDate > today) {
        alert("Future date not allowed");
        return;
    }

    debts.push({ person, amount, date, type });
    saveData();
    displayDebts();

    document.getElementById("debtPerson").value = "";
    document.getElementById("debtAmount").value = "";
    document.getElementById("debtDate").value = "";
    document.getElementById("debtType").value = "";
}

// Delete a particular expense
function deleteExpense(index) {
    expenses[index] = null;  // mark as deleted
    saveData();
    displayExpenses();
}

// Delete a particular debt
function deleteDebt(index) {
    debts[index] = null;  // mark as deleted
    saveData();
    displayDebts();
}

// Initial display on page load
displayExpenses();
displayDebts();