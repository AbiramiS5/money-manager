let type = "income";

let data = JSON.parse(localStorage.getItem("moneyData")) || [];

function openForm(t) {
    type = t;
    document.getElementById("popup").classList.remove("hidden");
    document.getElementById("formTitle").innerText =
        t === "income" ? "Add Income" : "Add Expense";
}

function closeForm() {
    document.getElementById("popup").classList.add("hidden");
    clearForm();
}

function clearForm() {
    document.getElementById("amount").value = "";
    document.getElementById("desc").value = "";
}

function addEntry() {
    const amount = Number(document.getElementById("amount").value);
    const desc = document.getElementById("desc").value;
    const category = document.getElementById("category").value;
    const division = document.getElementById("division").value;

    if (!amount || !desc) {
        alert("Please fill all fields");
        return;
    }

    const entry = {
        type,
        amount,
        desc,
        category,
        division,
        date: new Date().toLocaleDateString()
    };

    data.push(entry);
    localStorage.setItem("moneyData", JSON.stringify(data));

    closeForm();
    render();
}

function render() {
    const history = document.getElementById("history");
    history.innerHTML = "";

    let income = 0, expense = 0;

    data.forEach(e => {
        if (e.type === "income") income += e.amount;
        else expense += e.amount;

        const li = document.createElement("li");
        li.innerText = `${e.date} | ${e.desc} | ₹${e.amount} | ${e.category} | ${e.division}`;
        history.appendChild(li);
    });
    let balance = 0;

function updateBalance(amount, type) {
    if (type === 'income') {
        balance += amount;
    } else if (type === 'expense') {
        balance -= amount;
    }
    document.getElementById('balance').innerText = balance;
}

    document.getElementById("incomeTotal").innerText = income;
    document.getElementById("expenseTotal").innerText = expense;
}


render();

