set -o errexit

poetry install -with setuptools

python manage.py collectstatic --no-input
python manage.py migrate