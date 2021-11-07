function pesquisarUser() {
    let nome = $("#nameBusca").val();

    if (nome !== null && nome.trim() != "") {

        $.ajax({
            method: "GET",
            url: "buscarPorNome",
            data: "name=" + nome,
            success: function (response) {
                $("#tabelaResultados > tbody > tr").remove();

                for (let i = 0; i < response.length; i++) {
                    $("#tabelaResultados > tbody").append(
                        `
                    <tr>
                        <td>${response[i].id}</td>
                        <td>${response[i].nome}</td>
                        <td><button type="button" class="btn btn-primary">Ver</button></td>
                    </tr>
                    `);
                }
            }
        }).fail(function (xhr, status, errorThrown) {
            alert("Erro ao buscar: " + xhr.responseText);
        });
    }

}

function salvarUsuario() {

    let id = $("#id").val();
    let nome = $("#nome").val();
    let idade = $("#idade").val();

    $.ajax({
        method: "POST",
        url: "salvar",
        data: JSON.stringify({
            id: id,
            nome: nome,
            idade: idade
        }),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $("#id").val(response.id);
            alert("Salvo com Sucesso!");
        }
    }).fail(function (xhr, status, errorThrown) {
        alert("Erro ao salvar: " + xhr.responseText);
    });

}