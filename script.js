
const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "Error") {
        display.value = "0";
    }

    if (display.value === "0" && ![".", "+", "-", "*", "/", "%"].includes(value)) {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    display.value = display.value.slice(0, -1) || "0";
}

function calculate() {
    try {
        const expression = display.value;

        // Allow only calculator characters
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        const result = Function('"use strict"; return (' + expression + ')')();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        display.value = Number(result.toPrecision(12)).toString();

    } catch (error) {
        display.value = "Error";
    }
}
