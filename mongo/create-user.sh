# Import environment variables from .env
export $(egrep -v '^#' .env | xargs)

echo "Creating mongo user '$DB_USER'..."
mongo admin --host localhost -u $DB_ROOT_USER -p $DB_ROOT_PWD --eval "db.createUser({user: '$DB_USER', pwd: '$DB_PWD', roles: [{role: 'readWrite', db: '$DB_NAME'}]});"
echo "Mongo user '$DB_USER' created."
