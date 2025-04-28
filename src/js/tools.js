let barras = 0;
let optName = document.getElementById("toolsH2");
const cadName = document.getElementById("requestPName");
const cadCod = document.getElementById("requestPCod");

function rebFechamentoJSON(event) {
    const jfile = event.target.files[0];

    if (jfile) {
        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                data = JSON.parse(e.target.result);
            } catch (err) {
                alert("ERRO AO PROCESSAR: " + err);
                location.reload()
            }
            finally {
                localStorage.setItem("abriuFechamento", data[0].dia);
                folksA = [data[1]];
                localStorage.setItem("folks", JSON.stringify(folksA));
                localStorage.setItem("LastLoginCode", data[1].loginCod);
                localStorage.setItem("cashier", data[2].caixa);

                for (let i = 0; i < data[3].length; i++) {
                    localStorage.setItem(`input${i} `, data[3][i]);
                }

                for (let i = 0; i < data[4].length; i++) {
                    localStorage.setItem(`class${i} `, data[4][i]);
                }
            }

            localStorage.setItem("allInputs", data[5].tamanho);
            localStorage.setItem("sangriasSaved", JSON.stringify(data[6]));
            localStorage.setItem("sViasSaved", JSON.stringify(data[7]));

        }
        reader.readAsText(jfile);
    }
    location.reload();
}

tools = () => {
    simpleLock = true;
    hiddenAll();
    document.getElementById("obsTable").classList.remove("hidden");
    setTimeout(function () {
        document.getElementById("obsText").focus();
    }, 200);
}

function hClass(opt, index, toolName, startPoint) {
    document.getElementById("obsText").classList.add("hidden");
    document.getElementById("barSec").classList.add("hidden");
    document.getElementById("qrSec").classList.add("hidden");
    document.getElementById("etiSec").classList.add("hidden");
    document.getElementById("caSec").classList.add("hidden");
    document.getElementById("qrTable").classList.add("hidden");
    document.getElementById("barrasTable").classList.add("hidden");
    document.getElementById("fontLabel").classList.add("hidden");
    document.getElementById("backSec").classList.remove("hidden");
    document.getElementById("etiquetar").classList.add("hidden");
    document.getElementById("etiquetarTable").classList.add("hidden");
    document.getElementById("reqSec").classList.add("hidden");
    document.getElementById("jsonSec").classList.add("hidden");

    optName.textContent = toolName;
    setTimeout(() => document.getElementById(startPoint).focus(), 100)

    let ions = {
        0: ["barrasTable", "barrasValue"],
        1: ["obsText", "qrTable"],
        2: ["etiquetar"]
    }

    if (document.getElementById(opt).classList.contains("hidden")) {
        ions[index].forEach(function (id) {
            document.getElementById(id).classList.remove("hidden");
        })
    }
}

sClass = () => {
    document.getElementById("qrTable").classList.add("hidden");
    document.getElementById("barrasTable").classList.add("hidden");
    document.getElementById("backSec").classList.add("hidden");
    document.getElementById("etiquetar").classList.add("hidden");

    document.getElementById("reqSec").classList.remove("hidden");
    document.getElementById("jsonSec").classList.remove("hidden");
    document.getElementById("barSec").classList.remove("hidden");
    document.getElementById("qrSec").classList.remove("hidden");
    document.getElementById("etiSec").classList.remove("hidden");
    document.getElementById("caSec").classList.remove("hidden");
    document.getElementById("obsText").classList.remove("hidden");
    document.getElementById("fontLabel").classList.remove("hidden");

    optName.textContent = "Escreva algo ⤵";
    document.getElementById("obsText").focus();
}

changeFontSize = () => {
    font = document.getElementById("fontSizeVar").value;
    document.getElementById("obsText").style = "font-size:" + font + "px;";
}

function GerarCódigoDeBarras(elementoInput) {
    if (!elementoInput.value) {
        elementoInput.value = 0;
    }
    barras++;
    const barTable = document.getElementById("barrasElements");

    let configuracao = {
        width: 1,
        height: 30,
        fontSize: 13,
        margin: 3,
        border: 1
    };
    const createLi = document.createElement("li");
    createLi.id = "barLi" + elementoInput.value;
    barTable.appendChild(createLi);

    const barName = document.createElement("input");
    barName.classList.add("barrasTitles");
    //barName.placeholder = `Nome ${elementoInput.value}`
    barName.placeholder = "#Del# exclui"
    createLi.appendChild(barName);
    createLi.appendChild(document.createElement("br"));

    const createImg = document.createElement("img");
    createImg.id = "codBarras" + barras;
    createLi.appendChild(createImg);
    const novoCodigobarras = `#${createImg.id}`;
    JsBarcode(novoCodigobarras, elementoInput.value, configuracao);

    document.getElementById("barrasValue").value = "";
    barName.focus();

    barName.addEventListener("change", function () {
        document.getElementById("barrasValue").focus();
        barCode = "barLi" + this.placeholder.slice(5)
        this.value == "#Del#" ? this.parentElement.remove() : null;
    });
}//https://www.mundojs.com.br/2018/01/16/crie-codigo-de-barras-em-javascript-com-jsbarcode/

qrCodeSet = () => {
    let userText = document.getElementById("obsText").textContent;
    userText.length <= 0 ? userText = "Nada" : null;
    document.getElementById("qr").setAttribute("src", `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${userText}`);
    document.getElementById("obsText").focus();
}

changeQrSize = () => {
    qrSize = document.getElementById("qrSizeVar").value;
    qrSize <= 4 ? qrSize = 4 : null;
    qrCodeSet();
}

function labelProduct() {
    let product = document.getElementById("etiNameValue").value;
    let price = document.getElementById("etiPriceValue").value;

    let priceFormated = parseFloat(price).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    document.getElementById("etiName").textContent = product.toUpperCase();
    document.getElementById("etiPrice").textContent = priceFormated;

    document.getElementById("etiquetar").classList.add("hidden");
    document.getElementById("etiquetarTable").classList.remove("hidden");
    window.print();
    document.getElementById("etiquetar").classList.remove("hidden");
    document.getElementById("etiquetarTable").classList.add("hidden");

    document.getElementById("etiNameValue").value = "";
    document.getElementById("etiPriceValue").value = "";
    document.getElementById("etiNameValue").focus();
}

function reqToJson() {
    cadastrar.push({ "PRODUTO:": cadName.value, "BARRAS:": cadCod.value });
    try {
        {
            exportJson(JSON.stringify(cadastrar, null, 2, "CADASTRO_PRODUTO"));
        }
    } catch (err) {
        alert("OCORREU UM ERRO! REPITA O PROCESSO. > " + err);
        cadName.value = "";
        cadCod.value = "";
        cadName.focus();
    };

    if (window.confirm("SOLICITAR OUTRO? ▪ ALTERNE COM TAB.")) {
        cadName.value = "";
        cadCod.value = "";
        cadName.focus();
    } else {
        location.reload();
    }
}

reqProd = () => {
    simpleLock = true;
    hiddenAll();
    document.getElementById("requestProduct").classList.remove("hidden")
    document.getElementById("requestPName").focus();
}