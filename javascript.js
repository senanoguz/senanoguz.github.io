var a = document.getElementById("levelid")
var b = document.getElementById("bestscoreid")
var c = document.getElementById("totalscoreid")
var d = document.getElementById("btnid")
var bar = document.getElementById("bar2");

function bestscoreshow() {
    a.style.left = "-400px"
    b.style.left = "40px"
    c.style.left = "-400px"
    d.style.left = "0px"
}

function totalscoreshow() {
    a.style.left = "-400px"
    b.style.left = "-400px"
    c.style.left = "40px"
    d.style.left = "120px"
}

function levelshow() {
    a.style.left = "20px"
    b.style.left = "-400px"
    c.style.left = "-400px"
    d.style.left = "210px"
}


$(document).ready(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyAJLO2LSewcHg0Me_bGgB-byeZB9cr4f-Y",
        authDomain: "myballongame.firebaseapp.com",
        databaseURL: "https://myballongame.firebaseio.com",
        projectId: "myballongame",
        storageBucket: "myballongame.appspot.com",
        messagingSenderId: "887232183990",
        appId: "1:887232183990:web:92854b6050d38583c03017"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    allrating()
    var username;
    var email;
    var bestscore
    var newscore
    var totalscore
    var level
    var leveltimeprice

    function gameLogin() {
        var username = $('#username_log').val()
        var password = $('#password_log').val()
        if (username === '') {
            $('#okay').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Username bos ola bilmez`)
        } else if (password === '') {
            $('#okay').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Password bos ola bilmez`)

        } else {
            firebase.auth().signInWithEmailAndPassword(username, password)
                .then(function() {
                    setInterval(() => {
                        $('#okay').removeClass('alert alert-danger')
                        $('#okay').css('display', 'block').addClass('alert alert-success').text(`Xos Geldin ${username} Giris Ugurludur 3 saniye sonra Esas sehifeye yonlendirileceksiniz`)
                        window.location.href = 'index.html'
                    }, 3000);
                })
                .catch(function(error) {
                    $('#okay').css('display', 'block').addClass('alert alert-danger').html(`Username ve Password bir birine uygun gelmir <div class="alert alert-dark text-dark">${error.message}</div>`)
                })
        }
    }

    function gameRegister() {
        var username = $('#username').val()
        var email = $('#email').val()
        var password = $('#password').val()
        var password2 = $('#password2').val()
            // bestscore = '0'
            // newscore = '0'
            // totalscore = '0'
            // level = '0'
        if (username === '') {
            $('#tamam').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Username bos ola bilmez`)
        } else if (password === '') {
            $('#tamam').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Password bos ola bilmez`)

        } else if (password !== password2) {
            $('#tamam').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Parollar bir birine uygun gelmir`)

        } else if (username === '' || password === '' || password === '' || email === '' || bestscore === '' || newscore === '' || totalscore === '') {
            $('#tamam').css('display', 'block').addClass('alert alert-danger').text(`Xeta: * olan butun xanalari doldurmaq vacibdir`)
        } else {

            $('#tamam').removeClass('alert alert-danger')
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function() {
                    firebase.auth().signInWithEmailAndPassword(email, password)
                        .then(function() {
                            database.ref("users/" + current_user).child("user_details").set({
                                email: email,
                                username: username,
                                bestscore: 0,
                                newscore: 0,
                                totalscore: 0,
                                level: 0
                            })
                            setInterval(() => {
                                $('#tamam').css('display', 'block').addClass('alert alert-success').text('Qeydiyyat ugurla tamamlandi Esas Sehifeye yonlendirilirsiniz')
                                window.location.href = 'index.html'
                            }, 2000);
                        })
                }).catch(function(error) {
                    $('#tamam').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Ola bilsin ki username artiq qeydiyyatdan kecib basqa Username adi yoxlayin`)
                    $('#tamam').css('display', 'block').addClass('alert alert-danger').text(error.message)
                })

        }
    }
    //useri menimsetme

    $("#btnlogin").on("click", function() {
        gameLogin()
    })
    $('#btnregister').on('click', function() {
        gameRegister()
    })
    var totalscorerank = []
    var bestscorerank = []
    var ullevel = $('#rating_level')
    // var levelscorerank = []




//     var scoresRef = firebase.database().ref("rating").orderByChild('bestscore').limitToLast(5);
//     scoresRef.on("child_added", function(snapshot) {
//       snapshot.forEach(function(data) {
// console.log(data.val())

