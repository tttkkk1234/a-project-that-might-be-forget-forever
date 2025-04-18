document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("dropdown");

    fetch('http://127.0.0.1:5501/get-options')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(options => {
            options.forEach(option => {
                const newOption = document.createElement("option");
                newOption.value = option;
                newOption.textContent = option;
                dropdown.appendChild(newOption);
            });
        })
        .catch(error => {
            console.error('Error fetching options:', error);
        });
});

document.getElementById("addButton").addEventListener("click", () => {
    const dropdown = document.getElementById("dropdown");
    const newOptionValue = prompt("Enter a new option:").trim();

    if (!newOptionValue) {
        alert("No option entered.");
        return;
    }

    const newOption = document.createElement("option");
    newOption.value = newOptionValue;
    newOption.textContent = newOptionValue;
    dropdown.appendChild(newOption);

    fetch('http://127.0.0.1:5501/save-option', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ option: newOptionValue }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(`Option saved successfully: ${data.message}`);
        })
        .catch(error => {
            console.error('Error saving option:', error);
            alert('Failed to save the option. Please try again.');
        });
});