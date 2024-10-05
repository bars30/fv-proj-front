window.onload = function() {
 const token = localStorage.getItem('token'); // Check if token exists
 if (!token) {
   window.location.href = './index.html'; // Redirect if token found
 } else {
  const email = localStorage.getItem('email'); // Get email from local storage
  document.querySelector('.email').innerText = `${email}`; 
  console.log(email);
  
 }
};
function signOut() {
 localStorage.removeItem('token'); // Remove token from local storage
 localStorage.removeItem('email');
 window.location.href = './index.html'; // Redirect to index.html
}

// home.js
// home.jslet rowCount = 1; // Initial row count (first row created manually)
// let rowCount = 1;
// let cellCount = 9;
// const cellFormulas = {}; // Store formulas
// let activeFormulaCell = null; // Track the cell where the formula is being entered

// function addRow() {
//   const spreadsheet = document.getElementById('spreadsheet');
//   const newRow = document.createElement('div');
//   newRow.classList.add('row');

//   for (let i = 0; i < 9; i++) {
//     const cell = document.createElement('input');
//     cell.type = 'text';
//     cell.id = `A${++cellCount}`;
//     cell.classList.add('cell');
//     cell.placeholder = `Cell A${cellCount}`;
//     cell.onkeydown = handleKeyDown;
//     cell.onclick = handleCellClick;

//     newRow.appendChild(cell);
//   }
//   spreadsheet.appendChild(newRow);
// }

// function handleKeyDown(event) {
//   const cell = event.target;
//   const value = cell.value.trim();

//   // Detect when the user starts entering a formula
//   if (event.key === '=' && !activeFormulaCell) {
//     activeFormulaCell = cell; // Set the cell as the active formula cell
//   }

//   // Handle "Enter" key to evaluate the formula
//   if (event.key === 'Enter') {
//     evaluateCell(cell);
//     activeFormulaCell = null; // Clear active formula cell after Enter
//   }
// }

// function handleCellClick(event) {
//   const clickedCell = event.target;
  
//   // If a formula is being entered, insert the clicked cell reference
//   if (activeFormulaCell) {
//     activeFormulaCell.value += clickedCell.id; // Add the clicked cell reference (e.g., A50)
//     activeFormulaCell.focus(); // Refocus on the formula cell
//   }
// }

// function evaluateCell(cell) {
//   const value = cell.value.trim();

//   if (value.startsWith('=')) {
//     cellFormulas[cell.id] = value; // Store the formula
//     updateCellValue(cell.id);
//   } else {
//     cellFormulas[cell.id] = value; // Store plain value
//   }
// }

// function updateCellValue(cellId) {
//   const cell = document.getElementById(cellId);
//   const formula = cellFormulas[cellId];

//   if (formula && formula.startsWith('=')) {
//     try {
//       const expression = formula.substring(1); // Remove '='
//       const result = evaluateFormula(expression);
//       cell.value = result;
//     } catch (error) {
//       cell.value = "Error";
//     }
//   } else {
//     cell.value = formula;
//   }
// }

// function evaluateFormula(expression) {
//   const cellReferences = expression.match(/A\d+/g); // Find all cell references in the formula

//   if (cellReferences) {
//     cellReferences.forEach(ref => {
//       const refCell = document.getElementById(ref);
//       if (refCell) {
//         const refValue = refCell.value || '0'; // Get the value of the referenced cell
//         expression = expression.replace(ref, refValue); // Replace ref with value
//       }
//     });
//   }

//   return eval(expression); // Evaluate the formula
// }

// function updateDependentCells() {
//   Object.keys(cellFormulas).forEach(cellId => {
//     if (cellFormulas[cellId].startsWith('=')) {
//       updateCellValue(cellId); // Update formula cells
//     }
//   });
// }

