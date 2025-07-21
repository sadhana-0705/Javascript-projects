async function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const resultBox = document.getElementById("result");

  if (!word) {
    resultBox.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error("Word not found.");

    const data = await response.json();
    const entry = data[0];
    const phonetic = entry.phonetic || (entry.phonetics[0]?.text ?? "N/A");

    let html = `<h2>${entry.word}</h2>`;
    html += `<p><strong>Phonetic:</strong> ${phonetic}</p>`;

    entry.meanings.forEach((meaning, i) => {
      html += `<div class="meaning-block">
        <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>`;

      meaning.definitions.forEach((def, index) => {
        html += `<p><strong>Definition ${index + 1}:</strong> ${def.definition}</p>`;
        if (def.example) {
          html += `<p><em>Example:</em> ${def.example}</p>`;
        }
      });

      html += `</div><hr/>`;
    });

    resultBox.innerHTML = html;
  } catch (error) {
    resultBox.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function resetSearch() {
  document.getElementById("wordInput").value = "";
  document.getElementById("result").innerHTML = "";
}
