package com.persona.appfit.services;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class SuplementoService {
    private final MongoTemplate mongoTemplate;

    @Autowired
    public SuplementoService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<Document> obtenerSuplementos() {
        String url = "https://kejd9.mocklab.io/suplementos";
        RestTemplate restTemplate = new RestTemplate();
        // Consumir el API y obtener los datos en un arreglo de objetos
        List<Map<String, Object>> suplementacion = restTemplate.getForObject(url, List.class);
        // Eliminar los datos existentes en la colección de suplementos antes de guardar los nuevos
        mongoTemplate.dropCollection("suplementos");
        // Guardar cada suplemento en MongoDB
        for (Map<String, Object> suplementoData : suplementacion) {
            Document suplementoDocument = new Document(suplementoData);
            mongoTemplate.insert(suplementoDocument, "suplementos");
        }
        // Opcionalmente, puedes devolver los documentos guardados si lo necesitas
        return mongoTemplate.findAll(Document.class, "suplementos");
    }
}
