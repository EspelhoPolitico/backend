<!-- vscode-markdown-toc -->
* 1. [Dependencies](#Dependencies)
* 2. [Install Dependencies](#InstallDependencies)
* 3. [Running Application](#RunningApplication)
* 4. [Testing](#Testing)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

# Espelho Político

##  1. <a name='Dependencies'></a>Dependencies

- [Node](nodejs.org) v6.9.1 (recommend use [nvm](https://github.com/creationix/nvm#install-script))
- [MongoDB](https://www.mongodb.com/)

##  2. <a name='InstallDependencies'></a>Install Dependencies

To install all node dependencies, execute the command:

```
$ npm i && cd client && npm i && cd ..
```

##  3. <a name='RunningApplication'></a>Running Application

If it is the first time running the application, it is necessary to run the parser executing the command :

```
$ npm run parser
```

This application is composed by a client and a server.

To run the server and the client simultaneously, execute the command:

```
$ npm start
```

To run only the server, execute the command:

```
$ npm run server
```

To run only the client, execute the command:

```
$ npm run client
```

The client starts on port 3000 and the server on port 3001.

##  4. <a name='Testing'></a>Testing

To run the client tests, execute the command:

```
$ npm run client:test
```

To run the server tests, execute the command:

```
$ npm run server:test
```
