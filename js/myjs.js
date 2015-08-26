        function addEvent(obj,type,fn){
            if(document.addEventListener){
                obj.addEventListener(type,fn,false)
            }
        }
        function removeEvent(obj,type,fn){
            if(document.removeEventListener){
                obj.removeEventListener(type,fn,false)
            }
        }
        window.onload=function() {
            var list=document.getElementById("list");
            var box = document.getElementsByClassName("box");
            //var nav = document.getElementsByClassName("nav")[0].getElementsByTagName("ul")[0];
            var nav = document.querySelectorAll(".nav ul");
            //var open_nav = document.getElementsByClassName("top")[0].getElementsByTagName("a")[0];
            var open_nav = document.querySelectorAll(".top a");
            var page_two=document.getElementsByClassName("page2")[0];
            var page_one=document.querySelector(".edit a");
            var show_nav = {
                show_navs: function (e) {
                    e.preventDefault();
                    $(nav).slideToggle(500)
                },
                show_page1:function(e){
                    e.preventDefault();
                    $(page_two).animate({left:100+"%"},250)
                },
                show_page2:function(e){
                    e.preventDefault();
                    $(page_two).animate({left:0},250)
                }
            };

                addEvent(open_nav[0], "touchstart", show_nav.show_navs);
                addEvent(open_nav[1], "touchstart", show_nav.show_page2);
                addEvent(page_one, "touchstart", show_nav.show_page1);
            //open_nav.addEventListener('touchstart',show_nav.touchStart,false)
            var Start, Move, above = 0;
            var event = {
                touchStart: function (e) {
                    e.preventDefault();
                    var touch = e.changedTouches[0];
                    Start = {
                        x: touch.pageX || touch.clientX
                    };
                    addEvent(this, "touchmove", event.touchMove)
                },
                touchMove: function (e) {
                    e.preventDefault();
                    var touch = e.changedTouches[0];
                    Move = {
                        x: touch.pageX || touch.clientX
                    };
                    this.style.left = (Move.x - Start.x) + above + "px";
                    addEvent(this, "touchend", event.touchEnd)
                },
                touchEnd: function () {
                    above = parseInt(this.offsetLeft);
                    if (above > 0) {
                        $(this).animate({left: 0}, 200)
                        above = 0
                    }
                    if (above < 0 && above < -222) {
                        $(this).animate({left: -222 + "px"}, 200);
                        above = -222
                    }
                    removeEvent(this, "touchmove", event.touchMove)
                    removeEvent(this, "touchend", event.touchEnd)
                }
            };
            for (var i = 0; i < box.length; i++) {
                //addEvent(box[i], "touchstart", event.touchStart)
                box[i].addEventListener('touchstart',event.touchStart,false);
            }
            //------------------------------------------------------------------------------

            //var lists = document.getElementById("list")
            //console.log(lists)
            var thebox;
            var showIcon = {
                get: function (e) {
//                    e.preventDefault();
                    var kk = /.icon-[^]*/g;
                    var oldName = this.children[0].className.match(kk);
                    //利用正则改变计算器内icon
                    counter_icon.children[0].className = counter_icon.children[0].className.replace(kk, oldName);
                    counter_icon.children[1].innerHTML = this.children[1].innerHTML;
                    return showIcon.add_new(counter_icon.children[0].className, counter_icon.children[1].innerHTML)
                },
                showNum: function (e) {
                    e.preventDefault();
                    var kk = show_money.innerHTML.replace(/[<^>$|[a-z]|\//gi, '');
                    var num = this.innerHTML.replace(/←|\+|\-|=|C/gi, "");
                    var anima = false;
                    var value = '';
                    var fuhao = '';
                    //console.log(num)
//                    console.log(num)
//                    if(show_money.innerHTML.indexOf(".") > 0){
//                        this.innerHTML= parseInt("")
//                    }
                    switch (this.innerHTML) {
                        case "←":
                            show_money.innerHTML = kk.substring(0, kk.length - 1)
                            break;
                        case "+":
                        case "-":
                            value = kk;
                            fuhao = this.innerHTML;
                            break;
                        case "=":
                            show_money.innerHTML = eval(kk);
//                            anima=true
                            break;
                        case "C":
                            show_money.innerHTML = ""
                    }
                    show_money.innerHTML += fuhao + num;
                    return showIcon.add_new(show_money.innerHTML)
//                    console.log(show_money.innerHTML.replace(/[<^>$|[a-z]|\//gi,'').length)
//                    show_money.innerHTML +=this.innerHTML.replace(/\D/gi,'');
                },
                add_new: function (a, b) {
//                    e.preventDefault();

//                    var thebox_type="<section class='list_con'>" +
//                            " <div class='box'>" +
//                            "<i class="+a+"></i>" +
//                            "<p class='kind'>"+b+"</p>"
                    var thebox_money = parseInt(show_money.innerHTML);
                    var thebox_value = ''
                    if (thebox_money > 0) {
                        thebox_value = "<span class='money change_color'>" + thebox_money + "</span>"
                    }
                    if (thebox_money < 0) {
                        thebox_value = "<span class='money change_color'>" + thebox_money + "</span>"
                    }
                     thebox = "<section class='list_con'>" +
                        " <div class='box'>" +
                        "<i class='" + a + "'></i>" +
                        "<p class='kind'>" + b + "</p>" +
                        thebox_value +
                        "<span class='the_time'>15/7/21</span>" +
                        "<div class='change'>" +
                        "<a href='#'>" +
                        " <i class='iconfont icon-bi'></i>" +
                        " </a>" +
                        "<a href='#'>" +
                        "<i class='iconfont icon-lajitong'></i>" +
                        "</a>" +
                        "</div>" +
                        "</div>" +
                        "</section>";
                    return sssss(thebox)
                    //this.showVlaue=ceshi;
                    //console.log(thebox)
                }
            };
            var chose_this = document.getElementsByClassName("chose_this");
            var counter_icon = document.getElementsByClassName("counter_icon")[0];
            var num_value = document.getElementsByClassName("num_value");
            var show_money = document.getElementsByClassName("show_money")[0];
            var add_new_info=document.getElementsByClassName("add_new_info");
            for (var q = 0; q< chose_this.length; q++) {
                addEvent(chose_this[q], 'touchstart', showIcon.get)
            }
            for (var j = 0; j < num_value.length; j++) {
                addEvent(num_value[j], 'touchstart', showIcon.showNum)
            }
            //var add_one_list=new showIcon.add_new();

            for(var b=0;b<add_new_info.length;b++){
                addEvent(add_new_info[b], 'touchstart',jh)
            }
            showIcon.add_new.prototype.name="hjx";
            showIcon.add_new.prototype.sayname=function(){
                console.log(this.name)
            };
            //console.log(add_one_list.constructor.prototype)
            var youe=new sssss()
            function sssss(a){
                this.a=a;
                return this.saya=jh;
            }
            function jh(){
               //console.log(this.a)
                $(list).append(this.a)
            }
            //console.log(jh.prototype)
            //sssss.prototype.value=a;
            //sssss.prototype.sayValue=function(){
            //    console.log(this.value)
            //}
            //console.log(sssss)
        }
