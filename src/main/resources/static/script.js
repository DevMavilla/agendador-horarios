const API = "http://localhost:8080/agendamentos";

function criar() {
  const agendamento = {
    cliente: cliente.value,
    telefoneCliente: telefone.value,
    servico: servico.value,
    profissional: profissional.value,
    dataHoraAgendamento: dataHora.value
  };

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(agendamento)
  })
  .then(r => {
    if (!r.ok) throw new Error("Horário ocupado");
    alert("Agendado com sucesso");
  })
  .catch(e => alert(e.message));
}

function buscar() {
  fetch(`${API}?data=${dataBusca.value}`)
    .then(r => r.json())
    .then(dados => {
      lista.innerHTML = "";
      dados.forEach(a => render(a));
    });
}

function render(a) {
  const li = document.createElement("li");

  li.innerHTML = `
    <strong>${a.cliente}</strong> - ${a.servico}<br>
    ${a.profissional} | ${a.dataHoraAgendamento}<br>
    <button onclick="deletar('${a.cliente}','${a.dataHoraAgendamento}')">Cancelar</button>
    <button onclick="editar('${a.cliente}','${a.dataHoraAgendamento}')">Editar</button>
  `;

  lista.appendChild(li);
}

function deletar(cliente, dataHora) {
  fetch(`${API}?dataHoraAgendamento=${dataHora}`, {
    method: "DELETE",
    headers: { "Content-Type": "text/plain" },
    body: cliente
  })
  .then(() => buscar());
}

function editar(cliente, dataHora) {
  const novoServico = prompt("Novo serviço:");
  const novoProfissional = prompt("Novo barbeiro:");

  const agendamento = {
    cliente,
    servico: novoServico,
    profissional: novoProfissional,
    dataHoraAgendamento: dataHora
  };

  fetch(`${API}?cliente=${cliente}&dataHoraAgendamento=${dataHora}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(agendamento)
  })
  .then(() => buscar());
}
