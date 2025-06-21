# Use multi-stage build

# ----- FRONTEND STAGE -----
FROM node:18 AS frontend-build
WORKDIR /app
COPY ourproperties/ ./ourproperties/
WORKDIR /app/ourproperties
RUN npm install
RUN npm run build

# ----- BACKEND STAGE -----
FROM eclipse-temurin:17-jdk AS backend
WORKDIR /app
COPY Backend/ ./Backend/
COPY --from=frontend-build /app/ourproperties/build/ ./Backend/src/main/resources/static/
WORKDIR /app/Backend
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# ----- FINAL STAGE -----
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=backend /app/Backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
