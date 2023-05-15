      const form = document.querySelector('form');
      const tableBody = document.querySelector('tbody');
      let editingRow = null;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        if (!editingRow) {
          const newRow = document.createElement('tr');
          const nameCell = document.createElement('td');
          nameCell.textContent = name;
          const phoneCell = document.createElement('td');
          phoneCell.textContent = phone;
          const actionsCell = document.createElement('td');
          const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
      editBtn.classList.add('edit-btn');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');
      actionsCell.append(editBtn);
      actionsCell.append(deleteBtn);
      newRow.append(nameCell, phoneCell, actionsCell);
      tableBody.append(newRow);
      editBtn.addEventListener('click', () => {
        document.getElementById('name').value = nameCell.textContent;
        document.getElementById('phone').value = phoneCell.textContent;
        editingRow = newRow;
      });
      deleteBtn.addEventListener('click', () => {
        newRow.remove();
      });
    } else {
      editingRow.children[0].textContent = name;
      editingRow.children[1].textContent = phone;
      document.getElementById('name').value = '';
      document.getElementById('phone').value = '';
      editingRow = null;
    }
  });