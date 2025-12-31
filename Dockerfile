# Stage 1: Build frontend
FROM node:18-alpine AS build-web
WORKDIR /app/web
COPY web/package*.json ./
RUN npm install
COPY web/ ./
RUN npm run build

# Stage 2: Build backend jar
FROM gradle:7.0.0-jdk8 AS build-jar
ADD --chown=gradle:gradle . /app
WORKDIR /app
RUN gradle assembleShadowDist && \
    mv ./build/libs/*.jar ./build/libs/reader.jar

# Stage 3: Final image
FROM amazoncorretto:8u332-alpine3.14-jre

# Install base packages
RUN apk add --no-cache ca-certificates tini tzdata && \
    update-ca-certificates && \
    rm -rf /var/cache/apk/*

# Timezone
ENV TZ=Asia/Shanghai

EXPOSE 9080

ENTRYPOINT ["/sbin/tini", "--"]

# Copy backend jar
COPY --from=build-jar /app/build/libs/reader.jar /app/bin/reader.jar

# Copy frontend dist to static resources
COPY --from=build-web /app/web/dist /app/web

CMD ["java", "-DWEB_PATH=/app/web", "-jar", "/app/bin/reader.jar"]
