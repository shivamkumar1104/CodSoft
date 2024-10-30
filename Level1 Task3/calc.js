// calc.js
window.onload = function() {
    const display = document.querySelector('[name="display"]'); // Get the display input field
    let previousValue = ''; // To store the previous value
    let currentValue = ''; // To store the current value
    let operator = ''; // To store the selected operator

    // Function to update the display
    const updateDisplay = (value) => {
        display.value = value;
    };

    // Function to append a number or operator to the current value
    const appendToDisplay = (value) => {
        if (['+', '-', '*', '/'].includes(value)) {
            // If an operator is pressed, store the current value as the previous value
            if (currentValue) {
                previousValue = currentValue;
                operator = value;
                currentValue = ''; // Clear the current value to accept the next number
                updateDisplay(previousValue + ' ' + operator); // Show the first value and operator
            }
        } else {
            currentValue += value; // Append number to the current value
            updateDisplay(previousValue + ' ' + operator + ' ' + currentValue); // Show both values
        }
    };

    // Function to clear the display and reset variables
    const clearDisplay = () => {
        previousValue = '';
        currentValue = '';
        operator = '';
        updateDisplay(''); // Clear display
    };

    // Function to delete the last character in the current value
    const deleteLast = () => {
        currentValue = currentValue.slice(0, -1); // Delete last character of current value
        updateDisplay(previousValue + ' ' + operator + ' ' + currentValue); // Update display
    };

    // Function to calculate the result
    const calculateResult = () => {
        if (previousValue && currentValue && operator) {
            try {
                const result = eval(previousValue + operator + currentValue); // Evaluate the expression
                updateDisplay(result); // Display the result
                previousValue = result; // Store result as the previous value for further calculations
                currentValue = ''; // Reset current value
                operator = ''; // Reset operator
            } catch (error) {
                updateDisplay('Error'); // Display error for invalid expressions
            }
        }
    };

    // Event listener for all buttons
    document.querySelectorAll('input[type="button"]').forEach(button => {
        button.addEventListener('click', function() {
            const value = this.value;

            if (value === 'AC') {
                clearDisplay(); // Clear all
            } else if (value === 'Del') {
                deleteLast(); // Delete last character
            } else if (value === '=') {
                calculateResult(); // Calculate result
            } else {
                appendToDisplay(value); // Append value to display
            }
        });
    });
};
