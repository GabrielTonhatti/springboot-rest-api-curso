function botaoDeletarDaTela() {
    let id = $("#id").val();

    if (id !== null && id.trim() != '') {

        deleteUser(id);

        document.getElementById('formCadastroUser').reset();
    }

}

function deleteUser(id) {

    if (confirm('Deseja realmente deletar?')) {

        $.ajax({
            method: "DELETE",
            url: "delete",
            data: "iduser=" + id,
            success: function (response) {

                $('#' + id).remove();

                alert(response);

            }
        }).fail(function (xhr, status, errorThrown) {
            alert("Erro ao deletar usuário por id: " + xhr.responseText);
        });
    }

}

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
                    $("#tabelaResultados > tbody").append('<tr id="' + response[i].id + '"><td>' + response[i].id + '</td><td>' + response[i].nome + '</td><td><button type="button" onclick="colocarEmEdicao(' + response[i].id + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteUser(' + response[i].id + ')">Delete</button></td></tr>');
                }
            }
        }).fail(function (xhr, status, errorThrown) {
            alert("Erro ao buscar usuário: " + xhr.responseText);
        });
    }
}

function colocarEmEdicao(id) {

    $.ajax({
        method: "GET",
        url: "buscaruserid",
        data: "iduser=" + id,
        success: function (response) {
            $("#id").val(response.id);
            $("#nome").val(response.nome);
            $("#idade").val(response.idade);

            $('#modalPesquisaUser').modal("hide");

        }
    }).fail(function (xhr, status, errorThrown) {
        alert("Erro ao buscar usuário por id: " + xhr.responseText);
    });

}

function salvarUsuario() {

    let id = $("#id").val();
    let nome = $("#nome").val();
    let idade = $("#idade").val();

    if(nome === null || nome !== null && nome.trim() === "" ) {
        $("#nome").focus();
        alert("Informe o nome!")
        return;
    }

    if(idade === null || idade !== null && idade.trim() === "" ) {
        $("#idade").focus();
        alert("Informe a idade!")
        return;
    }

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