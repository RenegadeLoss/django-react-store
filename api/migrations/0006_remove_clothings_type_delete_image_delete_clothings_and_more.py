# Generated by Django 4.1.4 on 2022-12-18 16:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_typeofclothes_slug'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clothings',
            name='type',
        ),
        migrations.DeleteModel(
            name='Image',
        ),
        migrations.DeleteModel(
            name='Clothings',
        ),
        migrations.DeleteModel(
            name='TypeOfClothes',
        ),
    ]
