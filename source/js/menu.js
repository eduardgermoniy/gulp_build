/**
 * Created by a.sidorov on 12.01.2018.
 */
$(function() {
    $(".headerNav__button").unbind("click");

    $(".headerNav__button").bind("click",function(){
        var menuOpen = $(".headerNav").hasClass("headerNav__mobile");

        if(menuOpen) {
            $(".headerNav").removeClass("headerNav__mobile");
        }
        else {
            $(".headerNav").addClass("headerNav__mobile");
        }
    });
});