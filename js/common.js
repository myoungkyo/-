$(function(){
  // $("nav ul li").each(function(){
  //   var num = $(this).find("a");
  //   console.log($(num.hash));
  // });

  // $("li.video").on("click","a",function(){
  //   alert("영상 준비중입니다.");
  //   return false;
  // });

  $("nav ul li a,.back_to_top a,a.button,.footer_top a").click(function(e){
    // console.log($(this.hash).offset().top)
    var thisElem = $(this.hash);
    $("html,body").stop();
    $("html,body").animate({scrollTop : thisElem.offset().top},1500); //scroll은 body에 붙어있음.??
    // e.preventDefault(); //a태그 return false안먹힐때 쓰는 방법
    return false;
  });

  /*scroll 상단 이동버튼 노출 1*/ //style.css에 .back_to_top{display:none;}해주기
  //fadeIn은 시간차가 있기때문에 가능하면 addClass로 쓰기(실무에서는 addClass가 더 많이 쓰임)
  $(window).scroll(function(){ //window에 scroll이 발생할때마다 실행할 함수
    // console.log($(this).scrollTop()); //scroll bar의 위치
    /*if($(this).scrollTop() == 0){
      $(".back_to_top").css({"opacity":"0","display":"none"});
    }else */if($(this).scrollTop() > 0){
      $(".back_to_top").fadeIn("slow"); //fadeIn:나타나게
    }else{
      $(".back_to_top").fadeOut("slow");
    }
  });
  // /*scroll 상단 이동버튼 노출2*/ // .back_to_top{opacity:0;transition:1s;}, .on{opacity:1}추가해주기
  // $(window).scroll(function(){
  //   if( $(this).scrollTop() == 0 ){
  //     $(".back_to_top").removeClass("on");
  //   }else{
  //     $(".back_to_top").addClass("on");
  //   }
  // });

  /*section offset top값으로 class 추가*/
  // var wHeight = $(window).height(); //==100vh
  // $(window).scroll(function(){
  //   var thisScrollTop = $(this).scrollTop();
  //   $("section").each(function(){
  //     var thisOffset = $(this).offset();
  //     // console.log("offset top:"+thisOffset.top+", scroll top:"+thisScrollTop);
  //     if( thisOffset.top <= thisScrollTop+150 && thisScrollTop <= thisOffset.top+wHeight ){
  //       $(this).addClass("active");
  //     }
  //   });
  // });

  var scroll = function(){

      var $cnt = null,
          moveCnt = null,
          moveIndex = 0,
          moveCntTop = 0,
          winH = 0,
          time = false; // 새로 만든 변수

      $(document).ready(function(){
          init();
          initEvent();
      });

      var init = function(){
          $cnt = $("#onepage");
      };

      var initEvent = function(){
          $("body#main").scrollTop(0);
          winResize();
          $(window).resize(function(){
              winResize();
          });
          $cnt.on("mousewheel", function(e){
              if(time === false){ // time 변수가 펄스일때만 휠 이벤트 실행
                wheel(e);
              }
          });
      };

      var winResize = function(){
          winH = $(window).height();
          $cnt.children("section").height(winH);
          $("body#main").scrollTop(moveIndex.scrollTop);
      };

      var wheel = function(e){
          if(e.originalEvent.wheelDelta < 0){
              if(moveIndex < 4){
                  moveIndex += 1;
                  moving(moveIndex);
              };
          }else{
              if(moveIndex > 0){
                  moveIndex -= 1;
                  moving(moveIndex);
              };
          };
      };

      var moving = function(index){
          time = true // 휠 이벤트가 실행 동시에 true로 변경
          moveCnt = $cnt.children("section").eq(index);
          moveCntTop = moveCnt.offset().top;
          $("body#main").stop().animate({
              scrollTop: moveCntTop
          }, 1000, function(){
            time = false; // 휠 이벤트가 끝나면 false로 변경
          });
      };

  };
  scroll();

  const widthNum = 1000;
  var ulLeng = $(".carousel_inner ul.column").length;
  $(".carousel_inner").css("width",widthNum*ulLeng + "px");
  $(".carousel_inner ul.column:last").prependTo(".carousel_inner");
  $(".carousel_inner").css("margin-left","-"+widthNum+"px");

  $(".carousel_prev").click(function(){
    var caInMarginLeft = $(".carousel_inner").css("margin-left");
    $(".carousel_prev,.carousel_next").hide();
    $(".carousel_inner").animate({marginLeft : parseInt(caInMarginLeft) + widthNum + "px"},"slow","swing",function(){
      $(".carousel_inner").css("margin-left","-"+widthNum+"px");
      $(".carousel_inner ul.column:last").prependTo(".carousel_inner");
      $(".carousel_prev,.carousel_next").show();
    });
  });

  $(".carousel_next").click(function(){
    var caInMarginLeft = $(".carousel_inner").css("margin-left");
    $(".carousel_prev,.carousel_next").hide();
    $(".carousel_inner").animate({marginLeft : parseInt(caInMarginLeft) - widthNum + "px"},"slow","swing",function(){
      $(".carousel_inner").css("margin-left","-"+widthNum+"px");
      $(".carousel_inner ul.column:first").appendTo(".carousel_inner");
      $(".carousel_prev,.carousel_next").show();
    });
  });

  // var timerID = setInterval(function(){
  //   $(".carousel_next").click();
  // },8000);
  //
  // $(".carousel_prev img,.carousel_next img").click(function(){
  //   clearInterval(timerID);
  // });
  //
  // $(".carousel_prev img,.carousel_next img").mouseenter(function(){
  //   clearInterval(timerID);
  // }).mouseleave(function(){
  //   timerID = setInterval(function(){
  //     $(".carousel_next").click();
  //   },8000);
  // });
});
