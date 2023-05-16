const contactForm = document.querySelector('#contact-form');
const contactTable = document.querySelector('#contact-table tbody');

window.addEventListener('load', loadContacts);

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = contactForm.elements['name'].value;
    const phone = contactForm.elements['phone'].value;
    addContact(name, phone);
    contactForm.reset();
});

contactTable.addEventListener('click', (event) => {
    const button = event.target;
    if (button.classList.contains('edit')) {
        const row = button.closest('tr');
        const id = row.dataset.id;
        const name = row.querySelector('.name').textContent;
        const phone = row.querySelector('.phone').textContent;
        editContact(id, name, phone);
    } else if (button.classList.contains('delete')) {
        const row = button.closest('tr');
        const id = row.dataset.id;
        deleteContact(id);
    }
});

function loadContacts() {
    fetch('contacts.php')
        .then(response => response.json())
        .then(data => {
            for (const contact of data) {
                const row = createRow(contact.id, contact.name, contact.phone);
                contactTable.appendChild(row);
            }
        });
}

function addContact(name, phone) {
    fetch('add_contact.php', {
        method: 'POST',
        body: JSON.stringify({ name, phone })
    })
        .then(response => response.json())
        .then(data => {
            const row = createRow(data.id, name, phone);
            contactTable.appendChild(row);
        });
}

function editContact(id, name, phone) {
    const newName = prompt('Enter new name:', name);
    const newPhone = prompt('Enter new phone number:', phone);
    if (newName !== null && newPhone !== null) {
        fetch('edit_contact.php', {
            method: 'POST',
            body: JSON.stringify({ id, name: newName, phone: newPhone })
        })
            .then(response => response.json())
            .then(data => {
                const row = createRow(id, newName, newPhone);
                const oldRow = document.querySelector(`tr[data-id="${id}"]`);
                contactTable.replaceChild(row, oldRow);
            });
    }
}

function deleteContact(id) {
    if (confirm('Are you sure you want to delete this contact?')) {
        fetch('delete_contact.php', {
            method: 'POST',
            body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(data => {
                const row = document.querySelector(`tr[data-id="${id}"]`);
                row.remove();
            });
    }
}

function createRow(id, name, phone) {
    const row = document.createElement('tr');
    row.dataset.id = id;
    row.innerHTML = `
        <td class="name">${name}</td>
        <td class="phone">${phone}</td>
        <td class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </td>
    `;
    return row;
}