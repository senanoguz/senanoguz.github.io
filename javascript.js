
 var a = document.getElementById("levelid")
 var b = document.getElementById("bestscoreid")
 var c = document.getElementById("totalscoreid")
 var d = document.getElementById("btnid")

 function bestscoreshow(){
     a.style.left= "-400px"
     b.style.left = "50px"
     c.style.left = "-400px"
     d.style.left = "0px"
 }
 function totalscoreshow(){
     a.style.left= "-400px"
     b.style.left = "-400px"
     c.style.left = "50px"
     d.style.left = "150px"
 }
 function levelshow(){
     a.style.left= "50px"
     b.style.left = "-400px"
     c.style.left = "-400px"
     d.style.left = "260px"
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
      
      var username;
      var email;
      var bestscore 
      var newscore 
      var totalscore 
      var level 
      function gameLogin(){
        var username = $('#username_log').val()
        var password = $('#password_log').val()
        if (username === '') {
            $('#okay').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Username bos ola bilmez`)
        } else if (password === '') {
            $('#okay').css('display', 'block').addClass('alert alert-danger').text(`Xeta: Password bos ola bilmez`)
    
        } else {
            firebase.auth().signInWithEmailAndPassword(username,password)
            .then(function(){
                setInterval(() => {
                    $('#okay').removeClass('alert alert-danger')
                    $('#okay').css('display', 'block').addClass('alert alert-success').text(`Xos Geldin ${username} Giris Ugurludur 3 saniye sonra Esas sehifeye yonlendirileceksiniz`)
                    window.location.href = 'index.html'
                }, 3000);
            })
            .catch(function(error){
                $('#okay').css('display', 'block').addClass('alert alert-danger').html(`Username ve Password bir birine uygun gelmir <div class="alert alert-dark text-dark">${error.message}</div>`)
            })
        }
    }
    function gameRegister(){
        var username = $('#username').val()
        var email= $('#email').val()
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
  
        } else if (username === '' || password === '' || password=== '' || email === '' || bestscore === '' || newscore === '' || totalscore === '') {
            $('#tamam').css('display', 'block').addClass('alert alert-danger').text(`Xeta: * olan butun xanalari doldurmaq vacibdir`)
        } else {
             
                $('#tamam').removeClass('alert alert-danger')
                firebase.auth().createUserWithEmailAndPassword(email,password)
                .then(function(){
                    firebase.auth().signInWithEmailAndPassword(email,password)
                    .then(function(){
                        database.ref("users/" + current_user).child("user_details").set(
                        {
                          email: email,
                          username : username,
                          bestscore : 0,
                          newscore: 0,
                          totalscore : 0,
                          level : 0
                        })
                        setInterval(() => {
                        $('#tamam').css('display', 'block').addClass('alert alert-success').text('Qeydiyyat ugurla tamamlandi Esas Sehifeye yonlendirilirsiniz')
                            window.location.href = 'index.html'
                    }, 2000);
                    })
                }).catch(function(error){
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

    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            current_user = user.uid
            var div = $('.userlogin')
            var button = $('<button>')
            button.addClass('btn btn-danger logout')
            $('.logout').empty()
            button.text('Logout')
            div.append(button)
            $('.logout').on('click',function(){
                firebase.auth().signOut()
                    .then(function(){
                        window.location.href = 'index.html'
                    })
            })
            console.log(current_user)                   
        var details = database.ref().child("users/" + current_user);
        details.on('value',function(snapshot){
            snapshot.forEach(function(item){
                email = item.val().email,
                username = item.val().username,
                bestscore = item.val().bestscore,
                newscore= item.val().newscore,
                totalscore = item.val().totalscore,
                level = item.val().level
    }) 
})
var bestscorerating = []
var siralibestscore
var rating = database.ref().child("rating/").orderByChild('bestscore').limitToLast(10);
rating.on('value',function(snapshot){
    snapshot.forEach(function(item){
            // console.log(item.val().bestscore,item.val().username,item.val().totalscore,item.val().level)
            // console.log(`best: ${item.val().bestscore}`)
            // bestscorerating.push(item.val().bestscore,item.val().username)
        console.log(item.val())

})
// bestscorerating.sort(function(a, b){return b - a})
// console.log(bestscorerating)
// for(var i =0 ;i <=10;i++){
//     console.log(bestscorerating[i])
// }
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
          function userGame() {
              count = 6000
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
                $('#gamestart').hide()
                $('#qeydiyyat').hide()
                  console.table(email,username,bestscore,totalscore,level,newscore)

                      if(totalscore+xal > 10){
                          level = 1
                      }
                      if(totalscore+xal > 25){
                          level = 2
                      }
                      if(totalscore+xal > 75){
                        level = 3
                    }
                    if(totalscore+xal > 200){
                        level = 4
                    }
                    if(totalscore+xal > 500){
                        level = 5
                    }
                    if(totalscore+xal > 1000){
                        level = 6
                    }
                    if(totalscore+xal > 2000){
                        level = 7
                    }
                    if(totalscore+xal > 5000){
                        level = 8
                    }
                    if(totalscore+xal > 10000){
                        level = 9
                    }
                      if (xal > bestscore)
                      {
                      bestscore = xal;
                      }
                      else{
                          bestscore = bestscore
                      }
                      totalscore = totalscore + xal
                        database.ref("users/" + current_user).child("user_details").set({
                            email: email,
                            username : username,
                            bestscore : bestscore,
                            newscore: xal,
                            totalscore : totalscore,
                            level : level
                    })
                    database.ref("rating/" + current_user).set({
                        username : username,
                        bestscore : bestscore,
                        totalscore : totalscore,
                        level : level
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
    }
        else{
            username = 'Qonaq'
            bestscore = ' (Funksiya Passivdir)'
            newscore = ' (Funksiya Passivdir)'
            totalscore = ' (Funksiya Passivdir)'
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
            count = 6000
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
                    return gameOverGuest();
                }
                count--;
                document.getElementById("vaxt").innerHTML = count / 100 + " s";
                
            }
    
            function gameOverGuest() {
                $('.esas').show()
                $('.basla').hide()
                bosalt.empty()
                game.append('<img class="animated bounceInDown delay-0.6s" id="gameoverimg" src="shekiller/gameover.png" width="300" height="250"/>')
                $('#gameover').show()
                $('.helps').addClass('animated bounceInUp delay-0.5s')
                $('.helps').show()
                $('.helps').css('left', '250px')
                $('.helps').css('top', '350px')
                $('#gamestart').hide()
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

            console.log('sagol')
        }
    })



})