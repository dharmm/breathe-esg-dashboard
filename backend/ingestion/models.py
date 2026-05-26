from django.db import models
from accounts.models import Company


class DataSource(models.Model):

    SOURCE_CHOICES = (
        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL'),
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=20,
        choices=SOURCE_CHOICES
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.source_type


class RawUpload(models.Model):

    datasource = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE
    )

    file = models.FileField(upload_to='uploads/')

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)