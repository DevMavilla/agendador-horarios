package com.javanauta.agendador_horarios.services;

import com.javanauta.agendador_horarios.infrastructure.entity.Agendamento;
import com.javanauta.agendador_horarios.infrastructure.repository.AgendamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;

    public Agendamento salvarAgendamento(Agendamento agendamento) {

        LocalDateTime HoraAgendamento = agendamento.getDataHoraAgendamento();
        LocalDateTime horaFim = agendamento.getDataHoraAgendamento().plusMinutes(30);

        Agendamento agendados = agendamentoRepository.findByServicoAndDataHoraAgendamentoBetween(agendamento.getServico(),HoraAgendamento, horaFim);


         if(Objects.nonNull(agendados)){
                 throw new RuntimeException("Horário já preenchido");
         }
         return agendamentoRepository.save(agendamento);
    }
    public void deletarAgendamento(LocalDateTime dataHoraAgendamento, String cliente){
        agendamentoRepository.deleteByDataHoraAgendamentoAndCliente(dataHoraAgendamento, cliente);

    }

    public void deletarPorId(Long id) {
        agendamentoRepository.deleteById(id);
    }


    public List<Agendamento> buscarAgendamentosDia(LocalDate data){
        LocalDateTime primeiraHoraDia = data.atStartOfDay();
        LocalDateTime ultimaHoraDia = data.atTime(23, 59, 59);

        return agendamentoRepository.findByDataHoraAgendamentoBetween(primeiraHoraDia, ultimaHoraDia);
    }

    public Agendamento alterarAgendamento(Agendamento agendamento, String cliente, LocalDateTime dataHoraAgendamento){
       Agendamento agenda = agendamentoRepository.findByDataHoraAgendamentoAndCliente(dataHoraAgendamento, cliente);

       if(Objects.isNull(agenda)){
              throw new RuntimeException("Horário não está preenchido");
       }
       agendamento.setId(agenda.getId());
       return  agendamentoRepository.save(agendamento);
    }

    public Agendamento atualizarPorId(Long id, Agendamento novo) {

        Agendamento existente = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        existente.setCliente(novo.getCliente());
        existente.setTelefoneCliente(novo.getTelefoneCliente());
        existente.setServico(novo.getServico());
        existente.setProfissional(novo.getProfissional());
        existente.setDataHoraAgendamento(novo.getDataHoraAgendamento());

        return agendamentoRepository.save(existente);
    }

}
