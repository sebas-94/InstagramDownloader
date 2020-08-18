$(document).ready(function () {

    // Evento click en 'donwload'
    $("#btnDonwload").click(function () {
        // Recoge URL y añade cadena para obtener JSON con metadatos
        var URL = $('#inputUrl').val();

        // Se ha copiado desde el móvil y tiene un parámetro más ('?igsh....')
       if(URL.split('/').length == 6){
             URL = URL.split('/'); // Divide
             URL.pop(); // Elimina el último parámetro
             URL = URL.join('/'); // Recrea la cadena
        }

        // Finalmente añade el parámetro de acceso al JSON
        URL += '?__a=1';


        // Recoge JSON
        $.getJSON(URL, (data) => {
            // Video o imagen    
            const type = data.graphql.shortcode_media.__typename;
            // Obtiene el link (según sea video o no)
            const link = type === 'GraphVideo' ?
                data.graphql.shortcode_media.video_url :
                data.graphql.shortcode_media.display_url;


            window.location.href = link;

        })
            .fail(() => {
                alert("The URL you provided is invalid.")
            })

    });

});
