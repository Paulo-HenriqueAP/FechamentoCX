let sum = 0;
let notiSum = 0;
let cashSum = 0;
let devSum = 0;
let subTotal = 0;
let control = 0;
let pixCount2 = 0;
let devCount2 = 0;
let dynamicInputsCount2 = 0;
let notiSum2 = 0;
let devSum2 = 0;
let pixSum2 = 0;
let qrSize = 150;
let activeEl = document.activeElement;
let login = "";
let saveName;
let saveLogin;
let allInputs;
let loginFind;
let edit;
let cashier;
let folks = [];
let cadastrar = [];
let sangriasSaved = [];
let sViasSaved = [];
let day;
let simpleLock = true;
let master = false;

const sangriasUL = document.getElementById("sangriasUL");
const nameText = document.getElementById("uName");
const loginText = document.getElementById("uLogin");
const dataJson = [];
const inputsSaved = [];
const classSaved = [];
const registerStatus = document.getElementById("regStatus");
const create_uName = document.getElementById("nameValue");
const topo = document.getElementById("stuffs");
const signature = document.getElementById("signature");
const bodyTable = document.getElementById("bodyTable");
const sangriaElement = document.getElementById("sangria");
const sangriaInput = document.getElementById("sangriaInput");
const registerHub = document.getElementById("registerHub");
const holidays = {
    "01/01": { holName: `Feliz ${new Date().getFullYear()}`, holImg: "src/icons/anoNovo.png" },
    "03/04": { holName: "Sexta-feira Santa", holImg: "src/icons/sexta.png" }/*VARIA*/,
    "21/04": { holName: "Dia de Tiradentes", holImg: "src/icons/tiradentes.png" },
    "01/05": { holName: "Dia do Trabalhador", holImg: "src/icons/trabalhador.png" },
    "19/06": { holName: "Corpus Christi", holImg: "src/icons/corpus.png" } /*VARIA*/,
    "15/08": { holName: "Dia de Nossa Senhora da Boa Viagem", holImg: "src/icons/viagem.png" },
    "07/09": { holName: "Independência do Brasil", holImg: "src/icons/independencia.png" },
    "12/10": { holName: "Dia de Nossa Senhora Aparecida", holImg: "src/icons/aparecida.png" },
    "02/11": { holName: "Dia dos Finados", holImg: "src/icons/finados.png" },
    "15/11": { holName: "Proclamação da República", holImg: "src/icons/republica.png" },
    "20/11": { holName: "Consciência Negra", holImg: "src/icons/consciencia.png" },
    "08/12": { holName: "Dia de Nossa Senhora Imaculada Conceição", holImg: "src/icons/Imaculada.png" },
    "25/12": { holName: "Feliz Natal 🎁", holImg: "src/icons/natal.png" },
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginValue").focus();
    loadState();
    //console.log(Object.keys(localStorage)
    day = `${new Date().toLocaleDateString().slice(0, 5)}`
    Object.keys(holidays).forEach(hol => {
        day === hol && setHol();
    });

    if (new Date().toLocaleDateString().slice(0, 2) == 15) day15();

    document.getElementById("cx").textContent = `[${cashier}]`;
    document.getElementById("cxName").textContent = `caixa [${cashier}]`
})

function setHol() {
    document.getElementById("hiddenHol").classList.remove("hidden");
    document.getElementById("holName").textContent = holidays[day].holName;
    document.getElementById("tagImg").setAttribute("src", holidays[day].holImg);
}

let day15 = () => {
    document.getElementById("vaiq").classList.remove("hidden");
    document.getElementById("day15").setAttribute("src", "src/icons/qr_code.jpg")
}

/*const folks = [
    { uName: "Paulo Henrique AP", loginCod: 1419 },
];*/

function createInputs(iLenght) {
    const rest = document.getElementById("dynamicInputsValues");

    for (let i = 0; i < iLenght; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.className = "dynamicInputs";
        input.min = "-1";
        input.addEventListener("change", () => {
            formSum();
        })
        rest.appendChild(input);
    }
}

