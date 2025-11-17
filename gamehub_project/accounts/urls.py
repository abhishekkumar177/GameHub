from django.urls import path
from . import views
from .views import leaderboard, add_visit, add_play
urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout, name='logout'),
    path('leaderboard/', leaderboard, name='leaderboard'),
    path('add-visit/', add_visit, name='add_visit'),    
    path('add-play/', add_play, name='add_play'),
]
