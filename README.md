#### Usage
```
git clone https://github.com/zhuyuhaoliar/koa-server.git


cd koa-server && npm install

```

#### Myenv

```
node:12.13.1
npm:6.12.1
yo:3.1.1
yckoa:0.0.7
pm2:4.2.1
```

#### Dependencies

- yeoman
- yckoa
- mongodb
- pm2


##### build

```
npm run build
```

##### server

```
npm run serve 
//   http://localhost:3000
```

##### swagger

```
http://localhost:3000/api-docs/
```

##### Add Api

```
yo yckoa:api apiname
// waring:'apiname' must be created without 's',
like 'apinames',it will cause serves error;
```
