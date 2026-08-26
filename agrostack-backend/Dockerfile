FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN cp src/main/resources/application.properties.example src/main/resources/application.properties

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/JobHub-0.0.1-SNAPSHOT.jar"]