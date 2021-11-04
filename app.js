const width = 20;
const height = 23;  //inital row count = 27

function initManuscript (words) {
  words = unescapeHTML(words);

  let gridArray; 
  let wordArray = words.split('');
  let wordIdx = 0;
  let pageNum = 1;
  let AllPages = '';

  while(wordIdx < wordArray.length) {
    //reset empty array
    gridArray = initArray(width,height,''); 
  //fill  {data
    for(i=0; i< height; i++) {  
        let j = 0;
        while(j < width) {  
          //if this letter is number 
          if(!isNaN(wordArray[wordIdx])) { 
              //2 digit verse number case handling
              let verseNum = wordArray[wordIdx];
              let nextWordidx = wordIdx +1;
              
              if(!isNaN(wordArray[nextWordidx])) { 
                  verseNum += wordArray[nextWordidx];
                  wordIdx++;

                  nextWordidx = nextWordidx +1;

                  if(!isNaN(wordArray[nextWordidx])) { 
                      verseNum += wordArray[nextWordidx];
                      wordIdx++;
                  } 
              }
            // verseNum = wordArray[wordIdx];
              gridArray[i][j] = verseNum;   
              j++;   

          }  
          else {
            if(j==0) {
              j++;
            }
            //If this is not a number
            gridArray[i][j] = wordArray[wordIdx];   
            j++; 
          }
          wordIdx++;
          if(!isNaN(wordArray[wordIdx]) && wordArray[wordIdx]!= ' ') {
            j= width;
          } 
        }//end while
      }//end for
      let table = drawGrid(gridArray, pageNum); 
      AllPages += table; 
      pageNum++;
  }//end page while
 
  document.getElementById('container').innerHTML = AllPages;
  
}

function initArray(w, h, val) {
    var arr = [];
    for(let i = 0; i < h; i++) {
        arr[i] = [];
        for(let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}

function drawGrid(data, pageNum) {
  let str = '<div class="manuscript-container" id="content'+ pageNum+ '">';
  str += '<table>';
  
  for(i=0;i<height;i++) {
      let isChStart = false;

      //check if it has chapter start such as '1장'
      if(data[i][1]=='장'&&!data[i][2]) {
        isChStart = true;
      }
 
      str+= '<tr>';
      for(j=0; j<width; j++) {
        let letter = (data[i][j])?data[i][j]:'';
        str+='<td '+((j==0)?'class="initCol':'class="')+((isChStart)?' chapter"':'"') +'>' + letter + '</td>';
      }
      str+= '</tr>';
  }

  str += '</table></div>';

  return str;
}
  
function unescapeHTML(escapedHTML) {
  return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}