// function updateCells() {
//   const rows = document.querySelectorAll('.row');
//   rows.forEach(row => {
//     const inputs = row.querySelectorAll('.cell');
//     inputs.forEach(input => {
//       input.onkeydown = handleKeyDown;
//       input.onclick = handleCellClick;
//       input.oninput = updateDependentCells; // Update dependent cells on input change
//     });
//   });
// }

// // Initialize with 7 rows
// for (let index = 0; index < 7; index++) {
//   addRow();
// }

// 🔴🔴🔴🔴🔴🔴🔴🔴

let rowCount = 1;
let cellCount = 9;
const cellFormulas = {}; // Store formulas
let activeFormulaCell = null; // Track the cell where the formula is being entered

function addRow() {
  const spreadsheet = document.getElementById('spreadsheet');
  const newRow = document.createElement('div');
  newRow.classList.add('row');

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('input');
    cell.type = 'text';
    cell.id = `A${++cellCount}`;
    cell.classList.add('cell');
    cell.placeholder = `Cell A${cellCount}`;
    cell.onkeydown = handleKeyDown;
    cell.onclick = handleCellClick;
    cell.oninput = updateCells; // Add input event for real-time updates

    newRow.appendChild(cell);
  }
  spreadsheet.appendChild(newRow);
}

function handleKeyDown(event) {
  const cell = event.target;

  // Detect when the user starts entering a formula
  if (event.key === '=' && !activeFormulaCell) {
    activeFormulaCell = cell; // Set the cell as the active formula cell
    cell.value = ''; // Clear the cell for formula input
  }

  // Handle "Enter" key to evaluate the formula
  if (event.key === 'Enter' && activeFormulaCell) {
    evaluateCell(activeFormulaCell);
    activeFormulaCell = null; // Clear active formula cell after Enter
  }
}

function handleCellClick(event) {
  const clickedCell = event.target;

  // If a formula is being entered, insert the clicked cell reference
  if (activeFormulaCell) {
    activeFormulaCell.value += clickedCell.id; // Add the clicked cell reference
    activeFormulaCell.focus(); // Refocus on the formula cell

    // Highlight the clicked cell to indicate selection
    highlightCell(clickedCell);
  }
}

function highlightCell(cell) {
  // Remove highlight from all cells
  const allCells = document.querySelectorAll('.cell');
  allCells.forEach(c => c.classList.remove('highlight'));

  // Add highlight to the currently clicked cell
  cell.classList.add('highlight');
}

function evaluateCell(cell) {
  const value = cell.value.trim();

  if (value.startsWith('=')) {
    cellFormulas[cell.id] = value; // Store the formula
    updateCellValue(cell.id);
  } else {
    cellFormulas[cell.id] = value; // Store plain value
  }
}

function updateCellValue(cellId) {
  const cell = document.getElementById(cellId);
  const formula = cellFormulas[cellId];

  if (formula && formula.startsWith('=')) {
    try {
      const expression = formula.substring(1); // Remove '='
      const result = evaluateFormula(expression);
      cell.value = result;
    } catch (error) {
      cell.value = "Error";
    }
  } else {
    cell.value = formula;
  }
}

function evaluateFormula(expression) {
  const cellReferences = expression.match(/A\d+/g); // Find all cell references in the formula

  if (cellReferences) {
    cellReferences.forEach(ref => {
      const refCell = document.getElementById(ref);
      if (refCell) {
        const refValue = refCell.value || '0'; // Get the value of the referenced cell
        expression = expression.replace(ref, refValue); // Replace ref with value
      }
    });
  }

  return eval(expression); // Evaluate the formula
}

function updateCells() {
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    const inputs = row.querySelectorAll('.cell');
    inputs.forEach(input => {
      input.onkeydown = handleKeyDown;
      input.onclick = handleCellClick;
    });
  });

  // Update the values of cells that have formulas
  for (let cellId in cellFormulas) {
    if (cellFormulas[cellId].startsWith('=')) {
      updateCellValue(cellId); // Update formula cells
    }
  }
}

// Initialize with 7 rows
for (let index = 0; index < 7; index++) {
  addRow();
}
