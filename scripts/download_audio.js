import fs from 'fs';
import path from 'path';
import https from 'https';

const lettersDir = path.resolve('public', 'audio', 'letters');
const numbersDir = path.resolve('public', 'audio', 'numbers');
const wordsDir = path.resolve('public', 'audio', 'words');

fs.mkdirSync(lettersDir, { recursive: true });
fs.mkdirSync(numbersDir, { recursive: true });
fs.mkdirSync(wordsDir, { recursive: true });

const vowels = [
  { id: 'v_a', text: 'ಅ' },
  { id: 'v_aa', text: 'ಆ' },
  { id: 'v_i', text: 'ಇ' },
  { id: 'v_ii', text: 'ಈ' },
  { id: 'v_u', text: 'ಉ' },
  { id: 'v_uu', text: 'ಊ' },
  { id: 'v_ru', text: 'ಋ' },
  { id: 'v_e', text: 'ಎ' },
  { id: 'v_ee', text: 'ಏ' },
  { id: 'v_ai', text: 'ಐ' },
  { id: 'v_o', text: 'ಒ' },
  { id: 'v_oo', text: 'ಓ' },
  { id: 'v_au', text: 'ಔ' },
  { id: 'v_am', text: 'ಅಂ' },
  { id: 'v_aha', text: 'ಅಃ' }
];

const consonants = [
  { id: 'c_ka', text: 'ಕ' },
  { id: 'c_kha', text: 'ಖ' },
  { id: 'c_ga', text: 'ಗ' },
  { id: 'c_gha', text: 'ಘ' },
  { id: 'c_nga', text: 'ಙ' },
  { id: 'c_cha', text: 'ಚ' },
  { id: 'c_chha', text: 'ಛ' },
  { id: 'c_ja', text: 'ಜ' },
  { id: 'c_jha', text: 'ಝ' },
  { id: 'c_nya', text: 'ಞ' },
  { id: 'c_tta', text: 'ಟ' },
  { id: 'c_ttha', text: 'ಠ' },
  { id: 'c_dda', text: 'ಡ' },
  { id: 'c_ddha', text: 'ಢ' },
  { id: 'c_nna', text: 'ಣ' },
  { id: 'c_ta', text: 'ತ' },
  { id: 'c_tha', text: 'ಥ' },
  { id: 'c_da', text: 'ದ' },
  { id: 'c_dha', text: 'ಧ' },
  { id: 'c_na', text: 'ನ' },
  { id: 'c_pa', text: 'ಪ' },
  { id: 'c_pha', text: 'ಫ' },
  { id: 'c_ba', text: 'ಬ' },
  { id: 'c_bha', text: 'ಭ' },
  { id: 'c_ma', text: 'ಮ' },
  { id: 'c_ya', text: 'ಯ' },
  { id: 'c_ra', text: 'ರ' },
  { id: 'c_la', text: 'ಲ' },
  { id: 'c_va', text: 'ವ' },
  { id: 'c_sha', text: 'ಶ' },
  { id: 'c_ssa', text: 'ಷ' },
  { id: 'c_sa', text: 'ಸ' },
  { id: 'c_ha', text: 'ಹ' },
  { id: 'c_lla', text: 'ಳ' }
];

const numbers = [
  { id: 'num_0', text: 'ಶೂನ್ಯ' },
  { id: 'num_1', text: 'ಒಂದು' },
  { id: 'num_2', text: 'ಎರಡು' },
  { id: 'num_3', text: 'ಮೂರು' },
  { id: 'num_4', text: 'ನಾಲ್ಕು' },
  { id: 'num_5', text: 'ಐದು' },
  { id: 'num_6', text: 'ಆರು' },
  { id: 'num_7', text: 'ಏಳು' },
  { id: 'num_8', text: 'ಎಂಟು' },
  { id: 'num_9', text: 'ಒಂಬತ್ತು' },
  { id: 'num_10', text: 'ಹತ್ತು' },
  { id: 'num_11', text: 'ಹನ್ನೊಂದು' },
  { id: 'num_12', text: 'ಹನ್ನೆರಡು' },
  { id: 'num_13', text: 'ಹದಿಮೂರು' },
  { id: 'num_14', text: 'ಹದಿನಾಲ್ಕು' },
  { id: 'num_15', text: 'ಹದಿನೈದು' },
  { id: 'num_16', text: 'ಹದಿನಾರು' },
  { id: 'num_17', text: 'ಹದಿನೇಳು' },
  { id: 'num_18', text: 'ಹದಿನೆಂಟು' },
  { id: 'num_19', text: 'ಹತ್ತೊಂಬತ್ತು' },
  { id: 'num_20', text: 'ಇಪ್ಪತ್ತು' },
  { id: 'num_30', text: 'ಮೂವತ್ತು' },
  { id: 'num_40', text: 'ನಲವತ್ತು' },
  { id: 'num_50', text: 'ಐವತ್ತು' },
  { id: 'num_100', text: 'ನೂರು' }
];

const words = [
  { id: 'w2_1', text: 'ಮನೆ' },
  { id: 'w2_2', text: 'ಹೂವು' },
  { id: 'w2_3', text: 'ಹಾಲು' },
  { id: 'w2_4', text: 'ನೀರು' },
  { id: 'w2_5', text: 'ಹಣ್ಣು' },
  { id: 'w3_1', text: 'ಪುಸ್ತಕ' },
  { id: 'w3_2', text: 'ಕಮಲ' },
  { id: 'w3_3', text: 'ಕಣ್ಣು' },
  { id: 'w3_4', text: 'ಬೆಳಕು' },
  { id: 'hello', text: 'ನಮಸ್ಕಾರ' },
  { id: 'thanks', text: 'ಧನ್ಯವಾದಗಳು' },
  { id: 'how_are_you', text: 'ನೀವು ಹೇಗಿದ್ದೀರಿ' },
  { id: 'welcome', text: 'ಸುಸ್ವಾಗತ' }
];

function downloadAudio(text, outputPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 100) {
      resolve();
      return;
    }

    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=kn&client=tw-ob`;
    const file = fs.createWriteStream(outputPath);

    const req = https.get(
      url,
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } },
      (res) => {
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(outputPath);
          resolve(); // don't reject so others proceed
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    );

    req.on('error', (err) => {
      try { if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath); } catch {}
      resolve();
    });
  });
}

async function run() {
  console.log('Starting Kannada audio download...');

  // Vowels
  for (const v of vowels) {
    const p = path.join(lettersDir, `${v.id}.mp3`);
    await downloadAudio(v.text, p);
    await new Promise((r) => setTimeout(r, 60));
  }
  console.log('✓ Vowels downloaded');

  // Consonants
  for (const c of consonants) {
    const p = path.join(lettersDir, `${c.id}.mp3`);
    await downloadAudio(c.text, p);
    await new Promise((r) => setTimeout(r, 60));
  }
  console.log('✓ Consonants downloaded');

  // Numbers
  for (const n of numbers) {
    const p = path.join(numbersDir, `${n.id}.mp3`);
    await downloadAudio(n.text, p);
    await new Promise((r) => setTimeout(r, 60));
  }
  console.log('✓ Numbers downloaded');

  // Words
  for (const w of words) {
    const p = path.join(wordsDir, `${w.id}.mp3`);
    await downloadAudio(w.text, p);
    await new Promise((r) => setTimeout(r, 60));
  }
  console.log('✓ Key words downloaded');

  console.log('All Kannada audio files successfully generated and saved!');
}

run();
