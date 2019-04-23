echo "Creating mongo user '$DB_USER'..."
mongo admin --host localhost -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --eval "db.createUser({user: '$DB_USER', pwd: '$DB_PWD', roles: [{role: 'readWrite', db: '$DB_NAME'}]});"
echo "Mongo user '$DB_USER' created."
