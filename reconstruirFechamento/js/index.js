let data = []

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
                fechamento();
            }

        };
        reader.readAsText(jfile);
    }


}

function fechamento() {
    //for (let i = 0; i < data.length; i++) { console.log(data[i]) }
    const table = document.createElement("table");

    const tr1 = document.createElement("tr");
    const td1 = document.createElement("td");
    tr1.appendChild(td1);

    for (let i = 0; i < 3; i++) {
        let li = document.createElement("li");
        switch (i) {
            case 0:
                li.textContent = data[0].dia
                break;
            case 1:
                li.textContent = data[1].uName;
                break;
            case 2:
                li.textContent = `<${data[1].loginCod}> [${data[2].caixa}]`;
                break;

        }
        td1.appendChild(li);
    }
    table.appendChild(td1);


    const tr2 = document.createElement("tr");
    const td2 = document.createElement("td");
    tr2.appendChild(td2);
    const div2 = document.createElement("div");
    div2.innerHTML = `<span>${Object.keys(data[9])[0].toUpperCase()}<span>`
    data[9][Object.keys(data[9])[0]] == "" ? div2.innerHTML += "<b>: VAZIO<b>" : null;
    data[9][Object.keys(data[9])[0]].forEach((createInput) => {
        const input = document.createElement("input");
        input.value = createInput;
        input.classList.add("values");
        div2.appendChild(input);
    })
    td2.appendChild(div2);
    table.appendChild(tr2);


    for (let i = 3; i < 7; i++) {
        const id = Object.keys(data[i])[0];

        const tr = document.createElement("tr");
        const td = document.createElement("td");
        tr.appendChild(td);

        const div = document.createElement("div");
        const input = document.createElement("input");
        input.value = data[i][id];
        div.innerHTML = `<span>${id.replace("notas", "").replace("_", " ").toUpperCase()} `
        div.appendChild(input);
        td.appendChild(div);
        table.appendChild(tr)
        div.classList.add("cashInput")
    };



    for (let i = 7; i < 9; i++) {
        const id = Object.keys(data[i])[0];
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        tr.appendChild(td);
        const div = document.createElement("div");
        //data[i][id] == "" ? div.innerHTML += `<span>${id.toUpperCase()}<b>: VAZIO<b>`: div.innerHTML = `<span>${id.toUpperCase()}<span><br><br>`;
        div.innerHTML = `<span>${id.toUpperCase()}<span><br><br>`;
        data[i][id].forEach((createInput) => {
            const input = document.createElement("input");
            input.value = createInput;
            input.classList.add("values");

            div.appendChild(input);
        })
        td.appendChild(div);

        table.appendChild(tr);
    };

    const tr3 = document.createElement("tr");
    const td3 = document.createElement("td");
    const div3 = document.createElement("div");
    tr3.appendChild(td3);
    div3.innerHTML = `<span>SANGRIAS<span> <br><br>`;

    data[10]["sangrias"].forEach((sangria) => {
        const span = document.createElement("span");
        span.classList.add("values");
        span.innerHTML = `<b>${sangria.sangriaValue}$</b> ás ${sangria.sangriaTime}<br>`
        div3.appendChild(span);
    });
    td3.appendChild(div3);
    table.appendChild(tr3);

    const tr4 = document.createElement("tr");
    const td4 = document.createElement("td");
    const div4 = document.createElement("div");
    tr4.appendChild(td4);

    let sViasSaved = data[11]["sangriasCartoes"];

    sViasSaved.map(obj => {
        const section = document.createElement("section");

        Object.entries(obj).forEach(([key, values]) => {
            const nSangria = document.createElement("div");
            nSangria.innerHTML = `<br><b>${key.toUpperCase().slice(2)}</b> <br><br>`;
            values.forEach(val => {
                const span = document.createElement("input");
                span.value = val;
                nSangria.appendChild(span);
            });
            section.appendChild(nSangria);

            values.length < 1 ? nSangria.remove() : null;
        });
        div4.appendChild(section);
        section.classList.add("sangriaNotinhas");

    });
    td4.appendChild(div4);
    table.appendChild(tr4);

    document.getElementById("tablesSection").appendChild(table);
}
