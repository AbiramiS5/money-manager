let balance = 0;

// Load history from localStorage (optional)
let historyData = JSON.parse(localStorage.getItem("moneyHistory")) || [];

function updateBalance() {
    document.getElementById("balance").innerText = balance;
}

function updateHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";
    historyData.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.description} : ₹${item.amount} (${item.type})
            <button onclick="deleteEntry(${index})">X</button>
        `;
        li.style.color = item.type === "income" ? "green" : "red";
        historyList.appendChild(li);
    });
}

function saveHistory() {
    localStorage.setItem("moneyHistory", JSON.stringify(historyData));
}

function addIncome() {
    const desc = document.getElementById("description").value;
    const amt = Number(document.getElementById("amount").value);

    if (!desc || amt <= 0) {
        alert("Enter valid description and amount");
        return;
    }

    balance += amt;
    historyData.push({ description: desc, amount: amt, type: "income" });

    updateBalance();
    updateHistory();
    saveHistory();
    clearInputs();
}

function addExpense() {
    const desc = document.getElementById("description").value;
    const amt = Number(document.getElementById("amount").value);

    if (!desc || amt <= 0) {
        alert("Enter valid description and amount");
        return;
    }

    balance -= amt;
    historyData.push({ description: desc, amount: amt, type: "expense" });

    updateBalance();
    updateHistory();
    saveHistory();
    clearInputs();
}

function deleteEntry(index) {
    const item = historyData[index];
    if (item.type === "income") balance -= item.amount;
    else balance += item.amount;

    historyData.splice(index, 1);
    updateBalance();
    updateHistory();
    saveHistory();
}

function clearInputs() {
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

// Initialize
updateBalance();
updateHistory();


