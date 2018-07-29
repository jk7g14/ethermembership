# EtherMembership

Decentralized Application for Membership Plans

## Installing

```
 git clone https://github.com/jk7g14/ethermembership.git
 cd ethermembership
 npm install
```

## Configuring

Edit ethereum/setup.json.template and change it to setup.json with 12 words of your metamask account and your infura url

## Compiling

```
 cd ethererum
 node compile.js
```

## Deploying

```
 node deploy.js
```
deployed factory contract address will be saved in address.json

## Running

```
 npm run dev

 or 

 npm run build
 npm start
```

## Docker
```
docker build -t ethermembership .
docker run --user=u1 --name=em1 -p 8000:8000 -v $PWD:/home/u1/node -it ethermembership
```

