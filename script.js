const calendarContainer = document.getElementById('calendar');
const yearHeader = document.getElementById('year');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentYear = new Date().getFullYear();

const specialDates = {
    '01-26': 'Republic Day',
    '08-15': 'Independence Day',
    '10-02': 'Gandhi Jayanti',
    '12-25': 'Christmas'
};

function generateCalendar(year) {
    calendarContainer.innerHTML = '';
    yearHeader.textContent = year;

    for (let month = 0; month < 12; month++) {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');
        const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
        monthDiv.innerHTML = `<h2>${monthName}</h2>`;
        
        const table = document.createElement('table');
        table.classList.add('calendar-table');

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let row = document.createElement('tr');
        for (let i = 0; i < firstDay; i++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if (row.children.length === 7) {
                tbody.appendChild(row);
                row = document.createElement('tr');
            }

            const cell = document.createElement('td');
            const dateStr = `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            cell.textContent = day;
            if (specialDates[dateStr]) {
                cell.classList.add('special-date');
                cell.title = specialDates[dateStr];
            }
            row.appendChild(cell);
        }

        while (row.children.length < 7) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }

        tbody.appendChild(row);
        table.appendChild(tbody);
        monthDiv.appendChild(table);
        calendarContainer.appendChild(monthDiv);
    }
}

prevButton.addEventListener('click', () => {
    currentYear--;
    generateCalendar(currentYear);
});

nextButton.addEventListener('click', () => {
    currentYear++;
    generateCalendar(currentYear);
});

generateCalendar(currentYear);
