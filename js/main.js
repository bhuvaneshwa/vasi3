(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

function FetchData(filter, Sinput){
    const url = "https://slim.vasishipping.com/SLIMRestService/api";
   if(Sinput == ""){
       alert("Please enter a value");
   }else{
        if(filter == "1"){
            var Sdata = 'B,'+Sinput;
            var raw0 = "{\"SP_ID\":\"101\", \"param\":\"";
            var raw1 = "\"}\r\n"
        
            var raw = raw0 + Sdata + raw1;
            console.log(raw);
            
            const requestOptions ={
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                method: 'POST',
                body: raw,
            };
            fetch(url, requestOptions)
            .then(response => response.json())
            .then(results => {
                // console.log('*******************Response************************')
                // console.log(results)
                CreateTable(results);
                
            })
            .catch(error => console.log('error', error));
        }else{
            var Sdata = 'C,'+Sinput;
            var raw0 = "{\"SP_ID\":\"102\", \"param\":\"";
            var raw1 = "\"}\r\n"
        
            var raw = raw0 + Sdata + raw1;
            console.log(raw);
            
            const requestOptions ={
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                method: 'POST',
                body: raw,
            };
            fetch(url, requestOptions)
            .then(response => response.json())
            .then(results =>{ 
                // console.log('*******************Response************************')
                // console.log(results)
                CreateTable(results);
            })
            .catch(error => console.log('error', error));
        }
}}

$(document).ready(function () {
    $("#btnFetch").click(function(){
      var filter = $('#Filltype :selected').val();
      var Sinput = $('#Sinput').val();
      FetchData(filter, Sinput);
    //   console.log(filter);
    //   console.log(Sinput);   
    });
});

function CreateTable(data){
    console.log('*******************Response************************');
    // console.log(data);
    // console.log(data.Data);
    console.log(data.Data);
    var table1 = data.Data.Table1;
    // var table2 = data.Data.Table1;

    var Data = data.Data.Table2
    console.log(table1[0])
    document.getElementById('table1').innerHTML = table1.map(InsertToDoc);
    document.getElementById('table2').innerHTML = Data.map(InsertToDoc02);
    // document.getElementById('table3').innerHTML= Data.map(InsertToDoc03);
}

function InsertToDoc(data){
    var row = '<td>'+data.POD+'</td>'+'<td>'+data.POL+'</td>'+'<td>'+data.POD+'</td>'+'<td>'+data.FPD+'</td>';
    return  row;
}

function InsertToDoc02(data){
    // // var data=data
    // console.log("kk")
    console.log(data)
   
    
    //   const array = [];
      
    //   for(var i in data) {
    //       array.push([i,data[i]]);
    //       for (const [key, value] of Object.entries(data)) {
    //         array.push([`${key}`, `${value}`]);
    //   }
    //   console.log(array)
    //   }


      
    var row = '<td>'+data[2]+'</td>'+'<td>'+data[5]+'</td>'+'<td>'+data[0]+'</td>'+'<td>'+data[3]+'</td>'+'<td>'+data[1]+'</td>';
    return  row;

}
function InsertToDoc03(data){
    // var row ='<td>'+data.CURRENT STATUS+
    const keys = Object.keys(data);
   const res = [];
   for(let i = 0; i < keys.length; i++){
      res.push(data[keys[2]]);
    }
}

// function adataElement () {
 
//   var newDiv = document.createElement("div");
//   var newContent = document.createTextNode("Hola!¿Qué tal?");
//   newDiv.appendChild(newContent);

  
//   var currentDiv = document.getElementById("div1");
//   document.body.insertBefore(newDiv, currentDiv);
// }
