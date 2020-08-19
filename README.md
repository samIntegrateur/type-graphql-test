 #type-graphql tutorials following https://www.youtube.com/playlist?list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs

## session / authent 
You need a local redis server in order to have the autentification working :

https://redis.io/topics/quickstart

windows: https://github.com/ServiceStack/redis-windows

note to myself : run .\redis-server.exe redis.windows.conf then .\redis-cli.exe in the desktop redis folder (64)

## Database
This project uses typeorm, so you need to have a ormconfig.json file at root to specify the database

note to myself : it's postgres, you can check it running pgadmin4

## File upload
In order to test file upload without FE, see https://youtu.be/s35EmAn9Zl8?t=199

Below the operations value :

{"query":"mutation AddProfilePicture($picture: Upload!) {\n addProfilePicture(picture: $picture)\n}"}
