const staffData = {
  "staff": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "position": "Manager",
      "department": "Sales"
    },
  ]
};

const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('results');

searchInput.addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  resultsList.innerHTML = '';

  const filteredStaff = staffData.staff.filter(staff => {
    return staff.firstName.toLowerCase().includes(searchTerm) || staff.lastName.toLowerCase().includes(searchTerm);
  });

  filteredStaff.forEach(staff => {
    const listItem = document.createElement('li');
    listItem.textContent = `${staff.firstName} ${staff.lastName} - ${staff.position}, ${staff.department}`;
    resultsList.appendChild(listItem);
  });
});