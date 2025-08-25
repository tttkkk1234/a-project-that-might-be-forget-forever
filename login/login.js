// Function to populate the dropdown menu from localStorage
function populateDropdown() {
    const select = document.getElementById('school-select');
    const savedSchools = JSON.parse(localStorage.getItem('schools')) || []; // Retrieve schools from localStorage

    savedSchools.forEach(school => {
        const optionElement = document.createElement('option');
        optionElement.value = school;
        optionElement.textContent = school;
        select.appendChild(optionElement); // Add saved schools to the dropdown
    });
}

// Function to handle dropdown change
document.getElementById('school-select').addEventListener('change', function() {
    const select = this;
    const selectedValue = select.value;

    if (selectedValue === 'other') {
        const newOption = prompt('Nhập tên trường mới:');
        if (newOption) {
            const optionElement = document.createElement('option');
            optionElement.value = newOption;
            optionElement.textContent = newOption;
            select.appendChild(optionElement);
            select.value = newOption;

            // Save the new school to localStorage
            const savedSchools = JSON.parse(localStorage.getItem('schools')) || [];
            savedSchools.push(newOption);
            localStorage.setItem('schools', JSON.stringify(savedSchools));

            console.log('Added new school:', newOption);
        }
    } else {
        console.log('Selected school:', selectedValue);
    }
});

// Call the function to populate the dropdown at page load
populateDropdown();

