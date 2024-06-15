document.getElementById('editButton').addEventListener('click', function() {
    document.getElementById('usernameInput').disabled = false;
    document.getElementById('fullname').disabled = false;
    document.getElementById('email').disabled = false;
    document.getElementById('password').disabled = false;
    document.getElementById('editButton').style.display = 'none';
    document.getElementById('editButtons').classList.remove('hidden');
});

document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('usernameInput').disabled = true;
    document.getElementById('fullname').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('password').disabled = true;
    document.getElementById('editButton').style.display = 'block';
    document.getElementById('editButtons').classList.add('hidden');
    restoreOriginalValues();
});

document.getElementById('saveButton').addEventListener('click', function() {
    // Here you can add validation if needed

    // After validation, update the displayed values and disable input fields
    document.getElementById('profileUsername').textContent = document.getElementById('usernameInput').value;

    document.getElementById('usernameInput').disabled = true;
    document.getElementById('fullname').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('password').disabled = true;
    document.getElementById('editButton').style.display = 'block';
    document.getElementById('editButtons').classList.add('hidden');
});

document.getElementById('showPassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.textContent = 'Hide';
    } else {
        passwordField.type = 'password';
        this.textContent = 'Show';
    }
});

function restoreOriginalValues() {
    // If you have original values to restore, do it here
    // For this example, let's assume you store original values before editing
    document.getElementById('usernameInput').value = originalValues.username;
    document.getElementById('fullname').value = originalValues.fullname;
    document.getElementById('email').value = originalValues.email;
    document.getElementById('password').value = originalValues.password;
}

// Storing original values (add this code before enabling editing, such as in edit button click handler)
const originalValues = {
    username: document.getElementById('usernameInput').value,
    fullname: document.getElementById('fullname').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
};
