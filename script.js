body=document.getElementById("1");
h1 =document.createElement("h1");
divP=document.createElement("div");
divA=document.createElement("div");
divP.innerHTML="AQUI LOS TITULOS <br>  <br> <br>"
divA.textContent="AQUI EL AÑO DE CREACION"
divP.setAttribute("class","divP")
divA.setAttribute("class","divA")


body.appendChild(h1);
body.appendChild(divP);
body.appendChild(divA);

/* CREAMOS LA LLAMADA A LA API */

const urlFilms ='https://swapi.dev/api/films/'

async function apistarwars()  {
try {
    let films = await fetch(urlFilms)
    let data = await films.json()
    let arrayP= []; //CREO UN ARRAY VACIO PARA METER LOS DATOS DE LA ITERACION DEL BUCLE [title]
    let arrayA= [];//CREO UN ARRAY VACIO PARA METER LOS DATOS DE LA ITERACION DEL BUCLE [release_date]

    for (let i=0 ; i<data.results.length ; i++){
      arrayP.push(data.results[i].title)
    } //CREO EL BUCLE PARA ITERAR TODOS LOS ELEMENTOS DEL ARRAY (TITLES) CON PUSH EN CADA VUELTA LOS VOY AÑADIENDO
    for (let i=0 ; i<data.results.length ; i++){
        arrayA.push(data.results[i].release_date.substring(0,4))
    }//CREO EL BUCLE PARA ITERAR TODOS LOS ELEMENTOS DEL ARRAY (release_date) CON PUSH EN CADA VUELTA LOS VOY AÑADIENDO

    paintGrafic (arrayP,arrayA);

    let object ={
        titulo: arrayP,
        anio: arrayA
            }//CREO EL OBJETO PARA ENCAPSULAR EL TITULO Y EL ANÑO DE CREACION

    console.log(data)
    console.log(object)

    return object ;

    }

    catch (error){

    console.log("A ocurrido un error")

    }
}

  
apistarwars().then(object=>{
    
    let tituloX = `${object.titulo}`.toUpperCase()

    divP.textContent=tituloX;

    let anioY = `${object.anio}`

    divA.textContent=anioY;

})

function paintGrafic (a,b) {

    let data = {
        // A labels array that can contain any sort of values
        labels: a,
        // Our series array that contains series objects or in this case series data arrays
        series: [
            b
        ]
      };
      
      var options = {
        width: 50,
        height: 20
      };
      // Create a new line chart object where as first parameter we pass in a selector
      // that is resolving to our chart container element. The Second parameter
      // is the actual data object.
      new Chartist.Line('#chart1', data);
};


const ulrPeople=("https://swapi.dev/api/people/") ;

async function starwarPeople (){

let url = await fetch(ulrPeople)
let data = await url.json()
let arrayNames = []
let arrayFilms = [] 

for (let i = 0 ; i<data.results.length ; i++ ){
    arrayNames.push(data.results[i].name)
    arrayFilms.push(data.results[i].films.length)
}

paintGrafic2 (arrayNames,arrayFilms)

let objectPeople = {
  name : arrayNames,
  films : arrayFilms
}


console.log(data)
console.log(arrayFilms)
console.log(objectPeople)
}

starwarPeople ()


function paintGrafic2 (a,b) {

let  data = {
    labels: a,
      series: [
        b
    ]
  };
  
  var options = {
    seriesBarDistance: 15
  };
  
  var responsiveOptions = [
    ['screen and (min-width: 641px) and (max-width: 1024px)', {
      seriesBarDistance: 10,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value;
        }
      }
    }],
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
  
  new Chartist.Bar('#chart2', data, options, responsiveOptions);
}