function showUserInfos() {
    login = document.getElementById("loginValue").value;

    if (login === "06052002" || login === "-06052002") {
        login == "06052002" ? master = true : master = false;
        localStorage.setItem("master", master);
        return;
    }

    const dateNow = new Date().toLocaleDateString();

    !localStorage.getItem("abriuFechamento") ? localStorage.setItem("abriuFechamento", dateNow) : null;

    if (folks && folks.length > 0) {
        loginFind = folks.find(user => user.loginCod == login);
    }

    const dateText = localStorage.getItem("abriuFechamento" || dateNow);
    document.getElementById("date").textContent = dateText;

    if (loginFind) {
        nameText.textContent = loginFind.uName;
        bodyTable.classList.remove("hidden");
        document.getElementById("filtersMain").classList.remove("hidden");
        loginText.textContent = `<${login}> `;
        localStorage.setItem("LastLoginCode", login);
        simpleLock = false;
        document.getElementById("operCod").textContent = `<${login}> `;
        document.getElementById("oper").textContent = uName.textContent;
        goToFreeInput();
    } else {
        simpleCheck(create_uName, `Login '${login}' não encontrado`);
    }

    document.getElementById("printerSettings").remove();
    document.getElementById("loginHub").remove();
    document.getElementById("tutoDiv").classList.remove("hidden");
    //document.getElementById("newLoginValue").requestFullscreen();
}

function saveFolks() {
    simpleCheck(nameValue, `digite um nome '${login}'`);
    nameText.textContent = create_uName.value;

    edit = folks.find(user => user.loginCod == login);

    if (nameText.textContent == "") return;

    if (edit) {
        edit.uName = create_uName.value;
        edit.loginCod = login;
        registerStatus.textContent = `editou '${login}'`;
    } else {
        createFolk = { uName: create_uName.value, loginCod: parseInt(login) };
        folks.push(createFolk);
        registerStatus.textContent = `criou '${login}'`;
        localStorage.setItem("LastLoginCode", login);
    }

    localStorage.setItem("folks", JSON.stringify(folks));
    setTimeout(function () {
        location.reload();
    }, 1000)
}

defCashier = () => {
    cashier = prompt("Este PC é o Caixa");
    //console.log(cashier)
    if (cashier == null || isNaN(cashier) || cashier.trim() == "") {
        alert("Ocorreu um erro :<");
        location.reload();
    } else {
        localStorage.setItem("cashier", cashier);
        setTimeout(function () {
            location.reload();
        }, 1000)
    }
}

function formSum() {
    sum = 0;
    notiSum = 0;
    cashSum = 0;
    devSum = 0;
    pixSum = 0;
    errSum = 0;
    sanSum = 0;
    dynamicInputsCount = 0;
    subTotal = 0;

    document.querySelectorAll(".dynamicInputs").forEach((input) => {
        input.value.length >= 8 ? input.style = `width:${input.value.length}ch;` : input.style = "width:default";

        if (input.value.trim() === "") return;

        const iValue = parseFloat(input.value)

        if (isNaN(iValue) || iValue <= 0) {
            input.value = "";
            !input.id && goToFreeInput();
            return;
        }

        if (input.id) {
            cashSum += iValue;
        } else if (input.classList.contains("dynamicInputs") && input.classList.contains("becomeDev")) {
            devSum += iValue;
        } else if (input.classList.contains("dynamicInputs") && input.classList.contains("becomePix")) {
            pixSum += iValue;
        } else {
            dynamicInputsCount++
            notiSum += iValue;
        }
        sum += iValue;
    });

    if (localStorage.getItem("sangriasSaved")) {
        sangriasSaved.forEach(function (createSangriasLi) {
            sanSum += parseFloat(createSangriasLi.sangriaValue);
        })

        sum += sanSum;
    }

    sum += devSum2 + pixSum2 + notiSum2;
    subTotal = sum - notiSum;

    updateInput();
}

