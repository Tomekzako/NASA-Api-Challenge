$(function () {

    var nasaUrl = 'https://api.nasa.gov/planetary/apod?api_key=HFTZjclHOwnds4cUxKcRR6hDAlb4Hdioby2FJPGE';

    var marsUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-6-3&api_key=HFTZjclHOwnds4cUxKcRR6hDAlb4Hdioby2FJPGE';

    var $space = $('.col1');
    console.log($space);
    var $slider = $('a').find('span');
    console.log($slider);

    var $next = $('#nextPicture');
    var $prev = $('#prevPicture');
    var $ul = $('ul');
    var $loader = $('.loader').hide();
    $slider.on('click', function () {
        $loader.delay(500).fadeIn('slow');
        $space.fadeOut(3000, function () {
            $space.fadeIn(5000);
            loadImage();
             $loader.delay(500).fadeOut('slow');
        });
    })


    function randomNumberFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getRandomDate() {
        var year = randomNumberFromRange(2010, 2016);
        var month = randomNumberFromRange(1, 12);
        var day = randomNumberFromRange(1, 28);

        return year + '-' + month + '-' + day;
    }

    function setBackground(images) {
        var $url = images.url;
        $space.css("background-image", 'url("' + $url + '")');
    };


    function loadImage() {
        $.ajax({


            url: nasaUrl + '&date=' + getRandomDate()
        }).done(function (response) {
            console.log(response);
            setBackground(response);
        }).fail(function (error) {
            console.log(error);
        });

    }
    loadImage();


    function marsGallery(response) {
        $.each(response, function (index, marsImg) {
            var $li = $('<li><img src="' + marsImg.img_src + '">');
            $ul.append($li);
        });
    }

    $.ajax({


        url: marsUrl
    }).done(function (response) {
        console.log(response);
        marsGallery(response.photos);
        var li = $('li');
        
        li.on('click', function(){
            var src = $(this).children().attr('src');
            console.log(src);
            
            var $newDiv = $('<div><img src="' + src + '"><button class="closePic">Close</button></div>');
            $newDiv.addClass('fullScreen');
            
            
            $('body').append($newDiv);
         
            var $butt = $newDiv.find('button');
            console.log($butt);
            $butt.on('click', function () {
                $newDiv.remove();
             });
        });
        
        var index = 0;
        var width = li.eq(0).width();
        $ul.css('width', li.length*width+'px');

        $next.on('click', function () {
            index++;
            if (index >= li.length - 7) {
                index = li.length - 7;
            }

            $ul.stop().animate({
                left: -(index * width + 20) + 'px'
            }, 1000);
        });

        $prev.on('click', function () {
            index--;
            if (index < 0) {
                index = 0;
            }
            console.log('prev', index);
            $ul.stop().animate({
                left: -(index * width + 20) + 'px'
            }, 1000);
        });

    }).fail(function (error) {
        console.log(error);
    });


});