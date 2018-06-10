
const lstm = new ml5.LSTMGenerator('trump', modelReady);

let textInput;
let tempSlider;
let lengthSlider;


function modelReady() {
  select('#status').html('Model Loaded');
}

function setup() {
  noCanvas();

  // Grab the DOM elements
  textInput = select('#textInput');
  button = select('#generate');

  // textInput.input(generate);
  textInput.keyPressed
  button.mousePressed(generate);

}

function generate() {

  select('#status').html('Generating...');

  let original = textInput.value();
  let txt = original.toLowerCase();

  if (txt.length > 0) {
    let data = {
      seed: txt,
      temperature: 0.5, 
      length: txt.length * 1.5 > 150 ? txt.length * 1.5 : 150
    };

    lstm.generate(data, gotData);

    function gotData(result) {
      select('#status').html('Ready!');
      select('#result').html(merge(txt,result.generated));
      // select('#result').html(result.generated);
    }
  }
}

function merge (str1, str2) {

  const a = str1.split(" ").filter(Boolean);
  const b = str2.split(" ");
  let mergedString = '';

  for(let i = 0; i < a.length || i < b.length; i++) {  //loop condition checks if i is less than a.length or b.length
   if(i < a.length)  //if i is less than a.length add a[i] to string first.
     mergedString +=  a[i] + ' ';
   if(i < b.length)  //if i is less than b.length add b[i] to string.
     mergedString +=  b[i] + ' ';
  }
  return mergedString;

}

function onEnterPressed() {
  let key = window.event.keyCode;

  // If the user has pressed enter
  if (key === 13) {
    generate();
    return false;
  }
  else {
    return true;
  }
}
