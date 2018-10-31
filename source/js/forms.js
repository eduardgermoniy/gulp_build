/**
 * Created by a.sidorov on 17.01.2018.
 */

var Form = function (obj) {
    var self = this;
    self.Obj = obj;
    self.Errors = [];
    self.Data = {};

    $(self.Obj.SubmitId).bind('click',function () {
        console.log("__click");
        self.CheckFields();
    });
};

Form.prototype.CheckFields = function () {
    var self = this;

    self.Errors = [];
    self.Data = {};

    var fields = self.Obj.Fields;

    $.each(fields, function(i,item) {
        console.log("field",item);
        var field = $(self.Obj.FormId + " input[name=" + item.name +"]");

        if(item.require) {
            if(field.val().length >= item.minLength) {
                field.removeClass("input__error");
            }
            else {
                field.addClass("input__error");
                self.Errors.push(item.error);
            }
        }

        self.Data[item.name] = field.val();
    });

    self.CheckAgreement();

    if(self.Errors.length > 0) {
        $(self.Obj.ErrorsId).show().html(self.Errors.join(', '));
    }
    else {
        $(self.Obj.ErrorsId).hide();
        self.SendForm();
    }
};

Form.prototype.CheckAgreement = function () {
    var self = this;
    if($(self.Obj.AgreementId).prop("checked") == false) {
        self.Errors.push("Галочка согласие на обработку персональных данных");
        return false;
    }
    return true;
};

Form.prototype.CheckField = function () {

};

Form.prototype.SendForm = function () {
    var self = this;

    $.ajax({
        method: "POST",
        crossDomain: true,
        url: self.Obj.Url,
        data: self.Data
    }).done(function (json) {
        var data = JSON.parse(json);

        if(data.errors)
        {
            $(self.Obj.SuccessId + " h2").html(data.errors);
        }

        $(self.Obj.SuccessId).css("visibility", "visible");
        $(self.Obj.SubmitId).unbind('click');

        if(self.Obj.FormId == ".demand") {
            $(".demand__payment").remove();
        }
    });
};

$(function() {
    $(".phone__masked").mask("+7 (999) 999-99-99",{placeholder: "."});
});