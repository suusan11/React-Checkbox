


let array = [
{id:"1",mainbody:"Rukiye"},
{id:"2",mainbody:"Mie"},
{id:"3",mainbody:"Sho"},
{id:"4",mainbody:"Ayaka"},
{id:"5",mainbody:"Dai"},
{id:"6",mainbody:"Hiroaki"},
{id:"7",mainbody:"Noriaki"}
]



var result = array.map(( value,index,array ) => {

  console.log("array.length => "+value.id);
  // console.log("index => "+value.mainbody);

  return value.mainbody

});

console.log( result );
