function PrintOneURL() {
    //$.ligerDialog.waitting("打印中，请稍等....");
    codelist = getCheckedPrintList(); //架卡号数组
    LODOP = getLodop(document.getElementById("LODOP"), document.getElementById("LODOP_EM"));
    LODOP.PRINT_INIT("按网址打印入库单");
    // LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "合格证"); //打印方向及纸张类型,纸张宽度,纸张高
    LODOP.SET_PRINT_PAGESIZE(1, $("#hidPaperWidth").val(), $("#hidPaperHeight").val(), ""); //打印方向及纸张类型,纸张宽度,纸张高
    Templateapi()
}

function Templateapi() {
    $.ajax({
        type: "post",
        url: "../Ashx/AjaxHandler.ashx",
        cache: false,
        async: true,
        data: {
            type: "GetPrintFinishedStockTemplateInfo",
            code: codelist[printnum],
            Process: GetQueryString("Process")
        },
        success: function (data) {
            var jsonARR = JSON.parse(data);
            if (jsonARR.MsgCode == "100") {
                CreatePrintPage(jsonARR.PrintDetail);
            } else {
                $.ligerDialog.close();
                $.ligerDialog.error("接口错误，" + jsonARR.MsgDetail + "");
            }
        }
    });
}

function CreatePrintPage(data) {
    $("#printcon").html("");
    $("#printcon").html(data);
    var ERcode = codelist[printnum]; //条码
    if (GetQueryString("Type") == 3) { //入库前打印的合格证条码二维码写死01
        ERcode = ERcode + "01"
    }
    var maxheight = $("#hidPaperHeight").val(); //大纸的高度
    var ispages = $("#printcon #ispages").text(); //是否分页模式打印
    var pagenumber = $("#printcon #pagenumber").text().split(","); //页码位置
    var barcoderepeat = $("#barcoderepeat").text(); //条码是否每页打印
    var div1 = $("#printcon #div1").height();
    var div2H = $("#printcon #div2").height();

    var div1T = $("#printcon .div1T").val(); //div1左边偏移量
    var div1W = $("#printcon .div1W").val(); //div1左边偏移量
    var div1L = $("#printcon .div1L").val(); //div1左边偏移量
    var div1H = $("#printcon .div1H").val(); //div1左边偏移量

    var div2T = $("#printcon .div2T").val(); //div2左边偏移量
    var div2W = $("#printcon .div2W").val(); //div1左边偏移量
    var div2L = $("#printcon .div2L").val(); //div1左边偏移量
    var div2H = $("#printcon .div2H").val(); //div1左边偏移量

    var div3T = $("#printcon .div3T").val(); //div3左边偏移量
    var div3W = $("#printcon .div3W").val(); //div1左边偏移量
    var div3L = $("#printcon .div3L").val(); //div1左边偏移量
    var pageH = $("#printcon .pageH").val(); //最大分页高度
    var barcode = "";
    $("#printcon .barcode #barcode").each(function () {
        barcode += $(this).text() + "|";
    })
    barcodeLIst = barcode.substring(0, barcode.length - 1);
    if (PrintName == "-1") {
        alert("打印机名称未配置！");
        return;
    }
    LODOP.ADD_PRINT_TABLE(div3T, "" + div3L + "", "" + div3W + "", pageH, $("#hidenCSS").val() + $("#printcon #div3").html() + $("#hidenJS").val());
    //LODOP.SET_PRINT_STYLEA(0, "Vorient", 3); //Vorient设定打印项在纸张范围内的垂直方向的位置锁定方式

    LODOP.ADD_PRINT_HTM(div1T, "" + div1L + "", "" + div1W + "", div1H, $("#hidenCSS").val() + $("#printcon #div1").html() + $("#hidenJS").val());
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // ItemType打印属性  页眉页脚
    LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -1); //LinkedItem设置关联内容项的项目编号

    LODOP.ADD_PRINT_HTM(div2T, "" + div2L + "", "" + div2W + "", div2H, $("#hidenCSS").val() + $("#printcon #div2").html() + $("#hidenJS").val());
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // ItemType打印属性  页眉页脚
    LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -2); //LinkedItem设置关联内容项的项目编号


    var Linkedindex = 2;
    if ($("#printcon #pagenumber").length > 1) {
        for (var i = 0; i < $("#printcon #pagenumber").length; i++) {
            Linkedindex++;
            var thistext = $("#printcon #pagenumber")[i]; //页码位置
            var pagepostin = $(thistext).text().split(",");
            LODOP.ADD_PRINT_TEXT(pagepostin[0], pagepostin[1], pagepostin[2], pagepostin[3], "第#页/共&页");
            LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -Linkedindex); //LinkedItem设置关联内容项的项目编号
        }
    }

    if (barcodeLIst == "") {} else {
        var barcodeitem = barcodeLIst.split("|");
        if (barcodeitem.length == "0") {

        } else {
            for (var i = 0; i < barcodeitem.length; i++) {
                var barcodeIm = barcodeitem[i].split(",")
                Linkedindex++;
                LODOP.ADD_PRINT_BARCODE(barcodeIm[1], barcodeIm[2], "" + barcodeIm[3] + "", "" + barcodeIm[4] + "", "QRCode", ERcode);
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 6); //设置上面这个条码下方的文字字体大小
                //LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // ItemType打印属性  页眉页脚
                //LODOP.SET_PRINT_STYLEA(0, "LinkedItem",  -Linkedindex);  //LinkedItem设置关联内容项的项目编号
            }
        }
    }
    LODOP.ADD_PRINT_IMAGE(475, 99, 163, 141, "<img border='0' src='../images/kibingDB.png' width='100%' height='250'/>");
    LODOP.SET_PRINT_STYLEA(0, "Stretch", 1); //(可变形)扩展缩放模式

    LODOP.ADD_PRINT_IMAGE(475, 499, 163, 141, "<img border='0' src='../images/kibingDB.png' width='100%' height='250'/>");
    LODOP.SET_PRINT_STYLEA(0, "Stretch", 1); //(可变形)扩展缩放模式

    LODOP.ADD_PRINT_IMAGE(85, 302, 52, 52, "<img border='0' src='../Images/QAContactBRCode.jpg' width='100%' height='250'/>");
    LODOP.SET_PRINT_STYLEA(0, "Stretch", 1); //(可变形)扩展缩放模式

    LODOP.ADD_PRINT_IMAGE(86, 678, 52, 52, "<img border='0' src='../Images/QAContactBRCode.jpg' width='100%' height='250'/>");
    LODOP.SET_PRINT_STYLEA(0, "Stretch", 1); //(可变形)扩展缩放模式


    LODOP.ADD_PRINT_TEXT(698, 146, 163, 30, "MES信息")
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.ADD_PRINT_TEXT(698, 540, 163, 30, "MES信息")
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

    LODOP.ADD_PRINT_BARCODE(886, 259, 58, 62, "QRCode", ERcode);
    LODOP.ADD_PRINT_BARCODE(886, 665, 58, 62, "QRCode", ERcode);
    LODOP.NewPageA(); //新加一个页面
    if (printnum < (codelist.length - 1)) {
        printnum++;
        Templateapi();
    } else {
        //LODOP.PRINT_DESIGN();//打印设计
        LODOP.PREVIEW(); //打印预览
        //if (LODOP.SET_PRINTER_INDEX(PrintName)) {
        $("#button").attr("disabled", "disabled");
        //LODOP.PRINT();
        FinishedHGlog();
        if (GetQueryString("OpenType") == "Back") {
            setTimeout(function () {
                var LevelShelfId = GetQueryString("LevelShelfId");
            }, 1000);
        } else if (GetQueryString("Auto") == "1") {
            window.location.href = window.location.href.replace("Auto=1&", "");
        } else {
            window.location.href = window.location.href;
        }
        //}

    }
}
$(function () {
    $(".ProductName").each(function () {
        var fontS = 11;
        fontsize($(this), fontS);
    });
    $(".GlassMakeup").each(function () {
        GetproductName($(this))
        var fontS = 11;
        fontsize($(this), fontS);
    });
    $(".Customer").each(function () {
        var fontS = 11;
        fontsize($(this), fontS);
    });

})

function GetproductName(obj) {
    var str1 = $(obj).text();
    var index1 = str1.lastIndexOf("--");
    if (index1 != "-1") {
        str1 = str1.substring(index1 + 2, str1.length);
        $(".G_thickness").text(str1);
        if ($(".G_thickness").text() == "") {
            var str = $(obj).text();
            $(obj).text(str.replace("--", ""))
        }
    }
}

function fontsize(obj, fontS) {
    if ($(obj).height() > 30) {
        $(obj).css("font-size", "" + fontS + "px");
        if ($(obj).height() > 30) {
            fontS = fontS - 1;
            fontsize($(obj), fontS);
        }
    }
}