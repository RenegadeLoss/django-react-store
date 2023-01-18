set -o errexit

poetry install --remove-untracked

python manage.py collectstatic --no-input
python manage.py migrate