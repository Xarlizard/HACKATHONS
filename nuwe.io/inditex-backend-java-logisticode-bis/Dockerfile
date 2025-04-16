FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache maven && mvn clean package -DskipTests
EXPOSE 3000
CMD ["java", "-jar", "target/inditex-0.0.1-SNAPSHOT.jar"]