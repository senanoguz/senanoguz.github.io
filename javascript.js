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

var bonusBalonRandomXal = 1
var bonusBalonRandomYumurta = 1
var messagelvupstrong
var messagelvupspan
var messagegamestartspan
var messagegamestartstrong
var levelphoto
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
    var ballonxal = 1
    var ballonsaniye = 5
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
        console.log(username)
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
// firebase.database().ref('/rating').limitToLast(10).on('value',function(res){
//     console.log(res.val())
// })

var arry = []

    var ratingscore = firebase.database().ref('/rating')
    ratingscore.orderByChild("bestscore").limitToFirst(10).on("child_added", function(snapshot) {
        // console.log(snapshot.val());
      });

 

    //reytinge qederki datani almaq
    function allrating() {
        var ratingscore = firebase.database().ref('/rating')
        // ratingscore.limitToLast(10).on('value', function(res) {
        //     var data = res.val()
        //     var ultotalscore = $('#rating_totalscore')
        //     ultotalscore.empty()
        //     ullevel = $('#rating_level')
        //     ullevel.empty()
        //     var ulbestscore = $('#rating_bestscore')
        //     ulbestscore.empty()
        //     Object.keys(data).map(key => {
        //         var item = data[key]
        //         var litotalscore = $('<li>')
        //         litotalscore.addClass('rating')
        //         litotalscore.text(` Total: ${item.totalscore}   ${item.username.charAt(0).toUpperCase() + item.username.slice(1).toLowerCase()}`)
        //         ultotalscore.append(litotalscore)
        //         var lilevel = $('<li>')
        //         lilevel.addClass('rating')
        //         lilevel.text(` Level: ${item.level}   ${item.username.charAt(0).toUpperCase() + item.username.slice(1).toLowerCase()}`)
        //         ullevel.append(lilevel)
        //         var libestscore = $('<li>')
        //         libestscore.addClass('rating')
        //         libestscore.text(` Best: ${item.bestscore}   ${item.username.charAt(0).toUpperCase() + item.username.slice(1).toLowerCase()}`)
        //         ulbestscore.append(libestscore)
        //     })
        // })


        ratingscore.orderByChild("bestscore").limitToLast(10).on("child_added", function(snapshot) {
            var data = snapshot.val()
            var ulbestscore = $('#rating_bestscore')
            var libestscore = $('<li>')
            libestscore.addClass('rating')
            libestscore.text(`Best:  (${data.bestscore})  ${data.username.toUpperCase()}`)
            ulbestscore.append(libestscore)
            })
        ratingscore.orderByChild("totalscore").limitToLast(10).on("child_added", function(snapshot) {
            var data = snapshot.val()
            var ultotalscore = $('#rating_totalscore')
                var litotalscore = $('<li>')
                ultotalscore.append(litotalscore)
                litotalscore.addClass('rating')
                litotalscore.text(`Total: (${data.totalscore})   ${data.username.toUpperCase()}`)
            })
        ratingscore.orderByChild("level").limitToLast(10).on("child_added", function(snapshot) {
                var data = snapshot.val()
            var ultotalscore = $('#rating_level')
                var lilevel = $('<li>')
                lilevel.addClass('rating')            
                lilevel.text(` Level: ${data.level}   ${data.username.charAt(0).toUpperCase() + data.username.slice(1).toLowerCase()}`)
                ullevel.append(lilevel)
            })
        // ratingscore.orderByChild('level').limitToLast(10).on('value', function(res) {
        //     // levelscorerank.push({
        //     //     level : res.val().level,
        //     //     username: res.val().username
        //     // })
        //     var data = res.val()
        //        ullevel = $('#rating_level')
        //         ullevel.empty()
        //     Object.keys(data).map(key => {
        //         var item = data[key]
        //         var lilevel = $('<li>')
        //         lilevel.addClass('rating')
        //         lilevel.text(` Level: ${item.level}   ${item.username.charAt(0).toUpperCase() + item.username.slice(1).toLowerCase()}`)
        //         ullevel.append(lilevel)
        //     })
        // })


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
            $('.logout').empty()
            button.addClass('btn btn-danger logout')
            button.text(`Hesabdan Çıxış`)
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
                $('#best_score').text(`Best Score:  ${bestscore}`)
                $('#new_score').text(`Sonuncu Oyun Scoru:  ${newscore}`)
                $('#total_score').text(`Total Score:  ${totalscore}`)
                $('#usernames').text(`username:  ${username}`)
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
                        if (totalscore + xal > 26){
                            $('#messagegamestart').addClass('animated fadeOutRight')
                            $('#messagelvup').hide()
                            $('#levelupphoto').addClass('animated fadeOutRight')
                            messagelvupstrong = 'Urra...!'
                            messagelvupspan= 'Artıq 1 ci level oldunuz Təbriklər !!!'
                            $('.messagelvupstrong').text(messagelvupstrong)
                            $('.messagelvupspan').text(messagelvupspan)
                            $('#messagelvup').addClass('animated bounce')
                            $('#messagelvup').show()
                            $('#messagelvup').addClass('animated fadeInDown')
                            $('#levelphoto').addClass('animated fadeOutLeft')
                            $('#levelupphoto').attr('src','shekiller/lvprs/lv1.png').css('width','100px').css('height','120px')
                            $('#levelupphoto').addClass('animated flip')
                            $('#levelphoto').empty('animated fadeOutLeft')
                            $('#levelupphoto').css('position','relative').css('bottom','240px').css('left','40px')
                            $('#levelupphoto').show()
                        }
                        level = 1;
                        kecid = 50
                        faizcubugu = ((totalscore + xal) / 50) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 50 && totalscore + xal < 80) {
                        if (totalscore + xal > 51){
                            $('#messagegamestart').addClass('animated fadeOutRight')
                            $('#messagelvup').hide()
                            $('#levelupphoto').addClass('animated fadeOutRight')
                            messagelvupstrong = 'Urra...!'
                            messagelvupspan= 'Artıq 2 ci level oldunuz Təbriklər !!!'
                            $('.messagelvupstrong').text(messagelvupstrong)
                            $('.messagelvupspan').text(messagelvupspan)
                            $('#messagelvup').addClass('animated bounce')
                            $('#messagelvup').show()
                            $('#messagelvup').addClass('animated fadeInDown')
                            $('#levelphoto').addClass('animated fadeOutLeft')
                            $('#levelupphoto').attr('src','shekiller/lvprs/lv2.png').css('width','100px').css('height','120px')
                            $('#levelupphoto').addClass('animated flip')
                            $('#levelphoto').empty('animated fadeOutLeft')
                            $('#levelupphoto').css('position','relative').css('bottom','240px').css('left','40px')
                            $('#levelupphoto').show()
                        }
                        level = 2;
                        kecid = 80
                        faizcubugu = ((totalscore + xal) / 80) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)

                    }
                    if (totalscore + xal >= 80 && totalscore + xal < 100) {
                        if (totalscore + xal >= 81){
                            console.log('ici')
                            $('#messagegamestart').addClass('animated fadeOutRight')
                            $('#messagelvup').hide()
                            $('#levelupphoto').addClass('animated fadeOutRight')
                            messagelvupstrong = 'Afərinnn ....!!! '
                            messagelvupspan= 'Bir oyunda bu nəticəyə hər istifadəçi çata bilmir Level 3 oldunuz Təbrik edirəm'
                            $('.messagelvupstrong').text(messagelvupstrong)
                            $('.messagelvupspan').text(messagelvupspan)
                            $('#messagelvup').addClass('animated bounce')
                            $('#messagelvup').show()
                            $('#messagelvup').addClass('animated fadeInDown')
                            $('#levelphoto').addClass('animated fadeOutLeft')
                            $('#levelupphoto').attr('src','shekiller/lvprs/lv3.png').css('width','100px').css('height','120px')
                            $('#levelupphoto').addClass('animated flip')
                            $('#levelphoto').empty('animated fadeOutLeft')
                            $('#levelupphoto').css('position','relative').css('bottom','240px').css('left','40px')
                            $('#levelupphoto').show()
                        }
                        
                        level = 3;
                        kecid = 100
                        faizcubugu = ((totalscore + xal) / 100) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 100 && totalscore + xal < 150) {
                        console.log('icoluci')


                        if (totalscore + xal >= 101){
                            $('#messagegamestart').addClass('animated fadeOutRight')
                            $('#messagelvup').hide()
                            $('#levelupphoto').addClass('animated fadeOutRight')
                            messagelvupstrong = 'Məni Təccübləndirməyə davam edirsiz ))'
                            messagelvupspan= 'Level 4 oldunuz Çox yaxşı irəliləyirsiniz'
                            $('.messagelvupstrong').text(messagelvupstrong)
                            $('.messagelvupspan').text(messagelvupspan)
                            $('#messagelvup').show()
                            $('#messagelvup').addClass('animated fadeInDown')
                            $('#levelphoto').addClass('animated fadeOutLeft')
                            $('#levelupphoto').attr('src','shekiller/lvprs/lv4.png').css('width','100px').css('height','120px')
                            $('#levelupphoto').addClass('animated flip')
                            $('#levelphoto').empty('animated fadeOutLeft')
                            $('#levelupphoto').css('position','relative').css('bottom','240px').css('left','40px')
                            $('#levelupphoto').show()
                        }
                        kecid = 150
                        level = 4;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 150 && totalscore + xal < 250) {
                        if (totalscore + xal >= 151){
                            $('#messagegamestart').addClass('animated fadeOutRight')
                            $('#messagelvup').hide()
                            $('#levelupphoto').addClass('animated fadeOutRight')
                            messagelvupstrong = 'Level 5 oldunuz Təbriklər'
                            messagelvupspan= 'Dovşanlarınız sizi çox sevir onlara çox yaxşı qulluq edirsiniz :)'
                            $('.messagelvupstrong').text(messagelvupstrong)
                            $('.messagelvupspan').text(messagelvupspan)
                            $('#messagelvup').addClass('animated bounce')
                            $('#messagelvup').show()
                            $('#messagelvup').addClass('animated fadeInDown')
                            $('#levelphoto').addClass('animated fadeOutLeft')
                            $('#levelupphoto').attr('src','shekiller/lvprs/lv5.png').css('width','100px').css('height','120px')
                            $('#levelupphoto').addClass('animated flip')
                            $('#levelphoto').empty('animated fadeOutLeft')
                            $('#levelupphoto').css('position','relative').css('bottom','240px').css('left','40px')
                            $('#levelupphoto').show()
                        }
                        kecid = 250
                        level = 5;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 250 && totalscore + xal < 500) {
                        if (totalscore + xal >= 500){
                            $('#messagegamestart').addClass('animated fadeOutRight')
                            $('#messagelvup').hide()
                            $('#levelupphoto').addClass('animated fadeOutRight')
                            messagelvupstrong = 'Nəhayət 6 -cı Levelsiniz Əla...'
                            messagelvupspan= 'Dovşanlar çox şanslıdır :)'
                            $('.messagelvupstrong').text(messagelvupstrong)
                            $('.messagelvupspan').text(messagelvupspan)
                            $('#messagelvup').addClass('animated bounce')
                            $('#messagelvup').show()
                            $('#messagelvup').addClass('animated fadeInDown')
                            $('#levelphoto').addClass('animated fadeOutLeft')
                            $('#levelupphoto').attr('src','shekiller/lvprs/lv6.png').css('width','100px').css('height','120px')
                            $('#levelupphoto').addClass('animated flip')
                            $('#levelphoto').empty('animated fadeOutLeft')
                            $('#levelupphoto').css('position','relative').css('bottom','240px').css('left','40px')
                            $('#levelupphoto').show()
                        }
                        kecid = 500
                        level = 6;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 500 && totalscore + xal < 800) {
                        if (totalscore + xal >= 800){
                            $('#messagegamestart').addClass('animated fadeOutRight')
                            $('#messagelvup').hide()
                            $('#levelupphoto').addClass('animated fadeOutRight')
                            messagelvupstrong = 'Oyunda inanın ki ən yaxşılardansınız...'
                            messagelvupspan= 'Çox sürrətlə Level 7 oldunuz Afərin.'
                            $('.messagelvupstrong').text(messagelvupstrong)
                            $('.messagelvupspan').text(messagelvupspan)
                            $('#messagelvup').addClass('animated bounce')
                            $('#messagelvup').show()
                            $('#messagelvup').addClass('animated fadeInDown')
                            $('#levelphoto').addClass('animated fadeOutLeft')
                            $('#levelupphoto').attr('src','shekiller/lvprs/lv7.png').css('width','100px').css('height','120px')
                            $('#levelupphoto').addClass('animated flip')
                            $('#levelphoto').empty('animated fadeOutLeft')
                            $('#levelupphoto').css('position','relative').css('bottom','240px').css('left','40px')
                            $('#levelupphoto').show()
                        }
                        kecid = 800
                        level = 7;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 800 && totalscore + xal < 1200) {
                        if (totalscore + xal >= 1200){
                            $('#messagegamestart').addClass('animated fadeOutRight')
                            $('#messagelvup').hide()
                            $('#levelupphoto').addClass('animated fadeOutRight')
                            messagelvupstrong = 'Siz bu oyunu'
                            messagelvupspan= 'Bu oyunda sizi çox sevdi :) Level 8 Afərin'
                            $('.messagelvupstrong').text(messagelvupstrong)
                            $('.messagelvupspan').text(messagelvupspan)
                            $('#messagelvup').addClass('animated bounce')
                            $('#messagelvup').show()
                            $('#messagelvup').addClass('animated fadeInDown')
                            $('#levelphoto').addClass('animated fadeOutLeft')
                            $('#levelupphoto').attr('src','shekiller/lvprs/lv8.png').css('width','100px').css('height','120px')
                            $('#levelupphoto').addClass('animated flip')
                            $('#levelphoto').empty('animated fadeOutLeft')
                            $('#levelupphoto').css('position','relative').css('bottom','240px').css('left','40px')
                            $('#levelupphoto').show()
                        }
                        kecid = 1200
                        level = 8;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 1200 && totalscore + xal < 1700) {
                        if (totalscore + xal >= 1700){
                            $('#messagegamestart').addClass('animated fadeOutRight')
                            $('#messagelvup').hide()
                            $('#levelupphoto').addClass('animated fadeOutRight')
                            messagelvupstrong = 'Gözlərimə inanmıram Level 9'
                            messagelvupspan= `Dovşanlarınız ${totalscore} ədəd  yumurta ehtiyatını yığdı Sayənizdə ))`
                            $('.messagelvupstrong').text(messagelvupstrong)
                            $('.messagelvupspan').text(messagelvupspan)
                            $('#messagelvup').addClass('animated bounce')
                            $('#messagelvup').show()
                            $('#messagelvup').addClass('animated fadeInDown')
                            $('#levelphoto').addClass('animated fadeOutLeft')
                            $('#levelupphoto').attr('src','shekiller/lvprs/lv9.png').css('width','100px').css('height','120px')
                            $('#levelupphoto').addClass('animated flip')
                            $('#levelphoto').empty('animated fadeOutLeft')
                            $('#levelupphoto').css('position','relative').css('bottom','240px').css('left','40px')
                            $('#levelupphoto').show()
                        }
                        kecid = 1700
                        level = 9;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 1700 && totalscore + xal < 2500) {
                        if (totalscore + xal >= 2500){
                            $('#messagegamestart').addClass('animated fadeOutRight')
                            $('#messagelvup').hide()
                            $('#levelupphoto').addClass('animated fadeOutRight')
                            messagelvupstrong = 'Artıq Bu işin Ustadısınız...!'
                            messagelvupspan= `Dovşanlarınızın bu il ac qalmayacaq buna əmin olun :) Level 10`
                            $('.messagelvupstrong').text(messagelvupstrong)
                            $('.messagelvupspan').text(messagelvupspan)
                            $('#messagelvup').addClass('animated bounce')
                            $('#messagelvup').show()
                            $('#messagelvup').addClass('animated fadeInDown')
                            $('#levelphoto').addClass('animated fadeOutLeft')
                            $('#levelupphoto').attr('src','shekiller/lvprs/lv10.png').css('width','100px').css('height','120px')
                            $('#levelupphoto').addClass('animated flip')
                            $('#levelphoto').empty('animated fadeOutLeft')
                            $('#levelupphoto').css('position','relative').css('bottom','240px').css('left','40px')
                            $('#levelupphoto').show()
                        }
                        kecid = 2500
                        level = 10;
                        faizcubugu = ((totalscore + xal) / kecid) * 100;
                        $('#bar2').text(faizcubugu)
                        $('#level').text(`Level:  ${level}`)
                        $('#kecid').text(`${kecid} / ${totalscore + xal} = ${faizcubugu.toFixed(2)}`)
                    }
                    if (totalscore + xal >= 2500 && totalscore + xal < 5000) {
                        if (totalscore + xal >= 5000){
                            $('#messagegamestart').addClass('animated fadeOutRight')
                            $('#messagelvup').hide()
                            $('#levelupphoto').addClass('animated fadeOutRight')
                            messagelvupstrong = 'Level 11 olmağınız'
                            messagelvupspan= `sizi fərqləndirir Təbriklər`
                            $('.messagelvupstrong').text(messagelvupstrong)
                            $('.messagelvupspan').text(messagelvupspan)
                            $('#messagelvup').addClass('animated bounce')
                            $('#messagelvup').show()
                            $('#messagelvup').addClass('animated fadeInDown')
                            $('#levelphoto').addClass('animated fadeOutLeft')
                            $('#levelupphoto').attr('src','shekiller/lvprs/lv11.png').css('width','100px').css('height','120px')
                            $('#levelupphoto').addClass('animated flip')
                            $('#levelphoto').empty('animated fadeOutLeft')
                            $('#levelupphoto').css('position','relative').css('bottom','240px').css('left','40px')
                            $('#levelupphoto').show()
                        }
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
                    var text
                    var span
                    if (totalscore + xal < 25) {
                        level = 0
                        leveltimeprice = 1
                        var lv0message =1 +  Math.floor(Math.random() * 3);

                        if (lv0message === 1)
                        {
                        span = 'Başlanğıc'
                        text = '-da dovşanınızı biraz yumurta topladaraq sevindirəsiniz bəlkə ? :)'
                        }
                        if (lv0message === 2)
                        {
                        span = 'Oyunumuz'
                        text = 'sizə çox asan görünə bilər... Ancaq hər şey göründüyü kimi olmaya bilər :)'
                        }
                        if (lv0message === 3)
                        {
                        span = 'İlk'
                        text = 'olaraq onu deyim ki dovşanlar üçün yığdığınız yumurtalar sizin həmdə levelinizi artırır'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv0.png').css('width','100px').css('height','150px')
                    }
                    if (totalscore + xal > 25) {
                        var lv1message =1 +  Math.floor(Math.random() * 3);
                        if (lv1message === 1)
                        {
                        span = 'Artıq'
                        text = '1-ci leveldəsiniz  qollarınızı çirmələyin hələ yeni başlayırsınız :)'
                        }
                        if (lv1message === 2)
                        {
                        span = 'Biz'
                        text = 'sizə Elm verə bilmərik... Amma analitik düşünmə qabiliyyətinizi artıra bilərik '
                        }
                        if (lv1message === 3)
                        {
                        span = 'Dovşanlarınız'
                        text = 'üçün yumurta yığırsınız onlar sizə çox  minnətdardır :)'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv1.png').css('width','100px').css('height','120px')
                        level = 1
                        leveltimeprice = 2
                    }
                    if (totalscore + xal > 50) {
                        var lv2message =1 +  Math.floor(Math.random() * 3);
                        if (lv2message === 1)
                        {
                        span = 'Artıq'
                        text = '2-ci leveldəsiniz Bu hələ başlanğıcdır hə? Bizə bunu subut et )'
                        }
                        if (lv2message === 2)
                        {
                        span = 'Bəlkə'
                        text = 'bir neçə balonu vura bilmədin düşdü yerə. Narahat olma biz hər vurduğunuz balona görə sizə əlavə Bonuslar veririk '
                        }
                        if (lv2message === 3)
                        {
                        span = 'İpucu'
                        text = 'Hər balonun içində yumurta sayı fərqlidir ) bunu bilirdiz  ?'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv2.png').css('width','100px').css('height','120px')
                       
                        level = 2
                        leveltimeprice = 3
                        
                    }
                    if (totalscore + xal > 80) {
                        var lv3message =1 +  Math.floor(Math.random() * 3);
                        if (lv3message === 1)
                        {
                        span = 'İpucu'
                        text = 'Balonları vurmağ üçün click sayında limit yoxdur sizin mouse xarab ola bilər ancaq bizim güllə sayımız bitməz ))'
                        }
                        if (lv3message === 2)
                        {
                        span = 'Yenilik ?'
                        text = 'Oyunumuzda nə yeniliklər görmək istərdiniz ? senanoguz@mail.ru ünvanına yazın göndərin :) '
                        }
                        if (lv3message === 3)
                        {
                        span = 'İpucu'
                        text = 'Oyunda olan şarlar artıqca vaxtınız hər itirlən şara görə -1 saniyə geri gedir Tələsin'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv3.png').css('width','100px').css('height','120px')
                       
                        level = 3
                        leveltimeprice = 4
                    }
                    if (totalscore + xal > 100) {
                        var lv4message =1 +  Math.floor(Math.random() * 3);
                        if (lv4message === 1)
                        {
                        span = 'İpucu'
                        text = 'Balonları vurmağ üçün click sayında limit yoxdur sizin mouse xarab ola bilər ancaq bizim güllə sayımız bitməz ))'
                        }
                        if (lv4message === 2)
                        {
                        span = 'Yenilik ?'
                        text = 'Oyunumuzda nə yeniliklər görmək istərdiniz ? senanoguz@mail.ru ünvanına yazın göndərin :) '
                        }
                        if (lv4message === 3)
                        {
                        span = 'İpucu'
                        text = 'Oyunda olan şarlar artıqca vaxtınız hər itirlən şara görə -1 saniyə geri gedir Tələsin'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv3.png').css('width','100px').css('height','120px')
                       
                        level = 4
                        leveltimeprice = 5
                    }
                    if (totalscore + xal > 150) {
                        var lv5message =1 +  Math.floor(Math.random() * 3);
                        if (lv5message === 1)
                        {
                        span = 'İpucu'
                        text = 'Balonları vurmağ üçün click sayında limit yoxdur sizin mouse xarab ola bilər ancaq bizim güllə sayımız bitməz ))'
                        }
                        if (lv5message === 2)
                        {
                        span = 'Yenilik ?'
                        text = 'Oyunumuzda nə yeniliklər görmək istərdiniz ? senanoguz@mail.ru ünvanına yazın göndərin :) '
                        }
                        if (lv5message === 3)
                        {
                        span = 'İpucu'
                        text = 'Oyunda olan şarlar artıqca vaxtınız hər itirlən şara görə -1 saniyə geri gedir Tələsin'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv3.png').css('width','100px').css('height','120px')
                       
                        level = 5
                        leveltimeprice = 6
                    }
                    if (totalscore + xal > 250) {
                        var lv6message =1 +  Math.floor(Math.random() * 3);
                        if (lv6message === 1)
                        {
                        span = 'İpucu'
                        text = 'Balonları vurmağ üçün click sayında limit yoxdur sizin mouse xarab ola bilər ancaq bizim güllə sayımız bitməz ))'
                        }
                        if (lv6message === 2)
                        {
                        span = 'Yenilik ?'
                        text = 'Oyunumuzda nə yeniliklər görmək istərdiniz ? senanoguz@mail.ru ünvanına yazın göndərin :) '
                        }
                        if (lv6message === 3)
                        {
                        span = 'İpucu'
                        text = 'Oyunda olan şarlar artıqca vaxtınız hər itirlən şara görə -1 saniyə geri gedir Tələsin'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv3.png').css('width','100px').css('height','120px')
                       
                        level = 6
                        leveltimeprice = 8
                    }
                    if (totalscore + xal > 500) {
                        var lv7message =1 +  Math.floor(Math.random() * 3);
                        if (lv7message === 1)
                        {
                        span = 'İpucu'
                        text = 'Balonları vurmağ üçün click sayında limit yoxdur sizin mouse xarab ola bilər ancaq bizim güllə sayımız bitməz ))'
                        }
                        if (lv7message === 2)
                        {
                        span = 'Yenilik ?'
                        text = 'Oyunumuzda nə yeniliklər görmək istərdiniz ? senanoguz@mail.ru ünvanına yazın göndərin :) '
                        }
                        if (lv7message === 3)
                        {
                        span = 'İpucu'
                        text = 'Oyunda olan şarlar artıqca vaxtınız hər itirlən şara görə -1 saniyə geri gedir Tələsin'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv3.png').css('width','100px').css('height','120px')
                       
                        level = 7
                        leveltimeprice = 10
                    }
                    if (totalscore + xal > 800) {
                        var lv8message =1 +  Math.floor(Math.random() * 3);
                        if (lv8message === 1)
                        {
                        span = 'İpucu'
                        text = 'Balonları vurmağ üçün click sayında limit yoxdur sizin mouse xarab ola bilər ancaq bizim güllə sayımız bitməz ))'
                        }
                        if (lv8message === 2)
                        {
                        span = 'Yenilik ?'
                        text = 'Oyunumuzda nə yeniliklər görmək istərdiniz ? senanoguz@mail.ru ünvanına yazın göndərin :) '
                        }
                        if (lv8message === 3)
                        {
                        span = 'İpucu'
                        text = 'Oyunda olan şarlar artıqca vaxtınız hər itirlən şara görə -1 saniyə geri gedir Tələsin'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv3.png').css('width','100px').css('height','120px')
                       
                        level = 8
                        leveltimeprice = 12
                    }
                    if (totalscore + xal > 1200) {
                        var lv9message =1 +  Math.floor(Math.random() * 3);
                        if (lv9message === 1)
                        {
                        span = 'İpucu'
                        text = 'Balonları vurmağ üçün click sayında limit yoxdur sizin mouse xarab ola bilər ancaq bizim güllə sayımız bitməz ))'
                        }
                        if (lv9message === 2)
                        {
                        span = 'Yenilik ?'
                        text = 'Oyunumuzda nə yeniliklər görmək istərdiniz ? senanoguz@mail.ru ünvanına yazın göndərin :) '
                        }
                        if (lv9message === 3)
                        {
                        span = 'İpucu'
                        text = 'Oyunda olan şarlar artıqca vaxtınız hər itirlən şara görə -1 saniyə geri gedir Tələsin'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv3.png').css('width','100px').css('height','120px')
                       
                        level = 9
                        leveltimeprice = 15
                    }
                    if (totalscore + xal > 1700) {
                        var lv10message =1 +  Math.floor(Math.random() * 3);
                        if (lv10message === 1)
                        {
                        span = 'İpucu'
                        text = 'Balonları vurmağ üçün click sayında limit yoxdur sizin mouse xarab ola bilər ancaq bizim güllə sayımız bitməz ))'
                        }
                        if (lv10message === 2)
                        {
                        span = 'Yenilik ?'
                        text = 'Oyunumuzda nə yeniliklər görmək istərdiniz ? senanoguz@mail.ru ünvanına yazın göndərin :) '
                        }
                        if (lv10message === 3)
                        {
                        span = 'İpucu'
                        text = 'Oyunda olan şarlar artıqca vaxtınız hər itirlən şara görə -1 saniyə geri gedir Tələsin'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv3.png').css('width','100px').css('height','120px')
                       
                        level = 10
                        leveltimeprice = 18
                    }
                    if (totalscore + xal > 2500) {
                        var lv11message =1 +  Math.floor(Math.random() * 3);
                        if (lv11message === 1)
                        {
                        span = 'İpucu'
                        text = 'Balonları vurmağ üçün click sayında limit yoxdur sizin mouse xarab ola bilər ancaq bizim güllə sayımız bitməz ))'
                        }
                        if (lv11message === 2)
                        {
                        span = 'Yenilik ?'
                        text = 'Oyunumuzda nə yeniliklər görmək istərdiniz ? senanoguz@mail.ru ünvanına yazın göndərin :) '
                        }
                        if (lv11message === 3)
                        {
                        span = 'İpucu'
                        text = 'Oyunda olan şarlar artıqca vaxtınız hər itirlən şara görə -1 saniyə geri gedir Tələsin'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv3.png').css('width','100px').css('height','120px')
                       
                        level = 11
                        leveltimeprice = 20
                    }
                    if (totalscore + xal > 5000) {
                        var lv12message =1 +  Math.floor(Math.random() * 3);
                        if (lv12message === 1)
                        {
                        span = 'İpucu'
                        text = 'Balonları vurmağ üçün click sayında limit yoxdur sizin mouse xarab ola bilər ancaq bizim güllə sayımız bitməz ))'
                        }
                        if (lv12message === 2)
                        {
                        span = 'Yenilik ?'
                        text = 'Oyunumuzda nə yeniliklər görmək istərdiniz ? senanoguz@mail.ru ünvanına yazın göndərin :) '
                        }
                        if (lv12message === 3)
                        {
                        span = 'İpucu'
                        text = 'Oyunda olan şarlar artıqca vaxtınız hər itirlən şara görə -1 saniyə geri gedir Tələsin'
                        }
                        $('.messagegamestartstrong').text(span)
                        $('.messagegamestartspan').text(text)
                        $('#levelphoto').attr('src','shekiller/lvprs/lv3.png').css('width','100px').css('height','120px')
                       
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



                $('.melumatlar').css('background', 'url(shekiller/background.jpg)')
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
                    top.css('z-index', '99')
                    top.css('position', 'absolute').css('top', '-30px')
                    if (yarat < 1000) {
                        yarat += 1
                        reng = reng + Math.floor(Math.random() * 10);
                        balonrand = 1 + Math.floor(Math.random() * 20);
                        bonusBalonRandomXal = Math.floor(Math.random() * 6000);
                        bonusBalonRandomYumurta = Math.floor(Math.random() * 10);
                        balonshekilleri()
                        kordinantY = Math.floor(Math.random() * 690);
                        kordinantX = Math.floor(Math.random() * 690);
                        top.css('margin-left', kordinantX)
                        top.css('margin-right', kordinantX)
                        top.css('background', `${balon}`).css('width', `${baloncssWidth}`).css('height', `${baloncssHeight}`)
                        top.addClass(`${balonstatus}`)
                        top.on('click', function() {
                            vaxt.css('color', 'green').css('font-size', '45px')
                            count = count + ballonsaniye
                            // console.log(ballonsaniye)
                            top.hide()
                            xal = xal + ballonxal
                            if (xal > bestscore){
                                $('#best_score').text(`Best Score:  ${xal}`)
                                $('#best_score').addClass('animated flipInX')
                            }
                            else{
                                $('#best_score').text(`Best Score:  ${bestscore}`)
                            }
                            $('#new_score').text(`Sonuncu Oyun Scoru:  ${newscore}`)
                            $('#total_score').text(`Total Score:  ${totalscore + xal}`)
                            $('#usernames').text(`username:  ${username}`)

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
                        count = count - 50
                    }, 6200);
                }, 500);
            }

            function balonshekilleri() {
                if (balonrand == 1) {
                    balon = 'url(/shekiller/balon1.png)'
                    baloncssWidth = '25px'
                    balonstatus = 'sadebalon'
                    ballonxal = 1
                    ballonsaniye = 200
                } else if (balonrand == 2) {
                    balon = 'url(/shekiller/balon2.png)'
                    baloncssWidth = '25px'
                    baloncssHeight = '50px'
                    balonstatus = 'sadebalon'
                    ballonxal = 1
                    ballonsaniye = 500
                } else if (balonrand == 3) {
                    balon = 'url(/shekiller/balon3.png)'
                    baloncssWidth = '25px'
                    baloncssHeight = '50px'
                    balonstatus = 'sadebalon'
                    ballonxal = 1
                    ballonsaniye = 700
                } else if (balonrand == 4) {
                    balon = 'url(/shekiller/balon4.png)'
                    baloncssWidth = '25px'
                    baloncssHeight = '50px'
                    balonstatus = 'sadebalon'
                    ballonxal = 1
                    ballonsaniye = 400
                } else if (balonrand == 5) {
                    balon = 'url(/shekiller/balon5.png)'
                    baloncssWidth = '25px'
                    baloncssHeight = '50px'
                    balonstatus = 'sadebalon'
                    ballonxal = 1
                    ballonsaniye = 500
                } else if (balonrand == 6) {
                    balon = 'url(/shekiller/balon6.png)'
                    baloncssWidth = '25px'
                    baloncssHeight = '50px'
                    balonstatus = 'sadebalon'
                    ballonxal = 2
                    ballonsaniye = 400
                } else if (balonrand == 7) {
                    balon = 'url(/shekiller/newbalon1.png)'
                    baloncssWidth = '35px'
                    baloncssHeight = '45px'
                    balonstatus = 'sadebalon'
                    ballonxal = 1
                    ballonsaniye = 600
                } else if (balonrand == 8) {
                    balon = 'url(/shekiller/newbalon2.png)'
                    baloncssWidth = '35px'
                    baloncssHeight = '45px'
                    balonstatus = 'sadebalon'
                    ballonxal = 1
                    ballonsaniye = 300
                } else if (balonrand == 9) {
                    balon = 'url(/shekiller/newbalon3.png)'
                    baloncssWidth = '35px'
                    baloncssHeight = '45px'
                    balonstatus = 'sadebalon'
                    ballonxal = 2
                    ballonsaniye = 400
                } else if (balonrand == 10) {
                    balon = 'url(/shekiller/newbalon4.png)'
                    baloncssWidth = '35px'
                    baloncssHeight = '45px'
                    balonstatus = 'sadebalon'
                    ballonxal = 1
                    ballonsaniye = 520
                } else if (balonrand == 11) {
                    balon = 'url(/shekiller/newbalon5.png)'
                    baloncssWidth = '35px'
                    baloncssHeight = '45px'
                    balonstatus = 'sadebalon'
                    ballonxal = 2
                    ballonsaniye = 550
                } else if (balonrand == 12) {
                    balon = 'url(/shekiller/newbalon6.png)'
                    baloncssWidth = '35px'
                    baloncssHeight = '45px'
                    balonstatus = 'sadebalon'
                    ballonxal = 2
                    ballonsaniye = 600
                } else if (balonrand == 13) {
                    balon = 'url(/shekiller/newbalon7.png)'
                    baloncssWidth = '35px'
                    baloncssHeight = '45px'
                    balonstatus = 'sadebalon'
                    ballonxal = 1
                    ballonsaniye = 700
                } else if (balonrand == 14) {
                    balon = 'url(/shekiller/newbalon8.png)'
                    baloncssWidth = '35px'
                    baloncssHeight = '45px'
                    balonstatus = 'sadebalon'
                    ballonxal = 2
                    ballonsaniye = 800
                }
                if (balonrand == 15) {
                    balon = 'url(/shekiller/bonusbalon1.png)'
                    baloncssWidth = '40px'
                    baloncssHeight = '40px'
                    balonstatus = 'bonusballoon'
                    ballonxal = 2
                    ballonsaniye = 1250
                }
                if (balonrand == 16) {
                    balon = 'url(/shekiller/bonusbalon2.png)'
                    baloncssWidth = '40px'
                    baloncssHeight = '40px'
                    balonstatus = 'bonusballoon'
                    ballonxal = 2
                    ballonsaniye = 1250
                }
                if (balonrand == 17) {
                    balon = 'url(/shekiller/bonusbalon3.png)'
                    baloncssWidth = '40px'
                    baloncssHeight = '40px'
                    balonstatus = 'bonusballoon'
                    ballonxal = 3
                    ballonsaniye = 1500

                }
                if (balonrand == 18) {
                    balon = 'url(/shekiller/bonusbalon4.png)'
                    baloncssWidth = '40px'
                    baloncssHeight = '40px'
                    balonstatus = 'bonusballoon '
                    ballonxal = 4
                    ballonsaniye = 800

                }
                if (balonrand == 19) {
                    balon = 'url(/shekiller/bonusbalon5.png)'
                    baloncssWidth = '40px'
                    baloncssHeight = '40px'
                    balonstatus = 'bonusballoon'
                    ballonxal = bonusBalonRandomYumurta
                    ballonsaniye = 1200

                }
                if (balonrand == 20) {
                    balon = 'url(/shekiller/bonusbalon6.png)'
                    baloncssWidth = '40px'
                    baloncssHeight = '40px'
                    balonstatus = 'bonusballoon'
                    ballonxal = 3
                    ballonsaniye = bonusBalonRandomXal
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
                $('.melumatlar').css('background', 'url(/shekiller/background.jpg)')
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
                    top.css('z-index', '99')
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