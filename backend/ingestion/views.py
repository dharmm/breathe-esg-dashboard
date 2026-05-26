import pandas as pd

from rest_framework.views import APIView
from rest_framework.response import Response

from emissions.models import EmissionRecord
from accounts.models import Company


class SAPUploadView(APIView):

    def post(self, request):

        file = request.FILES.get('file')

        if not file:
            return Response({
                'error': 'No file uploaded'
            })

        df = pd.read_csv(file)

        company = Company.objects.first()

        for index, row in df.iterrows():

            quantity = float(row['quantity'])

            unit = row['unit']

            normalized_quantity = quantity

            # Unit Normalization
            if unit == 'gallons':
                normalized_quantity = quantity * 3.785

            suspicious = False

            # Suspicious Detection
            if quantity > 100000:
                suspicious = True

            # Save Record
            EmissionRecord.objects.create(

                company=company,

                source_type='SAP',

                activity=row['fuel_type'],

                quantity=quantity,

                unit=unit,

                normalized_quantity=normalized_quantity,

                normalized_unit='liters',

                scope='Scope 1',

                co2e=normalized_quantity * 2.68,

                suspicious=suspicious,
            )

        return Response({
            'message': 'CSV Uploaded Successfully'
        })