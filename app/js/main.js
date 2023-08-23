const inpSearch = document.getElementById('inp-search');
const btnSearch = document.getElementById('btn-search');
let URL = "https://api.weatherapi.com/v1/current.json?key=c30ea8f295484f37b6d85901232308&q=";
btnSearch.addEventListener('click', () => {
    const value = inpSearch.value;
    inpSearch.value = '';
    let promise = fetch(URL.concat(value));
    promise.then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data.current.temp_c);
        console.log(data.current);
        console.log(data);
    })
});