const grid = new Muuri('.grid', {
    layout:{
        rounding: false
    }
});

window.addEventListener('load', ()=>{
    grid.refreshItems().layout();
    document.querySelector('.grid').classList.add('imagenesCargadas')

    const   enlances = document.querySelectorAll('#categorias a'),
            buscar = document.querySelector('#barraBusqueda');
    enlances.forEach( (elemento) => {
        elemento.addEventListener('click', (e)=>{
            e.preventDefault();
            enlances.forEach((a)=> a.classList.remove('activo'));
            e.target.classList.add('activo');
            

            const categoria = e.target.innerHTML.toLowerCase();
            console.log(categoria);
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria=${categoria}]`);
            
        })
    });

    //---------buscar por etiquetas---------
    buscar.addEventListener('input', (e) => {
        const etiqueta = e.target.value;
        grid.filter ( (items) => items.getElement().dataset.etiquetas.includes(etiqueta));
    });

    const overlay = document.getElementById('seleccionarfoto');
    document.querySelectorAll('.grid .item img').forEach((element)=>{
        const ruta = element.src;
        // const ruta = element.getAttribute('src');
        const description = element.parentNode.parentNode.dataset.descripcion;
       
        
        element.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('activo')
            document.querySelector('#seleccionarfoto img').src=ruta;
            document.querySelector('#seleccionarfoto p').textContent = description;


            document.querySelector('#btnCerrar').addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.remove('activo');
            });
        });
    });

    // ---------hacer que se cierre la foto al presionar el fondo
    overlay.addEventListener('click', (cerrar) => {
        cerrar.target.id === 'seleccionarfoto' ? overlay.classList.remove('activo'): '';
    });
});