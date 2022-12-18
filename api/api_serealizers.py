from django.db import models
from rest_framework import serializers
from catalog.models import Clothings, TypeOfClothes
# Create your models here.


class ClothingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clothings
        fields = '__all__'


class TypeOfClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = TypeOfClothes
        fields = '__all__'