// popup.js - Version 1.2

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
  }
  return national;
}

function formatOutput(national, formatType) {
  const fullLocal = '0' + national;
  switch (formatType) {
    case 'international': return '+33' + national;
    case 'national-space': return fullLocal.replace(/(\d{2})(?=\d)/g, '$1 ');
    case 'national-point': return fullLocal.replace(/(\d{2})(?=\d)/g, '$1.');
    case 'national-dash': return fullLocal.replace(/(\d{2})(?=\d)/g, '$1-');
    case 'national-none': default: return fullLocal;
  }
}

// C'est ici que le clic est détecté
document.getElementById('format').addEventListener('click', () => {
  const inputEl = document.getElementById('input');
  const formatSelect = document.getElementById('format-select'); // Vérifie bien cet ID
  const errorsDiv = document.getElementById('errors');
  const outputEl = document.getElementById('output');
  const btn = document.getElementById('format');

  // Si un élément manque, on arrête tout (sécurité pour le débug)
  if (!inputEl || !formatSelect || !errorsDiv || !outputEl || !btn) {
    console.error("Erreur : Un élément HTML est introuvable par le Javascript.");
    return;
  }

  const fmt = formatSelect.value;
  errorsDiv.innerHTML = ''; // Reset erreurs
  
  const rawLines = inputEl.value.trim().split(/\r?\n/);
  const results = [];
  let hasContent = false;

  rawLines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;
    hasContent = true;

    const nat = getNationalNumber(trimmed);
    if (nat) {
      results.push(formatOutput(nat, fmt));
    } else {
      const div = document.createElement('div');
      div.className = 'error-item';
      div.innerText = `Numéro invalide : ${trimmed}`;
      errorsDiv.appendChild(div);
    }
  });

  // Affichage
  const finalOutput = results.join('\n');
  outputEl.value = finalOutput;

  // Copie et Animation du bouton
  if (results.length > 0) {
    navigator.clipboard.writeText(finalOutput).then(() => {
      const originalText = btn.innerHTML; // On garde le texte original (avec l'emoji)
      btn.innerHTML = "Copié ! ✅";
      btn.style.backgroundColor = "#10b981"; // Vert succès
      btn.style.color = "white";
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = ""; // Retour couleur CSS
        btn.style.color = ""; 
      }, 2000);
    });
  } else if (!hasContent) {
    // Si l'utilisateur n'a rien mis
    const div = document.createElement('div');
    div.className = 'error-item';
    div.innerText = "Veuillez coller un numéro.";
    errorsDiv.appendChild(div);
  }
});
