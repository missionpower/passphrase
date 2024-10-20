const MIN_WORDS = 3;
const MAX_WORDS = 100;
const MESSAGE_TIMEOUT_MS = 2000;

const passphrase = document.getElementById("passphrase");
const separator = document.getElementById("separator");
const capitalize = document.getElementById("capitalize");
const n_words = document.getElementById("n_words");
const output = document.getElementById("output");

let output_timeout;

function caps(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function message(s) {
    window.clearTimeout(output_timeout);
    output.innerHTML = s;
    window.setTimeout(
        () => {
            output.innerHTML = "";
        },
        MESSAGE_TIMEOUT_MS
    );
}

function makePhrase(n) {
    if (n > MAX_WORDS) { n = MAX_WORDS; }
    if (n < MIN_WORDS) { n = MIN_WORDS; }
    n_words.value = n;
    let indices = new Uint16Array(n);
    self.crypto.getRandomValues(indices);
    let do_capitalize = capitalize.checked;
    let words = [];
    for(let i of indices) {
        if (do_capitalize) {
            words.push(caps(WORDLIST[i % WORDLIST_SIZE]));
        } else {
            words.push(WORDLIST[i % WORDLIST_SIZE]);
        }
    }
    passphrase.innerHTML = words.join(separator.value);
}

function regenerate() {
    makePhrase(parseInt(n_words.value));
}

function plus() {
    makePhrase(parseInt(n_words.value) + 1);
}

function minus() {
    makePhrase(parseInt(n_words.value) - 1);
}

function copy() {
    navigator.clipboard.writeText(passphrase.textContent);
    message("Copied to clipboard.");
}

window.addEventListener("load", () => {
    makePhrase(4);
});
