"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import re_path

from .views import index
from .endpoints import *

urlpatterns = [
    path('', index, name='index'),
    path('admin/', admin.site.urls),
]

urlpatterns += [
    # re_path('get_list/', views.GetItemsListView.as_view()),
    re_path(r'^get_filtered_list/(?P<filter>\w+)$', GetFilteredList.as_view()),
    path('get_categories/', GetCategories.as_view()),
    re_path(r'^get_item/(?P<id>\d+)$', GetItem.as_view()),
    re_path(r'^get_list/(?P<filter>\w+)/(?P<page>\d+)$', PageItem.as_view()),
    re_path(r'^get_pages/(?P<filter>\w+)$', GetPages.as_view())
]
