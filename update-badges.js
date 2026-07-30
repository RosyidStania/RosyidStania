const fs = require('fs');

async function updateReadme() {
  const username = 'RosyidStania';
  
  // 1. Mengambil data repositori dari GitHub API
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  const repos = await response.json();

  // 2. Mengekstrak bahasa pemrograman unik
  const languages = new Set();
  repos.forEach(repo => {
    if (repo.language) {
      languages.add(repo.language);
    }
  });

  // 3. Memetakan bahasa ke lencana (Shields.io)
  const badgeMap = {
    'JavaScript': 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
    'TypeScript': 'https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white',
    'Go': 'https://img.shields.io/badge/Golang-00ADD8?style=for-the-badge&logo=go&logoColor=white',
    'Java': 'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white',
    'C++': 'https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white',
    'PHP': 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white',
    'Python': 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white',
    'Dart': 'https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white', 
    'Svelte': 'https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00'
  };

  // 4. Membangun struktur HTML untuk lencana
  let badgeString = '<p align="left">\n';
  languages.forEach(lang => {
    if (badgeMap[lang]) {
      badgeString += `  <img src="${badgeMap[lang]}" alt="${lang}" />\n`;
    } else {
      // Jika bahasa tidak ada di map, buat lencana abu-abu default
      badgeString += `  <img src="https://img.shields.io/badge/${lang}-gray?style=for-the-badge" alt="${lang}" />\n`;
    }
  });
  badgeString += '</p>';

  // 5. Membaca dan memperbarui README.md
  const readmePath = './README.md';
  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  const startTag = '<!--START_SECTION:badges-->';
  const endTag = '<!--END_SECTION:badges-->';

  // Mengganti teks di antara startTag dan endTag
  const regex = new RegExp(`${startTag}[\\s\\S]*${endTag}`);
  readmeContent = readmeContent.replace(regex, `${startTag}\n${badgeString}\n${endTag}`);

  fs.writeFileSync(readmePath, readmeContent);
  console.log('README berhasil diperbarui secara otomatis!');
}

updateReadme();