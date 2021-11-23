const bill = document.getElementById('bill');
const tip = document.getElementById('percent');
const people = document.getElementById('num-of-people');
const inputs = document.querySelectorAll('#bill, #num-of-people')
const submit = document.getElementById('submit')
const tipButtons = document.querySelectorAll('#tip button');
const total = document.querySelector('#total h3');
const amount = document.querySelector('#amount h3');
const reset = document.getElementById('reset');

let tipValue = 1;
tipButtons.forEach( btn => {
   btn.onclick = () => {
      removeClass();
      btn.classList.add('selected-tip');
      tipValue = btn.dataset['tip'];
   };
});

tip.onfocus = () => {
   removeClass();
}

function removeClass () {
   tipButtons.forEach( btn => {
      btn.classList.remove('selected-tip')
   })
}

submit.onclick = e => {
   e.preventDefault();
   if (tip.value != "") tipValue = tip.value;
   if (validInput()) {
      amount.innerText = tipAmount(bill.value, people.value, tipValue) + '$';
      total.innerText = Total(bill.value, people.value) + '$';
      reset.style.opacity = '1';
   }
}

function validInput() {
   inputs.forEach(inp => {
      inp.nextElementSibling.style.opacity = "0";
      if (!inp.value) {
         inp.nextElementSibling.style.opacity = "1"
         return false;
      }
   });
   return !bill.value || !people.value || (tipValue == 1 && tip.value == "") ? false : true;
}

function tipAmount(tot, person, tip) {
   return Math.round((tot*(tip/100)) / person * 100) / 100;
}

function Total(tot, person) {
   return Math.round(tot/person*100)/100;
}
 
reset.onclick = () => {
   removeClass();
   bill.value = people.value = tip.value = '';
   amount.innerText = total.innerText = '0.00$'
   reset.style.opacity = '0.3';
}