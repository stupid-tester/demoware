// Load phone numbers from localStorage when the script starts.
// We get the stored string, parse it from JSON, and create a new Set from the resulting array.
// If there's nothing in localStorage, we start with an empty Set.
const enteredPhoneNumbers = new Set(JSON.parse(localStorage.getItem('phoneNumbers')) || []);

/**
 * Saves the current Set of phone numbers to the browser's localStorage.
 * The Set is first converted to an array and then to a JSON string for storage.
 */
function saveNumbersToLocalStorage() {
    localStorage.setItem('phoneNumbers', JSON.stringify(Array.from(enteredPhoneNumbers)));
}

/**
 * Handles the import of a new phone number.
 */
function importNumber() {
    // Get the input and message elements from the HTML.
    const phoneInput = document.getElementById('phoneNumber');
    const messageElement = document.getElementById('message');

    // Get the value from the input and trim whitespace.
    const phoneNumber = phoneInput.value.trim();

    // Check if the input is empty.
    if (phoneNumber === '') {
        messageElement.textContent = 'Vui lòng nhập số điện thoại.';
        messageElement.className = 'error';
        return;
    }

    // Check if the phone number already exists in our Set.
    if (enteredPhoneNumbers.has(phoneNumber)) {
        // If it exists, display a duplicate message.
        messageElement.textContent = 'Số điện thoại này đã được nhận thưởng, không nhận lại.';
        messageElement.className = 'error';
    } else {
        // If it's a new number, add it to the Set.
        enteredPhoneNumbers.add(phoneNumber);

        // Save the updated Set to localStorage.
        saveNumbersToLocalStorage();

        // Display a success message.
        messageElement.textContent = 'Số điện thoại này sẽ được nhận thưởng.';
        messageElement.className = 'success';
    }

    // Clear the input field for the next entry.
    phoneInput.value = '';
}
