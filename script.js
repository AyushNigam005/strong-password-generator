// Strong Password Generator - script.js
let charPool = '';
if(upperEl.checked) charPool += UPPER;
if(lowerEl.checked) charPool += LOWER;
if(numbersEl.checked) charPool += NUMS;
if(symbolsEl.checked) charPool += SYMS;


if(!charPool){
alert('Select at least one character type');
return '';
}


// Ensure at least one of each selected type is present
const selectedTypes = [];
if(upperEl.checked) selectedTypes.push(randomFrom(UPPER));
if(lowerEl.checked) selectedTypes.push(randomFrom(LOWER));
if(numbersEl.checked) selectedTypes.push(randomFrom(NUMS));
if(symbolsEl.checked) selectedTypes.push(randomFrom(SYMS));


const remaining = len - selectedTypes.length;
let result = selectedTypes.join('');
for(let i=0;i<remaining;i++){
result += randomFrom(charPool);
}


// Shuffle result to avoid ordered required-chars
result = shuffle(result.split('')).join('');
return result;
}


function randomFrom(str){
return str.charAt(Math.floor(Math.random()*str.length));
}


function shuffle(array){
for(let i=array.length-1;i>0;i--){
const j = Math.floor(Math.random()*(i+1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}


generateBtn.addEventListener('click', ()=>{
const pwd = generatePassword();
if(pwd) passwordEl.value = pwd;
});


copyBtn.addEventListener('click', async ()=>{
if(!passwordEl.value) return;
try{
await navigator.clipboard.writeText(passwordEl.value);
copyBtn.textContent = 'Copied!';
setTimeout(()=>copyBtn.textContent='Copy',1200);
}catch(e){
alert('Could not copy automatically. Select and press Ctrl+C');
}
});


saveNotesBtn.addEventListener('click', ()=>{
if(!passwordEl.value) return;
const blob = new Blob([`Generated password:\n${passwordEl.value}`],{type:'text/plain'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'password.txt';
a.click();
URL.revokeObjectURL(url);
});


// Auto-generate on load
window.addEventListener('DOMContentLoaded', ()=>{
generateBtn.click();
});
