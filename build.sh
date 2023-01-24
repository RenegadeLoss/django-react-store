set -o errexit

poetry install


yarn build
python manage.py collectstatic --no-input
python manage.py migrate