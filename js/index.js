function setRem(){
	//动态设置像素比
	var oPixelRatio = 1 / window.devicePixelRatio;
	//console.log(oPixelRatio)
	document.write('<meta name="viewport" content="width=device-width,initial-scale='+oPixelRatio+',minimum-scale='+oPixelRatio+',maximum-scale='+oPixelRatio+',user-scalable=no" />');
	
	//调用setSize函数，自动刷新
	setSize();
	window.addEventListener("resize", setSize, false);
	window.addEventListener("orientationchange", setSize, false);
	function setSize(){
		//获取字体大小
		var html = document.getElementsByTagName('html')[0];
		var pageWidth = html.getBoundingClientRect().width;
		html.style.fontSize = pageWidth / 15 +"px";
	}
}

$(document).on('touchmove',function(ev){
	ev.preventDefault();
});

$(function() {
	var html = document.documentElement;
	var width = html.getBoundingClientRect().width;
	var fs = width / 15;
	
	
	var swiperSlide = document.querySelectorAll("#allWrap .swiper-slide");
	
	
	var t = new TimelineMax();
	var t_shan = new TimelineMax({repeat:-1});
	
	begin();	//开机广告
	function begin(){
		var aImg = document.querySelectorAll('.logo-china img');
		
		t_shan.staggerTo(".shan", 1, {
			x : 60*fs,
			ease:Power1.easeIn,
			delay : 3.5
		});
		
		
		t.staggerFrom(".logo", 2, {
			y: -4*fs,
			ease: Elastic.easeOut,
		});
		t.staggerFrom(".logo-en", 1, {
			x: 16 * fs
		});
		t.staggerTo(aImg, 1, {
			scale: 1,
			ease : Elastic.easeOut,
			onComplete : function(){
				// console.log(111)
				for(var i=0; i<aImg.length; i++){
					if(i==0){
						aImg[i].className = "down";
					}
					if(i==1){
						aImg[i].className = "up";
					}
					if(i==2){
						aImg[i].className = "down";
					}
					if(i==3){
						aImg[i].className = "up";
					}
				}
			},
		},0.3,"-=1.5");
		
		
		t.to(".company-name",1,{
			scale : 1,
			delay : 0.5
		});
		
// 		TweenMax.staggerTo("h3", 0.2, {
// 			className:"+=superShadow", 
// 			top:"-=20px", 
// 			ease:Power1.easeIn,
// 			onCompleteParams:["{self}"],
// 			delay : 5,
// 			repeat : 6,
// 			yoyo :true,
// 			repeatDelay:1
// 		}, "0.3",myCompleteAll);
// 		//全部动画完成事件
// 		function myCompleteAll() {
// 			console.log(999)
// //			$('.power').hide();
// //			oneScreen();
// 		}
		
		var tl = new TimelineMax({repeat:6, repeatDelay:1, yoyo:true});
		tl.staggerTo("h3", 0.2, {
			className:"+=superShadow", 
			top:"-=10px", 
			ease:Power1.easeIn,
		}, "0.3", "start")
		
		var viewHeight = $(window).height();
		
		slideCanvas()
		function slideCanvas(){
			var $c = $('#c1');
			var gc = $c.get(0).getContext('2d');
			var img = new Image();
			$c.attr({
				'height':viewHeight,
				'width' : 15*fs
			});
			var bFlag = true;
			img.src = 'images/power_bg.jpg';
			
			img.onload = function(){
				gc.drawImage(img,0,0,15*fs,viewHeight);
				gc.strokeStyle = 'black';
				gc.lineWidth = 100;
				gc.lineCap = 'round';
				gc.globalCompositeOperation = 'destination-out';
				$c.on('touchstart',function(ev){	
					var touch = ev.originalEvent.changedTouches[0];
					var x = touch.pageX - $(this).offset().left;
					var y = touch.pageY - $(this).offset().top;
					
					if(bFlag){
						bFlag = false;
						gc.moveTo(x,y);
						gc.lineTo(x+1,y+1);
					}
					else{
						gc.lineTo(x,y);
					}
					gc.stroke();
					$c.on('touchmove.move',function(ev){	
						var touch = ev.originalEvent.changedTouches[0];
						var x = touch.pageX - $(this).offset().left;
						var y = touch.pageY - $(this).offset().top;
						gc.lineTo(x,y);
						gc.stroke();
						
					});
					$c.on('touchend.move',function(ev){
						var imgData = gc.getImageData(0,0,15*fs,viewHeight);
						console.log(imgData)
						var allPx = imgData.width * imgData.height;
						console.log(allPx)
						var num = 0;
						for(var i=0;i<allPx;i++){
							if( imgData.data[4*i+3] == 0 ){
								num++;
							}
						}
						if( num > allPx/2 ){
							$('.power').animate({opacity:0},1000,function(){
								$(this).remove();
								oneScreen();
							});
							
//							playMusic();
							
						}
						$c.off('.move');
					});
				});	
			}
		}
		
	}
	
	
	menu();	//底部扇形菜单
	function menu(){
		var oHome=$("#home");
		var aImg=$("#menu_list img");	
		var bFlag=true;	
		var iR=-3.6*fs;
		
		for(var i=0;i<aImg.length;i++){		
			aImg.eq(i).on('click',function(){
				$(this).css('transition','0.3s');
				$(this).css('WebkitTransform','scale(1.5) rotate(-720deg)');
				$(this).css('opacity','0.1');
				addEnd($(this),end);
			})
		}
		
		function end(){			
			$(this).css('transition','0.1s');
			$(this).css('WebkitTransform','scale(1) rotate(-720deg)');
			$(this).css('opacity','1');
			removeEnd($(this),end);	
		}
		
		oHome.on('click',function(){
			if(bFlag){
				$(this).css('WebkitTransform','rotate(-360deg)');
				for(var i=0; i<aImg.length; i++){
					var oLt=toLT(iR,90/4*i);
					aImg.eq(i).css('transition',"0.5s "+i*100+"ms");
					aImg.eq(i).css('left',oLt.l+"px");
					aImg.eq(i).css('top',oLt.t+"px");
					aImg.eq(i).css('WebkitTransform','scale(1) rotate(-720deg)');
					
					aImg.eq(i).on('click',function(){
						allSwiper.slideTo($(this).index());
					})
				}
			}else{
				$(this).css('WebkitTransform','rotate(0deg)');
				for(var i=0; i<aImg.length; i++){
					var oLt=toLT(iR,90/4*i);
					aImg.eq(i).css('transition',"0.5s "+(aImg.length-i-1)*100+"ms");
					aImg.eq(i).css('left',"0px");
					aImg.eq(i).css('top',"0px");
					aImg.eq(i).css('WebkitTransform','scale(1) rotate(0deg)');
				}
			}
			bFlag = !bFlag;
		})
		
		function toLT(iR,iDeg){		//已知直角三角形的斜边长度和夹角 求对边(sin)和临边的长度
			return {
				l:Math.round(Math.sin(iDeg/180*Math.PI)*iR),
				t:Math.round(Math.cos(iDeg/180*Math.PI)*iR)
			}
		}
		
		function addEnd(obj,fn){
			obj.get(0).addEventListener('WebkitTransitionEnd',fn,false);	
			obj.get(0).addEventListener('transitionend',fn,false);
		}
		function removeEnd(obj,fn){	
			obj.get(0).removeEventListener('WebkitTransitionEnd',fn,false);	
			obj.get(0).removeEventListener('transitionend',fn,false);
		}
	}
	
	
	
	var allSwiper;
	allSwiper = new Swiper ('#allWrap', {
	    direction: 'vertical', // 垂直切换选项
		initialSlide : 0,
	    followFinger : false,	//设置为false，手指滑动时slide不会动，当你释放时slide才会切换。
		lazy: {
		    loadPrevNext: true,
		},
		touchRatio : 0.5,
		resistanceRatio : 0,
		observer:true,
		observeParents:true,
		paginationClickable: true,
		// preventLinksPropagation: false,
		on : {
			slideChangeTransitionStart: function(){
				
				var now = this.activeIndex;
				if(now == 0){
					 oneScreen();
				}else if(now == 1){
					twoScreen();
				}else if(now == 2){
					threeScreen();
				}else if(now == 3){
					 var aSlide = $('#show .flip-box');
					 aSlide.attr('abc','true');
					aSlide.find('.flip-item-back').css({
						'zIndex' : 1,
						'transform' : 'rotateY(180deg)',
						'transitionDuration' : '0.5s'
					});
					aSlide.find('.flip-item-front').css({
						'zIndex' : 2,
						'transform' : 'rotateY(0deg)',
						'transitionDuration' : '0.5s'
					});
					!showSwiper && fourScreen();
					showSwiper.slideTo(0);
					
				}else if(now == 4){
					fiveScreen();
				}
				
			},
		}
	}); 
	
	// 第一屏-公司简介
	var bFlag = true;
	var t1 = new TimelineMax();
	//oneScreen();
	function oneScreen(){
		var showText = function(){
			var str = '中国图片集团前身为中国图片社，创建于1950年，是新华通讯社直属企业和国家级图片社。2016年9月，与中国国际文化影像传播有限公司合并组建中国图片集团，实施图片影像文化价值传播工程，打造国内领先、世界一流的综合影像服务机构。目前，集团拥有4家全资子公司，员工230余人。';
			var newStr = '';
			var timer = null;
			var num = 0;
			var cont = document.getElementById('hide-zoon');
			var aSpan = cont.getElementsByTagName('span');
			for(var i=0; i<str.length; i++){
				newStr +='<span style="left:'+i%18*0.72*fs+'px;top:'+Math.floor(i/18)*1*fs+'px;">'+str.charAt(i)+'</span>';	//18:字符数
			}
			
			cont.innerHTML = newStr;
			timer = setInterval(function(){
				//利用定时器让每一个span运动到下边去
				aSpan[num].style.opacity = 1,
				aSpan[num].style.top = Math.floor(num/18)*1*fs+12*fs+'px';
				//自增；
				num++;
				// 当运动完成，清除定时器。
				if(num>aSpan.length-1){
					clearInterval(timer);
				}
			}, 30)
		}
		if(bFlag){
			bFlag = false;
			t1.from('.company-img',0.5,{
				scale : 0,
				delay : 0.5,
			})
			.from('.header-title',1.5,{
				x : -7.76 * fs,
				ease: Elastic.easeOut,
				scale : 0
			})
		}else{
			t1.restart();
		}
		showText()
	}
	
	// 第二屏-发展历程
	var bFlag2 = true;
	var t2 = new TimelineMax();
	function twoScreen(){
		if(bFlag2){
			bFlag2 = false;
			t2.from('.header-title2',1,{
				y : -2 * fs,
				ease: Elastic.easeOut,
				scale : 0
			});
			t2.from('.icon-pen',0.2,{
				x : 15*fs,
			})
			.from('.line',0.2,{
				"height" : 0,
				delay : 0.5,
				opacity : 0
			})
			
			var aLi = $('.list li');
			t2.staggerFrom('.list',0.2,{
				'height' : 0
			})
			
			t2.staggerFrom(aLi,0.3,{
				opacity : 0,
				cycle : {
					y : function(index){
						return -index * fs;
					}
				}
			},0.5)
			
		}else{
			t2.restart();
		}
	}
	
	// 第三屏-企业文化
	var bFlag3 = true;
	var t3 = new TimelineMax();
	function threeScreen(){
		if(bFlag3){
			console.log('划过');
			bFlag3 = false;
			t3.from('.header-title',1.5,{
				x : -7.76 * fs,
				ease: Elastic.easeOut,
				scale : 0
			});
			
			var aTitle = $('.title');
			t3.staggerFrom(aTitle,0.5,{
				scale : 0,
				cycle : {
					y : function(index){
						return (index+1) * 2.6 * fs
					}
				}
			},0.3)
			
			var aDesc = $('.desc p');
			t3.staggerFrom(aDesc,0.5,{
				scale : 0,
				cycle : {
					y : function(index){
						return -(index+1) * 2.6 * fs
					}
				}
			},0.3)
			
			t3.from('.fly-bg',1.5,
				{
					scale : 0,
					bezier:[
						{x:-9.1*fs, y:12*fs}, 
					],
					ease:Power1.easeInOut
				}
			)
		}else{
			console.log('已经划过了');
			t3.restart();
			
		}
		
	}
	
	
	// 第四屏-主营业务
	var bFlag4 = true;
	var showSwiper;
	var t4 = new TimelineMax();
	function fourScreen(){
		$('#swiper3').remove()
		$('#indexJs').after("<script language=javascript src='js/swiper.min.3.0.js' id='swiper3'></script>");	//swiper3.0可以逃出swiper4.0平均分配slide，可以外面CSS定义slide的宽度
		console.log(1111)
		
		
		if(bFlag4){
			bFlag4 = false;
			t4.from('.header-title',3,{
				y : -2 * fs,
				ease: Elastic.easeOut,
				scale : 0
			});
			t4.from('.icon-click',0.5,{
				y : 10,
				repeat : -1,
				yoyo : true
			},0.3)
		}else{
			t4.restart();
		}
		
		
		showSwiper = new Swiper('#show', {
			direction : 'horizontal',
			slidesPerView: 'auto', 
			centeredSlides: true,
			observer:true,
			observeParents:true,
			watchSlidesProgress: true,    
			paginationClickable: true,
			preventLinksPropagation: false,
			pagination : '.swiper-pagination', 
			paginationBulletRender: function (index, className) {
				switch (index) {
					case 0: name='产';break;
					case 1: name='品';break;
					case 2: name='最';break;
					case 3: name='优';break;
					case 4: name='秀';break;
					default: name='';
				}
				return '<span class="' + className + '"><i>' + name + '</i></span>';
			},
		});
		
		var aSlide = $('#show .flip-box');
		console.log(aSlide.length)
		var bFlag = true;
		aSlide.off('click').on('click',function(){
			console.log(111)
			if($(this).attr('abc') == 'true'){
				$(this).find('.flip-item-front').css({
					'zIndex' : 1,
					'transform' : 'rotateY(180deg)',
					'transitionDuration' : '1.5s'
				});
				$(this).find('.flip-item-back').css({
					'zIndex' : 2,
					'transform' : 'rotateY(0deg)',
					'transitionDuration' : '1.5s'
				});
				bFlag = false;
				$(this).attr('abc',bFlag);
			}else if($(this).attr('abc') == 'false'){
				$(this).find('.flip-item-back').css({
					'zIndex' : 1,
					'transform' : 'rotateY(180deg)',
					'transitionDuration' : '1.5s'
				});
				$(this).find('.flip-item-front').css({
					'zIndex' : 2,
					'transform' : 'rotateY(0deg)',
					'transitionDuration' : '1.5s'
				});
				bFlag = true;
				$(this).attr('abc',bFlag);
			}
		});
	}
	
	// 第五屏-联系我们
	var bFlag5 = true;
	var t5 = new TimelineMax();
	function fiveScreen(){
		
		
		if(bFlag5){
			bFlag5 = false;
			t5.from('.header-title',1,{
				y : -2 * fs,
				ease: Elastic.easeOut,
				scale : 0
			});
			t5.from('.bottom-people',0.1,{
				bottom : -6*fs,
				scale : 0,
				ease: Back.easeOut,
			});
			
			var bottomBorder = document.querySelectorAll(".bottomBorder");
			var sideBorder = document.querySelectorAll(".sideBorder");
			var topBorder = document.querySelectorAll(".topBorder");
			var bottomTextSpanBox = document.querySelectorAll(".bottomTextSpanBox em");
			t5.from(bottomBorder,.2,{
				left : 5.5*fs,
				width : 0,
				delay : 1
			})
			.from(".sideBorder",.2,{
				height : 0
			})
			.from(".topBorder",.2,{
				width : 0,
			})
			.from(bottomTextSpanBox,.2,{
				y:-4*fs,
				opacity : 0
			})
			.from('.icon-light',.2,{
				scale : 0,
				delay : 0.3
			})
			
			t5.from('.contact',0.2,{
				opacity : 0,
				delay : 0.5
			})
			t5.from('.ewm',0.2,{
				scale : 0
			})
			
			var aP = $('.contact p');
			t5.staggerFrom(aP, 1, {
				opacity : 0,
				cycle:{
					y:function(index){
						return -index * 50;
					}
				}
			}, 0.5);
		}else{
			t5.restart();
		}
		
		
	}


//	function playMusic(){
//		var $music = $('.icon-music');
//		var $a1 = $('#music');
//		var onoff = true;
//		$music.on('touchstart',function(){
//			if(onoff){
//				$(this).addClass('active');
//				$a1.get(0).play();
//			}
//			else{
//				$(this).removeClass('active');
//				$a1.get(0).pause();
//			}
//			onoff = !onoff;
//		});
//		$music.trigger('touchstart');
//	}
	
	document.addEventListener("WeixinJSBridgeReady", function () { 
		 document.getElementById('music').play(); //视频自动播放
	}, false); 
	
	
});

