set -o errexit

poetry add setuptools
poetry install

python manage.py collectstatic --no-input
python manage.py migrate