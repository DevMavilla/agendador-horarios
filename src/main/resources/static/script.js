const API_URL = "http://localhost:8080/agendamentos";

/* ESTADO CENTRAL */
const agendamento = {
  cliente: "",
  telefoneCliente: "",
  servico: "",
  profissional: "",
  dataHoraAgendamento: ""
};

/* UTIL */
function mostrar(id) {
  document.getElementById(id).classList.remove("hidden");
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function ativarCard(el) {
  el.parentElement.querySelectorAll(".selectable")
    .forEach(c => c.classList.remove("active"));
  el.classList.add("active");
}

/* HERO */
function irParaNome() {
  mostrar("experiencia");
}

/* ETAPA 1 — NOME */
function salvarNome() {
  const nome = document.getElementById("inputNome").value.trim();
  if (!nome) {
    alert("Digite seu nome 🙂");
    return;
  }

  agendamento.cliente = nome;

  document.getElementById("textoBarbeiro")
    .innerText = `${nome}, quem vai cuidar do seu estilo hoje?`;

  mostrar("step-barbeiro");
}

/* ETAPA 2 — BARBEIRO */
function escolherBarbeiro(nome) {
  agendamento.profissional = nome;
  ativarCard(event.currentTarget);

  document.getElementById("textoServico")
    .innerText = `Perfeito, ${agendamento.cliente}. Qual serviço você deseja?`;

  setTimeout(() => mostrar("step-servico"), 400);
}

/* ETAPA 3 — SERVIÇO */
function escolherServico(servico) {
  agendamento.servico = servico;
  ativarCard(event.currentTarget);

  document.getElementById("textoData")
    .innerText = `${agendamento.cliente}, quando prefere ser atendido?`;

  setTimeout(() => mostrar("step-data"), 400);
}

/* ETAPA 4 — DATA */
function confirmarData() {
  const data = document.getElementById("dataHora").value;
  if (!data) {
    alert("Escolha uma data e horário");
    return;
  }

  agendamento.dataHoraAgendamento = data;

  document.getElementById("r-nome").innerText = agendamento.cliente;
  document.getElementById("r-barbeiro").innerText = agendamento.profissional;
  document.getElementById("r-servico").innerText = agendamento.servico;
  document.getElementById("r-data").innerText =
    new Date(data).toLocaleString("pt-BR");

  mostrar("agendamento");
}

/* FINAL — API */
function finalizar() {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(agendamento)
  })
  .then(r => {
    if (!r.ok) throw new Error("Horário indisponível");
    alert("Agendamento confirmado! 💈");
    location.reload();
  })
  .catch(e => alert(e.message));
}