function updateInput() {
    function findEmpty(className) {
        document.querySelectorAll(className).forEach((input) => {
            if (input.value === "") input.classList.remove(className.replace(".", ""));
        })
    }

    findEmpty(".becomeDev");
    findEmpty(".becomePix");

    function check(checkWho, hub, hub2, cTitle, cName, cSum, only1Name) {
        const size = document.getElementsByClassName(checkWho).length;
        const hubID = document.getElementById(hub);
        const hub2ID = document.getElementById(hub2);
        const nameID = document.getElementById(cTitle);

        if (size <= 0) {
            hubID.classList.add("hidden");
            hub2ID.parentElement.classList.add("hidden");
        } else {
            hubID.classList.remove("hidden");
            hub2ID.parentElement.classList.remove("hidden");
            nameID.textContent = `${size} ${cName} ${cSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} `;
            size == 1 ? nameID.textContent = only1Name : null;
        }
    }

    check("becomeDev", "devHub", "devValues", "dev", "DEVOLUÇÕES", devSum, "UMA DEVOLUÇÃO");
    check("becomePix", "pixHub", "pixValues", "pix", "PIX CELULAR", pixSum, "UM PIX CELULAR");

    sangriaStatus = document.getElementById("sangriasTitle");

    sangriasSaved.length <= 0 ? sangriaStatus.textContent = "SEM SANGRIAS" : sangriaStatus.textContent = `${sangriasSaved.length} SANGRIAS`;
    sangriasSaved.length == 1 ? sangriaStatus.textContent = "UMA SANGRIA" : null;

    document.getElementById("showSum").textContent = "TOTAL: " + sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("cash").textContent = "DINHEIRO: " + cashSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("dynamicInputsTitle").textContent = `${dynamicInputsCount} NOTINHAS: ${notiSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
    document.getElementById("subTotal").textContent = `SUBTOTAL: ${subTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
    document.querySelectorAll(".dynamicInputs").forEach((input) => {
        if (input.value < 1 && !input.id) control++;
    });
    control < 2 ? createInputs(8) : null;
    control = 0;

    saveState();
}

function applyFilter(filterClass) {
    const activeEl = document.activeElement;

    let fNames = ["becomePix", "becomeDev"];

    fNames = fNames.filter(function (removeClass) {
        return removeClass != filterClass;
    });

    activeEl.classList.remove(...fNames)

    if (activeEl.tagName === "INPUT" && activeEl.value != "" && !activeEl.id) {
        activeEl.classList.toggle(filterClass);
    }

    formSum();
}

function jumpToNext() {
    let nextEl = document.querySelectorAll("input");
    let index = Array.prototype.indexOf.call(nextEl, document.activeElement);

    try {
        nextEl[index + 1].focus();
    } catch (error) {
        topo.focus()
    };
}

function jumpBack() {
    let nextEl = document.querySelectorAll("input");
    let index = Array.prototype.indexOf.call(nextEl, document.activeElement);

    try {
        index == 10 ? goToFreeInput() : nextEl[index - 1].focus();
    } catch (error) {
        goToFreeInput();
    };
}

function goToFreeInput() {
    findEmpty = document.querySelectorAll(".dynamicInputs");
    for (let i = 0; i < findEmpty.length; i++) {
        if (findEmpty[i].value === "" && !findEmpty[i].id) {
            findEmpty[i].focus();
            break;
        }
    }
}

function findAndClear() {
    function createTempInput(create, rest) {
        const createClass = document.getElementsByClassName(create);

        for (let i = 0; i < createClass.length; i++) {
            const input = document.createElement("input");
            input.value = createClass[i].value;
            input.classList.add("tempInput");
            input.value.length >= 8 ? input.style.width = `${input.value.length}ch` : null;

            document.getElementById(rest).appendChild(input);
            setTimeout(function () {
                if (master) return;
                input.remove();
            })
        }
    }

    createTempInput("becomePix", "pixValues");
    createTempInput("becomeDev", "devValues");


    if (master) return;
    document.querySelectorAll(".dynamicInputs").forEach((input) => {
        if (input.value == "" && !input.id) {
            input.classList.add("hidden");
        } setTimeout(function () {
            input.classList.remove("hidden");
        }, 500)

        if (input.id && input.value === "") {
            input.type = "text";
            input.value = "NÃO";
            setTimeout(function () {
                input.value = "";
                input.type = "number";
            }, 500);
        }
    })
}

function clearAll() {
    const keepIt = ["folks", "cashier", "master"]
    const dataSaved = Object.keys(localStorage)
    dataSaved.forEach(key => {
        if (!keepIt.includes(key)) {
            localStorage.removeItem(key);
        }
    })

    location.reload();
}

/*
function dPaper() {
    const title = document.createElement("h3");
    const val = document.createElement("li");
    const clie = document.createElement("li");
    const end = document.createElement("h3");

    title.innerHTML = `ENTREGA ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} <br> [${cashier}] ${nameText.textContent}`
    val.innerHTML = "VALOR: <br><br>";
    clie.innerHTML = "CLIENTE: <br><br>";
    end.innerHTML = "CARTÃO [ ] DIN $ [  ]  PIX [  ] <br><br> <span>-</span>";

    document.getElementById("dPaper").append(title, val, clie, end);
    hiddenAll();
    window.print();
    location.reload();
}
*/
function hiddenAll() {
    bodyTable.classList.add("hidden");
    sangriaElement.classList.add("hidden");
    registerHub.classList.add("hidden");
    document.getElementById("filtersMain").classList.add("hidden");
    document.getElementById("obsTable").classList.add("hidden");
    document.getElementById("requestProduct").classList.add("hidden");
}

function changePosition() {
    let moveTo = 4;
    let element = "";

    for (let i = 0; i < 4; i++) {
        element = "td" + i;
        moveTo--;
        document.getElementById("trC" + moveTo).appendChild(document.getElementById(element));
    }

    if (master) return;

    setTimeout(function () {
        moveTo = 4;
        for (let i = 3; i > -1; i--) {
            element = "td" + i;
            moveTo--;
            document.getElementById("trC" + moveTo).appendChild(document.getElementById(element));
        }
    }, 1000)
}

function saveState() {
    const inputs = document.querySelectorAll('.dynamicInputs');
    let notEmp = 0;

    inputs.forEach((input) => {
        input.value != "" ? notEmp++ : null
    });

    inputs.forEach((input, index) => {
        localStorage.setItem(`input${index} `, input.value);
        localStorage.setItem(`class${index} `, input.classList.toString());
    });
    notEmp > 40 ? localStorage.setItem("allInputs", notEmp) : localStorage.removeItem("allInputs");
}

function loadState() {
    document.querySelectorAll(".dynamicInputs").forEach((input) => {
        if (input.value < 1 && !input.id) {
            control++;
        }
    })

    if (control < 2) createInputs(8);
    //
    folks = JSON.parse(localStorage.getItem("folks"));

    if (localStorage.getItem("sangriasSaved")) {
        sangriasSaved = JSON.parse(localStorage.getItem("sangriasSaved"));
        const sangriaEdit = document.getElementById("sangriaEdit");

        sangriasSaved.forEach(function (createSangriasLi, index) {
            const li = document.createElement("li");
            li.textContent = `${createSangriasLi.sangriaValue}$`

            sangriasUL.appendChild(li)

            const removeSangria = document.createElement("li");
            removeSangria.innerHTML = `<b> ${createSangriasLi.sangriaValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</b> | ${createSangriasLi.sangriaTime} `;

            const removeSangriaButton = document.createElement("button");
            removeSangriaButton.textContent = "✖"
            removeSangriaButton.id = "sa_" + index;

            removeSangriaButton.addEventListener("focus", function () {
                document.getElementById(this.id).parentNode.style = "background-color: #d80000; color:white; border:1px solid black;";
                //console.log(this.id.substring(2, 3))
            })

            removeSangriaButton.addEventListener("focusout", function () {
                document.getElementById(this.id).parentNode.style = "background-color: #F8F8FF; color:black; border:default;";
            })

            removeSangriaButton.addEventListener("click", function () {
                if (window.confirm(`APAGAR sangria de ${sangriasSaved[this.id.slice(3)].sangriaValue} $ ? `)) {
                    sangriasSaved.splice(this.id.slice(3), 1)
                    localStorage.setItem("sangriasSaved", JSON.stringify(sangriasSaved));
                    location.reload();
                }
            })

            removeSangria.appendChild(removeSangriaButton)
            sangriaEdit.appendChild(removeSangria)
        })

    }

    if (folks == null) { folks = [] };//primeira utilização

    const lastTotalInputs = localStorage.getItem("allInputs");
    lastTotalInputs ? allInputs = parseInt(lastTotalInputs) : allInputs = 32;
    createInputs(allInputs);

    const inputs = document.querySelectorAll('.dynamicInputs');
    inputs.forEach((input, index) => {
        const savedValue = localStorage.getItem(`input${index} `);
        const savedClass = localStorage.getItem(`class${index} `);

        //input.value = savedValue ?? ""; (remove as classes salvas (bug))
        savedValue !== null ? input.value = savedValue : null
        savedClass !== null ? input.className = savedClass : null
    });
    if (localStorage.getItem("LastLoginCode")) {
        document.getElementById("loginValue").value = localStorage.getItem("LastLoginCode");
        showUserInfos();
    }

    //document.getElementById("lastTime").textContent += localStorage.getItem("time");
    localStorage.getItem("cashier") ? cashier = localStorage.getItem("cashier") : cashier = "69"
    workShift = new Date().getHours();
    if (workShift >= 14 && workShift < 23 && !master) {
        cashier += ".2";
    } else {
        cashier += ".1";
    }

    document.getElementById("cxNumber").textContent = `[${cashier}]`;

    if (localStorage.getItem("sViasSaved")) {
        sViasSaved = JSON.parse(localStorage.getItem("sViasSaved"));

        sViasSaved.map(obj => {
            const details = document.createElement("details");
            const summary = document.createElement("summary");
            summary.textContent = `MAIS DETALHES`;
            details.appendChild(summary);

            const div = document.createElement("button");
            div.classList.add("sVias");
            div.setAttribute("tabindex", "0")
            div.title = "TECLE ENTER PARA REIMPRIMIR";
            //const button = document.createElement("button");
            //button.innerHTML = "🖨️";
            div.addEventListener("click", function () {
                let div = document.createElement("div");
                let divInfos = document.createElement("div");

                divInfos.innerHTML = `<h3>REIMPRESSÃO SANGRIA<br> ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} </h3> <b> ${nameText.textContent} <br> ${loginText.textContent} [${cashier}]</b><br>------------------------------`;
                div.appendChild(divInfos);

                //div.appendChild(this.parentElement)
                div.appendChild(this);
                document.getElementById("sangriaViasTable").appendChild(div);
                //this.remove();
                window.print();
                location.reload();
            })

            //button.classList.add("botao");
            //div.appendChild(button)
            Object.entries(obj).forEach(([key, values]) => {
                const nSangria = document.createElement("div");
                key == "sVdevolucoes" ? nSangria.innerHTML = "<br>DEVOLUÇÕES <br><br>" : nSangria.innerHTML = `<br>${key.toUpperCase().slice(2)} <br><br>`;
                key == "sVpix" ? nSangria.style = "border:none" : null
                values.forEach(val => {
                    const span = document.createElement("span");
                    span.textContent = val;
                    nSangria.appendChild(span);
                    switch (key) {
                        case "sVnotinhas":
                            dynamicInputsCount2++;
                            notiSum2 += val;
                            break;
                        case "sVpix":
                            pixCount2++;
                            pixSum2 += val;
                            break;
                        case "sVdevolucoes":
                            devCount2++;
                            devSum2 += val;
                            break;
                    }
                });
                div.appendChild(nSangria);

                values.length < 1 ? nSangria.remove() : null;
            });
            details.appendChild(div);

            //document.getElementById("sangriaVias").appendChild(div);
            document.getElementById("sangriaVias").appendChild(details);
        });
    }

    document.getElementById("sNTpix").innerHTML = `${pixCount2} PIX CELULAR <b>${parseFloat(pixSum2)}$</b>`;
    document.getElementById("sNTNotinhas").innerHTML = `${dynamicInputsCount2} NOTINHAS<b>${parseFloat(notiSum2)}$</b>`;
    document.getElementById("sNTdev").innerHTML = `${devCount2} DEVOLUÇÕES <b>${parseFloat(devSum2)}$</b>`;

    pixCount2 >= 1 ? document.getElementById("sNTpix").classList.remove("hidden") : null;
    dynamicInputsCount2 >= 1 ? document.getElementById("sNTNotinhas").classList.remove("hidden") : null;
    devSum2 >= 1 ? document.getElementById("sNTdev").classList.remove("hidden") : null;

    formSum();
    goToFreeInput();
    master = JSON.parse(localStorage.getItem("master"));

    if (master) {
        document.getElementById("subTotal").classList.remove("hidden");
        document.getElementById("sanNotinhasUL").parentElement.classList.remove("hidden");
        sangriaElement.classList.remove("hidden");
        sangriaElement.style = "transform:none; left:60%;";
        document.getElementById("filtersMain").classList.add("hidden");
        //document.getElementById("tutoDiv").classList.add("hidden");
        findAndClear();
        changePosition();

        const button = document.createElement("button");
        button.innerHTML = "FINALIZAR";
        button.style = "padding:10px; background-color: black; color:white; cursor:pointer;";

        button.addEventListener("click", () => {
            clearAll();
        })

        const input = document.createElement("input");
        input.type = "file";
        input.id = "jsonFile";
        input.accept = ".json";
        input.style = "display: none";

        const label = document.createElement("label");
        label.innerHTML = "SELECIONE UM .json GERADO";
        label.htmlFor = "jsonFile";
        label.classList = "labelJson";

        input.addEventListener("change", (event) => {
            rebFechamentoJSON(event);
        })

        const button2 = document.createElement("button");
        button2.textContent = "⇵";
        button2.classList.add("tempB");

        button2.addEventListener("click", () => {
            document.getElementById("dynamicInputsValues").classList.add("hidden");
            button2.textContent == "⇵" ? sf() : location.reload();
            button2.textContent = "⟳";
        })

        function sf() {
            const arr = [];
            const main = document.getElementById("mainDynamicInputs");
            const ul = document.createElement("ul");
            ul.style = " margin: 0px; padding: 0px;";

            document.querySelectorAll(".dynamicInputs").forEach((input) => {
                if (!input.id && input.value != "" && !input.classList.contains("becomePix") && !input.classList.contains("becomeDev")) {
                    arr.push(input.value);
                }
            });
            arr.sort(function (a, b) { return a - b })

            arr.forEach((temp) => {
                const input = document.createElement("input");
                input.value = temp;
                input.classList.add("tempInput");
                input.value.length >= 8 ? input.style.width = `${input.value.length}ch` : null;
                ul.appendChild(input);
            })
            main.appendChild(ul);
        }

        document.getElementById("dynamicInputsTitle").append(" ", button2);
        sangriaElement.append(input, label, button);
    }
}


simpleCheck = (invoker, status, name) => {
    simpleLock = true;
    hiddenAll();
    registerHub.classList.remove("hidden");
    registerStatus.textContent = status || `Salvar '${login}'`;

    if (name) create_uName.value = nameText.textContent;

    if (create_uName.value == "") {
        document.getElementById("saveButton").classList.add("error");
        invoker.focus();
        registerStatus.textContent = status || `Digite um nome '${login}'`;
        return;
    }

    document.getElementById("saveButton").classList.remove("error");
    document.getElementById("saveButton").focus();
}

defSangria = () => {
    check = 0;
    document.querySelectorAll(".dynamicInputs").forEach((input) => {
        if (input.value >= 1 && !input.id) {
            check++;
        }
    })
    //console.log(check)

    sangria = parseFloat(sangriaInput.value);
    if (isNaN(sangria) || sangria < 0) {
        return;
    } else if (sangria == 0 && window.confirm("Registrar sangria de NOTINHAS?")) {
        check >= 1 ? sangriaVias() : location.reload();
        return;
    } else if (sangria >= 1) {
        try {
            document.getElementById("sangriaTable").classList.toggle("hidden");
            sangriaInput.classList.toggle("hidden");
            document.getElementById("sangria").classList.add("hidden");
            document.getElementById("sumSangria").innerHTML = `<span style="font-size: large; display: block;">SANGRIA</span><b style="font-size:xxx-large; display:block;">${sangria.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</b>`;
            document.getElementById("timeSangria").textContent = `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} `
            sangriaMade = { sangriaValue: sangria, sangriaTime: new Date().toLocaleTimeString() }
            sangriasSaved.push(sangriaMade);
            localStorage.setItem("sangriasSaved", JSON.stringify(sangriasSaved));
            window.print();
            location.reload();
        } catch (err) {
            alert("ERRO AO FAZER SANGRIA: " + err)
            location.reload()
        }
    }
}

function sangriaVias() {
    let viaSum = 0;

    try {
        document.querySelectorAll(".sTD").forEach((hid) => {
            hid.classList.add("hidden");
        });
        sangriaElement.classList.toggle("hidden");
        findAndClear();
        document.getElementById("sangriasTitle").classList.add("hidden");;
        sangriasUL.parentElement.classList.add("hidden");
        document.getElementById("cash").classList.add("hidden");
        document.getElementById("cx").innerHTML = `[${cashier}]<br><b>SANGRIA</b>`;
        document.getElementById("time").textContent = `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} `;
        signature.classList.remove("hidden");
        bodyTable.classList.remove("hidden");

        document.querySelectorAll(".dynamicInputs").forEach((input) => {
            if (input.value.trim() === "") {
                return;
            }

            const iValue = parseFloat(input.value)

            if (isNaN(iValue) || iValue <= 0 || input.id) {
                return;
            }

            viaSum += iValue;
        });

        document.getElementById("showSum").textContent = "TOTAL: " + viaSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        window.print();
    } catch (err) {
        alert("Ocorreu um erro ao fazer a sangria das vias > " + err);
        location.reload();
    };

    if (window.confirm("Tudo certo? ▪ ALTERNE COM TAB.")) {
        saveSangriaVias();
    } else {
        alert("Corrija seu erro e repita o processo.");
        location.reload()
    }
}

function saveSangriaVias() {
    let sVnotinhas = []
    let sVdevolucoes = []
    let sVpix = []

    if (window.confirm("A gerência confirmou? ▪ ALTERNE COM TAB.")) {
        alert("Imprima a sua via!");
        document.getElementById("cx").innerHTML = `[${cashier}]<br><b>2ª via SANGRIA</b>`;
        window.print();
        document.querySelectorAll(".dynamicInputs").forEach((input) => {
            if (input.value.trim() === "") {
                return;
            }

            const iValue = parseFloat(input.value)

            if (isNaN(iValue) || iValue <= 0 || input.id) {
                return;
            }

            if (input.classList.contains("becomeDev")) {
                sVdevolucoes.push(iValue);
            } else if (input.classList.contains("becomePix")) {
                sVpix.push(iValue);
            } else {
                sVnotinhas.push(iValue);
            }
        })

        sViasSaved.push({ sVpix, sVnotinhas, sVdevolucoes });
        localStorage.setItem("sViasSaved", JSON.stringify(sViasSaved));

        document.querySelectorAll(".dynamicInputs").forEach((input) => {
            if (!input.id) {
                input.value = "";
            }
            input.classList.remove("hidden");
        });
        saveState();
        location.reload();
    } else {
        alert("Corrija seu erro e repita o processo.");
        location.reload();
    };
}
//clearAll()


function processJson() {
    dataJson.push({ dia: localStorage.getItem("abriuFechamento") });
    dataJson.push(loginFind);
    dataJson.push({ caixa: cashier });

    const inputs = document.querySelectorAll('.dynamicInputs');
    inputs.forEach((input) => {
        inputsSaved.push(input.value)
        classSaved.push(input.classList.toString())
    });

    dataJson.push(inputsSaved);
    dataJson.push(classSaved);

    dataJson.push({ tamanho: allInputs })

    dataJson.push(sangriasSaved);
    dataJson.push(sViasSaved);

    fileName = `${localStorage.getItem("abriuFechamento")}-${nameText.textContent}-${login}`;

    try {
        exportJson(JSON.stringify(dataJson, null, 2), fileName);
    } catch (err) {
        alert("ERRO AO EXPORTAR> " + err);
        location.reload();
    } finally {
        setTimeout(function () {
            clearAll();
        }, 900)
    }

}

function exportJson(items, jsonName) {
    const blob = new Blob([items], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = jsonName;
    link.click();
}

/*
var i;
for (i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}
    */

document.addEventListener("keydown", (function (event) {
    if (event.key === "Enter" && simpleLock == false) {
        jumpToNext();
    }

    switch (event.code) {
        case "F4":
            event.preventDefault();
            try {
                formSum();
                document.getElementById("time").textContent = `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} `;
                findAndClear();
                signature.classList.remove("hidden");
                document.getElementById("subTotal").classList.remove("hidden");
                changePosition();
                localStorage.getItem("sViasSaved") ? document.getElementById("sanNotinhasUL").parentElement.classList.remove("hidden") : null;
            } catch (err) {
                alert("Ocorreu um erro ao imprimir > " + err);
                location.reload()
            } finally {
                window.print();
            }
            setTimeout(function () {
                signature.classList.add("hidden");
                document.getElementById("subTotal").classList.add("hidden");
                document.getElementById("sanNotinhasUL").parentElement.classList.add("hidden")
                goToFreeInput();
            }, 300);
            break;
        case "F8":
            event.preventDefault();
            if (loginFind == undefined || loginFind == null) { location.reload(); return; }

            if (window.confirm("APAGAR todos os valores e finalizar seção?")) {
                processJson();
                /*
                document.getElementById("loginHub").classList.add("lastChange");
                document.getElementById("loginValue").classList.add("hidden");
                document.getElementById("infosTitle").innerHTML = `'F5' <br> <strong style="color: #16161D;">abortar (3)</strong>`
                let i = 3;
                setInterval(function () {
                    i--
                    document.getElementById("infosTitle").innerHTML = `'F5' <br> <strong style="color: #16161D;">abortar (${i})</strong>`
                }, 1000)
                setTimeout(function () {
                     processJson();
                }, 3000)
                */
            } else {
                goToFreeInput();
            }
            break;
        case "KeyL":
            if (simpleLock) return;
            event.preventDefault();
            goToFreeInput();
            break;
        case "KeyW":
            if (simpleLock) return;
            event.preventDefault();
            seek = document.querySelectorAll(".dynamicInputs");
            activeEl = Array.from(seek).indexOf(document.activeElement)
            try {
                activeEl <= 7 ? seek[activeEl -= 1].focus() : seek[activeEl -= 4].focus();
            } catch (error) {
                seek[seek.length - 1].focus();
            }
            break;
        case "KeyA":
            if (simpleLock) return;
            event.preventDefault();
            event.shiftKey ? jumpBack() : topo.focus();
            break;
        case "KeyS":
            if (simpleLock) return;
            event.preventDefault();
            if (event.shiftKey) {
                seek = document.querySelectorAll(".dynamicInputs");
                activeEl = Array.from(seek).indexOf(document.activeElement)

                try {
                    activeEl <= 3 ? seek[activeEl += 1].focus() : seek[activeEl += 4].focus();
                } catch (error) {
                    jumpToNext();
                }
            } //else {applyFilter("becomeSin")}
            break;
        case "KeyD":
            if (simpleLock) return;
            event.preventDefault();
            event.shiftKey ? jumpToNext() : applyFilter("becomeDev");
            break;
        case "KeyP":
            if (simpleLock) return;
            event.preventDefault();
            applyFilter("becomePix")
            break;
        case "KeyE":
            if (simpleLock) return;
            event.preventDefault();
            //putItOnError();
            break;
        case "F2":
            event.preventDefault();
            if (loginFind == undefined || loginFind == null) { location.reload(); return; }
            hiddenAll();
            sangriaElement.classList.remove("hidden");
            sangriaInput.focus();
            break;
        case "F9":
            event.preventDefault();
            if (!login) return;
            simpleCheck(create_uName, `editando '${login}'`, nameText.textContent);
            create_uName.focus();
            break;
        case "F12":
            event.preventDefault();
            tools();
            break;
        case "KeyV":
            if (simpleLock) return;
            event.preventDefault();
            jumpBack();
            break;
    };
}))

function sMobileEvents(event) {
    let simulatedKey = event.target.alt;
    const sendKey = new KeyboardEvent('keydown', {
        code: simulatedKey,
        bubbles: true,
    });
    document.dispatchEvent(sendKey);
}

document.getElementById("dTouch").addEventListener("touchstart", () => {
    if (simpleLock) return;
    applyFilter("becomeDev");
}, { passive: true })

document.getElementById("pTouch").addEventListener("touchstart", () => {
    if (simpleLock) return;
    applyFilter("becomePix")
}, { passive: true })