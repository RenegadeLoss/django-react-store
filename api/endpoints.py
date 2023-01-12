from django.shortcuts import render
from catalog.models import Clothings, TypeOfClothes
from .api_serealizers import ClothingsSerializer, TypeOfClothesSerializer
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

# Create your views here.


class GetItem(generics.ListAPIView):
    serializer_class = ClothingsSerializer

    def get_queryset(self):
        item_id = self.kwargs['id']
        queryset = Clothings.objects.filter(id__exact=item_id)
        return queryset



class PageItem(generics.ListAPIView):
    serializer_class = ClothingsSerializer

    def get_queryset(self):
        filter = self.kwargs['filter']
        if filter != 'all':
            id_c = TypeOfClothes.objects.get(slug__exact=filter).id
            lst = list(Clothings.objects.filter(type_id=id_c))
            return lst
        return list(Clothings.objects.all())


class CategoriesPagination(PageNumberPagination):
    page_size = TypeOfClothes.objects.all().count()


class GetCategories(generics.ListAPIView):
    serializer_class = TypeOfClothesSerializer
    queryset = TypeOfClothes.objects.all()
    pagination_class = CategoriesPagination

