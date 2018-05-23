(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  $( document ).ready(function(){

    nospamporfavor();    

    // Calcular fechas por cada curro
    $('.resume-date .text-muted').each(function(index){
      $(this).html(
        getTiempoEntreFechas(
          $(this).data('fechainicio'),
          $(this).data('fechafin')
        )
      );
    });

    // Reutilizando el mismo modal para los items
    $('#proyectos .card-img-wrapper').on('click', function(){
      var item = $(this);
      var proyecto = item.parent();

      // Obtener titulo item
      var tituloitem = proyecto.find('.card-header').html();

      // Obtener imagen item
      var imagenitem = item.find('.card-img-top').attr("src").replace("350px", "720px");

      // Obtener tecnologías
      var tecnologias = proyecto.find('.card-footer').html();

      // Migrar datos a diálogo
      $('#miDialogo .modal-title').html(tituloitem);
      var imagen = '<img class="img img-modal" src="'+imagenitem+'" />';
      $('#miDialogo .modal-body').html(imagen);
      $('#miDialogo .modal-footer').html(tecnologias);

    })
  });


function nospamporfavor(){ var
dom='&#x67;&#x6D;&#x61;&#x69;&#x6C;.&#x63;&#x6F;&#x6D;',
display='&#x4D;&#x69; &#x63;&#x6F;&#x72;&#x72;&#x65;&#x6F;',
x40='&#x40;',
part1='&#x6D;&#x61;&#x69;&#x6C;&#x74;&#x6F;:',
name='&#x66;&#x72;&#x61;&#x6E;&#x6A;&#x61;&#x76;&#x69;&#x65;&#x7A;',
stuff='';

document.getElementById('nospam').innerHTML = '<a title="'+display+'" href="'+part1+name+x40+dom+stuff+'">'+display+'<\/a>';
}

// Formatea una fecha para que salga bonita  
function getTiempoEntreFechas(fechaInicio,fechaFin){
  fechaInicio = new Date(fechaInicio);
  if (fechaFin == 'undefined') 
    fechaFin = new Date();
  else
    fechaFin = new Date(fechaFin);

  if ((fechaInicio instanceof Date == false) || (fechaFin instanceof Date == false))
    return "Se necesitan fechas";

  if ((fechaInicio == 'Invalid Date') || (fechaFin == 'Invalid Date'))
    return 'Fechas inválidas';

  var resultado = "";      //Cadena resultado final
  var mostrarDias = false; //Flag
  var totalAnios = fechaFin.getFullYear() - fechaInicio.getFullYear();
  var totalMeses = fechaFin.getMonth() - fechaInicio.getMonth();

  if (totalMeses < 0){
      totalMeses = totalMeses + 12;
      totalMeses++;
      totalAnios--;
  }
  
  // Añadir años si procede a la cadena final
  if (totalAnios > 0){
    resultado = totalAnios;
    (totalAnios == 1) ? resultado += " año" : resultado += " años";
  }

  // Si hay años, añadir nexo unión a cadena final
  if(totalAnios != 0){ 
    resultado += " y ";
  }else{
    mostrarDias = true; 
  }

  // Añadir meses a la cadena final
  if(totalMeses > 0) {
    resultado += totalMeses;
    (totalMeses == 1) ? resultado += " mes" : resultado += " meses";
    if (mostrarDias) resultado += " y ";
  }

  // Añadir días si procede
  if (mostrarDias){
    var totalDias = (fechaFin.getDate() - fechaInicio.getDate())+1;
    resultado += totalDias;
    (totalDias == 1) ? resultado += " día" : resultado += " días";
  }

  return resultado;
}
})(jQuery); // End of use strict