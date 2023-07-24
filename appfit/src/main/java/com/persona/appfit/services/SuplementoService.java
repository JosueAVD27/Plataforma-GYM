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
        List<Map<String, Object>> suplementacion = restTemplate.getForObject(url, List.class);

        mongoTemplate.dropCollection("suplementos");

        for (Map<String, Object> suplementoData : suplementacion) {
            Document suplementoDocument = new Document(suplementoData);
            mongoTemplate.insert(suplementoDocument, "suplementos");
        }

        return mongoTemplate.findAll(Document.class, "suplementos");
    }
}
