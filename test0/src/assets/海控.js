function PrintOneURL() {
    //$.ligerDialog.waitting("打印中，请稍等....");
    codelist = getCheckedPrintList(); //架卡号数组
    LODOP = getLodop(document.getElementById("LODOP"), document.getElementById("LODOP_EM"));
    LODOP.PRINT_INIT("按网址打印入库单");
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
            code: codelist[printnum]
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
    // $("#PrintDiv").html("");
    $("#printcon").html("");
    $("#printcon").html(data);
    copyTableHtml();
    var ERcode = codelist[printnum]; //条码
    if (PrintName == "-1") {
        alert("打印机名称未配置！");
        return;
    }
    //上左偏移量，宽高
    var div0T = 243; //div0上边偏移量
    var div0L = 13; //div0左边偏移量
    var div0W = "100%"; //div0宽
    var div0H = $("#printcon #div0").height(); //div0高

    //上左偏移量，宽高
    var div1T = 88;
    var div1L = 80;
    var div1W = "100%";
    var div1H = $("#printcon #div1").height();

    //上左偏移量，宽高
    var div2T = 228 + div0H;
    var div2L = 13;
    var div2W = "100%";
    var div2H = 739 - (div2T + 90);

    // var barcode = "";
    // $("#printcon .barcode #barcode").each(function () {
    //     barcode += $(this).text() + "|";
    // })
    // barcodeLIst = barcode.substring(0, barcode.length - 1);
    if (PrintName == "-1") {
        alert("打印机名称未配置！");
        return;
    }
    
    LODOP.ADD_PRINT_HTM(div2T, "" + div2L + "", "" + div2W + "", div2H, $("#hidenCSS").val() + $("#printcon #div2").html() + $("#hidenJS").val());
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // ItemType打印属性  页眉页脚

    LODOP.ADD_PRINT_HTM(div1T, "" + div1L + "", "" + div1W + "", div1H, $("#hidenCSS").val() + $("#printcon #div1").html() + $("#hidenJS").val());
    LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -1); //LinkedItem设置关联内容项的项目编号

    LODOP.ADD_PRINT_HTM(div0T, "" + div0L + "", "" + div0W + "", div0H, $("#hidenCSS").val() + $("#printcon #div0").html() + $("#hidenJS").val());
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // ItemType打印属性  页眉页脚
    LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -2); //LinkedItem设置关联内容项的项目编号

    var Linkedindex = 2;
    // if ($("#printcon #pagenumber").length > 1) {
    //     for (var i = 0; i < $("#printcon #pagenumber").length; i++) {
    //         Linkedindex++;
    //         var thistext = $("#printcon #pagenumber")[i]; //页码位置
    //         var pagepostin = $(thistext).text().split(",");
    //         LODOP.ADD_PRINT_TEXT(pagepostin[0], pagepostin[1], pagepostin[2], pagepostin[3], "第#页/共&页");
    //         LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
    //         LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    //         LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -Linkedindex); //LinkedItem设置关联内容项的项目编号
    //     }
    // }
    var barcodeLIst = [[10, 51, 238, 30], [10, 418, 238, 30]]
    if (barcodeLIst.length) {

        for (var i = 0; i < barcodeLIst.length; i++) {
            var barcodeitem = barcodeLIst[i];
            var barcodeIm = barcodeitem;
            Linkedindex++;
            LODOP.ADD_PRINT_BARCODE(barcodeIm[0], barcodeIm[1], "" + barcodeIm[2] + "", "" + barcodeIm[3] + "", "CODE93", ERcode);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 6); //设置上面这个条码下方的文字字体大小
            //LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // ItemType打印属性  页眉页脚
            //LODOP.SET_PRINT_STYLEA(0, "LinkedItem",  -Linkedindex);  //LinkedItem设置关联内容项的项目编号
        }

    }   

    LODOP.ADD_PRINT_TEXTA("text01", 663, 228, 70, 20, "总箱数"+$("#printcon .marighr .BoxCount").text()+"");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // ItemType打印属性  页眉页脚
    LODOP.ADD_PRINT_TEXTA("text01", 663, 551, 70, 20, "总箱数 "+$("#printcon .marighr .BoxCount").text()+"");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // ItemType打印属性  页眉页脚


    //页码
    LODOP.ADD_PRINT_HTM(668, 303, 37, 20, "<font color='#000' style='font-size:12px;'><span tdata='pageNO' style='margin-right:1px;'>#</span>/<span tdata='pageCount'>#</span></font>");
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // ItemType打印属性  页眉页脚

    LODOP.ADD_PRINT_HTM(668, 618, 37, 20, "<font color='#000' style='font-size:12px;'><span tdata='pageNO' style='margin-right:1px;'>#</span>/<span tdata='pageCount'>#</span></font>");
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // ItemType打印属性  页眉页脚


    LODOP.NewPageA(); //新加一个页面
    if (printnum < (codelist.length - 1)) {
        printnum++;
        Templateapi();
    } else {
        LODOP.PRINT_DESIGN(); //打印设计
        //LODOP.PRINT();
        // LODOP.PREVIEW(); //打印预览
        FinishedHGlog(); //记录打印日志
        $("#button").attr("disabled", "disabled");
        if (GetQueryString("OpenType") == "Back") {
            setTimeout(function () {
                var LevelShelfId = GetQueryString("LevelShelfId");
            }, 1000);
        } else if (GetQueryString("Auto") == "1") {
            window.location.href = window.location.href.replace("Auto=1&", "");
        } else {
            window.location.href = window.location.href;
        }
    }
}
$(function () {
    if (GetQueryString("autoprint") == 1) {
        PrintOneURL()
    }
    copyTableHtml()
})
function copyTableHtml(){
    $(".fztbodyinfo").html($(".copytbodyinfo").html())
}

function textinfo() {
    var str = "";
    for (var i = 0; i < 20; i++) {
        str += "<tr>";
        str += "    <td style=\"width: 20px;\">" + i + "</td>";
        str += "    <td style=\"width: 80px;\">1190 * 3643</td>";
        str += "    <td style=\"width: 20px;\">2</td>";
        str += "    <td style=\"width: 60px;\">GWC-01</td>";
        str += "</tr>";
    }
    $(".tbodyinfo").append(str)
}