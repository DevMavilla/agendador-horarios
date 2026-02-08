const API = "http://localhost:8080/agendamentos";
const KEY = "admin_ok"; // MVP

// Config (fácil de mexer)
const SERVICOS = ["Corte Masculino", "Barba Premium", "Combo Corte + Barba", "Sobrancelha"];
const BARBEIROS = ["João", "Lucas"];
const HORARIOS = ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];

// Estado temporário de edição por ID
const editState = {};
// editState[id] = { cliente, telefoneCliente, servico, profissional, dataHoraAgendamento }

// =======================
// AUTH (MVP)
// =======================
function login() {
  const senhaEl = document.getElementById("senha");
  const msg = document.getElementById("msg");
  const senha = (senhaEl?.value ?? "").trim();

  if (senha === "1234") {
    sessionStorage.setItem(KEY, "1");
    location.href = "dashboard.html";
  } else {
    if (msg) msg.textContent = "Senha inválida.";
  }
}

function guard() {
  if (location.pathname.includes("/admin/dashboard.html")) {
    if (sessionStorage.getItem(KEY) !== "1") {
      location.href = "login.html";
    }
  }
}

function logout() {
  sessionStorage.removeItem(KEY);
  location.href = "login.html";
}

// =======================
// UTIL
// =======================
function hojeISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatData(iso) {
  try { return new Date(iso).toLocaleString("pt-BR"); }
  catch { return iso; }
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setLoading() {
  const box = document.getElementById("lista");
  if (box) box.innerHTML = `<div class="item"><div>Carregando…</div></div>`;
}

// Constrói YYYY-MM-DDTHH:mm mantendo o mesmo dia de um ISO existente
function setHoraNoMesmoDia(isoBase, hhmm) {
  const base = new Date(isoBase);
  const [h, m] = hhmm.split(":").map(Number);
  base.setHours(h, m, 0, 0);

  const yyyy = base.getFullYear();
  const mm = String(base.getMonth() + 1).padStart(2, "0");
  const dd = String(base.getDate()).padStart(2, "0");
  const HH = String(base.getHours()).padStart(2, "0");
  const MM = String(base.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T${HH}:${MM}`;
}

// =======================
// PICKS (chips)
// =======================
function pickServico(id, servico, btn) {
  editState[id].servico = servico;
  document.querySelectorAll(`#chips-servico-${id} .chip`).forEach(c => c.classList.remove("on"));
  btn.classList.add("on");
}

function pickProf(id, prof, btn) {
  editState[id].profissional = prof;
  document.querySelectorAll(`#chips-prof-${id} .chip`).forEach(c => c.classList.remove("on"));
  btn.classList.add("on");
}

function pickHora(id, hhmm, btn) {
  editState[id].dataHoraAgendamento = setHoraNoMesmoDia(editState[id].dataHoraAgendamento, hhmm);
  document.querySelectorAll(`#chips-hora-${id} .chip`).forEach(c => c.classList.remove("on"));
  btn.classList.add("on");
}

// =======================
// DASHBOARD
// =======================
async function carregar() {
  const dataEl = document.getElementById("data");
  const box = document.getElementById("lista");
  if (!dataEl || !box) return;

  const data = dataEl.value || hojeISO();
  dataEl.value = data;

  setLoading();

  const res = await fetch(`${API}?data=${data}`);
  if (!res.ok) {
    box.innerHTML = `<div class="item"><div>Erro ao carregar agenda (HTTP ${res.status}).</div></div>`;
    return;
  }

  const lista = await res.json();
  box.innerHTML = "";

  if (!lista.length) {
    box.innerHTML = `<div class="item"><div>Nenhum agendamento para o dia.</div></div>`;
    return;
  }

  lista.forEach((a) => {
    // inicializa estado de edição desse card
    editState[a.id] = {
      cliente: a.cliente,
      telefoneCliente: a.telefoneCliente ?? "",
      servico: a.servico,
      profissional: a.profissional,
      dataHoraAgendamento: a.dataHoraAgendamento
    };

    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div class="top">
        <div><strong>${escapeHtml(a.cliente)}</strong> • ${escapeHtml(a.telefoneCliente ?? "-")}</div>
        <span class="badge">${escapeHtml(a.servico)}</span>
      </div>

      <div class="meta">
        ${escapeHtml(a.profissional)} • ${escapeHtml(formatData(a.dataHoraAgendamento))}
      </div>

      <div class="actions">
        <button class="muted" onclick="abrirEdicao(${a.id})">Editar</button>
        <button class="danger" onclick="cancelar(${a.id})">Cancelar</button>
      </div>

      <div id="edit-${a.id}" class="edit hidden">
        <div class="editRow">
          <div class="label">Escolha o serviço</div>
          <div class="chips" id="chips-servico-${a.id}">
            ${SERVICOS.map(s => `
              <button class="chip ${s===a.servico?'on':''}"
                onclick="pickServico(${a.id}, '${s.replaceAll("'", "\\'")}', this)">${escapeHtml(s)}</button>
            `).join("")}
          </div>
        </div>

        <div class="editRow">
          <div class="label">Quem atende?</div>
          <div class="chips" id="chips-prof-${a.id}">
            ${BARBEIROS.map(b => `
              <button class="chip ${b===a.profissional?'on':''}"
                onclick="pickProf(${a.id}, '${b.replaceAll("'", "\\'")}', this)">${escapeHtml(b)}</button>
            `).join("")}
          </div>
        </div>

        <div class="editRow">
          <div class="label">Trocar horário</div>
          <div class="chips" id="chips-hora-${a.id}">
            ${HORARIOS.map(h => `
              <button class="chip" onclick="pickHora(${a.id}, '${h}', this)">${h}</button>
            `).join("")}
          </div>
          <small class="hint">Troca apenas o horário no mesmo dia (por enquanto).</small>
        </div>

        <div class="actions">
          <button onclick="salvarEdicao(${a.id})">Salvar</button>
          <button class="ghost" onclick="fecharEdicao(${a.id})">Fechar</button>
        </div>
      </div>
    `;

    box.appendChild(div);
  });
}

// =======================
// EDIT UI
// =======================
function abrirEdicao(id) {
  const edit = document.getElementById(`edit-${id}`);
  if (!edit) return;
  edit.classList.remove("hidden");
  edit.closest(".item")?.classList.add("editing");
}

function fecharEdicao(id) {
  const edit = document.getElementById(`edit-${id}`);
  if (!edit) return;
  edit.classList.add("hidden");
  edit.closest(".item")?.classList.remove("editing");
}

async function salvarEdicao(id) {
  const payload = editState[id];

  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    alert(`Não foi possível salvar (HTTP ${res.status}).`);
    return;
  }

  fecharEdicao(id);
  carregar();
}

// =======================
// DELETE
// =======================
async function cancelar(id) {
  const ok = confirm("Cancelar este agendamento?");
  if (!ok) return;

  const res = await fetch(`${API}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    alert(`Não foi possível cancelar (HTTP ${res.status}).`);
    return;
  }

  carregar();
}

// =======================
// INIT
// =======================
(function init() {
  if (location.pathname.includes("/admin/dashboard.html")) {
    guard();
    const dataEl = document.getElementById("data");
    if (dataEl) dataEl.value = hojeISO();
    carregar();
  }
})();
