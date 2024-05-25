FROM gradle:5.6 AS builder
WORKDIR /app
COPY . .
CMD ./gradlew clean build -x test

FROM openjdk:17-jdk-alpine
COPY --from=builder /app/build/libs/accountant-0.0.1-SNAPSHOT.jar /application.jar
CMD java -jar -Dspring.profiles.active=prod application.jar
