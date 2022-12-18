from django.db import models
from django.urls import reverse
from uuid import uuid4
#from django.utils.text import slugify
from autoslug import AutoSlugField
from transliterate import slugify
from django.template.defaultfilters import slugify as d_slugify

# Create your models here.


class TypeOfClothes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    type_name = models.CharField(max_length=100, help_text='Тип одежды(Футболки, Шорты, Худи и т.д.)', unique=True)
    slug = AutoSlugField(populate_from='type_name', slugify=slugify, editable=False) # костыль, потому что AutoSlugField не работает с кириллицей

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.type_name

    def get_absolute_url(self):
        return reverse('typeofclothes-list', args=[str(self.id)])

    def get_type_name(self):
        return self.type_name


class Clothings(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    type = models.ForeignKey('TypeOfClothes', verbose_name='Тип одежды', on_delete=models.SET_NULL, null=True)
    title = models.CharField(verbose_name='Название', max_length=200, help_text='Название товара')
    price = models.IntegerField(verbose_name='Цена')
    description = models.TextField(max_length=2000, verbose_name='Описание', blank=True, help_text='Описание товара')
    image_1 = models.ImageField(upload_to='images/', verbose_name='Изображение 1', blank=True, null=True)
    image_2 = models.ImageField(upload_to='images/', verbose_name='Изображение 2', blank=True, null=True)
    image_3 = models.ImageField(upload_to='images/', verbose_name='Изображение 3', blank=True, null=True)

    size_xs = models.PositiveIntegerField(verbose_name='XS', null=True, help_text='Количество данного размера', blank=True)
    size_s = models.PositiveIntegerField(verbose_name='S', null=True, help_text='Количество данного размера', blank=True)
    size_m = models.PositiveIntegerField(verbose_name='M', null=True, help_text='Количество данного размера', blank=True)
    size_l = models.PositiveIntegerField(verbose_name='L', null=True, help_text='Количество данного размера', blank=True)
    size_xl = models.PositiveIntegerField(verbose_name='XL', null=True, help_text='Количество данного размера', blank=True)

    class Meta:
        ordering = ['id']
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('clothing-detail', args=[str(self.id)])

    def get_sizes(self):
        sizes = dict()
        sizes['XS'] = self.size_xs
        sizes['S'] = self.size_s
        sizes['M'] = self.size_m
        sizes['L'] = self.size_l
        sizes['XL'] = self.size_xl
        return sizes

    def get_images(self):
        images = dict()
        images['image_1'] = self.image_1
        images['image_2'] = self.image_2
        images['image_3'] = self.image_3
        return images


class Image(models.Model):
    image = models.ImageField(upload_to='images/', verbose_name='Image', blank=True, null=True)
    
