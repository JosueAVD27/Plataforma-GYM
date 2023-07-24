package com.persona.appfit.config;

import com.persona.appfit.models.*;
import com.persona.appfit.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Optional;
import java.util.function.Function;

@Configuration
public class AwsLambdaConfig {

    @Autowired
    private RSuplemento suplementoRepository;

    @Autowired
    private RServicio servicioRepository;

    @Autowired
    private RRutina rutinaRepository;

    @Autowired
    private RCliente clienteRepository;

    @Autowired
    private RCotizacion cotizacionRepository;

     // Métodos CRUD para la clase Suplemento
    @Bean
    public Function<Suplemento, Suplemento> createSuplemento() {
        return (suplemento) -> {
            suplementoRepository.save(suplemento);
            return suplemento;
        };
    }

    @Bean
    public Function<Integer, Suplemento> getSuplementoById() {
        return (id) -> {
            Optional<Suplemento> optionalSuplemento = suplementoRepository.findById(id);
            return optionalSuplemento.orElse(null);
        };
    }

    @Bean
    public Function<Suplemento, Suplemento> updateSuplemento() {
        return (suplemento) -> {
            Optional<Suplemento> optionalSuplemento = Optional.ofNullable(suplementoRepository.findById(suplemento.getId()));
            if (optionalSuplemento.isPresent()) {
                Suplemento existingSuplemento = optionalSuplemento.get();
                existingSuplemento.setNombre_suplemento(suplemento.getNombre_suplemento());
                existingSuplemento.setDescripcion_suplemento(suplemento.getDescripcion_suplemento());
                // Actualiza otros campos según sea necesario
                suplementoRepository.save(existingSuplemento);
                return existingSuplemento;
            } else {
                return null;
            }
        };
    }

    @Bean
    public Function<Integer, Boolean> deleteSuplementoById() {
        return (id) -> {
            Optional<Suplemento> optionalSuplemento = suplementoRepository.findById(id);
            if (optionalSuplemento.isPresent()) {
                Suplemento existingSuplemento = optionalSuplemento.get();
                suplementoRepository.delete(existingSuplemento);
                return true;
            } else {
                return false;
            }
        };
    }

    // Métodos CRUD para la clase Servicio

    @Bean
    public Function<Servicio, Servicio> createServicio() {
        return (servicio) -> {
            servicioRepository.save(servicio);
            return servicio;
        };
    }

    @Bean
    public Function<Integer, Servicio> getServicioById() {
        return (id) -> {
            Optional<Servicio> optionalServicio = servicioRepository.findById(id);
            return optionalServicio.orElse(null);
        };
    }

    @Bean
    public Function<Servicio, Servicio> updateServicio() {
        return (servicio) -> {
            Optional<Servicio> optionalServicio = Optional.ofNullable(servicioRepository.findById(servicio.getId()));
            if (optionalServicio.isPresent()) {
                Servicio existingServicio = optionalServicio.get();
                existingServicio.setNombre_servicio(servicio.getNombre_servicio());
                existingServicio.setDescripcion_servicio(servicio.getDescripcion_servicio());
                // Actualiza otros campos según sea necesario
                servicioRepository.save(existingServicio);
                return existingServicio;
            } else {
                return null;
            }
        };
    }

    @Bean
    public Function<Integer, Boolean> deleteServicioById() {
        return (id) -> {
            Optional<Servicio> optionalServicio = servicioRepository.findById(id);
            if (optionalServicio.isPresent()) {
                Servicio existingServicio = optionalServicio.get();
                servicioRepository.delete(existingServicio);
                return true;
            } else {
                return false;
            }
        };
    }

    // Métodos CRUD para la clase Rutina

    @Bean
    public Function<Rutina, Rutina> createRutina() {
        return (rutina) -> {
            rutinaRepository.save(rutina);
            return rutina;
        };
    }

    @Bean
    public Function<Integer, Rutina> getRutinaById() {
        return (id) -> {
            Optional<Rutina> optionalRutina = rutinaRepository.findById(id);
            return optionalRutina.orElse(null);
        };
    }

    @Bean
    public Function<Rutina, Rutina> updateRutina() {
        return (rutina) -> {
            Optional<Rutina> optionalRutina = Optional.ofNullable(rutinaRepository.findById(rutina.getId()));
            if (optionalRutina.isPresent()) {
                Rutina existingRutina = optionalRutina.get();
                existingRutina.setNombre_rutina(rutina.getNombre_rutina());
                existingRutina.setDescripcion_rutina(rutina.getDescripcion_rutina());
                // Actualiza otros campos según sea necesario
                rutinaRepository.save(existingRutina);
                return existingRutina;
            } else {
                return null;
            }
        };
    }

    @Bean
    public Function<Integer, Boolean> deleteRutinaById() {
        return (id) -> {
            Optional<Rutina> optionalRutina = rutinaRepository.findById(id);
            if (optionalRutina.isPresent()) {
                Rutina existingRutina = optionalRutina.get();
                rutinaRepository.delete(existingRutina);
                return true;
            } else {
                return false;
            }
        };
    }

    // Métodos CRUD para la clase Cliente

    @Bean
    public Function<Cliente, Cliente> createCliente() {
        return (cliente) -> {
            clienteRepository.save(cliente);
            return cliente;
        };
    }

    @Bean
    public Function<Integer, Cliente> getClienteById() {
        return (id) -> {
            Optional<Cliente> optionalCliente = clienteRepository.findById(id);
            return optionalCliente.orElse(null);
        };
    }

    @Bean
    public Function<Cliente, Cliente> updateCliente() {
        return (cliente) -> {
            Optional<Cliente> optionalCliente = Optional.ofNullable(clienteRepository.findById(cliente.getId()));
            if (optionalCliente.isPresent()) {
                Cliente existingCliente = optionalCliente.get();
                existingCliente.setNombre(cliente.getNombre());
                existingCliente.setApellido(cliente.getApellido());
                // Actualiza otros campos según sea necesario
                clienteRepository.save(existingCliente);
                return existingCliente;
            } else {
                return null;
            }
        };
    }

    @Bean
    public Function<Integer, Boolean> deleteClienteById() {
        return (id) -> {
            Optional<Cliente> optionalCliente = clienteRepository.findById(id);
            if (optionalCliente.isPresent()) {
                Cliente existingCliente = optionalCliente.get();
                clienteRepository.delete(existingCliente);
                return true;
            } else {
                return false;
            }
        };
    }

    // Resto de los beans que ya tenías definidos en tu AwsLambdaConfig
    // ...

}