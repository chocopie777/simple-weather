const inpSearch = document.getElementById('inp-search');
const btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', () => {
    const value = inpSearch.value;
    inpSearch.value = '';
});
//