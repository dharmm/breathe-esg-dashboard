from django.urls import path
from .views import DashboardAPIView,EmissionListAPIView,ApproveEmissionAPIView


urlpatterns = [

    path('dashboard/', DashboardAPIView.as_view()),
    path( 'records/', EmissionListAPIView.as_view()),
    path('approve/<int:pk>/',ApproveEmissionAPIView.as_view()),

]