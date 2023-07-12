type = "gif"
buttonclicked = "1"

let = giftSlides1 = []

let fst
let sec
let key
let xd
if (buttonclicked.length === 1){
    fst = 0
    sec = 10
   } else {
    fst = buttonclicked.charCodeAt(0);
    sec = buttonclicked.charCodeAt(1);
   }


if (type === "image") {
  xd = "jpg";
} else xd = "gif";

for (let i = fst; i <= sec; i++) {

  if (buttonclicked.length === 1){
    key = i.toString()
  } else key = String.fromCharCode(i);
 
  giftSlides1.push({ key: key, content: `/src/data/${type}/${key}.${xd}` });
}

if (buttonclicked === "JQ") {
  giftSlides1.splice(5, 0, {
    key: "Ñ",
    content: `/src/data/${type}/Ñ.${xd}`,
  });
}
console.log(giftSlides1)