//       });
//     });

    //reytinge qederki datani almaq
    function allrating() {
        var ratingscore = firebase.database().ref('/rating')
        ratingscore.orderByChild('totalscore').limitToLast(10).on('value', function(res) {
            var data = res.val()
            var ultotalscore = $('#rating_totalscore')
            ultotalscore.empty()
            Object.keys(data).map(key => {
                var item = data[key]
                var litotalscore = $('<li>')
                litotalscore.addClass('rating')
                litotalscore.text(` Total: ${item.totalscore}   ${item.username}`)
                ultotalscore.append(litotalscore)
            })
        })
        ratingscore.orderByChild('bestscore').limitToLast(10).on('value', function(res) {
            var data = res.val()
            var mydata = []
            var ulbestscore = $('#rating_bestscore')
            ulbestscore.empty()
            Object.keys(data).map(key => {
                var item = data[key]
                var libestscore = $('<li>')
                mydata.push(item.totalscore)
                libestscore.addClass('rating')
                libestscore.text(` Best: ${item.totalscore}   ${item.username}`)
                ulbestscore.append(libestscore)
            })
    
        })
        ratingscore.orderByChild('level').limitToLast(10).on('value', function(res) {
            // levelscorerank.push({
            //     level : res.val().level,
            //     username: res.val().username
            // })
            var data = res.val()
               ullevel = $('#rating_level')
            ullevel.empty()
            Object.keys(data).map(key => {
                var item = data[key]
                var lilevel = $('<li>')
                lilevel.addClass('rating')
                lilevel.text(` Level: ${item.level}   ${item.username}`)
                ullevel.append(lilevel)
            })
        })

        
        // var ratingscore = firebase.database().ref('/rating')
        // ratingscore.on('value', function(res) {
        //     var ulbestscore = $('#rating_bestscore')
        //     // var ultotalscore = $('#rating_totalscore')
        //     // var ullevel = $('#rating_level')
        //     // ulbestscore.empty()
        //     // ultotalscore.empty()

        //     ullevel.empty()
        //         // libestscore.empty()
        //         // litotalscore.empty()
        //         // lilevel.empty()
        //     var data = res.val()
        //     Object.keys(data).map(key => {
        //         var libestscore = $('<li>')
        //         // var litotalscore = $('<li>')
        //         var lilevel = $('<li>')
        //         var item = data[key]
        //         libestscore.addClass('rating')
        //         // litotalscore.addClass('rating')
        //         lilevel.addClass('rating')
                // libestscore.text(`  (${item.bestscore})  ${item.username.toUpperCase()}`)
                // ulbestscore.append(libestscore)
                // litotalscore.text(` (${item.totalscore})   ${item.username.toUpperCase()}`)
                // ultotalscore.append(litotalscore)
                // lilevel.text(` (${item.level})    ${item.username.toUpperCase()}`)
                // ullevel.append(lilevel)
                    // //scorebest
                    // var scorebest = $('<span>')
                    // scorebest.css('background','red')
                    // scorebest.text(item.bestscore)
                    // //scoretotal
                    // var scoretotal = $('<span>')
                    // scoretotal.css('background','red')
                    // scoretotal.text(item.totalscore)
                    // //scorelevel
                    // var scorelevel = $('<span>')
                    // scorelevel.css('background','red')
                    // scorelevel.text(item.level)
                    // var usernamelevel = $('<span>')
                    // usernamelevel.css('background','green')
                    // scorelevel.text(item.username)
                    // //umumi
                    // libestscore.addClass('rating')
                    // litotalscore.addClass('rating')
                    // lilevel.addClass('rating')


                // arr.push({
                //     bestscore:item.bestscore,
                //     username:item.username
                // })

                // for(i = 0;i<arr.length;i++){
                //     maxi = arr[0].bestscore
                //     if (maxi > arr[i].bestscore){
                //         maxi = arr[i].bestscore
                //     }
                // }
                // console.log(maxi)

        //     })
        // })
    }
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            current_user = user.uid
            var div = $('.userlogin')
            var button = $('<button>')
            button.addClass('btn btn-danger logout')
            $('.logout').empty()
            button.text('Logout')
            div.append(button)
            $('.logout').on('click', function() {
                firebase.auth().signOut()
                    .then(function() {
                        window.location.href = 'index.html'
                    })
            })
            var details = database.ref().child("users/" + current_user);
            details.on('value', function(snapshot) {
                snapshot.forEach(function(item) {
                    email = item.val().email,
                        username = item.val().username,
                        bestscore = item.val().bestscore,
                        newscore = item.val().newscore,
                        totalscore = item.val().totalscore,
                        level = item.val().level
                })
            })

            // var bestscorerating = []
            // var siralibestscore
            // var arr = []
            // var maxi = 0
            // var mini =0

            // var rating = database.ref().child("rating/").limitToLast(10);
            // rating.on('value',function(snapshot){
            //     snapshot.forEach(function(res){
            //             // console.log(item.val().bestscore,item.val().username,item.val().totalscore,item.val().level)
            //             // console.log(`best: ${item.val().bestscore}`)
            //             // bestscorerating.push(item.val().bestscore,item.val().username)
            //             var data = res.val()
            //     Object.keys(data).map(bestscore => {

            //       var item = data[bestscore]

            //         console.log(item)

            //     })

            // })
            // // bestscorerating.sort(function(a, b){return b - a})
            // // console.log(bestscorerating)
            // // for(var i =0 ;i <=10;i++){
            // //     console.log(bestscorerating[i])
            // // }
            // })


            var game = $('#game')
            var xal = 0
            var kordinantX = 0
            var balonstatus
            var reng = 0
            var balon
            var baloncssWidth
            var baloncssHeight
            var bosalt

            function userGame() {
                //faiz
                var faizcubugu
                    //hazirdi
                var kecid

                function faiz() {

                    if (totalscore + xal >= -1 && totalscore + xal < 25) {
                        level = 0;
                        kecid = 25
                        faizcubugu = ((totalscore + xal) / 25) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 25 && totalscore + xal < 50) {
                        level = 1;
                        kecid = 50
                        faizcubugu = ((totalscore + xal) / 50) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 50 && totalscore + xal < 80) {
                        level = 2;
                        kecid = 80
                        faizcubugu = ((totalscore + xal) / 80) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)

                    }
                    if (totalscore + xal >= 80 && totalscore + xal < 100) {
                        level = 3;
                        kecid = 100
                        faizcubugu = ((totalscore + xal) / 100) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 100 && totalscore + xal < 150) {
                        kecid = 150
                        level = 4;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 150 && totalscore + xal < 250) {
                        kecid = 250
                        level = 5;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 250 && totalscore + xal < 500) {
                        kecid = 500
                        level = 6;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 500 && totalscore + xal < 800) {
                        kecid = 800
                        level = 7;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 800 && totalscore + xal < 1200) {
                        kecid = 1200
                        level = 8;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 1200 && totalscore + xal < 1700) {
                        kecid = 1700
                        level = 9;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 1700 && totalscore + xal < 2500) {
                        kecid = 2500
                        level = 10;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 2500 && totalscore + xal < 5000) {
                        kecid = 5000
                        level = 11;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 5000 && totalscore + xal < 10000) {
                        kecid = 10000
                        level = 12;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 10000 && totalscore + xal < 25000) {
                        kecid = 25000
                        level = 13;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 25000 && totalscore + xal < 50000) {
                        kecid = 50000
                        level = 14;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 50000 && totalscore + xal < 100000) {
                        kecid = 100000
                        level = 15;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 100000 && totalscore + xal < 200000) {
                        kecid = 200000
                        level = 16;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (faizcubugu >= 100) {
                        level++
                    } else {
                        bar.style.width = parseInt(faizcubugu) + '%';
                        bar.innerHTML = parseInt(faizcubugu) + '%';
                    }
                }
                faiz()
                function ratingsystem() {
                    if (totalscore + xal < 25) {
                        level = 0
                        leveltimeprice = 1
                    }
                    if (totalscore + xal > 25) {
                        level = 1
                        leveltimeprice = 2
                    }
                    if (totalscore + xal > 50) {
                        level = 2
                        leveltimeprice = 3
                    }
                    if (totalscore + xal > 80) {
                        level = 3
                        leveltimeprice = 4
                    }
                    if (totalscore + xal > 100) {
                        level = 4
                        leveltimeprice = 5
                    }
                    if (totalscore + xal > 150) {
                        level = 5
                        leveltimeprice = 6
                    }
                    if (totalscore + xal > 250) {
                        level = 6
                        leveltimeprice = 8
                    }
                    if (totalscore + xal > 500) {
                        level = 7
                        leveltimeprice = 10
                    }
                    if (totalscore + xal > 800) {
                        level = 8
                        leveltimeprice = 12
                    }
                    if (totalscore + xal > 1200) {
                        level = 9
                        leveltimeprice = 15
                    }
                    if (totalscore + xal > 1700) {
                        level = 10
                        leveltimeprice = 18
                    }
                    if (totalscore + xal > 2500) {
                        level = 11
                        leveltimeprice = 20
                    }
                    if (totalscore + xal > 5000) {
                        level = 12
                        leveltimeprice = 25
                    }
                    if (totalscore + xal > 10000) {
                        level = 13
                        leveltimeprice = 30
                    }
                    if (totalscore + xal > 25000) {
                        level = 14
                        leveltimeprice = 40
                    }
                    if (totalscore + xal > 50000) {
                        level = 15
                        leveltimeprice = 50
                    }
                    if (totalscore + xal > 100000) {
                        level = 16
                        leveltimeprice = 100
                    }

                }

                ratingsystem()
                if (xal > bestscore) {
                    bestscore = xal;
                } else {
                    bestscore = bestscore
                }
                totalscore = totalscore + xal
                database.ref("users/" + current_user).child("user_details").set({
                    email: email,
                    username: username,
                    bestscore: bestscore,
                    newscore: newscore,
                    totalscore: totalscore,
                    level: level
                })
                database.ref("rating/" + current_user).set({
                    username: username,
                    bestscore: bestscore,
                    totalscore: totalscore,
                    level: level
                })



                $('.melumatlar').css('background', 'url(shekiller/background.png)')
                count = (6000 * leveltimeprice)
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
                        return gameOverUser();
                    }
                    count--;
                    document.getElementById("vaxt").innerHTML = count / 100 + " s";

                }

                function gameOverUser() {
                    $('.melumatlar').css('background', 'url(shekiller/tabloranking.png)')
                    $('#gamestart').hide()
                    $('#qeydiyyat').hide()
                    console.table(email, username, bestscore, totalscore, level, newscore)

                    ratingsystem()
                    if (xal > bestscore) {
                        bestscore = xal;
                    } else {
                        bestscore = bestscore
                    }
                    totalscore = totalscore + xal
                    database.ref("users/" + current_user).child("user_details").set({
                        email: email,
                        username: username,
                        bestscore: bestscore,
                        newscore: xal,
                        totalscore: totalscore,
                        level: level
                    })
                    database.ref("rating/" + current_user).set({
                        username: username,
                        bestscore: bestscore,
                        totalscore: totalscore,
                        level: level
                    })
                    $('.esas').show()
                    $('.basla').hide()
                    bosalt.empty()
                    game.append('<img class="animated bounceInDown delay-0.6s" id="gameoverimg" src="shekiller/gameover.png" width="300" height="250"/>')
                    $('#gameover').show()
                    $('.helps').addClass('animated bounceInUp delay-0.5s')
                    $('.helps').show()
                    $('.helps').css('left', '250px')
                    $('.helps').css('top', '350px')
                    $('#gamestart').text('Tekrar Oyna')
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
                            faiz()
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
                    // var leveldiv = $('#level')

                // var bar = $('#bar')
                // var bar2 = $('#bar2')
                // var kecid = $('#kecid')

                // $('#level').text(`Level:  ${level}`)

                // bar.append(bar2)
                // leveldiv.append(bar)
                // leveldiv.append(kecid)
                $('#best_score').text(`Best Score:  ${bestscore}`)
                $('#new_score').text(`Sonuncu Oyun Scoru:  ${newscore}`)
                $('#total_score').text(`Umumi Toplanan Yumurtalar:  ${totalscore}`)
                $('#usernames').text(`username:  ${username.toUpperCase()}`)
                $('.esas').hide()
                $('.helps').hide()
                $('#haqqindashow').hide()
                $('#qeydiyyatshow').hide()
                $('#loginandregister').show()
                $('.cloud').show()
                userGame()
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





            //eger istifadeci giris olmayibsa 
        } else {
            username = 'Qonaq'
            bestscore = ' (Qeydiyyatdan Kecin)'
            newscore = ' (Funksiya Passivdir)'
            totalscore = ' (Qeydiyyatdan Kecin)'
            level = ' (Funksiya Passivdir)'
            $('#dovshan').css('height', '200px').css('width', '150px')
            var game = $('#game')
            var xal = 0
            var kordinantX = 0
            var balonstatus
            var reng = 0
            var balon
            var baloncssWidth
            var baloncssHeight
            var bosalt

            function guestGame() {
                $('.melumatlar').css('background', 'url(shekiller/background.jpg)')
                count = 6000
                $('#gameoverimg').hide()
                $('#gameover').hide()
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
                        return gameOverGuest();
                    }
                    count--;
                    document.getElementById("vaxt").innerHTML = count / 100 + " s";

                }

                function gameOverGuest() {
                    $('.melumatlar').css('background', 'url(shekiller/tabloranking.png)')
                    $('.esas').show()
                    $('.basla').hide()
                    bosalt.empty()
                    game.append('<img class="animated bounceInDown delay-0.6s" id="gameoverimg" src="shekiller/gameover.png" width="300" height="250"/>')
                    $('#gameover').show()
                    $('.helps').addClass('animated bounceInUp delay-0.5s')
                    $('.helps').hide()
                    $('.helps').css('left', '250px')
                    $('.helps').css('top', '350px')
                    $('#gamestart').hide()
                    $('#giris').text('Tekrar Oyna')
                    $('#qeydiyyat').hide()
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
                $('#level').text(`Level:  ${level}`)
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
                guestGame()
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
        }
    })



})