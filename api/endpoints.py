from django.shortcuts import render
from ..backend.models import Clothings, TypeOfClothes
from .api_serealizers import ClothingsSerializer, TypeOfClothesSerializer
from rest_framework import generics

# Create your views here.


class GetItemsListView(generics.ListAPIView):
    serializer_class = ClothingsSerializer
    queryset = Clothings.objects.all()


class GetFilteredList(generics.ListAPIView):
    serializer_class = ClothingsSerializer

    def get_queryset(self):
        item_type = self.kwargs['filter']
        if item_type != 'all':
            queryset = Clothings.objects.filter(type__exact=item_type)
            return queryset
        else:
            queryset = Clothings.objects.all()
            return queryset


class GetItem(generics.ListAPIView):
    serializer_class = ClothingsSerializer

    def get_queryset(self):
        item_id = self.kwargs['id']
        queryset = Clothings.objects.filter(id__exact=item_id)
        return queryset


class TypeListView(generics.ListAPIView):
    serializer_class = TypeOfClothesSerializer
    queryset = TypeOfClothes.objects.all()


class GetPages(generics.ListAPIView):
    serializer_class = ClothingsSerializer

    def get_queryset(self):
        category = self.kwargs['filter'].title()
        if category != 'All':
            return list(Clothings.objects.filter(type__exact=category))
        return list(Clothings.objects.all())


class PageItem(generics.ListAPIView):
    serializer_class = ClothingsSerializer

    def get_queryset(self):
        n_page = int(self.kwargs['page'])
        category = self.kwargs['filter']
        if category != 'all':
            return list(Clothings.objects.filter(type__exact=category))[n_page * 2 - 2:n_page * 2]
        return list(Clothings.objects.all())[n_page*2-2:n_page*2]


class GetCategories(generics.ListAPIView):
    serializer_class = TypeOfClothesSerializer

    def get_queryset(self):
        queryset = list()
        for category in TypeOfClothes.objects.all():
            queryset.append(category)
        return queryset
