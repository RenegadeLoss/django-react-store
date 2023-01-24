set -o errexit

poetry install

npm install
npm run build

python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate