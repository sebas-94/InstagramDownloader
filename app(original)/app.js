"use strict";

$(document).ready(function () {


    /**
     * SIMPLE MODE
     */

    // Si se vuelve atrás y el input está lleno se despliega el botón
    if ($("#inputUrl").val()) {
        $("#btnDonwload").slideDown("slow");
    }

    $("#inputUrl").on('paste', function (evt) {
        $("#btnDonwload").slideDown("slow");
    });

    // Evento click en 'donwload'
    $("#btnDonwload").click(function () {
        // Recoge URL y añade cadena para obtener JSON con metadatos
        var URL = $('#inputUrl').val();


        // Si es una foto privada, redirige automáticamente
        if (URL.split('/')[4].length > 15) {
            URL += 'media/?size=l';
            window.location.href = URL;
        }

        // Se ha copiado desde el móvil y tiene un parámetro más ('?igsh....')
        if (URL.split('/').length == 6 && URL.split('/')[4].length == 11) {
            URL = URL.split('/'); // Divide
            URL.pop(); // Elimina el último parámetro
            URL = URL.join('/'); // Recrea la cadena
        }


        // Finalmente añade el parámetro de acceso al JSON
        URL += '?__a=1';


        // Recoge JSON
        $.getJSON(URL, (json) => {
            // Video o imagen    
            const type = json.graphql.shortcode_media.__typename;
            // Obtiene el link (según sea video o no)
            const link = type === 'GraphVideo' ?
                json.graphql.shortcode_media.video_url :
                json.graphql.shortcode_media.display_url;

            window.location.href = link;
        })
            .fail(() => {
                alert("The URL you provided is invalid.")
            })

    });


    /**
     * MANUAL MODE
     */

      // Si se vuelve atrás y el input está lleno se despliega el botón
    if ($("#inputPrivateUrl").val()) {
        let URL = $("#inputPrivateUrl").val();
        $("#linkPrivate").attr('href', URL + '?__a=1');
        $("#contentPrivate").val('');

        $("#step2").slideDown("slow");
        $("#contentPrivate").slideDown("slow");
    }

    $("#inputPrivateUrl").on('paste', function (evt) {
        setTimeout(() => {
            let URL = evt.target.value;
            $("#linkPrivate").attr('href', URL + '?__a=1');
            $("#contentPrivate").val('');

            $("#step2").slideDown("slow");
            $("#contentPrivate").slideDown("slow");
        }, 200);
    });

    $("#ilinkPrivate").on('click', function (evt) {
        alert('click');
    });

    $("#contentPrivate").on('paste', function (evt) {

        setTimeout(() => {
            let content = evt.target.value;
            // Borra el contenido previo al inicio del JSON
            content = '{' + content.split('{').splice(1).join('{');

            try {
                let json = JSON.parse(content);
                // Video o imagen    
                const type = json.graphql.shortcode_media.__typename;
                // Obtiene el link (según sea video o no)
                const link = type === 'GraphVideo' ?
                    json.graphql.shortcode_media.video_url :
                    json.graphql.shortcode_media.display_url;


                $("#btnPrivateDonwload").slideDown("slow");
                $("#btnPrivateDonwload").click(() => {
                    window.location.href = link;
                });

            } catch (error) {
                alert('Make sure to copy and paste the content of the previous link correctly.');
                setTimeout($("#contentPrivate").val(''), 100);

            }

        }, 200);

    });



});
