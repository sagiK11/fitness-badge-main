FROM postgres:13.5

RUN apt-get update && apt-get install -y netcat

COPY . .

USER postgres
