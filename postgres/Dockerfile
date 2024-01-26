FROM postgres:13.13-alpine3.18


RUN apk update && apk add --no-cache netcat-openbsd

COPY . .

USER postgres
