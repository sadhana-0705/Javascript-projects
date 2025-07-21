function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const resultBox = document.getElementById("result");

  if (!word) {
    resultBox.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => {
      if (!res.ok) throw new Error("Word not found");
      return res.json();
    })
    .then((data) => {
      const entry = data[0];
      const phonetic = entry.phonetic || (entry.phonetics[0]?.text ?? "N/A");

      let meaningsHTML = "";

      entry.meanings.forEach((meaning, i) => {
        meaningsHTML += `
          <div class="meaning-block">
            <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
        `;

        meaning.definitions.forEach((def, index) => {
          meaningsHTML += `
            <p><strong>Definition ${index + 1}:</strong> ${def.definition}</p>
            ${def.example ? `<p><em>Example:</em> ${def.example}</p>` : ""}
          `;
        });

        meaningsHTML += `</div><hr/>`;
      });

      resultBox.innerHTML = `
        <h2>${entry.word}</h2>
        <p><strong>Phonetic:</strong> ${phonetic}</p>
        ${meaningsHTML}
      `;
    })
    .catch((err) => {
      resultBox.innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
}

function resetSearch() {
  document.getElementById("wordInput").value = "";
  document.getElementById("result").innerHTML = "";
}
