function getNationalNumber(raw) {
  const cleaned = raw.replace(/\D+/g, '');
  let national = null;

  if (cleaned.startsWith('0033')) {
    national = cleaned.slice(4);
  } else if (cleaned.startsWith('33') && cleaned.length === 11) {
    national = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 10) {
    national = cleaned.slice(1);
  } else if (cleaned.length === 9) {
    national = cleaned;
  } else {
    return null;
  }
  return national;
}

function formatOutput(national, formatType) {
  const fullLocal = '0' + national;
  switch (formatType) {
    case 'international':
      return '+33' + national;
    case 'national-space':
      return fullLocal.replace(/(\d{2})(?=\d)/g, '$1 ');
    case 'national-point':
      return fullLocal.replace(/(\d{2})(?=\d)/g, '$1.');
    case 'national-none':
      return fullLocal;
    case 'national-dash':
      return fullLocal.replace(/(\d{2})(?=\d)/g, '$1-');
    default:
      return fullLocal;
  }
}

document.getElementById('format').addEventListener('click', () => {
  const inputEl   = document.getElementById('input');
  const fmt       = document.getElementById('format-select').value;
  const errorsDiv = document.getElementById('errors');
  errorsDiv.innerHTML = '';

  const rawLines = inputEl.value.trim() === '' ? [] : inputEl.value.trim().split(/\r?\n/);
  const results  = [];

  rawLines.forEach(line => {
    const trimmed = line.trim();
    const nat = getNationalNumber(trimmed);
    if (nat) {
      results.push(formatOutput(nat, fmt));
    } else if (trimmed) {
      const div = document.createElement('div');
      div.className = 'error-item';
      div.textContent = `Numéro invalide : "${trimmed}"`;
      errorsDiv.appendChild(div);
    }
  });

  const outputEl = document.getElementById('output');
  outputEl.value = results.join('\n');
  if (results.length > 0) {
    navigator.clipboard.writeText(results.join('\n'))
      .catch(err => {
        const div = document.createElement('div');
        div.className = 'error-item';
        div.textContent = `Erreur de copie : ${err}`;
        errorsDiv.appendChild(div);
      });
  }
});
