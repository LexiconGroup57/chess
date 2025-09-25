import { keepPets, returnTwo} from "./json.js";

let element = document.getElementById('positions');

if(sessionStorage.getItem('positions') !== null)
    element.value = sessionStorage.getItem('positions')

element.addEventListener('change', () => {
    console.log(element.value);
    sessionStorage.setItem('positions',  element.value);
})

keepPets("Kate", "Armand", "Louise", "Midge");
