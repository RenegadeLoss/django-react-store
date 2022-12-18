from django.db import models
from backend.models import Clothings, TypeOfClothes
from rest_framework import serializers
# Create your models here.


class ClothingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clothings
        fields = '__all__'


class TypeOfClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = TypeOfClothes
        fields = '__all__'