from django.contrib import admin
from .models import Clothings, TypeOfClothes, Image
# Register your models here.


# class TypeOfClothesInline(admin.TabularInline):
#     model = TypeOfClothes
#     extra = 0


@admin.register(TypeOfClothes)
class TypeOfClothesAdmin(admin.ModelAdmin):
    pass


@admin.register(Clothings)
class ClothingAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'type', 'price', 'description',)
    fields = ['type', 'title', 'price', 'description', ('image_1', 'image_2', 'image_3'),
              ('size_xs', 'size_s', 'size_m', 'size_l', 'size_xl')]

    list_filter = ('type', 'price', 'size_xs', 'size_s', 'size_m', 'size_l', 'size_xl')


