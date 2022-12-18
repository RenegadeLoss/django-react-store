from django.urls import path, re_path

from .endpoints import *

urlpatterns = [
    # re_path('get_list/', views.GetItemsListView.as_view()),
    re_path(r'^get_filtered_list/(?P<filter>\w+)$', GetFilteredList.as_view()),
    path('get_categories/', GetCategories.as_view()),
    re_path(r'^get_item/(?P<id>\d+)$', GetItem.as_view()),
    re_path(r'^get_list/(?P<filter>\w+)/(?P<page>\d+)$', PageItem.as_view()),
    re_path(r'^get_pages/(?P<filter>\w+)$', GetPages.as_view())
]