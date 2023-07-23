package com.persona.appfit.services;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class GymApiConsumer {

    private static final String MONGO_URI = "mongodb://localhost:27017";
    private static final String DATABASE_NAME = "database_bn";
    private static final String COLLECTION_NAME = "gym_data"; // Nombre significativo para la colección

    public static void main(String[] args) {
        // Conexión a MongoDB
        MongoClient mongoClient = MongoClients.create(MONGO_URI);
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Crear la colección si no existe previamente
        database.createCollection(COLLECTION_NAME);

        // Obtener la colección para almacenar los datos
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);

        // Consumo de la API pública sobre gimnasios
        try {
            URL url = new URL("<https://mystoreapi.com>");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();

            // Conversión de la respuesta a un documento BSON y almacenamiento en MongoDB
            Document doc = Document.parse(content.toString());
            collection.insertOne(doc);

            System.out.println("Datos de la API almacenados correctamente en MongoDB.");
        } catch (Exception e) {
            System.err.println("Error al consumir la API o almacenar los datos en MongoDB: " + e.getMessage());
        } finally {
            // Cerrar la conexión de MongoDB al finalizar
            mongoClient.close();
        }
    }
}
