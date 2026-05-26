from django.db import models
from accounts.models import Company

class EmissionRecord(models.Model):

    STATUS_CHOICES = (
        ('PENDING','Pending'),
        ('APPROVED','Approved'),
        ('REJECTED','Rejected'),
    )

    company = models.ForeignKey(Company,on_delete=models.CASCADE)

    source_type = models.CharField(max_length=100)

    activity = models.CharField(max_length=255)

    quantity = models.FloatField()

    unit = models.CharField(max_length=50)

    normalized_quantity = models.FloatField()

    normalized_unit = models.CharField(max_length=50)

    scope = models.CharField(max_length=20)

    co2e = models.FloatField()

    suspicious = models.BooleanField(default=False)

    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default='PENDING')

    created_at = models.DateTimeField(auto_now_add=True)