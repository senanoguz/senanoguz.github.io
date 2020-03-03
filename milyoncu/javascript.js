$(document).ready(function() {

    var arr = register()
    function register() {
        var listregister = localStorage.getItem('users')
        if (listregister)
            return JSON.parse(listregister)
        else return []
    }
    var user = localStorage.getItem("username")
    var users = localStorage.getItem('users')
    users = JSON.parse(users)
    // var firstgamer
    // var secondgamer
    // var threegamer
    // var raiting = []
    if (user !== null){
    for (i = 0 ; i < users.length;i++){

    if(users[i].username === user){
    var current_user = i
    }
    if(users[i].username === ''){
    var current_user = i
    }
    // raiting.push(users[i].bestscore)
    // raiting.sort(function(a, b){return b - a});

}

    // for (i = 0;i<users.length;i++){
    //     if (users[i].bestscore === raiting[0]){
    //         firstgamer = users[i].usernamereg
    //         $('#firstgamer').text(firstgamer)
    //         $('#firstgamerpoint').text(raiting[0])
    //     }
    //     if (users[i].bestscore === raiting[1]){
    //         secondgamer = users[i].usernamereg
    //         $('#secondgamer').text(secondgamer)
    //         $('#secondgamerpoint').text(raiting[1])
    //     }
    //     if (users[i].bestscore === raiting[2]){
    //         threegamer = users[i].usernamereg 
    //         $('#threegamer').text(threegamer)
    //         $('#threegamerpoint').text(raiting[2])
    //     }
    // }
    var bestscore = users[current_user].bestscore
    var newscore = users[current_user].newscore
    var totalscore = users[current_user].totalscore
    }

    var user = localStorage.getItem("username")
    var username = user
    if (username === null){
        username = 'Qonaq'
        bestscore = ' (Funksiya Passivdir)'
        newscore = ' (Funksiya Passivdir)'
        totalscore = ' (Funksiya Passivdir)'
        $('#dovshan').css('height', '200px').css('width', '150px')
    }

    function yoxlama(username, password, arr, email, level, bestscore, newscore, totalscore) {
        for (var i = 0; i < arr.length; i++) {

            if (username === arr[i].username && password === arr[i].password) {
                return true
            } else {
                continue;
            }
        }
    }
    $('#btnregister').on('click', function() {

        var usernamereg = $('#username').val();
        var emailreg = $('#email').val();
        var passwordreg = $('#password').val();
        var password2reg = $('#password2').val();
        bestscore = 0;
        newscore = 0;
        totalscore = 0;
        // level = 0;
        if (username === '') {

            $('#tamam').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Username bos ola bilmez`)
        } else if (passwordreg === '') {
            $('#tamam').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Password bos ola bilmez`)

        } else if (passwordreg !== password2reg) {
            $('#tamam').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Parollar bir birine uygun gelmir`)

        } else if (usernamereg === '' || passwordreg === '' || password2reg === '' || emailreg === '' || bestscore === '' || newscore === '' || totalscore === '') {
            $('#tamam').css('display', 'block').addClass('alert alert-danger').text(`Xeta: * olan butun xanalari doldurmaq vacibdir`)
        } else {
            a = yoxlama(usernamereg, passwordreg, arr, emailreg, bestscore, newscore, totalscore)
            if (a) {
                $('#tamam').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Ola bilsin ki username artiq qeydiyyatdan kecib basqa Username adi yoxlayin`)
            } else {
                $('#tamam').removeClass('alert alert-danger')
                localStorage.setItem("username", usernamereg)
                localStorage.setItem("password", passwordreg)
                localStorage.setItem("emailreg", emailreg)
                localStorage.setItem("bestscore", bestscore)
                localStorage.setItem("totalscore", totalscore)
                localStorage.setItem("newscore", newscore)
                $('#tamam').css('display', 'block').addClass('alert alert-success').text('Qeydiyyat ugurla tamamlandi Esas Sehifeye yonlendirilirsiniz')
                arr.push({ username, password,emailreg,bestscore,newscore,totalscore })
                localStorage.setItem("users", JSON.stringify(arr))
                setInterval(() => {
                        window.location.href = 'index.html'
                }, 2000);
            }
        }
    })


    $("#btnlogin").on("click", function() {

        var username = $('#username_log').val()
        var password = $('#password_log').val()
        if (username === '') {
            $('#okay').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Username bos ola bilmez`)
        } else if (password === '') {
            $('#okay').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Password bos ola bilmez`)

        } else {


            a = yoxlama(username, password, arr)
            if (a) {
                setInterval(function() {


                    window.location.href = 'index.html';

                }, 1000);
                localStorage.setItem("username", username)
                localStorage.setItem("password", password)
                $('#okay').removeClass('alert alert-danger')
                $('#okay').css('display', 'block').addClass('alert alert-success').text('Giris Ugurludur 3 saniye sonra Esas sehifeye yonlendirileceksiniz')
            } else {
                $('#okay').css('display', 'block').addClass('alert alert-danger').text('Username ve Password bir birine uygun gelmir')

            }
        }
    })

    var game = $('#game')

    var xal = 0
    var kordinantX = 0
    var balonstatus
    var reng = 0
    var balon
    var baloncssWidth
    var baloncssHeight
    var bosalt
    function newbox() {
        count = 600
        $('#gameoverimg').hide()
        $('#gameover').hide()
        $('.helps').hide()
        $('.helps').hide()
        $('#haqqindashow').hide()
        $('#qeydiyyatshow').hide()
        $('.cloud').show()
        var yarat = 1;
        var xalprint = $('#xal');
        var lovhe = $('.lovhe')
        var vaxt = $('#vaxt')
        vaxt.css('color', 'crimson')
        vaxt.show()
        xalprint.show()
        lovhe.show()
        var div = $('#game')

        function vaxtvermek() {
            top.css('transition', '10s')
            top.css('transform', `translateY(500px)`)
        }

        xalprint.css('color', 'white').css('font-size', '40px')
        xalprint.addClass('animated bounce')
        xalprint.css('color', 'crimson')
        xalprint.text('0')
        var counter = setInterval(timer, 10);

        function timer() {
            if (count <= 0) {
                clearInterval(counter);
                return gameover();
            }
            count--;
            document.getElementById("vaxt").innerHTML = count / 100 + " s";
        }

        function gameover() {
             if(users[current_user].usernamereg !== ''){
                users[current_user].newscore = xal;
            localStorage.setItem("users", JSON.stringify(users));
            
            if (xal > parseInt(users[current_user].bestscore))
            {
            users[current_user].bestscore = xal;
            localStorage.setItem("users", JSON.stringify(users)); 
            }
            users[current_user].totalscore = xal + parseInt(users[current_user].totalscore );
            localStorage.setItem("users", JSON.stringify(users)); 
}


            // user = users[current_user_number].newscore = xal;
            // console.log(xal)
            // localStorage.setItem("users", JSON.stringify(user));
            $('.esas').show()
            $('.basla').hide()
            bosalt.empty()
            game.append('<img class="animated bounceInDown delay-0.6s" id="gameoverimg" src="shekiller/gameover.png" width="300" height="250"/>')
            $('#gameover').show()
            $('.helps').addClass('animated bounceInUp delay-0.5s')
            $('.helps').show()
            $('.helps').css('left', '250px')
            $('.helps').css('top', '350px')
            $('#gamestart').show()
            $('#giris').text('Tekrar Oyna')
            $('#qeydiyyat').show()
            $('#haqqinda').hide()
            setInterval(() => {
                window.location.href = 'index.html'
            }, 4000);
        }

        setInterval(() => {
            var top = $('<div>')
            bosalt = top
            top.addClass('#top')
            top.css('z-index', '2')
            top.css('position', 'absolute').css('top', '-30px')

            if (yarat < 1000) {
                yarat += 1
                reng = reng + Math.floor(Math.random() * 10);
                balonrand = 1 + Math.floor(Math.random() * 20);
                balonshekilleri()
                kordinantY = Math.floor(Math.random() * 690);
                kordinantX = Math.floor(Math.random() * 690);
                top.css('margin-left', kordinantX)
                top.css('margin-right', kordinantX)
                top.css('background', `${balon}`).css('width', `${baloncssWidth}`).css('height', `${baloncssHeight}`)
                top.addClass(`${balonstatus}`)
                top.on('click', function() {
                    vaxt.css('color', 'green').css('font-size', '45px')
                    count = count + 500
                    top.hide()
                    xal = xal + 1
                    xalprint.animate({ opacity: '0.4' }, "slow");
                    xalprint.animate({ opacity: '0.8' }, "slow");
                    xalprint.animate({ opacity: '0.4' }, "slow");
                    xalprint.animate({ opacity: '0.8' }, "slow");
                    xalprint.text(`${xal}`)
                    if (xal == 10) {
                        // var body = $('body')
                        // body.css('background-image', 'url(shekiller/level1.png)')
                    }

                })
                div.append(top)

            }
            setInterval(() => {
                top.css('transition', '10s')
                top.css('transform', `translateY(650px)`)
            }, 100);
            setInterval(() => {
                vaxt.css('color', 'red').css('font-size', '40px')
                top.hide()
                count = count - 100
            }, 6200);

        }, 500);


    }

    function balonshekilleri() {
        if (balonrand == 1) {
            balon = 'url(/shekiller/balon1.png)'
            baloncssWidth = '25px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 2) {
            balon = 'url(/shekiller/balon2.png)'
            baloncssWidth = '25px'
            baloncssHeight = '50px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 3) {
            balon = 'url(/shekiller/balon3.png)'
            baloncssWidth = '25px'
            baloncssHeight = '50px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 4) {
            balon = 'url(/shekiller/balon4.png)'
            baloncssWidth = '25px'
            baloncssHeight = '50px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 5) {
            balon = 'url(/shekiller/balon5.png)'
            baloncssWidth = '25px'
            baloncssHeight = '50px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 6) {
            balon = 'url(/shekiller/balon6.png)'
            baloncssWidth = '25px'
            baloncssHeight = '50px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 7) {
            balon = 'url(/shekiller/newbalon1.png)'
            baloncssWidth = '35px'
            baloncssHeight = '45px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 8) {
            balon = 'url(/shekiller/newbalon2.png)'
            baloncssWidth = '35px'
            baloncssHeight = '45px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 9) {
            balon = 'url(/shekiller/newbalon3.png)'
            baloncssWidth = '35px'
            baloncssHeight = '45px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 10) {
            balon = 'url(/shekiller/newbalon4.png)'
            baloncssWidth = '35px'
            baloncssHeight = '45px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 11) {
            balon = 'url(/shekiller/newbalon5.png)'
            baloncssWidth = '35px'
            baloncssHeight = '45px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 12) {
            balon = 'url(/shekiller/newbalon6.png)'
            baloncssWidth = '35px'
            baloncssHeight = '45px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 13) {
            balon = 'url(/shekiller/newbalon7.png)'
            baloncssWidth = '35px'
            baloncssHeight = '45px'
            balonstatus = 'sadebalon'
        } else if (balonrand == 14) {
            balon = 'url(/shekiller/newbalon8.png)'
            baloncssWidth = '35px'
            baloncssHeight = '45px'
            balonstatus = 'sadebalon'
        }
        if (balonrand == 15) {
            balon = 'url(/shekiller/bonusbalon1.png)'
            baloncssWidth = '40px'
            baloncssHeight = '40px'
            balonstatus = 'bonusballoon'

        }
        if (balonrand == 16) {
            balon = 'url(/shekiller/bonusbalon2.png)'
            baloncssWidth = '40px'
            baloncssHeight = '40px'
            balonstatus = 'bonusballoon'

        }
        if (balonrand == 17) {
            balon = 'url(/shekiller/bonusbalon3.png)'
            baloncssWidth = '40px'
            baloncssHeight = '40px'
            balonstatus = 'bonusballoon'

        }
        if (balonrand == 18) {
            balon = 'url(/shekiller/bonusbalon4.png)'
            baloncssWidth = '40px'
            baloncssHeight = '40px'
            balonstatus = 'bonusballoon '

        }
        if (balonrand == 19) {
            balon = 'url(/shekiller/bonusbalon5.png)'
            baloncssWidth = '40px'
            baloncssHeight = '40px'
            balonstatus = 'bonusballoon'

        }
        if (balonrand == 20) {
            balon = 'url(/shekiller/bonusbalon6.png)'
            baloncssWidth = '40px'
            baloncssHeight = '40px'
            balonstatus = 'bonusballoon'
        }
    }
    $('#gamestart').on('click', function() {
        $('.basla').show()
        $('#level').text(`Level:  0`)
        $('#best_score').text(`Best Score:  ${bestscore}`)
        $('#new_score').text(`Sonuncu Oyun Scoru:  ${newscore}`)
        $('#total_score').text(`Umumi Toplanan Yumurtalar:  ${totalscore}`)

        $('#usernames').text(`username:  ${username}`)
        $('.esas').hide()
        $('.helps').hide()
        $('#haqqindashow').hide()
        $('#qeydiyyatshow').hide()
        $('#loginandregister').show()
        $('.cloud').show()
        newbox()
    })
    $('#haqqinda').on('click', function() {
        $('.cloud').hide()
        $('#haqqindashow').addClass('animated bounceInRight')
        $('#haqqindashow').show()
        $('#haqqinda').hide()
        $('.helps').css('left', '120px')
        $('.helps').css('top', '450px')
        $('#qeydiyyatshow').hide()
        $('#qeydiyyat').show()
    })
    $('#qeydiyyat').on('click', function() {
        $('#gameoverimg').hide()
        $('.helps').css('left', '120px')
        $('.helps').css('top', '450px')
        $('#gameover').hide()
        $('#qeydiyyat').hide()
        $('#haqqindashow').hide()
        $('#haqqinda').show()
        $('.cloud').hide()
        $('.basla').hide()
        $('#qeydiyyatshow').show()
    })


})