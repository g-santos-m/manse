# Manse

## Introducción

Manse es una web app de gestión de partes de trabajo para empresas de mantenimiento.
Su objetivo es permitir la creación de partes de trabajo digitales, facilitando
el registro y conservación de la información y facilitando la colaboración entre
las distintas partes de la empresa (oficina, técnicos de campo, etc.).

## Instalación

Para instalar la app desde el código fuente, clonar el repositorio.
```
https://github.com/g-santos-m/manse
```
Con Angular y Node instalado en la máquina, ir a la carpetas ```client``` y
```server``` e instalar dependencias en ambas.
```
npm install
```
Para arrancar el servidor:
```
npm run start
```
Para arrancar el cliente:
```
ng serve
```
Para acceder a la web desde el navegador: http://localhost:4200

## Funcionalidades

Manse permite la creación de partes, introduciendo información en unos campos
predeterminados, así como su posterior edición. La página principal muestra un
listado del histórico de partes, que puede ser ordenado y filtrado por columnas.

## Detalles técnicos

La aplicación consta de un cliente y un servidor. El cliente está construido con
Angular, mientras que el servidor utiliza Node y Express. Ambos se comunican
mediante protocolo HTTP para realizar las acciones básicas CRUD sobre los partes.
La persistencia se implementa con SQLite directamente en el directorio del servidor.