const cells = Array.from(document.querySelectorAll(".cell"));
const announcement = document.querySelector(".announcement");
const winnerSpan = document.getElementById("winner");
const resetButton = document.getElementById("reset-button");

let curSign = "X";

const combs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const handleResult = () => {
    // Check all combination to see if there is a winner
    for (const [a, b, c] of combs){
        const one = cells[a].innerText;
        const two = cells[b].innerText;
        const three = cells[c].innerText;
        if (one && one == two && two == three) return one;
    }
}

const announceWinner = (winner) => {
    announcement.classList.toggle("announcement-active");
    winnerSpan.innerText = winner;
}

const handleClick = (e) => {
    const cell = e.target;
    if (cell.innerText == "X" || cell.innerText == "O") return; 
    const index = +cell.attributes["data-index"].nodeValue;
    cell.innerText = curSign;
    curSign = curSign === "X" ? "O" : "X";
    const winner = handleResult();
    if (winner) announceWinner(winner);
}

const reset = (e) => {
    announcement.classList.toggle("announcement-active");
    for (const cell of cells){
        cell.innerText = null;
    }
}

resetButton.onclick = reset;

cells.forEach(cell => {
    cell.onclick = handleClick;
})